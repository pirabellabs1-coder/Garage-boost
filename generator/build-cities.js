// =====================================================================
// Garage Boost — City-hub page generator
// 50 communes desservies avec contenu unique
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'city-template.html'), 'utf8');
const data = require('./data.js');
const cities = require('./cities.js');
const { servicesForCity } = require('./city-services.js');

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
  '/assets/img/1486006920555-c77dcf18193c.webp',
  '/assets/img/1487754180451-c456f719a1fc.webp',
  '/assets/img/1599256872237-5dcc0fbe9668.webp',
  '/assets/img/1492144534655-ae79c964c9d7.webp',
  '/assets/img/1503376780353-7e6692767b70.webp'
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

function buildTopServicesList(topServices, cityName, citySlug) {
  return topServices.map(slug => {
    const r = findService(slug);
    if (!r) return '';
    const href = `../${r.categorySlug}/${slug}/${citySlug}.html`;
    return `<li><a href="${href}" style="color:var(--accent)"><strong>${r.service.name} ${cityName}</strong></a> — ${r.service.lead.substring(0, 110)}...</li>`;
  }).join('\n');
}

function buildOtherCities(currentSlug, currentZone) {
  // Villes de la MÊME zone (proximité géographique) + quelques grandes villes repères — ~12 max.
  // On évite le mur de 65 pastilles : on privilégie la pertinence locale et un design lisible.
  const sameZone = cities.filter(c => c.slug !== currentSlug && c.zoneSlug === currentZone);
  const majorSlugs = ['marseille', 'aix-en-provence', 'aubagne', 'vitrolles', 'salon-de-provence', 'martigues'];
  const majors = majorSlugs
    .map(s => cities.find(c => c.slug === s))
    .filter(c => c && c.slug !== currentSlug && c.zoneSlug !== currentZone);
  const seen = new Set();
  const list = [...sameZone, ...majors].filter(c => !seen.has(c.slug) && seen.add(c.slug)).slice(0, 12);
  return list.map(c =>
    `<a class="zone-pill" href="${c.slug}.html"><i class="fa-solid fa-location-dot"></i> Garage ${c.name}</a>`
  ).join('\n');
}

