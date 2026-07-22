// =====================================================================
// Garage Boost — Audit de maillage interne (profondeur + liens entrants)
// =====================================================================
// Construit le graphe des liens internes à partir de l'accueil et calcule,
// pour chaque page indexable :
//   - la profondeur de clic depuis l'accueil (BFS)
//   - le nombre de pages distinctes qui pointent vers elle
// Ce sont les deux signaux qui pilotent le budget d'exploration de Google.
// Usage : node generator/audit-maillage.js
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['generator', 'node_modules', '.git', 'assets', 'api', '.vercel']);

// --- Inventaire des pages indexables ---------------------------------
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const toKey = f => {
  const rel = path.relative(ROOT, f).split(path.sep).join('/').replace(/\.html$/, '');
  return rel === 'index' ? '' : rel;
};

const pages = new Map(); // key -> { file, indexable }
for (const f of walk(ROOT)) {
  const html = fs.readFileSync(f, 'utf8');
  pages.set(toKey(f), {
    file: f,
    indexable: !/<meta\s+name="robots"[^>]*noindex/i.test(html),
  });
}

// --- Extraction des liens internes -----------------------------------
function linksOf(key) {
  const page = pages.get(key);
  if (!page) return [];
  const html = fs.readFileSync(page.file, 'utf8');
  const dir = path.dirname(page.file);
  const out = new Set();

  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    let href = m[1];
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) continue;
    href = href.split('#')[0].split('?')[0];
    if (!href) continue;

    let target;
    if (href.startsWith('/')) target = path.join(ROOT, href);
    else target = path.resolve(dir, href);

    let k = path.relative(ROOT, target).split(path.sep).join('/').replace(/\.html$/, '');
    if (k === '' || k === 'index') k = '';
    if (pages.has(k)) out.add(k);
  }
  return [...out];
}

// --- BFS depuis l'accueil + comptage des liens entrants ---------------
const depth = new Map([['', 0]]);
const inbound = new Map();
for (const k of pages.keys()) inbound.set(k, new Set());

const queue = [''];
const linkCache = new Map();
while (queue.length) {
  const cur = queue.shift();
  const targets = linkCache.get(cur) || linksOf(cur);
  linkCache.set(cur, targets);
  for (const t of targets) {
    inbound.get(t).add(cur);
    if (!depth.has(t)) { depth.set(t, depth.get(cur) + 1); queue.push(t); }
  }
}
// Liens entrants depuis les pages non atteintes par le BFS (pour être exhaustif)
for (const k of pages.keys()) {
  if (linkCache.has(k)) continue;
  for (const t of linksOf(k)) inbound.get(t).add(k);
}

// --- Rapport ----------------------------------------------------------
const idx = [...pages.entries()].filter(([, v]) => v.indexable).map(([k]) => k);

const byDepth = {};
const orphans = [];
const weak = [];
for (const k of idx) {
  const d = depth.has(k) ? depth.get(k) : 'inatteignable';
  byDepth[d] = (byDepth[d] || 0) + 1;
  const inb = inbound.get(k).size;
  if (!depth.has(k)) orphans.push(k);
  else if (inb <= 1) weak.push([k, inb, d]);
}

console.log(`\nPages indexables analysées : ${idx.length}\n`);
console.log('— Profondeur de clic depuis l’accueil —');
for (const d of Object.keys(byDepth).sort((a, b) => (a === 'inatteignable' ? 1 : b === 'inatteignable' ? -1 : a - b))) {
  const flag = d === 'inatteignable' ? '  ⚠ ORPHELINES' : d >= 4 ? '  ⚠ trop profond' : '';
  console.log(`   profondeur ${String(d).padStart(12)} : ${String(byDepth[d]).padStart(4)} page(s)${flag}`);
}

console.log(`\n— Pages orphelines (aucun chemin depuis l’accueil) : ${orphans.length}`);
orphans.slice(0, 15).forEach(o => console.log(`   - /${o}`));
if (orphans.length > 15) console.log(`   … et ${orphans.length - 15} autres`);

console.log(`\n— Pages avec 0 ou 1 lien entrant : ${weak.length}`);
weak.slice(0, 15).forEach(([k, n, d]) => console.log(`   - /${k}  (${n} lien entrant, profondeur ${d})`));
if (weak.length > 15) console.log(`   … et ${weak.length - 15} autres`);

const deep = idx.filter(k => depth.has(k) && depth.get(k) >= 4).length;
console.log(`\nRésumé : ${orphans.length} orpheline(s) · ${deep} page(s) à profondeur ≥ 4 · ${weak.length} faiblement liée(s)\n`);

// --- Ventilation par type de page -------------------------------------
// Les moyennes globales masquent les faiblesses d'un type précis :
// on segmente pour voir si une famille de pages est mal desservie.
const zoneSlugs = new Set(require('./zones.js').map(z => z.slug));

function typeOf(k) {
  if (k === '') return 'accueil';
  const parts = k.split('/');
  if (parts[0] === 'villes') return parts.length === 1 ? 'index villes' : 'page ville';
  if (parts[0] === 'blog') return parts.length === 1 ? 'index blog' : 'article blog';
  if (parts.length === 3) return zoneSlugs.has(parts[2]) ? 'service × zone' : 'service × ville';
  if (parts.length === 2) return 'service (hub)';
  if (['maintenance-moteur', 'entretien-assistance', 'carrosserie', 'location'].includes(k)) return 'catégorie (hub)';
  return 'page statique';
}

const stats = new Map();
for (const k of idx) {
  const t = typeOf(k);
  if (!stats.has(t)) stats.set(t, { n: 0, inb: [], depths: [], orph: 0, weak: 0 });
  const s = stats.get(t);
  s.n++;
  const inbN = inbound.get(k).size;
  s.inb.push(inbN);
  if (!depth.has(k)) s.orph++;
  else s.depths.push(depth.get(k));
  if (inbN <= 1) s.weak++;
}

const med = a => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

console.log('— Ventilation par type de page —');
console.log('   type                    pages   liens entrants (min/médian/max)   prof. moy.   orphelines   ≤1 lien');
for (const [t, s] of [...stats.entries()].sort((a, b) => b[1].n - a[1].n)) {
  const mn = Math.min(...s.inb), mx = Math.max(...s.inb);
  const dm = s.depths.length ? (s.depths.reduce((a, b) => a + b, 0) / s.depths.length).toFixed(1) : '—';
  const flag = s.orph > 0 ? '  ⚠' : s.weak > s.n * 0.5 ? '  ⚠ faible' : '';
  console.log(
    `   ${t.padEnd(20)} ${String(s.n).padStart(6)}   ${String(mn).padStart(6)} /${String(med(s.inb)).padStart(6)} /${String(mx).padStart(6)}        ` +
    `${String(dm).padStart(6)}   ${String(s.orph).padStart(10)}   ${String(s.weak).padStart(7)}${flag}`
  );
}
console.log('');
