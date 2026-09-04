const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  // Test all key pages
  const pages = [
    { url: 'http://localhost:3001/register', name: 'registration' },
    { url: 'http://localhost:3001/verify-phone', name: 'phone-verification' },
    { url: 'http://localhost:3001/verify-email', name: 'email-verification' },
    { url: 'http://localhost:3001/login', name: 'login' },
    { url: 'http://localhost:3001/select-plan', name: 'plan-selection' },
    { url: 'http://localhost:3001/admin', name: 'admin-portal' }
  ];
  
  console.log('📸 Capturing final screenshots of all pages...\n');
  
  for (const pageInfo of pages) {
    console.log(`Capturing: ${pageInfo.name}...`);
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.screenshot({ 
      path: `final-${pageInfo.name}.png`,
      fullPage: true 
    });
    console.log(`✅ Saved: final-${pageInfo.name}.png`);
  }
  
  console.log('\n✨ All screenshots captured successfully!');
  
  await browser.close();
})();
