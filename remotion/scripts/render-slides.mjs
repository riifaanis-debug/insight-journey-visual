import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.argv[2] ?? "/mnt/documents/cpf-slides";
fs.mkdirSync(outDir, { recursive: true });

const CACHE = process.env.BUNDLE ?? "/tmp/remotion-bundle-slides";
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
  id: "cycle-slides",
  puppeteerInstance: browser,
});

const only = process.argv[3] ? process.argv[3].split(",").map(Number) : null;
for (let i = 0; i < composition.durationInFrames; i++) {
  if (only && !only.includes(i + 1)) continue;
  const name = `stage-${String(i + 1).padStart(2, "0")}.png`;
  await renderStill({
    composition,
    serveUrl: bundled,
    frame: i,
    output: path.join(outDir, name),
    puppeteerInstance: browser,
    overwrite: true,
  });
  console.log("ok", name);
}

await browser.close();
console.log("done:", outDir);
process.exit(0);
