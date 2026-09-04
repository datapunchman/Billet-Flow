const fs = require('fs').promises;
const { marked } = require('marked');
const HTMLtoDOCX = require('html-docx-js/dist/html-docx');

async function generateDocxDocument() {
  console.log('Starting DOCX generation...');

  // Read the markdown file
  const markdownContent = await fs.readFile('COMPLETE_ARCHITECTURE.md', 'utf-8');

  // Convert markdown to HTML
  const htmlContent = marked.parse(markdownContent);

  // Create a styled HTML document for DOCX
  const styledHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Billet Flow - Technical Architecture Documentation</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000000;
    }

    h1 {
      font-size: 24pt;
      font-weight: bold;
      color: #1e293b;
      margin-top: 24pt;
      margin-bottom: 12pt;
      border-bottom: 3pt solid #f97316;
      padding-bottom: 6pt;
    }

    h2 {
      font-size: 18pt;
      font-weight: bold;
      color: #1e293b;
      margin-top: 18pt;
      margin-bottom: 10pt;
      border-bottom: 2pt solid #e2e8f0;
      padding-bottom: 4pt;
    }

    h3 {
      font-size: 14pt;
      font-weight: bold;
      color: #334155;
      margin-top: 14pt;
      margin-bottom: 8pt;
    }

    h4 {
      font-size: 12pt;
      font-weight: bold;
      color: #475569;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }

    p {
      margin-bottom: 10pt;
      text-align: justify;
    }

    ul, ol {
      margin-left: 20pt;
      margin-bottom: 10pt;
    }

    li {
      margin-bottom: 6pt;
    }

    code {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 9pt;
      background-color: #f1f5f9;
      padding: 2pt 4pt;
      color: #e11d48;
    }

    pre {
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 9pt;
      background-color: #1e293b;
      color: #e2e8f0;
      padding: 12pt;
      margin-bottom: 12pt;
      border-radius: 4pt;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12pt;
      font-size: 10pt;
    }

    th {
      background-color: #f97316;
      color: white;
      padding: 8pt;
      text-align: left;
      font-weight: bold;
      border: 1pt solid #e2e8f0;
    }

    td {
      padding: 6pt 8pt;
      border: 1pt solid #e2e8f0;
    }

    tr:nth-child(even) {
      background-color: #f8fafc;
    }

    blockquote {
      border-left: 4pt solid #f97316;
      padding-left: 12pt;
      margin: 12pt 0;
      font-style: italic;
      color: #64748b;
    }

    hr {
      border: none;
      border-top: 1pt solid #e2e8f0;
      margin: 24pt 0;
    }

    a {
      color: #f97316;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div style="text-align: center; margin-bottom: 48pt;">
    <h1 style="border: none; font-size: 28pt;">Billet Flow</h1>
    <p style="font-size: 16pt; color: #64748b; margin-bottom: 36pt;">Complete Technical Architecture Documentation</p>
    <p style="font-size: 11pt; line-height: 2;">
      <strong>Version:</strong> 1.0<br/>
      <strong>Date:</strong> September 3, 2026<br/>
      <strong>Application:</strong> CNC Estimator / Manufacturing Cost Estimation Platform<br/>
      <strong>Repository:</strong> github.com/datapunchman/Billet-Flow
    </p>
  </div>
  <hr style="page-break-after: always;"/>

  ${htmlContent}
</body>
</html>
  `;

  // Convert HTML to DOCX
  const docx = HTMLtoDOCX(styledHtml, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
  });

  // Write DOCX file
  const docxPath = 'Billet-Flow-Technical-Architecture.docx';
  await fs.writeFile(docxPath, docx, 'binary');

  console.log('✓ DOCX generated:', docxPath);

  // Get file size
  const stats = await fs.stat(docxPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`DOCX file size: ${fileSizeMB} MB`);

  console.log('\n✅ DOCX generation complete!');
}

generateDocxDocument().catch(error => {
  console.error('Error generating DOCX:', error);
  process.exit(1);
});
