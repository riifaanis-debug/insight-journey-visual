import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? "/mnt/documents/cpf-cycle-wheel.mp4";
fs.mkdirSync(path.dirname(out), { recursive: true });

const CACHE = "/tmp/remotion-bundle-wheel-video";
const bundled =
  fs.existsSync(path.join(CACHE, "index.html")) && process.env.REUSE
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
  id: "cycle-wheel-motion",
  puppeteerInstance: browser,
});

await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: out,
  puppeteerInstance: browser,
  muted: true,
  concurrency: Number(process.env.CONC ?? 4),
  onProgress: ({ progress }) => {
    if (Math.round(progress * 100) % 5 === 0) console.log("progress", Math.round(progress * 100));
  },
});

await browser.close({ silent: false });
console.log("done:", out);
process.exit(0);
