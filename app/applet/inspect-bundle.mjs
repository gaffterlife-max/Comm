import fs from 'node:fs';

const code = fs.readFileSync('bundle.js', 'utf8');

// Find asset urls
const assetMatches = code.match(/["'`](?:\/[^"'`]*\.(?:png|jpg|jpeg|svg|webp)|assets\/[^"'`]*\.(?:png|jpg|jpeg|svg|webp))["'`]/g) || [];
console.log('Unique assets:', [...new Set(assetMatches)]);

// Find interesting string constants or sections
const keywords = ['Commission', 'Calculator', 'Portfolio', 'Terms', 'Queue', 'Slots', 'Add-on', 'Commercial', 'Sketch', 'Render', 'Bust', 'Full Body', 'Price'];
for (const kw of keywords) {
  const idx = code.indexOf(kw);
  console.log(`Keyword "${kw}" found at ${idx}`);
}
