const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeAdminScreenshot() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const screenshotDir = path.join(__dirname, 'screenshots-updated');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // Admin dashboard
  await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '5-admin-dashboard.png'), fullPage: false });
  console.log('✓ Admin Dashboard screenshot taken');

  // Mobile view - 390px
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3001/register', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '6-register-mobile.png'), fullPage: true });
  console.log('✓ Register Mobile screenshot taken');

  await browser.close();
  console.log('\n✓ All screenshots completed!');
}

takeAdminScreenshot().catch(console.error);
