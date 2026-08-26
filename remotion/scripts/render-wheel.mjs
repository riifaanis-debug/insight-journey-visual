import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? "/mnt/documents/cpf-cycle-wheel.png";
fs.mkdirSync(path.dirname(out), { recursive: true });

const CACHE = process.env.BUNDLE ?? "/tmp/remotion-bundle-wheel";
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
  id: "cycle-wheel",
  puppeteerInstance: browser,
});

await renderStill({
  composition,
  serveUrl: bundled,
  frame: 0,
  output: out,
  puppeteerInstance: browser,
  overwrite: true,
});

await browser.close();
console.log("done:", out);
process.exit(0);
