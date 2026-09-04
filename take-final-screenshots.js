const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeFinalScreenshots() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const screenshotDir = path.join(__dirname, 'screenshots-final');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  // Select Plan page
  await page.goto('http://localhost:3001/select-plan', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '1-select-plan.png'), fullPage: true });
  console.log('✓ Select Plan screenshot taken');

  // Landing page - full scroll
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '2-landing-full.png'), fullPage: true });
  console.log('✓ Landing page full screenshot taken');

  // Admin Users page
  await page.goto('http://localhost:3001/admin/users', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '3-admin-users.png'), fullPage: false });
  console.log('✓ Admin Users screenshot taken');

  // Tablet view - 768px
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3001/select-plan', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '4-select-plan-tablet.png'), fullPage: true });
  console.log('✓ Select Plan Tablet screenshot taken');

  await browser.close();
  console.log('\n✓ All final screenshots completed!');
}

takeFinalScreenshots().catch(console.error);
