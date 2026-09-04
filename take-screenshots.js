const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to 1440x900
  await page.setViewport({ width: 1440, height: 900 });

  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // 1. Landing page - Hero
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(screenshotDir, '1-hero.png'), fullPage: false });
  console.log('✓ Hero screenshot taken');

  // 2. Features section
  await page.evaluate(() => {
    document.querySelector('#features').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '2-features.png'), fullPage: false });
  console.log('✓ Features screenshot taken');

  // 3. How It Works section
  await page.evaluate(() => {
    document.querySelector('#how-it-works').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '3-how-it-works.png'), fullPage: false });
  console.log('✓ How It Works screenshot taken');

  // 4. Pricing section
  await page.evaluate(() => {
    document.querySelector('#pricing').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '4-pricing.png'), fullPage: false });
  console.log('✓ Pricing screenshot taken');

  // 5. Login page
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(screenshotDir, '5-login.png'), fullPage: false });
  console.log('✓ Login screenshot taken');

  await browser.close();
  console.log('\n✓ All screenshots completed! Check the screenshots/ directory');
}

takeScreenshots().catch(console.error);
