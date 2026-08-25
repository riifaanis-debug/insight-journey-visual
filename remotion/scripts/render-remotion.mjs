import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? "/mnt/documents/cpf-framework.mp4";
const frames = process.argv[3];
const CACHE = "/tmp/remotion-bundle";

const bundled = fs.existsSync(path.join(CACHE, "index.html"))
  ? CACHE
  : await bundle({
      entryPoint: path.resolve(__dirname, "../src/live.ts"),
      outDir: CACHE,
      webpackOverride: (config) => config,
    });


const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: {
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  },
  chromeMode: "chrome-for-testing",
});

const composition = await selectComposition({
  serveUrl: bundled,
  id: "main",
  puppeteerInstance: browser,
});

await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: out,
  puppeteerInstance: browser,
  muted: false,
  audioCodec: "aac",
  enforceAudioTrack: true,
  concurrency: Number(process.env.CONC ?? 8),
  frameRange: frames ? frames.split("-").map(Number) : undefined,
  onProgress: ({ renderedFrames }) => {
    if (renderedFrames % 120 === 0) console.log("frames:", renderedFrames);
  },
});

await browser.close({ silent: false });
console.log("done:", out);
