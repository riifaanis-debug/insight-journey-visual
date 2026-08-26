import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path"; import fs from "fs";
const CACHE = "/tmp/remotion-bundle-x";
const bundled = fs.existsSync(path.join(CACHE,"index.html")) && process.env.REUSE ? CACHE :
  await bundle({ entryPoint: path.resolve("../src/live.ts"), outDir: CACHE, webpackOverride: (c)=>c });
const browser = await openBrowser("chrome", { browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium", chromiumOptions:{args:["--no-sandbox","--disable-gpu","--disable-dev-shm-usage"]}, chromeMode:"chrome-for-testing" });
const composition = await selectComposition({ serveUrl: bundled, id: process.env.COMP ?? "cycle-landscape", puppeteerInstance: browser });
for (const f of process.argv.slice(2).map(Number)) {
  await renderStill({ composition, serveUrl: bundled, frame: f, output: `/tmp/still-${f}.png`, puppeteerInstance: browser, overwrite: true });
  console.log("ok", f);
}
await browser.close(); process.exit(0);
