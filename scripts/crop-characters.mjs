import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public/images/characters-full.png");
const outDir = path.join(root, "public/images");

const meta = await sharp(src).metadata();
const w = meta.width ?? 1536;
const h = meta.height ?? 1024;

const pad = Math.round(w * 0.02);
const mid = Math.round(w * 0.5);

const boy = {
  left: pad,
  top: Math.round(h * 0.02),
  width: mid - pad * 2,
  height: Math.round(h * 0.96),
};

const girl = {
  left: mid + pad,
  top: Math.round(h * 0.02),
  width: w - mid - pad * 2,
  height: Math.round(h * 0.96),
};

await sharp(src).extract(boy).png().toFile(path.join(outDir, "chibi-boy.png"));
await sharp(src).extract(girl).png().toFile(path.join(outDir, "chibi-girl.png"));

console.log("Exported chibi-boy.png and chibi-girl.png from characters-full.png");
