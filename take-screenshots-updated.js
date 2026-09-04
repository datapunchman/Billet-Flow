const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to 1440x900
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

  // 2. Register with coupon modal
  await page.click('button:has-text("Have a Coupon?")');
  await new Promise(resolve => setTimeout(resolve, 300));
  await page.screenshot({ path: path.join(screenshotDir, '2-register-coupon-modal.png'), fullPage: false });
  console.log('✓ Register with coupon modal screenshot taken');

  // Close modal
  await page.keyboard.press('Escape');
  await new Promise(resolve => setTimeout(resolve, 200));

  // 3. Verify Email page
  await page.goto('http://localhost:3001/verify-email', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '3-verify-email.png'), fullPage: false });
  console.log('✓ Verify Email screenshot taken');

  // 4. Verify Phone page
  await page.goto('http://localhost:3001/verify-phone', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '4-verify-phone.png'), fullPage: false });
  console.log('✓ Verify Phone screenshot taken');

  // 5. Login page
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({ path: path.join(screenshotDir, '5-login.png'), fullPage: false });
  console.log('✓ Login screenshot taken');

  // 6. Admin Dashboard (may 404 if not accessible)
  try {
    await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle2', timeout: 5000 });
    await new Promise(resolve => setTimeout(resolve, 500));
    await page.screenshot({ path: path.join(screenshotDir, '6-admin-dashboard.png'), fullPage: false });
    console.log('✓ Admin Dashboard screenshot taken');
  } catch (e) {
    console.log('⚠ Admin Dashboard not accessible (expected if auth required)');
  }

  await browser.close();
  console.log('\n✓ All screenshots completed! Check the screenshots-updated/ directory');
}

takeScreenshots().catch(console.error);
