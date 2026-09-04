const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to /admin...');
  await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle0' });
  
  // Wait for any notifications to appear
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'admin-portal-404.png', fullPage: true });
  
  console.log('Screenshot saved as admin-portal-404.png');
  
  await browser.close();
})();
