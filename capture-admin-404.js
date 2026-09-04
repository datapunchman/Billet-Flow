const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  
  // Capture ALL network requests
  const allRequests = [];
  page.on('response', response => {
    allRequests.push({
      url: response.url(),
      status: response.status(),
      statusText: response.statusText()
    });
  });
  
  console.log('Navigating directly to /admin...');
  await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle0' });
  
  // Wait for page to fully load
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('\n=== All Network Requests ===');
  allRequests.forEach(req => {
    if (req.status !== 200 && req.status !== 304) {
      console.log(`❌ ${req.status} - ${req.url}`);
    }
  });
  
  // Check if there's an error notification in the DOM
  console.log('\n=== Checking for error notifications in DOM ===');
  const notifications = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const results = [];
    elements.forEach(el => {
      const text = el.textContent || '';
      if (text.includes('404') || text.toLowerCase().includes('not found')) {
        results.push({
          tag: el.tagName,
          text: text.substring(0, 100),
          classes: el.className
        });
      }
    });
    return results;
  });
  
  console.log('Notifications found:', notifications);
  
  await browser.close();
})();
