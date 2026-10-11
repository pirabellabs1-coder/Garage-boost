// =====================================================================
// Garage Boost — Sitemap.xml generator
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const data = require('./data.js');
const zones = require('./zones.js');
const cities = require('./cities.js');
const articles = require('./articles.js');
const { servicesForCity, zoneMergeTarget } = require('./city-services.js');
const BASE = 'https://garageboost.fr';
const crypto = require('crypto');
const today = new Date().toISOString().split('T')[0];

// lastmod véridique : on mémorise une empreinte du contenu de chaque page
// (generator/lastmod.json, versionné). La date n'avance que si la page a
// réellement changé — un lastmod = date du build sur 600 URL est ignoré
// par Google.
const LASTMOD_FILE = path.join(__dirname, 'lastmod.json');
const lastmodDb = fs.existsSync(LASTMOD_FILE) ? JSON.parse(fs.readFileSync(LASTMOD_FILE, 'utf8')) : {};
function pageFingerprint(html) {
  return crypto.createHash('sha1').update(
    html.replace(/\?v=[0-9a-f]+/g, '').replace(/\s+/g, ' ')
  ).digest('hex').slice(0, 16);
}
function lastmodFor(loc, html) {
  const fp = pageFingerprint(html);
  const prev = lastmodDb[loc];
  if (!prev || prev.fp !== fp) lastmodDb[loc] = { fp, date: today };
  return lastmodDb[loc].date;
}

const urls = [];

// Pages principales
// (mentions-legales et politique-confidentialite sont en noindex : hors sitemap)
['', 'tarifs', 'rendez-vous', 'contact', 'faq', 'blog', 'villes']
  .forEach(slug => urls.push({ loc: `${BASE}/${slug || ''}`, priority: slug === '' ? '1.0' : '0.7' }));

// Pages villes-hub
cities.forEach(c => urls.push({ loc: `${BASE}/villes/${c.slug}`, priority: '0.8' }));

// Articles blog
articles.forEach(a => urls.push({ loc: `${BASE}/blog/${a.slug}`, priority: '0.7' }));

// Pages catégories
['maintenance-moteur', 'entretien-assistance', 'carrosserie', 'location']
  .forEach(slug => urls.push({ loc: `${BASE}/${slug}`, priority: '0.9' }));

// Pages services
for (const [catSlug, cat] of Object.entries(data.categories)) {
  for (const serviceSlug of Object.keys(cat.services)) {
    urls.push({ loc: `${BASE}/${catSlug}/${serviceSlug}`, priority: '0.8' });

    // Pages SEO locales (service × zone)
    for (const zone of zones) {
      if (zoneMergeTarget(serviceSlug, zone.slug)) continue;
      urls.push({ loc: `${BASE}/${catSlug}/${serviceSlug}/${zone.slug}`, priority: '0.6' });
    }
  }
}

// Pages service × ville (topServices de chaque commune)
const zoneSlugSet = new Set(zones.map(z => z.slug));
cities.forEach(c => {
  if (zoneSlugSet.has(c.slug)) return; // collision (salon-de-provence) déjà couverte par la zone
  servicesForCity(c).forEach(sSlug => {
    for (const [catSlug, cat] of Object.entries(data.categories)) {
      if (cat.services[sSlug]) { urls.push({ loc: `${BASE}/${catSlug}/${sSlug}/${c.slug}`, priority: '0.6' }); break; }
    }
  });
});

// Filet de sécurité : une URL en noindex ne doit JAMAIS figurer dans le sitemap
// (contradiction qui déclenche des avertissements dans Search Console).
const kept = [];
let skippedNoindex = 0, missing = 0;
for (const u of urls) {
  const rel = u.loc.replace(`${BASE}/`, '').replace(/\/$/, '');
  const file = path.join(ROOT, (rel === '' ? 'index' : rel) + '.html');
  if (!fs.existsSync(file)) { missing++; console.warn(`  ⚠ sitemap : fichier introuvable pour ${u.loc}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  if (/<meta\s+name="robots"[^>]*noindex/i.test(html)) { skippedNoindex++; continue; }
  u.lastmod = lastmodFor(u.loc, html);
  kept.push(u);
}
urls.length = 0;
urls.push(...kept);
if (skippedNoindex) console.log(`  ↳ ${skippedNoindex} URL(s) en noindex exclue(s) du sitemap`);
if (missing) console.log(`  ↳ ${missing} URL(s) sans fichier exclue(s) du sitemap`);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
// On ne garde que les URL encore présentes (pages supprimées = purgées)
const keptLocs = new Set(urls.map(u => u.loc));
for (const k of Object.keys(lastmodDb)) if (!keptLocs.has(k)) delete lastmodDb[k];
fs.writeFileSync(LASTMOD_FILE, JSON.stringify(lastmodDb, null, 0).replace(/},"/g, '},\n"'));
console.log(`✓ sitemap.xml généré (${urls.length} URLs)`);

// robots.txt — autorise tout, expose sitemap + llms.txt pour les IAs
const robots = `User-agent: *
Allow: /
Disallow: /generator/
Disallow: /.well-known/
Disallow: /404.html

# Sitemap principal pour les moteurs de recherche
Sitemap: ${BASE}/sitemap.xml

# Index pour les LLMs (ChatGPT, Claude, Perplexity, Gemini)
# Suit la convention llms.txt — voir https://llmstxt.org/

# Bots IAs explicitement autorisés
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: MistralAI-User
Allow: /

User-agent: YouBot
Allow: /
`;
fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots);
console.log(`✓ robots.txt généré`);
