// =====================================================================
// Garage Boost — Normalisation typographique française
// Agit UNIQUEMENT sur les nœuds de texte visibles : commentaires, <script>,
// <style>, balises et attributs (donc JSON-LD, CSS, JS, alt/title/meta) sont
// mis de côté puis restaurés intacts. Applique :
//   - points de suspension … (au lieu de ...)
//   - espace fine insécable (&#8239;) avant ; ! ?
//   - espace insécable (&nbsp;) avant :
//   - espace insécable avant € (prix)
// Idempotent (relançable sans effet cumulatif).
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// sentinelles en zone a usage prive Unicode (U+E000 / U+E001) : impossibles dans le HTML
const OPEN = String.fromCharCode(57344);
const CLOSE = String.fromCharCode(57345);

function listHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['generator', 'node_modules', '.git', 'assets'].includes(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) listHtml(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

function fixText(t) {
  t = t.replace(/\.\.\./g, '…');               // points de suspension
  t = t.replace(/ ([;!?])/g, '&#8239;$1');     // fine insécable avant ; ! ?
  t = t.replace(/ :/g, '&nbsp;:');             // insécable avant :
  t = t.replace(/(\d) ?€/g, '$1&nbsp;€');      // insécable avant € (prix)
  return t;
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function process(html) {
  const stash = [];
  const keep = m => { stash.push(m); return OPEN + (stash.length - 1) + CLOSE; };
  // proteger (ordre important) : commentaires, scripts, styles, puis balises+attributs
  html = html.replace(/<!--[\s\S]*?-->/g, keep);
  html = html.replace(/<script[\s\S]*?<\/script>/gi, keep);
  html = html.replace(/<style[\s\S]*?<\/style>/gi, keep);
  html = html.replace(/<[^>]+>/g, keep);
  // transformer uniquement les noeuds de texte visibles restants
  html = fixText(html);
  // restaurer (sentinelles uniques -> aucune collision avec les vrais nombres)
  const re = new RegExp(escapeRe(OPEN) + '(\\d+)' + escapeRe(CLOSE), 'g');
  html = html.replace(re, (_, i) => stash[+i]);
  return html;
}

const files = listHtml(ROOT);
let changed = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  const after = process(before);
  if (after !== before) { fs.writeFileSync(f, after); changed++; }
}
console.log(`✓ Typographie FR normalisée — ${changed}/${files.length} fichiers traités`);
