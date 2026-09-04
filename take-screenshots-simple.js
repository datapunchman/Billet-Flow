const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1440, height: 900 });

  const screenshotDir = path.join(__dirname, 'screenshots-updated');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // 1. Register page
  await page.goto('http://localhost:3001/register', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '1-register.png'), fullPage: false });
  console.log('✓ Register screenshot taken');

  // 2. Verify Email page
  await page.goto('http://localhost:3001/verify-email', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '2-verify-email.png'), fullPage: false });
  console.log('✓ Verify Email screenshot taken');

  // 3. Verify Phone page
  await page.goto('http://localhost:3001/verify-phone', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '3-verify-phone.png'), fullPage: false });
  console.log('✓ Verify Phone screenshot taken');

  // 4. Login page
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '4-login.png'), fullPage: false });
  console.log('✓ Login screenshot taken');

  await browser.close();
  console.log('\n✓ All screenshots completed!');
}

takeScreenshots().catch(console.error);
