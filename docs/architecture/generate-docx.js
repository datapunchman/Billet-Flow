const fs = require('fs').promises;
const { marked } = require('marked');
const htmlDocx = require('html-docx-js');

async function generateDocxDocument() {
  console.log('Starting DOCX generation...');

  const markdownContent = await fs.readFile('COMPLETE_ARCHITECTURE.md', 'utf-8');
  const htmlContent = marked.parse(markdownContent);

  const styledHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; }
    h1 { font-size: 24pt; font-weight: bold; color: #1e293b; margin-top: 24pt; border-bottom: 3pt solid #f97316; }
    h2 { font-size: 18pt; font-weight: bold; color: #1e293b; margin-top: 18pt; border-bottom: 2pt solid #e2e8f0; }
    h3 { font-size: 14pt; font-weight: bold; color: #334155; margin-top: 14pt; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 12pt; }
    th { background-color: #f97316; color: white; padding: 8pt; }
    td { padding: 6pt 8pt; border: 1pt solid #e2e8f0; }
    code { font-family: Consolas, monospace; font-size: 9pt; }
    pre { font-family: Consolas, monospace; font-size: 9pt; padding: 12pt; }
  </style>
</head>
<body>
  <div style="text-align: center; margin-bottom: 48pt;">
    <h1 style="border: none; font-size: 28pt;">Billet Flow</h1>
    <p style="font-size: 16pt;">Complete Technical Architecture Documentation</p>
    <p><strong>Version:</strong> 1.0<br/><strong>Date:</strong> September 3, 2026</p>
  </div>
  ${htmlContent}
</body>
</html>`;

  const docx = htmlDocx.asBlob(styledHtml);
  const buffer = Buffer.from(await docx.arrayBuffer());
  await fs.writeFile('Billet-Flow-Technical-Architecture.docx', buffer);
  
  const stats = await fs.stat('Billet-Flow-Technical-Architecture.docx');
  console.log('✓ DOCX generated: Billet-Flow-Technical-Architecture.docx');
  console.log('File size:', (stats.size / (1024 * 1024)).toFixed(2), 'MB');
  console.log('\n✅ All documentation formats complete!');
}

generateDocxDocument().catch(console.error);
