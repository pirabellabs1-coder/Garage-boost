// =====================================================================
// Garage Boost — Synchronise vercel.json avec les pages générées
// Une page service × ville remise en ligne (contenu unique ajouté dans
// city-service-content/) avait une redirection 301 posée lors de l'élagage
// du 2026-10-11. Sur Vercel, les redirections passent AVANT les fichiers :
// sans ce nettoyage, la page restaurée resterait invisible (toujours 308).
// On retire donc toute redirection /{catégorie}/{service}/{slug}(.html)
// dont la page existe désormais, puis on contrôle : 0 chaîne, 0 cible absente.
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const data = require('./data.js');

const FILE = path.join(ROOT, 'vercel.json');
const v = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const cats = new Set(Object.keys(data.categories));

const pageExists = p => {
  const clean = p.replace(/\.html$/, '');
  return fs.existsSync(path.join(ROOT, clean + '.html'));
};

// 1) Pages zone fusionnées (une commune nommée a désormais sa page pour ce
//    service, cf. zoneMergeTarget) : supprimer le fichier périmé + 301.
const zones = require('./zones.js');
const { zoneMergeTarget } = require('./city-services.js');
let merged = 0;
const have = new Set(v.redirects.map(r => r.source));
for (const [cat, c] of Object.entries(data.categories)) {
  for (const svc of Object.keys(c.services)) {
    for (const z of zones) {
      const t = zoneMergeTarget(svc, z.slug);
      if (!t) continue;
      const file = path.join(ROOT, cat, svc, z.slug + '.html');
      if (fs.existsSync(file)) { fs.unlinkSync(file); merged++; }
      const dest = `/${cat}/${svc}/${t}`;
      for (const src of [`/${cat}/${svc}/${z.slug}`, `/${cat}/${svc}/${z.slug}.html`]) {
        const existing = v.redirects.find(r => r.source === src);
        if (!existing) { v.redirects.push({ source: src, destination: dest, permanent: true }); have.add(src); merged++; }
        else if (existing.destination !== dest) { existing.destination = dest; merged++; } // la cible de fusion a changé
      }
    }
  }
}

// 2) Retirer les redirections dont la page existe de nouveau (pages restaurées).
//    AVANT l'aplatissement : sinon une 301 pointant vers une page restaurée
//    serait « aplatie » vers l'ancienne cible, puis corrigée au build suivant.
const before = v.redirects.length;
v.redirects = v.redirects.filter(r => {
  const m = r.source.match(/^\/([^/]+)\/([^/]+)\/([^/]+?)(\.html)?$/);
  if (!m || !cats.has(m[1])) return true;
  return !pageExists(r.source);
});
const removed = before - v.redirects.length;

// 3) Aplatir les chaînes (A -> B -> C devient A -> C)
{
  const map = new Map(v.redirects.map(r => [r.source, r.destination]));
  for (const r of v.redirects) {
    let d = r.destination, hops = 0;
    while (map.has(d) && hops++ < 5) d = map.get(d);
    if (d !== r.destination) { r.destination = d; merged++; }
  }
}

const sources = new Set(v.redirects.map(r => r.source));
const chains = v.redirects.filter(r => sources.has(r.destination));
const missing = v.redirects.filter(r => r.destination.startsWith('/') && r.destination !== '/' && !r.destination.includes(':') &&
  !pageExists(r.destination) && !fs.existsSync(path.join(ROOT, r.destination)));
if (chains.length || missing.length) {
  console.error(chains.map(r => `chaîne : ${r.source} -> ${r.destination}`).concat(missing.map(r => `cible absente : ${r.source} -> ${r.destination}`)).slice(0, 20).join('\n'));
  throw new Error(`vercel.json : ${chains.length} chaîne(s), ${missing.length} cible(s) absente(s)`);
}
if (removed || merged) fs.writeFileSync(FILE, JSON.stringify(v, null, 2) + '\n');
console.log(`✓ vercel.json : ${removed} redirection(s) retirée(s) (pages restaurées) · ${merged} opération(s) de fusion zone · ${v.redirects.length} au total · 0 chaîne`);
