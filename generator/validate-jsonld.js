// =====================================================================
// Garage Boost — Garde-fou de fin de build : tout le JSON-LD doit parser
// Les variables injectées dans les templates ne sont pas échappées en JSON
// (ex. un guillemet dans une metaDesc) : un seul caractère suffirait à
// invalider le balisage de dizaines de pages sans aucun message. On parse
// chaque bloc ld+json et on fait échouer le build en cas d'erreur.
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function listHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['generator', 'node_modules', '.git', 'assets', 'api'].includes(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) listHtml(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

const errors = [];
let blocks = 0;
for (const f of listHtml(ROOT)) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    blocks++;
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${path.relative(ROOT, f)} : ${e.message}`); }
  }
}
if (errors.length) {
  console.error(errors.slice(0, 20).join('\n'));
  throw new Error(`JSON-LD invalide sur ${errors.length} bloc(s) — build interrompu`);
}
console.log(`✓ JSON-LD : ${blocks} blocs valides`);
