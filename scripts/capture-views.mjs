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

await page.evaluate(() => document.getElementById('trust').scrollIntoView({ block: 'center', behavior: 'instant' }));
await page.waitForTimeout(1200);
await shot('view-platform-trust');

await page.goto(base + '/#about', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await shot('view-about-top');
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
await page.click('#gs-list .gs-item');          // department deep-dive
await page.waitForTimeout(2200);
await shot('view-try-dept-focus');
const focusLinks = await page.evaluate(() => [...document.querySelectorAll('#graph-svg .g-link')].filter((l) => getComputedStyle(l).opacity !== '0').length);
console.log('visible mesh lines in deep-dive:', focusLinks, '(expect 0)');
await page.click('#gs-list .gs-sub .gs-wf');     // one click opens the workflow IDE
await page.waitForTimeout(1200);
const opened = await page.evaluate(() => document.getElementById('focus-overlay').classList.contains('active'));
console.log('workflow opened on click:', opened, '(expect true)');
await shot('view-try-workflow');
await page.click('#zoom-segs .zoom-seg[data-z="3"]');
await page.waitForTimeout(700);
await page.click('#pmap .p-node[data-step="1"]');
await page.waitForTimeout(600);
await shot('view-try-workflow-inspector');
await page.click('#focus-rail .rel-item');       // connect a related workflow
await page.waitForTimeout(1200);
await page.evaluate(() => { const s = document.getElementById('process-scroll'); s.scrollLeft = 260; });
await page.waitForTimeout(400);
await shot('view-try-workflow-connected');
const ide = await page.evaluate(() => ({
  pulses: document.querySelectorAll('#p-flow .p-pulse').length,
  lanes: document.querySelectorAll('#pmap .p-lane').length,
  influence: document.querySelectorAll('#pmap .p-edge.influence').length,
  stamps: document.querySelectorAll('#pmap .p-node:not(.lane) .n-time').length,
  bridgesAtDeptFocus: null,
}));
console.log('IDE:', JSON.stringify(ide), '(expect pulses>0, lanes=1, influence>0, stamps=steps)');

// nav round trip: view → landing anchor must land on the section
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
await page.click('.nav-links a[href="#about"]');
await page.waitForTimeout(800);
const aboutState = await page.evaluate(() => ({
  view: document.body.dataset.view,
  mainHidden: getComputedStyle(document.querySelector('main')).display === 'none',
  trustInMain: Boolean(document.querySelector('main #trust')),
}));
await page.click('.view-back');
await page.waitForTimeout(800);
const backState = await page.evaluate(() => ({ view: document.body.dataset.view || null, scrollY: Math.round(scrollY) }));
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);

await browser.close();
console.log('about view:', JSON.stringify(aboutState), '(expect view=about, mainHidden=true, trustInMain=false)');
console.log('back to overview:', JSON.stringify(backState), '(expect view=null, scrollY≈0)');
console.log(overflow ? 'HORIZONTAL OVERFLOW' : 'no overflow');
console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'CLEAN');
