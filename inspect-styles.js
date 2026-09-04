const puppeteer = require('puppeteer');

async function inspectStyles() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });

  // Inspect Hero Grid Container
  const heroGridStyles = await page.evaluate(() => {
    const heroGrid = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-12');
    if (!heroGrid) return { error: 'Hero grid not found' };

    const computed = window.getComputedStyle(heroGrid);
    return {
      display: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap,
      width: computed.width
    };
  });

  console.log('\n=== HERO GRID CONTAINER ===');
  console.log(JSON.stringify(heroGridStyles, null, 2));

  // Inspect Hero Left Column (lg:col-span-5)
  const heroLeftCol = await page.evaluate(() => {
    const leftCol = document.querySelector('.lg\\:col-span-5');
    if (!leftCol) return { error: 'Left column not found' };

    const computed = window.getComputedStyle(leftCol);
    return {
      gridColumn: computed.gridColumn,
      width: computed.width
    };
  });

  console.log('\n=== HERO LEFT COLUMN (lg:col-span-5) ===');
  console.log(JSON.stringify(heroLeftCol, null, 2));

  // Inspect Hero Right Column (lg:col-span-7)
  const heroRightCol = await page.evaluate(() => {
    const rightCol = document.querySelector('.lg\\:col-span-7');
    if (!rightCol) return { error: 'Right column not found' };

    const computed = window.getComputedStyle(rightCol);
    return {
      gridColumn: computed.gridColumn,
      width: computed.width
    };
  });

  console.log('\n=== HERO RIGHT COLUMN (lg:col-span-7) ===');
  console.log(JSON.stringify(heroRightCol, null, 2));

  // Inspect Features Grid
  await page.evaluate(() => {
    document.querySelector('#features').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(resolve => setTimeout(resolve, 200));

  const featuresGrid = await page.evaluate(() => {
    const grid = document.querySelector('#features .grid');
    if (!grid) return { error: 'Features grid not found' };

    const computed = window.getComputedStyle(grid);
    return {
      display: computed.display,
      gridTemplateColumns: computed.gridTemplateColumns,
      gap: computed.gap
    };
  });

  console.log('\n=== FEATURES GRID ===');
  console.log(JSON.stringify(featuresGrid, null, 2));

  // Inspect Login Card
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle2' });

  const loginCard = await page.evaluate(() => {
    const card = document.querySelector('.max-w-md');
    if (!card) return { error: 'Login card not found' };

    const computed = window.getComputedStyle(card);
    return {
      maxWidth: computed.maxWidth,
      width: computed.width,
      marginLeft: computed.marginLeft,
      marginRight: computed.marginRight
    };
  });

  console.log('\n=== LOGIN CARD (max-w-md) ===');
  console.log(JSON.stringify(loginCard, null, 2));

  await browser.close();
  console.log('\n✓ Style inspection completed!\n');
}

inspectStyles().catch(console.error);
