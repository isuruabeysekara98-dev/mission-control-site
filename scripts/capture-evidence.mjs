/* Evidence pack capture for ENGINEERING-LOOP.md
   Usage: node scripts/capture-evidence.mjs <round> [baseUrl] */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const round = process.argv[2] || '1';
const base = process.argv[3] || 'http://localhost:5173';
const outDir = join('eval', `round-${round}`);
mkdirSync(outDir, { recursive: true });

const widths = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const browser = await chromium.launch({
  args: ['--enable-unsafe-webgpu', '--ignore-gpu-blocklist'],
});

const errors = [];
for (const v of widths) {
  const page = await browser.newPage({ viewport: { width: v.width, height: v.height } });
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`[${v.name}] ${msg.text()}`); });
  page.on('pageerror', (err) => errors.push(`[${v.name}] PAGEERROR ${err.message}`));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(v.name === 'desktop' ? 11000 : 4000); // let the brain build on desktop

  // full page
  await page.screenshot({ path: join(outDir, `${v.name}-full.png`), fullPage: true });

  if (v.name === 'desktop') {
    // scroll journey
    const total = await page.evaluate(() => document.body.scrollHeight);
    const step = 850;
    let i = 0;
    for (let y = 0; y < total; y += step) {
      await page.evaluate((yy) => scrollTo(0, yy), y);
      await page.waitForTimeout(900);
      await page.screenshot({ path: join(outDir, `scroll-${String(i).padStart(2, '0')}.png`) });
      i++;
    }
    // horizontal overflow check
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) errors.push(`[desktop] HORIZONTAL OVERFLOW: ${overflow}px`);
  }
  const overflowM = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflowM > 1) errors.push(`[${v.name}] HORIZONTAL OVERFLOW: ${overflowM}px`);
  await page.close();
}

await browser.close();
console.log(errors.length ? `CONSOLE ERRORS / ISSUES:\n${errors.join('\n')}` : 'CLEAN: no console errors, no overflow');
console.log(`Evidence written to ${outDir}`);
