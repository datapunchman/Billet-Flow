const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  const logs = [];
  
  // Capture ALL console messages
  page.on('console', msg => {
    logs.push({
      type: msg.type(),
      text: msg.text()
    });
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    logs.push({
      type: 'pageerror',
      text: error.toString()
    });
  });
  
  // Capture failed requests
  page.on('requestfailed', request => {
    logs.push({
      type: 'requestfailed',
      text: `Failed: ${request.url()} - ${request.failure().errorText}`
    });
  });
  
  // Capture 404 responses
  page.on('response', response => {
    if (response.status() === 404) {
      logs.push({
        type: '404',
        text: `404: ${response.url()}`
      });
    }
  });
  
  console.log('Navigating to /admin...');
  await page.goto('http://localhost:3001/admin', { waitUntil: 'domcontentloaded' });
  
  // Wait for all async operations
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('\n=== All Console Logs & Errors ===');
  logs.forEach(log => {
    console.log(`[${log.type.toUpperCase()}] ${log.text}`);
  });
  
  if (logs.length === 0) {
    console.log('No errors or 404s detected');
  }
  
  await browser.close();
})();
