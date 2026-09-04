const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');

async function generateDocuments() {
  console.log('Starting document generation...');

  // Read the markdown file
  const markdownPath = path.join(__dirname, 'COMPLETE_ARCHITECTURE.md');
  const markdownContent = await fs.readFile(markdownPath, 'utf-8');

  // Convert markdown to HTML
  const htmlContent = marked.parse(markdownContent);

  // Create a styled HTML document
  const styledHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Billet Flow - Technical Architecture Documentation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: white;
      padding: 60px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: #0f172a;
      font-size: 2.5em;
      margin-top: 40px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #f97316;
    }

    h2 {
      color: #1e293b;
      font-size: 2em;
      margin-top: 40px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
    }

    h3 {
      color: #334155;
      font-size: 1.5em;
      margin-top: 30px;
      margin-bottom: 12px;
    }

    h4 {
      color: #475569;
      font-size: 1.2em;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 15px;
      text-align: justify;
    }

    ul, ol {
      margin-left: 30px;
      margin-bottom: 15px;
    }

    li {
      margin-bottom: 8px;
    }

    code {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9em;
      color: #e11d48;
    }

    pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 20px;
      border-radius: 8px;
      overflow-x: auto;
      margin-bottom: 20px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.85em;
      line-height: 1.5;
    }

    pre code {
      background: transparent;
      color: #e2e8f0;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 0.9em;
    }

    th {
      background: #f97316;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }

    td {
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    blockquote {
      border-left: 4px solid #f97316;
      padding-left: 20px;
      margin: 20px 0;
      font-style: italic;
      color: #64748b;
    }

    hr {
      border: none;
      border-top: 2px solid #e2e8f0;
      margin: 40px 0;
    }

    a {
      color: #f97316;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .page-break {
      page-break-after: always;
    }

    @media print {
      body {
        padding: 40px;
      }

      h1, h2, h3, h4 {
        page-break-after: avoid;
      }

      pre, table {
        page-break-inside: avoid;
      }
    }

    /* Status badges */
    .status-complete { color: #16a34a; font-weight: bold; }
    .status-critical { color: #dc2626; font-weight: bold; }
    .status-warning { color: #f59e0b; font-weight: bold; }

    /* Cover page */
    .cover-page {
      text-align: center;
      padding: 100px 0;
      page-break-after: always;
    }

    .cover-page h1 {
      font-size: 3em;
      border: none;
      margin-bottom: 30px;
    }

    .cover-page .subtitle {
      font-size: 1.5em;
      color: #64748b;
      margin-bottom: 60px;
    }

    .cover-page .meta {
      font-size: 1.1em;
      color: #475569;
      line-height: 2;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <h1>Billet Flow</h1>
    <div class="subtitle">Complete Technical Architecture Documentation</div>
    <div class="meta">
      <p><strong>Version:</strong> 1.0</p>
      <p><strong>Date:</strong> September 3, 2026</p>
      <p><strong>Application:</strong> CNC Estimator / Manufacturing Cost Estimation Platform</p>
      <p><strong>Repository:</strong> <a href="https://github.com/datapunchman/Billet-Flow">github.com/datapunchman/Billet-Flow</a></p>
    </div>
  </div>

  ${htmlContent}
</body>
</html>
  `;

  // Write HTML file for reference
  const htmlPath = path.join(__dirname, 'COMPLETE_ARCHITECTURE.html');
  await fs.writeFile(htmlPath, styledHtml);
  console.log('✓ HTML file created');

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set content
  await page.setContent(styledHtml, {
    waitUntil: 'networkidle0'
  });

  // Generate PDF
  const pdfPath = path.join(__dirname, 'Billet-Flow-Technical-Architecture.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 10px; text-align: center; width: 100%; color: #64748b; padding: 0 15mm;">
        <span>Billet Flow - Technical Architecture Documentation</span>
        <span style="float: right;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `
  });

  console.log('✓ PDF generated:', pdfPath);

  await browser.close();

  console.log('\n✅ Document generation complete!');
  console.log('\nGenerated files:');
  console.log('  - COMPLETE_ARCHITECTURE.md (Markdown source)');
  console.log('  - COMPLETE_ARCHITECTURE.html (HTML version)');
  console.log('  - Billet-Flow-Technical-Architecture.pdf (PDF version)');

  // Get file sizes
  const stats = await fs.stat(pdfPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\nPDF file size: ${fileSizeMB} MB`);
}

generateDocuments().catch(error => {
  console.error('Error generating documents:', error);
  process.exit(1);
});
