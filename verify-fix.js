const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  const errors = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  page.on('pageerror', error => {
    errors.push(error.toString());
  });
  
  console.log('Navigating to /admin...');
  await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle0' });
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'admin-fixed.png', fullPage: true });
  
  console.log('\n=== Errors Found ===');
  if (errors.length === 0) {
    console.log('✅ No hydration errors! Admin portal loads cleanly.');
  } else {
    console.log('❌ Errors still present:');
    errors.forEach(err => console.log(err));
  }
  
  await browser.close();
})();
