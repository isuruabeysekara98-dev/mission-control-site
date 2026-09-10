// Recapture the workflow-view preview as a clean product frame (no site nav in it)
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173/#try', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.click('#gs-list .gs-item');
await page.waitForTimeout(1500);
await page.click('#gs-list .gs-sub .gs-wf');
await page.waitForTimeout(1200);
await page.click('#zoom-segs .zoom-seg[data-z="3"]');
await page.waitForTimeout(600);
await page.click('#pmap .p-node[data-step="1"]');
await page.waitForTimeout(700);
const b = await page.locator('#focus-overlay .focus-window').boundingBox();
await page.screenshot({ path: 'public/preview/workflow-inspector.png', clip: { x: b.x + 1, y: b.y + 22, width: b.width - 2, height: b.height - 23 } });
await browser.close();
console.log('preview captured');
