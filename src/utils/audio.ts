// Web Audio API synth for all in-app sounds
let audioCtx: AudioContext | null = null;
let ambientNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
let ambientTimeout: ReturnType<typeof setTimeout> | null = null;
let ambientStopped = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

/** Netflix-style warm intro chime */
export function playIntroSound(): void {
  try {
    const ctx = getCtx();
    const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + i * 0.18 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 1.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 1.2);
    });
  } catch (e) {
    console.warn("Audio error", e);
  }
}

/** Realistic paper page-flip rustle */
export function playPageFlipSound(): void {
  try {
    const ctx = getCtx();
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.12);
    filter.Q.value = 0.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime);
  } catch (e) {
    console.warn("Audio error", e);
  }
}

/** Soft ambient piano chords loop */
const AMBIENT_CHORDS = [
  [261.63, 329.63, 392.0],   // C major
  [293.66, 369.99, 440.0],   // D minor
  [329.63, 415.3, 493.88],   // E minor
  [349.23, 440.0, 523.25],   // F major
  [392.0, 493.88, 587.33],   // G major
  [440.0, 523.25, 659.26],   // A minor
];

function playChord(ctx: AudioContext, freqs: number[], startTime: number): void {
  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.06, startTime + 0.3);
    gain.gain.setValueAtTime(0.06, startTime + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 2.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + 2.6);
    ambientNodes.push({ osc, gain });
  });
}

let ambientChordIndex = 0;

function scheduleNextChord(): void {
  if (ambientStopped) return;
  const ctx = getCtx();
  const chord = AMBIENT_CHORDS[ambientChordIndex % AMBIENT_CHORDS.length];
  playChord(ctx, chord, ctx.currentTime);
  ambientChordIndex++;
  ambientTimeout = setTimeout(scheduleNextChord, 2800);
}

export function startAmbientMusic(): void {
  ambientStopped = false;
  ambientChordIndex = 0;
  scheduleNextChord();
}

export function stopAmbientMusic(): void {
  ambientStopped = true;
  if (ambientTimeout) clearTimeout(ambientTimeout);
  ambientNodes.forEach(({ gain }) => {
    try {
      const ctx = getCtx();
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    } catch (_) {}
  });
  ambientNodes = [];
}
