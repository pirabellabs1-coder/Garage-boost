// =====================================================================
// Garage Boost — Normalisation URLs propres (sans .html)
// Vercel cleanUrls:true sert /villes/x (200) et redirige /villes/x.html (308).
// Pour éviter sitemap/canonical/liens pointant vers des URLs en redirection,
// on aligne TOUTES les URLs internes sur la version propre (sans .html).
// Couvre : <a href>, canonical, og:url, et JSON-LD (url/@id/item).
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function listHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['generator', 'node_modules', '.git', 'assets'].includes(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) listHtml(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

function clean(s) {
  // liens internes vers l'accueil -> "/"
  s = s.replace(/href="(?:\.\.\/)*index\.html"/g, 'href="/"');
  // liens internes relatifs / root-relatifs : retire .html (conserve #ancre et ?query)
  s = s.replace(/href="((?:\.\.?\/)*[A-Za-z0-9\-_/]+)\.html((?:#|\?)[^"]*)?"/g, 'href="$1$2"');
  // URL absolue interne vers l'accueil
  s = s.replace(/https:\/\/garageboost\.fr\/index\.html/g, 'https://garageboost.fr/');
  // URL absolue interne (canonical, og:url, JSON-LD url/@id/item) : retire .html
  s = s.replace(/(https:\/\/garageboost\.fr\/[A-Za-z0-9\-_/]+)\.html/g, '$1');
  return s;
}

const files = listHtml(ROOT);
let changed = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  const after = clean(before);
  if (after !== before) { fs.writeFileSync(f, after); changed++; }
}
console.log(`✓ URLs normalisées (sans .html) — ${changed}/${files.length} fichiers traités`);
