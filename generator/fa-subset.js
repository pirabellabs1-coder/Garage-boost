// =====================================================================
// Garage Boost — Font Awesome réduit aux icônes réellement utilisées
// Le jeu complet (CSS 100 Ko + polices 270 Ko) bloquait l'affichage des
// icônes ~3 s sur mobile. On lit les classes fa-* présentes dans le HTML
// et main.js, on garde uniquement leurs règles CSS et leurs glyphes.
// Sources complètes : generator/fa-source/ (ne jamais les supprimer).
// Sortie : assets/fa/css/icons.css + assets/fa/webfonts/fa-*-{hash}.woff2
// (nom haché : le CDN cache les polices 1 an, un nouveau jeu = nouvelle URL).
// Ne refait le sous-ensemble que si la liste d'icônes change ; nécessite
// alors `npm i --no-save subset-font`.
// =====================================================================
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(__dirname, 'fa-source');
const OUT_CSS = path.join(ROOT, 'assets/fa/css/icons.css');
const OUT_FONTS = path.join(ROOT, 'assets/fa/webfonts');

function listFiles(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'generator', 'fa', 'fonts', 'img'].includes(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) listFiles(f, acc);
    else if (/\.(html|js)$/.test(e.name)) acc.push(f);
  }
  return acc;
}

// Classes fa-* utilisées (sur-inclusion sans risque : un nom inconnu est ignoré)
const used = new Set();
for (const f of listFiles(ROOT)) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/\bfa-[a-z0-9-]+/g)) used.add(m[0]);
}

const css = fs.readFileSync(path.join(SRC, 'all.min.css'), 'utf8');
const codepoints = new Set();
let subset = css.replace(/(?<=^|\})([^{}@]+?)\{content:"\\([0-9a-f]+)"\}/g, (all, selectors, cp) => {
  const names = selectors.split(',').map(s => s.trim().replace(/:+before$/, '').replace(/^\./, ''));
  if (!names.some(n => used.has(n))) return '';
  codepoints.add(parseInt(cp, 16));
  return all;
});
const key = [...codepoints].sort((a, b) => a - b).join(',');
// Signature : icônes utilisées + version des sources (une mise à jour de Font Awesome refait le sous-ensemble)
const srcHash = crypto.createHash('md5');
for (const s of ['all.min.css', 'fa-solid-900.woff2', 'fa-brands-400.woff2']) srcHash.update(fs.readFileSync(path.join(SRC, s)));
const sig = crypto.createHash('md5').update(key + srcHash.digest('hex')).digest('hex').slice(0, 8);

if (fs.existsSync(OUT_CSS) && fs.readFileSync(OUT_CSS, 'utf8').includes(`/* icons:${sig} */`)) {
  console.log(`✓ Font Awesome : ${codepoints.size} icônes, sous-ensemble à jour (${sig})`);
  process.exit(0);
}

let subsetFont;
try { subsetFont = require('subset-font'); } catch {
  console.error('✗ Font Awesome : la liste d\'icônes a changé. Lancer `npm i --no-save subset-font` puis relancer le build.');
  process.exit(1);
}

(async () => {
  const text = String.fromCodePoint(...codepoints);
  fs.mkdirSync(OUT_FONTS, { recursive: true });
  for (const f of fs.readdirSync(OUT_FONTS)) if (/^fa-(solid|brands)-[0-9a-f]{8}\.woff2$/.test(f)) fs.unlinkSync(path.join(OUT_FONTS, f));
  const files = {};
  for (const [kind, src] of [['solid', 'fa-solid-900.woff2'], ['brands', 'fa-brands-400.woff2']]) {
    const buf = await subsetFont(fs.readFileSync(path.join(SRC, src)), text, { targetFormat: 'woff2' });
    const name = `fa-${kind}-${crypto.createHash('md5').update(buf).digest('hex').slice(0, 8)}.woff2`;
    fs.writeFileSync(path.join(OUT_FONTS, name), buf);
    files[kind] = { name, size: buf.length };
  }
  // Seules les familles solid et brands servent ; on retire regular / v4 / ttf
  subset = subset.replace(/@font-face\{[^}]*\}/g, rule => {
    if (/fa-regular-400|fa-v4compatibility/.test(rule)) return '';
    const kind = rule.includes('fa-brands-400') ? 'brands' : 'solid';
    return rule.replace(/src:[^;}]+/, `src:url(../webfonts/${files[kind].name}) format("woff2")`);
  });
  fs.writeFileSync(OUT_CSS, `/* icons:${sig} */\n${subset}`);
  console.log(`✓ Font Awesome : ${codepoints.size} icônes — CSS ${(subset.length / 1024).toFixed(1)} Ko, solid ${(files.solid.size / 1024).toFixed(1)} Ko, brands ${(files.brands.size / 1024).toFixed(1)} Ko`);
})().catch(e => { console.error('✗ Font Awesome :', e.message); process.exit(1); });
