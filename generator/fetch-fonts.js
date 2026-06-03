// =====================================================================
// Garage Boost — Télécharge les polices Google (woff2, sous-ensemble latin)
// pour auto-hébergement (perf + RGPD). Run: node generator/fetch-fonts.js
// =====================================================================
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT = path.resolve(__dirname, '..', 'assets', 'fonts');
fs.mkdirSync(OUT, { recursive: true });

const FAMILIES = [
  { name: 'Poppins', weights: [400, 500, 600, 700] },
  { name: 'Roboto', weights: [700, 800, 900] },
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
}

(async () => {
  const famParam = FAMILIES.map(f => `family=${f.name}:wght@${f.weights.join(';')}`).join('&');
  const cssUrl = `https://fonts.googleapis.com/css2?${famParam}&display=swap`;
  const css = (await get(cssUrl)).body.toString('utf8');

  const blocks = css.split('@font-face').slice(1);
  const faces = [];
  for (const b of blocks) {
    const fam = (b.match(/font-family:\s*'([^']+)'/) || [])[1];
    const wt = (b.match(/font-weight:\s*(\d+)/) || [])[1];
    const ur = (b.match(/unicode-range:\s*([^;]+)/) || [])[1] || '';
    const url = (b.match(/src:\s*url\(([^)]+)\)\s*format\('woff2'\)/) || [])[1];
    const isLatin = ur.includes('U+0000-00FF'); // bloc latin (couvre accents français + €)
    if (fam && wt && url && isLatin) faces.push({ fam, wt, url });
  }

  const cssOut = [];
  let total = 0;
  for (const f of faces) {
    const file = `${f.fam.toLowerCase()}-${f.wt}.woff2`;
    const data = (await get(f.url)).body;
    fs.writeFileSync(path.join(OUT, file), data);
    total += data.length;
    console.log(`  ✓ ${file}  (${(data.length / 1024).toFixed(1)} Ko)`);
    cssOut.push(`@font-face{font-family:'${f.fam}';font-style:normal;font-weight:${f.wt};font-display:swap;src:url('/assets/fonts/${file}') format('woff2');}`);
  }
  fs.writeFileSync(path.join(__dirname, '_fontface.css'), cssOut.join('\n') + '\n');
  console.log(`\n${faces.length} polices, ${(total / 1024).toFixed(0)} Ko au total. @font-face -> generator/_fontface.css`);
})().catch(e => { console.error('ERREUR:', e.message); process.exit(1); });
