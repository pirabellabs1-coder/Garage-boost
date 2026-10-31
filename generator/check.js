// =====================================================================
// Garage Boost — Contrôle qualité avant mise en ligne (npm run check)
// Lecture seule : ne régénère rien, ne modifie aucun fichier. Échoue
// (code 1) si une règle bloquante est violée. Lancé par le hook
// pre-push (.githooks/pre-push) et par la CI GitHub (.github/workflows).
//   1. Syntaxe JS (site, fonction /api, générateur)
//   2. vercel.json : JSON valide, redirections sans doublon ni chaîne
//   3. JSON-LD valide sur toutes les pages
//   4. Liens et ressources internes : aucun lien cassé, aucun « .html »
//   5. Légal : jamais « suppression AdBlue/FAP/EGR » en titre, meta ou H1
//   6. Unicité des pages service × ville (< 25 %)
// =====================================================================
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const rel = f => path.relative(ROOT, f).replace(/\\/g, '/');

const results = [];
function gate(name, fn) {
  const t = Date.now();
  let errors;
  try { errors = fn() || []; } catch (e) { errors = [e.message]; }
  results.push({ name, errors });
  console.log(`${errors.length ? '✗' : '✓'} ${name} (${Date.now() - t} ms)`);
  errors.slice(0, 15).forEach(e => console.log(`    ${e}`));
  if (errors.length > 15) console.log(`    … et ${errors.length - 15} autre(s)`);
}

function walk(dir, ext, skip, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.includes(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, ext, skip, acc);
    else if (e.name.endsWith(ext)) acc.push(f);
  }
  return acc;
}
const HTML = walk(ROOT, '.html', ['generator', 'node_modules', '.git', 'assets', 'api']);
const pages = HTML.map(f => ({ f, html: fs.readFileSync(f, 'utf8') }));

// 1 ------------------------------------------------------------------
gate('Syntaxe JavaScript', () => {
  const files = [
    ...walk(path.join(ROOT, 'assets/js'), '.js', []),
    ...walk(path.join(ROOT, 'api'), '.js', []),
    ...walk(__dirname, '.js', ['node_modules', 'fa-source']),
  ];
  // Compilation sans exécution, dans l'enveloppe CommonJS (comme node --check, sans un processus par fichier)
  const vm = require('vm');
  return files.flatMap(f => {
    const src = fs.readFileSync(f, 'utf8').replace(/^#!.*/, '');
    if (/^\s*(import|export)\s/m.test(src)) { // module ES (api/form.js) : node --check
      const r = spawnSync(process.execPath, ['--input-type=module', '--check'], { input: src, encoding: 'utf8' });
      return r.status === 0 ? [] : [`${rel(f)} : ${(r.stderr.split('\n').find(l => /Error/.test(l)) || 'erreur de syntaxe').trim()}`];
    }
    try { new vm.Script(`(function (exports, require, module, __filename, __dirname) {${src}\n})`, { filename: f }); return []; }
    catch (e) { return [`${rel(f)} : ${e.message}`]; }
  });
});

// 2 ------------------------------------------------------------------
let vercel = { redirects: [] };
gate('vercel.json (redirections)', () => {
  vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  const errors = [];
  const sources = new Map();
  for (const r of vercel.redirects || []) {
    if (sources.has(r.source)) errors.push(`source en double : ${r.source}`);
    sources.set(r.source, r.destination);
  }
  for (const r of vercel.redirects || []) {
    const dest = r.destination.split(/[?#]/)[0];
    if (sources.has(dest) && dest !== r.source) errors.push(`chaîne : ${r.source} → ${dest} → ${sources.get(dest)}`);
  }
  return errors;
});

// 3 ------------------------------------------------------------------
gate('JSON-LD', () => pages.flatMap(({ f, html }) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => {
    try { JSON.parse(m[1]); return []; } catch (e) { return [`${rel(f)} : ${e.message}`]; }
  })));

// 4 ------------------------------------------------------------------
gate('Liens et ressources internes', () => {
  const redirectRes = (vercel.redirects || []).map(r =>
    new RegExp('^' + r.source.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/:[a-z]+\*/gi, '.*').replace(/:[a-z]+/gi, '[^/]+') + '$', 'i'));
  const cache = new Map();
  const exists = urlPath => {
    if (cache.has(urlPath)) return cache.get(urlPath);
    const p = decodeURIComponent(urlPath).replace(/\/$/, '') || '/';
    const base = path.join(ROOT, p);
    const ok = (p === '/' && fs.existsSync(path.join(ROOT, 'index.html')))
      || (fs.existsSync(base) && fs.statSync(base).isFile())
      || fs.existsSync(base + '.html')
      || fs.existsSync(path.join(base, 'index.html'))
      || redirectRes.some(re => re.test(p));
    cache.set(urlPath, ok);
    return ok;
  };
  const errors = [];
  for (const { f, html } of pages) {
    const pageUrl = '/' + rel(f).replace(/(index)?\.html$/, '');
    const refs = [];
    for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) refs.push(m[1]);
    for (const m of html.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/g)) m[1].split(',').forEach(s => refs.push(s.trim().split(/\s+/)[0]));
    for (const raw of refs) {
      if (/^(https?:|mailto:|tel:|sms:|data:|javascript:|#|\/\/|\{)/i.test(raw)) continue;
      const clean = raw.split(/[?#]/)[0];
      if (!clean) continue;
      const abs = new URL(clean, 'https://x' + pageUrl).pathname;
      if (/\.html$/.test(abs) && !/^\/(assets|generator)\//.test(abs)) errors.push(`${rel(f)} : lien en .html (URL non canonique) → ${raw}`);
      else if (!exists(abs)) errors.push(`${rel(f)} : introuvable → ${raw}`);
    }
  }
  return errors;
});

// 5 ------------------------------------------------------------------
gate('Légal antipollution (titres, metas, H1)', () => {
  const FORBIDDEN = /suppression\s+(?:de\s+l['’]|du\s+|des\s+|d['’]|de\s+la\s+|de\s+)?(?:syst[eè]me\s+)?(?:adblue|fap|egr|filtre|vanne|scr)/i;
  const errors = [];
  for (const { f, html } of pages) {
    const zones = [
      ...[...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map(m => m[1]),
      ...[...html.matchAll(/<meta\s+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"\s+content="([^"]*)"/gi)].map(m => m[1]),
      ...[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ')),
    ];
    for (const z of zones) if (FORBIDDEN.test(z)) errors.push(`${rel(f)} : « ${z.replace(/\s+/g, ' ').trim().slice(0, 90)} »`);
  }
  return errors;
});

// 6 ------------------------------------------------------------------
gate('Unicité des pages service × ville', () => {
  const r = spawnSync(process.execPath, [path.join(__dirname, 'audit-unicite.js')], { encoding: 'utf8', cwd: ROOT });
  const summary = r.stdout.trim().split('\n').pop();
  if (r.status !== 0) return [summary || r.stderr.trim()];
  console.log(`    ${summary}`);
  return [];
});

const failed = results.filter(r => r.errors.length);
console.log(failed.length
  ? `\n✗ ${failed.length} contrôle(s) en échec sur ${results.length} — corriger avant de pousser.`
  : `\n✓ ${results.length} contrôles OK (${pages.length} pages).`);
process.exitCode = failed.length ? 1 : 0;
