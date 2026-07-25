import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const messages = [];
page.on('console', (msg) => {
  messages.push(`[console:${msg.type()}] ${msg.text()}`);
});
page.on('pageerror', (error) => {
  messages.push(`[pageerror] ${error.stack || error.message}`);
});
page.on('requestfailed', (request) => {
  messages.push(`[requestfailed] ${request.url()} :: ${request.failure()?.errorText}`);
});

await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(4000);

const canvas = await page.locator('canvas').count();
const bodyText = await page.locator('body').innerText();

messages.push(`[canvas-count] ${canvas}`);
messages.push(`[body-text] ${bodyText.slice(0, 500)}`);

console.log(messages.join('\n'));

await browser.close();
