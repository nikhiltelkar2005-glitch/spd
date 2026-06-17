/** Synthesized cinematic sting (Netflix-style "tudum" feel) */
export async function playTudum(): Promise<void> {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;

  const ctx = new Ctx();

  const tone = (
    freq: number,
    start: number,
    duration: number,
    peak: number,
    type: OscillatorType = "sine"
  ) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(peak, ctx.currentTime + start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + duration + 0.05);
  };

  const noiseBurst = (start: number) => {
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = "lowpass";
    filter.frequency.value = 180;
    gain.gain.setValueAtTime(0.5, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + 0.4);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime + start);
  };

  tone(55, 0, 1.4, 0.9);
  tone(110, 0.05, 1.0, 0.35);
  tone(330, 0.12, 0.6, 0.15);
  noiseBurst(0);

  await new Promise((r) => setTimeout(r, 1600));
  await ctx.close();
}
