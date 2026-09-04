const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  // Capture all network requests
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()
    });
  });
  
  page.on('response', response => {
    if (response.status() === 404) {
      failedRequests.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });
  
  // Capture console logs
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console Error:', msg.text());
    }
  });
  
  console.log('Navigating to login page...');
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle0' });
  
  console.log('Filling login form...');
  await page.type('input[type="email"]', 'admin@test.com');
  await page.type('input[type="password"]', 'password123');
  
  console.log('Clicking login button...');
  await page.click('button[type="submit"]');
  
  // Wait for navigation to admin portal
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  console.log('Current URL:', page.url());
  
  // Wait a bit for any async requests
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('\n=== Failed Requests (404s) ===');
  failedRequests.forEach(req => {
    console.log(`URL: ${req.url}`);
    console.log(`Status: ${req.status || 'Failed'}`);
    console.log(`Details: ${JSON.stringify(req.failure || req.statusText)}`);
    console.log('---');
  });
  
  if (failedRequests.length === 0) {
    console.log('No 404 errors detected');
  }
  
  await browser.close();
})();
