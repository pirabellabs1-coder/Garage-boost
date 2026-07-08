// =====================================================================
// Garage Boost — Cache-busting CSS/JS
// Le CDN (Cloudflare) met style.css / main.js en cache "immutable" 1 an.
// Sans versionnage, les mises à jour CSS/JS ne sont jamais servies.
// On ajoute ?v={hash-contenu} : l'URL change quand le fichier change,
// donc le CDN et les navigateurs re-téléchargent la nouvelle version.
// Le hash ne bouge QUE si le contenu change (busting propre).
// =====================================================================
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');

function hashFile(rel) {
  try {
    return crypto.createHash('md5').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex').slice(0, 8);
  } catch { return null; }
}

const cssV = hashFile('assets/css/style.css');
const jsV = hashFile('assets/js/main.js');

function listHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['generator', 'node_modules', '.git', 'assets'].includes(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) listHtml(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

const files = listHtml(ROOT);
let changed = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  let h = before;
  if (cssV) h = h.replace(/assets\/css\/style\.css(\?v=[a-z0-9]+)?/g, `assets/css/style.css?v=${cssV}`);
  if (jsV) h = h.replace(/assets\/js\/main\.js(\?v=[a-z0-9]+)?/g, `assets/js/main.js?v=${jsV}`);
  if (h !== before) { fs.writeFileSync(f, h); changed++; }
}
console.log(`✓ Cache-busting : style.css?v=${cssV} · main.js?v=${jsV} — ${changed} fichiers`);
