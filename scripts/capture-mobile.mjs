import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const out = 'C:/Users/YOGA/OneDrive - Teams Squared/Lex Ops/1. Backend Infra/3. Website/Mission-Control-Site/eval/round-14/mobile';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
for (const id of ['villain', 'visibility', 'statement', 'how', 'solution', 'privacy']) {
  await page.evaluate((i) => document.getElementById(i).scrollIntoView({ behavior: 'instant' }), id);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/${id}.png` });
}
await browser.close();
console.log('done');
