// =====================================================================
// Garage Boost — Build all (services + local + sitemap)
// Run: node generator/build-all.js
// =====================================================================

console.log('\n=== 1/6 — Génération pages services ===\n');
require('./build.js');

console.log('\n=== 2/6 — Génération pages SEO locales ===\n');
require('./build-local.js');

console.log('\n=== 3/6 — Génération pages ville-hub ===\n');
require('./build-cities.js');

console.log('\n=== 4/6 — Génération page index villes ===\n');
require('./build-villes-index.js');

console.log('\n=== 5/7 — Génération articles blog ===\n');
require('./build-articles.js');

console.log('\n=== 6/7 — Génération llms-full.txt (GEO/IA) ===\n');
require('./build-llms-full.js');

console.log('\n=== 7/8 — Génération sitemap + robots ===\n');
require('./build-sitemap.js');

console.log('\n=== 8/8 — Normalisation URLs propres (sans .html) ===\n');
require('./normalize-urls.js');

console.log('\n✓ Build complet terminé.\n');
