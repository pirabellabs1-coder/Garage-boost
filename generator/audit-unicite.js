// =====================================================================
// Garage Boost — Contrôle d'unicité des pages service × ville à contenu
// unique (city-service-content/). Pour chaque page : similarité de Jaccard
// (shingles de 8 mots, texte entre <!-- HERO --> et <footer) avec
//   - les autres pages du MÊME service (toutes communes, zones et villes)
//   - les autres pages service × ville de la MÊME commune
// Échec (code 1) si une page dépasse le seuil (25 % par défaut).
// Usage : node generator/audit-unicite.js [seuil%]
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const data = require('./data.js');
const cities = require('./cities.js');
const { getUniqueContent } = require('./city-service-content');

const THRESHOLD = (parseFloat(process.argv[2]) || 25) / 100;
const K = 8;

function bodyText(file) {
  const h = fs.readFileSync(file, 'utf8');
  const a = h.indexOf('<!-- HERO -->');
  const b = h.indexOf('<footer');
  return h.slice(a < 0 ? 0 : a, b < 0 ? h.length : b)
    .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&[#\w]+;/g, ' ')
    .toLowerCase().replace(/[^a-zà-ÿ0-9' ]+/gi, ' ').replace(/\s+/g, ' ').trim();
}
function shingles(t) {
  const w = t.split(' ');
  const s = new Set();
  for (let i = 0; i + K <= w.length; i++) s.add(w.slice(i, i + K).join(' '));
  return s;
}
function jaccard(a, b) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

const cache = new Map();
const sh = f => { if (!cache.has(f)) cache.set(f, shingles(bodyText(f))); return cache.get(f); };

const catOf = {};
for (const [cat, c] of Object.entries(data.categories)) for (const s of Object.keys(c.services)) catOf[s] = cat;

const targets = [];
for (const city of cities) for (const svc of new Set(city.topServices || [])) {
  if (!getUniqueContent(city.slug, svc)) continue;
  const f = path.join(ROOT, catOf[svc], svc, city.slug + '.html');
  if (fs.existsSync(f)) targets.push({ city, svc, f });
}

let fails = 0;
const rows = [];
for (const t of targets) {
  const dir = path.dirname(t.f);
  const sameService = fs.readdirSync(dir).filter(x => x.endsWith('.html')).map(x => path.join(dir, x)).filter(x => x !== t.f);
  const sameCity = Object.entries(catOf).map(([s, cat]) => path.join(ROOT, cat, s, t.city.slug + '.html'))
    .filter(x => x !== t.f && fs.existsSync(x));
  let worst = 0, worstWith = '';
  for (const o of [...sameService, ...sameCity]) {
    const j = jaccard(sh(t.f), sh(o));
    if (j > worst) { worst = j; worstWith = path.relative(ROOT, o); }
  }
  if (worst > THRESHOLD) fails++;
  rows.push({ page: path.relative(ROOT, t.f), worst, worstWith });
}
rows.sort((a, b) => b.worst - a.worst);
for (const r of rows.slice(0, 15)) console.log(`${(r.worst * 100).toFixed(1).padStart(5)} %  ${r.page}  ↔  ${r.worstWith}`);
const avg = rows.length ? rows.reduce((a, r) => a + r.worst, 0) / rows.length : 0;
console.log(`\n${rows.length} page(s) à contenu unique · pire moyenne ${(avg * 100).toFixed(1)} % · ${fails} au-dessus de ${THRESHOLD * 100} %`);
if (fails) process.exitCode = 1;