// FAQPage JSON-LD reflétant les 7 questions VISIBLES du template ville (texte brut, sans HTML)
function buildCityFaqSchema(city) {
  const c = city.name, d = city.distance, t = city.travelTime;
  const qa = [
    [`Vous intervenez vraiment à ${c} ?`,
     `Oui, nous accueillons régulièrement des clients de ${c} dans notre atelier de Plan-de-Cuques (situé à ${d}, soit environ ${t} de trajet). Nous proposons aussi un service de récupération à domicile pour les véhicules immobilisés ou les clients ne souhaitant pas se déplacer. Service offert au-delà de 200€ d'intervention validée, sinon facturé 49€ aller-retour.`],
    [`Combien coûtent vos prestations pour les clients de ${c} ?`,
     `Nos tarifs sont strictement identiques pour tous les clients, qu'ils habitent Plan-de-Cuques ou ${c}. Pas de tarif client de passage, pas de surcoût lié à la distance dans la zone ${c}. Consultez notre grille tarifaire complète ou demandez un devis personnalisé sous 24 heures ouvrées via notre formulaire de contact.`],
    [`Quels sont vos délais de RDV pour un client de ${c} ?`,
     `Pour un diagnostic ou une intervention standard (vidange, plaquettes, diagnostic moteur), nous proposons un créneau sous 48 à 72 heures. Pour une reprogrammation moteur ou une opération lourde (distribution, embrayage, peinture complète), comptez 5 à 10 jours d'attente. Pour le dépannage urgent, intervention sous 30 à 90 minutes selon la zone de ${c}.`],
    [`Pouvez-vous récupérer mon véhicule à mon domicile à ${c} ?`,
     `Oui, nous proposons un service de récupération à domicile dans toute la zone ${c}. Notre dépanneuse plateau intervient en journée pour acheminer votre véhicule à l'atelier, puis nous vous le ramenons une fois l'intervention terminée. Service offert pour toute prestation supérieure à 200€ d'intervention validée, sinon facturé 49€ aller-retour. Particulièrement apprécié pour les véhicules non roulants ou les clients ne souhaitant pas se déplacer.`],
    [`Travaillez-vous avec mon assurance auto ?`,
     `Oui, nous travaillons en direct avec la majorité des compagnies d'assurance auto françaises (AXA, MAAF, MMA, Macif, Allianz, Generali, Direct Assurance, Groupama, Pacifica, GMF, MAIF, etc.) pour les sinistres carrosserie, bris de glace ou catastrophes naturelles. Vous nous transmettez votre déclaration, nous nous occupons du reste — devis, expertise contradictoire, facturation directe. Aucune avance de trésorerie de votre part dans la majorité des cas.`],
    [`Puis-je payer en plusieurs fois ?`,
     `Oui, pour toute prestation supérieure à 500€, nous proposons un paiement en 3 ou 4 fois sans frais via notre partenaire de financement (Alma ou Klarna selon disponibilité), sous réserve d'éligibilité — réponse immédiate en moins de 5 minutes. Aucun supplément, pas de dossier à monter chez votre banque. Carte bancaire, espèces, virement et chèque acceptés.`],
    [`Vous travaillez sur quelles marques de véhicules ?`,
     `Toutes les marques européennes, asiatiques et américaines : Renault, Peugeot, Citroën, Volkswagen, Audi, BMW, Mercedes, Ford, Opel, Fiat, Toyota, Honda, Nissan, Hyundai, Kia, Mazda, Volvo, Skoda, Seat, Dacia, Mini, Land Rover, Jeep, Porsche et plus. Toutes motorisations (essence, diesel, hybride léger ou rechargeable). Pour l'électrique 100%, nous traitons les périphériques (climatisation, freinage, capteurs) mais renvoyons sur des spécialistes habilités haute tension pour la batterie principale.`]
  ];
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
  return `<script type="application/ld+json">\n${JSON.stringify(obj).replace(/</g, '\\u003c')}\n</script>`;
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
  const distPhrase = /sur\s*place/i.test(city.distance)
    ? 'directement sur notre commune'
    : `à ${city.distance} de notre atelier de Plan-de-Cuques`;
  const lead = `Garage Boost intervient à ${city.name}, ${distPhrase}. Mécanique, reprogrammation, carrosserie, dépannage, location — toutes nos prestations sont disponibles pour les habitants de ${city.name} et des environs.`;

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
    metaDesc: `Garage Boost à votre service à ${city.name}. Mécanique, reprogrammation, FAP, carrosserie, dépannage, location — à ${city.distance} de Plan-de-Cuques. Devis gratuit sous 24h.`,
    keywords: `garage ${city.name}, garage automobile ${city.name}, mécanicien ${city.name}, carrosserie ${city.name}, dépannage ${city.name}`,
    lead,
    image1: IMAGES[0],
    image2: IMAGES[1],
    topServicesIntro,
    // servicesForCity (et non city.topServices) : doit couvrir EXACTEMENT les
    // pages générées, sinon certaines restent orphelines et ne sont pas indexées.
    topServicesListHTML: buildTopServicesList(servicesForCity(city), city.name, city.slug),
    categoryMoteurHTML: buildCategoryCards('maintenance-moteur', city.zoneSlug),
    categoryEntretienHTML: buildCategoryCards('entretien-assistance', city.zoneSlug),
    categoryCarrosserieHTML: buildCategoryCards('carrosserie', city.zoneSlug),
    categoryLocationHTML: buildCategoryCards('location', city.zoneSlug),
    otherCitiesHTML: buildOtherCities(city.slug, city.zoneSlug),
    faqSchema: buildCityFaqSchema(city)
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
// Seuil qualité : on vise du contenu utile et non du bourrage. ~1200 mots de contenu réel suffisent.
const tooShort = summary.filter(s => s.words < 1200);
if (tooShort.length) {
  console.log(`\n⚠️  ${tooShort.length} page(s) sous 1200 mots (contenu potentiellement trop mince)`);
  tooShort.forEach(s => console.log(`     ${s.file} (${s.words})`));
}
