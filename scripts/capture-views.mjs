// Evidence for the nav-opened views: node scripts/capture-views.mjs <round> [baseUrl]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const round = process.argv[2] || 'views';
const base = process.argv[3] || 'http://localhost:5173';
const out = join('eval', `round-${round}`);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));

const shot = (name, opts = {}) => page.screenshot({ path: join(out, `${name}.png`), ...opts });

await page.goto(base + '/#platform', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('view-platform-top');
await page.evaluate(() => window.scrollBy(0, 900));
await page.waitForTimeout(1200);
await shot('view-platform-scan');

await page.goto(base + '/#about', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector('.team-grid').scrollIntoView({ block: 'center', behavior: 'instant' }));
await page.waitForTimeout(1200);
await shot('about-team');
await page.evaluate(() => document.querySelector('.logo-ribbon').scrollIntoView({ block: 'center', behavior: 'instant' }));
await page.waitForTimeout(1200);
await shot('about-logos');

await page.goto(base + '/#try', { waitUntil: 'networkidle' });
await page.waitForTimeout(3500);
await shot('view-try-graph');
await page.evaluate(() => document.getElementById('atlas').scrollIntoView({ behavior: 'instant' }));
await page.waitForTimeout(600);
await shot('view-try-atlas');
await page.click('#gs-list .gs-item');
await page.waitForTimeout(900);
await shot('view-try-dept');
await page.click('.wf-card');
await page.waitForTimeout(900);
await shot('view-try-workflow');
await page.click('#zoom-segs .zoom-seg[data-z="3"]');
await page.waitForTimeout(700);
await page.click('#pmap .p-node');
await page.waitForTimeout(600);
await shot('view-try-workflow-zoom3');

// nav round trip: view → landing anchor must land on the section
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
await page.click('.nav-links a[href="#about"]');
await page.waitForTimeout(800);
const aboutTop = await page.evaluate(() => Math.round(document.getElementById('about').getBoundingClientRect().top));
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

await browser.close();
console.log(`about top after nav: ${aboutTop}px (expect ~0–70)`);
console.log(overflow ? 'HORIZONTAL OVERFLOW' : 'no overflow');
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'CLEAN');
