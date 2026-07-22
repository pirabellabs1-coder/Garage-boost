// =====================================================================
// Garage Boost — Balises de vérification moteurs de recherche
// =====================================================================
// Injecte les balises de vérification dans le <head> de TOUTES les pages
// (statiques ET générées). Idempotent : relançable sans créer de doublon.
//
// Google : vérifié par enregistrement DNS TXT
//          (google-site-verification=9dhiHpMGZ_OykgnEwLionFFGRLyhWjucSKekg7JQTmU)
//          → aucune balise HTML nécessaire, la validation DNS couvre le domaine
//            entier et survit à toute refonte du site.
// Bing   : vérifié par balise meta (ci-dessous).
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['generator', 'node_modules', '.git', 'assets', 'api', '.vercel']);

const METAS = [
  '<meta name="msvalidate.01" content="EB6FCB92F9E0D2E3264DE2FFBE2EEA94">',
];

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const files = walk(ROOT);
let patched = 0;
let already = 0;
let skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const meta of METAS) {
    const name = meta.match(/name="([^"]+)"/)[1];
    const present = new RegExp(`<meta\\s+name="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i');
    if (present.test(html)) continue;

    // Insertion juste après <meta charset...>, au tout début du <head>
    if (/<meta charset="[^"]*">/i.test(html)) {
      html = html.replace(/(<meta charset="[^"]*">)/i, `$1\n${meta}`);
      changed = true;
    } else if (/<head[^>]*>/i.test(html)) {
      html = html.replace(/(<head[^>]*>)/i, `$1\n${meta}`);
      changed = true;
    }
  }

  if (changed) { fs.writeFileSync(file, html); patched++; }
  else if (METAS.every(m => new RegExp(`name="${m.match(/name="([^"]+)"/)[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i').test(html))) already++;
  else skipped++;
}

console.log(`✓ balises de vérification : ${patched} page(s) mise(s) à jour, ${already} déjà OK` + (skipped ? `, ${skipped} sans <head> exploitable` : ''));
if (skipped) console.warn(`  ⚠ ${skipped} page(s) sans point d'insertion — à vérifier`);
