const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  const errors = [];
  
  page.on('pageerror', error => {
    errors.push(error.toString());
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  console.log('1. Navigating to login page...');
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'test-01-login.png' });
  
  console.log('2. Filling login form...');
  await page.type('input[type="email"]', 'admin@test.com');
  await page.type('input[type="password"]', 'password123');
  
  console.log('3. Submitting login...');
  await page.click('button[type="submit"]');
  
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  console.log('4. Current URL:', page.url());
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await page.screenshot({ path: 'test-02-admin-dashboard.png', fullPage: true });
  
  console.log('\n=== Test Results ===');
  if (errors.length === 0) {
    console.log('✅ Login flow completed successfully with no errors');
    console.log('✅ Admin portal loaded at:', page.url());
  } else {
    console.log('❌ Errors detected:');
    errors.forEach(err => console.log(err));
  }
  
  await browser.close();
})();
