import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.argv[2] ?? "/mnt/documents/cpf-journey-stills";
fs.mkdirSync(outDir, { recursive: true });

// قائمة الفصول (id, frame) تُمرَّر عبر ملف JSON يولّده bun من timeline.ts
const shots = JSON.parse(fs.readFileSync(process.env.SHOTS ?? "/tmp/shots.json", "utf8"));

const CACHE = process.env.BUNDLE ?? "/tmp/remotion-bundle-journey";
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
  id: "cycle-landscape",
  puppeteerInstance: browser,
});

for (const s of shots) {
  const out = path.join(outDir, `${s.name}.png`);
  await renderStill({
    composition,
    serveUrl: bundled,
    frame: s.frame,
    output: out,
    puppeteerInstance: browser,
    overwrite: true,
  });
  console.log("ok", s.name, s.frame);
}

await browser.close();
console.log("done:", outDir);
process.exit(0);
