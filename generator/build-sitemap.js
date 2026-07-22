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
const { servicesForCity } = require('./city-services.js');
const BASE = 'https://garageboost.fr';
const today = new Date().toISOString().split('T')[0];

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
  if (/<meta\s+name="robots"[^>]*noindex/i.test(fs.readFileSync(file, 'utf8'))) { skippedNoindex++; continue; }
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
    <lastmod>${today}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
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
