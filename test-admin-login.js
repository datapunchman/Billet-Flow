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
  
  console.log('2. Filling login form with ADMIN credentials...');
  await page.type('input[type="email"]', 'admin@datadelimited.com');
  await page.type('input[type="password"]', 'password123');
  
  console.log('3. Submitting login...');
  await page.click('button[type="submit"]');
  
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  console.log('4. Current URL:', page.url());
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await page.screenshot({ path: 'admin-final.png', fullPage: true });
  
  console.log('\n=== Test Results ===');
  if (page.url() === 'http://localhost:3001/admin') {
    console.log('✅ Login redirected to /admin correctly');
  } else {
    console.log('❌ Wrong redirect. Expected /admin, got:', page.url());
  }
  
  if (errors.length === 0) {
    console.log('✅ No hydration or console errors');
  } else {
    console.log('❌ Errors detected:');
    errors.forEach(err => console.log(err));
  }
  
  await browser.close();
})();
