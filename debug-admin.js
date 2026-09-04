const puppeteer = require('puppeteer');

async function debugAdmin() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Capture console logs
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  // Capture network requests
  page.on('response', response => {
    if (response.status() === 404) {
      console.log('404 ERROR:', response.url());
    }
  });

  await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle2' });

  await new Promise(resolve => setTimeout(resolve, 3000));

  // Get any error messages on page
  const errors = await page.evaluate(() => {
    const errorElements = document.querySelectorAll('[class*="error"], [class*="alert"]');
    return Array.from(errorElements).map(el => el.textContent);
  });

  console.log('Page errors found:', errors);

  await browser.close();
}

debugAdmin().catch(console.error);
