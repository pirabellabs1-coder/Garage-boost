// =====================================================================
// Garage Boost — City-hub page generator
// 19 villes principales avec contenu unique
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'city-template.html'), 'utf8');
const data = require('./data.js');
const cities = require('./cities.js');

const SERVICE_ICONS = {
  'diagnostic-moteur': 'microchip', 'decalaminage-hydrogene': 'fire-flame-curved',
  'nettoyage-fap': 'filter', 'nettoyage-catalyseur': 'circle-nodes',
  'reprogrammation-moteur': 'bolt', 'suppression-adblue': 'droplet-slash',
  'traitement-egr': 'recycle', 'voyants-moteur': 'triangle-exclamation',
  'depannage-remorquage': 'truck-pickup', 'depannage-scooter': 'motorcycle',
  'electricite-automobile': 'bolt-lightning', 'mecanique-generale': 'screwdriver-wrench',
  'ouverture-vehicule': 'key', 'reproduction-cles': 'fingerprint',
  'enlevement-epaves': 'recycle', 'carrosserie-auto': 'car-burst',
  'peinture-automobile': 'spray-can', 'pare-brise': 'square',
  'utilitaires': 'truck', 'citadines': 'car-side',
  'vans-amenages': 'campground', 'voiture-rallye': 'flag-checkered',
  'vehicules-occasion': 'handshake'
};

const IMAGES = [
  'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'
];

function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : ''
  );
}

function buildServiceCard(categorySlug, serviceSlug, service, zoneSlug) {
  const icon = SERVICE_ICONS[serviceSlug] || 'cog';
  // Lien vers la page locale du zone correspondante
  const href = `../${categorySlug}/${serviceSlug}/${zoneSlug}.html`;
  return `
    <article class="service-card">
      <div class="service-icon"><i class="fa-solid fa-${icon}"></i></div>
      <h3 class="service-title">${service.name}</h3>
      <p class="service-desc">${service.lead.substring(0, 130)}...</p>
      <a href="${href}" class="service-link">Voir le service <i class="fa-solid fa-arrow-right"></i></a>
    </article>
  `;
}

function buildCategoryCards(categorySlug, zoneSlug) {
  const cat = data.categories[categorySlug];
  if (!cat) return '';
  return Object.entries(cat.services)
    .map(([slug, s]) => buildServiceCard(categorySlug, slug, s, zoneSlug))
    .join('\n');
}

function findService(slug) {
  for (const [catSlug, cat] of Object.entries(data.categories)) {
    if (cat.services[slug]) return { categorySlug: catSlug, service: cat.services[slug] };
  }
  return null;
}

function buildTopServicesList(topServices, cityName, zoneSlug) {
  return topServices.map(slug => {
    const r = findService(slug);
    if (!r) return '';
    const href = `../${r.categorySlug}/${slug}/${zoneSlug}.html`;
    return `<li><a href="${href}" style="color:var(--accent)"><strong>${r.service.name} ${cityName}</strong></a> — ${r.service.lead.substring(0, 110)}...</li>`;
  }).join('\n');
}

function buildOtherCities(currentSlug) {
  return cities.filter(c => c.slug !== currentSlug).map(c =>
    `<a class="zone-pill" href="${c.slug}.html"><i class="fa-solid fa-location-dot"></i> Garage ${c.name}</a>`
  ).join('\n');
}

function countWords(html) {
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '')
                   .replace(/<style[\s\S]*?<\/style>/g, '')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
  return text.split(/\s+/).filter(Boolean).length;
}

const outDir = path.join(ROOT, 'villes');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let generated = 0;
const summary = [];

for (const city of cities) {
  const lead = `Garage Boost intervient à ${city.name} (${city.population}, ${city.distance} de notre atelier de Plan-de-Cuques). Mécanique, reprogrammation, carrosserie, dépannage, location — toutes nos prestations sont disponibles pour les habitants de ${city.name} et environs.`;

  const topServicesIntro = `Au cours des dernières années, certaines prestations sont régulièrement demandées par notre clientèle de ${city.name} en raison du contexte automobile local. Voici les services les plus sollicités :`;

  const html = render(TEMPLATE, {
    slug: city.slug,
    cityName: city.name,
    population: city.population,
    distance: city.distance,
    travelTime: city.travelTime,
    intro: city.intro,
    localContext: city.localContext,
    accessInfo: city.accessInfo,
    trafficNote: city.trafficNote,
    nearbyDistricts: city.nearbyDistricts.join(', '),
    title: `Garage automobile ${city.name} | Garage Boost — Mécanique, carrosserie, dépannage`,
    metaDesc: `Garage Boost à votre service à ${city.name} (${city.population}). Mécanique, reprogrammation, FAP, carrosserie, dépannage, location. ${city.distance} de Plan-de-Cuques. Devis sous 24h.`,
    keywords: `garage ${city.name}, garage automobile ${city.name}, mécanicien ${city.name}, carrosserie ${city.name}, dépannage ${city.name}`,
    lead,
    image1: IMAGES[0],
    image2: IMAGES[1],
    topServicesIntro,
    topServicesListHTML: buildTopServicesList(city.topServices, city.name, city.zoneSlug),
    categoryMoteurHTML: buildCategoryCards('maintenance-moteur', city.zoneSlug),
    categoryEntretienHTML: buildCategoryCards('entretien-assistance', city.zoneSlug),
    categoryCarrosserieHTML: buildCategoryCards('carrosserie', city.zoneSlug),
    categoryLocationHTML: buildCategoryCards('location', city.zoneSlug),
    otherCitiesHTML: buildOtherCities(city.slug)
  });

  const outFile = path.join(outDir, `${city.slug}.html`);
  fs.writeFileSync(outFile, html);
  const words = countWords(html);
  summary.push({ file: `villes/${city.slug}.html`, words });
  generated++;
  console.log(`  ✓ villes/${city.slug}.html  (${words} mots)`);
}

console.log(`\nDone — ${generated} pages ville-hub générées.`);
const avg = Math.round(summary.reduce((a, b) => a + b.words, 0) / summary.length);
console.log(`Moyenne mots/page : ${avg}`);
const tooShort = summary.filter(s => s.words < 3000);
if (tooShort.length) {
  console.log(`\n⚠️  ${tooShort.length} page(s) sous 3000 mots`);
  tooShort.forEach(s => console.log(`     ${s.file} (${s.words})`));
}
