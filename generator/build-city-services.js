// =====================================================================
// Garage Boost — Pages service × ville
// Croise data.js (service) et cities.js (ville). Réutilise local-template.html.
// Pour chaque ville : ses topServices (les plus demandés localement).
// Sortie : /{categorie}/{service}/{ville}.html
// =====================================================================
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'local-template.html'), 'utf8');
const data = require('./data.js');
const zones = require('./zones.js');
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

function findService(slug) {
  for (const [catSlug, cat] of Object.entries(data.categories)) {
    if (cat.services[slug]) return { categorySlug: catSlug, service: cat.services[slug] };
  }
  return null;
}
function render(t, v) { return t.replace(/\{\{(\w+)\}\}/g, (_, k) => (v[k] !== undefined ? String(v[k]) : '')); }
function buildSymptoms(s) { return (s || []).map(x => `<li><i class="fa-solid fa-circle-check"></i> ${x}</li>`).join('\n'); }
function buildStats(s) { return (s || []).map(x => `<div class="service-stat"><div class="service-stat-value">${x.value}</div><div class="service-stat-label">${x.label}</div></div>`).join('\n'); }
function buildBenefits(b) { return (b || []).map((x, i) => `<div class="why-card"><span class="why-num">0${i + 1}</span><span class="why-icon"><i class="fa-solid fa-${x.icon}"></i></span><h3 class="why-title">${x.title}</h3><p class="why-desc">${x.desc}</p></div>`).join('\n'); }
function buildProcessSteps(s) { return (s || []).map(x => `<div class="process-step"><span class="process-num">${x.num}</span><h3 class="process-title">${x.title}</h3><p class="process-desc">${x.desc}</p></div>`).join('\n'); }
function stripHtml(s) { return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
function buildFaqSchema(faq) {
  if (!Array.isArray(faq) || !faq.length) return '';
  const obj = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: stripHtml(f.q), acceptedAnswer: { '@type': 'Answer', text: stripHtml(f.a) } })) };
  return `<script type="application/ld+json">\n${JSON.stringify(obj).replace(/</g, '\\u003c')}\n</script>`;
}
function buildFaq(faq) { return (faq || []).map((f, i) => `<div class="faq-item${i === 0 ? ' open' : ''}"><button class="faq-q">${f.q}<span class="faq-icon"><i class="fa-solid fa-plus"></i></span></button><div class="faq-a">${f.a}</div></div>`).join('\n'); }
function buildCitiesPills(list) { return (list || []).map(c => `<span class="zone-pill"><i class="fa-solid fa-circle-check"></i> ${c}</span>`).join('\n'); }

// Maillage : liens vers services liés (hubs, toujours existants)
function buildRelated(related) {
  return (related || []).map(slug => {
    const r = findService(slug);
    if (!r) return '';
    const icon = SERVICE_ICONS[slug] || 'cog';
    return `<a class="related-card" href="../../${r.categorySlug}/${slug}.html"><div class="related-card-icon"><i class="fa-solid fa-${icon}"></i></div><h3>${r.service.name}</h3><p>${r.service.lead.substring(0, 110)}...</p><span class="related-card-link">Découvrir <i class="fa-solid fa-arrow-right"></i></span></a>`;
  }).join('\n');
}
// Maillage "ce service ailleurs" : les 6 zones (pages qui existent) + retour vers la fiche ville
function buildOtherAreas(serviceSlug, serviceName, citySlug, cityName) {
  const zoneLinks = zones.map(z => `<a class="zone-pill" href="${z.slug}.html"><i class="fa-solid fa-location-dot"></i> ${serviceName} ${z.label}</a>`).join('\n');
  const cityLink = `<a class="zone-pill" href="../../villes/${citySlug}.html"><i class="fa-solid fa-map-location-dot"></i> Tous nos services à ${cityName}</a>`;
  return zoneLinks + '\n' + cityLink;
}

function countWords(html) {
  const t = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.split(/\s+/).filter(Boolean).length;
}

const zoneSlugs = new Set(zones.map(z => z.slug));
let generated = 0;
const summary = [];

for (const city of cities) {
  if (zoneSlugs.has(city.slug)) continue; // collision (salon-de-provence) — déjà couvert par sa zone
  const services = [...new Set(city.topServices || [])];

  for (const serviceSlug of services) {
    const r = findService(serviceSlug);
    if (!r) continue;
    const { categorySlug, service } = r;
    const category = data.categories[categorySlug];
    const serviceDir = path.join(ROOT, categorySlug, serviceSlug);
    if (!fs.existsSync(serviceDir)) fs.mkdirSync(serviceDir, { recursive: true });

    const svc = service.name.toLowerCase();
    const lead = `${service.lead.substring(0, 190)} Même prestation pour les habitants de ${city.name}, à ${city.distance} de notre atelier de Plan-de-Cuques.`;

    const introP1 = `Vous habitez à <strong>${city.name}</strong> et cherchez un atelier spécialisé pour ${svc} ? Garage Boost, à Plan-de-Cuques (à ${city.distance} de ${city.name}, soit environ ${city.travelTime}), reçoit régulièrement des clients de ${city.name} pour cette intervention. Notre atelier est réputé pour sa rigueur technique, ses tarifs justes et sa garantie 12 mois sur l'ensemble de nos prestations mécaniques.`;

    const introP2 = `${city.localContext} Dans ce contexte, ${svc} fait partie des interventions que les automobilistes de ${city.name} nous confient le plus souvent. La prestation est <strong>strictement identique</strong> pour tous : même protocole, mêmes pièces qualité d'origine, même garantie et même tarif (${service.price}). Nous proposons aussi la <strong>récupération de votre véhicule à domicile</strong> dans toute la zone de ${city.name}, offerte au-delà de 200&nbsp;€ d'intervention validée.`;

    const whyCity = `Vous trouverez sans doute des garages plus proches de chez vous à ${city.name}, mais Garage Boost se distingue par sa <strong>spécialisation</strong> sur ${svc}. Nous réalisons cette intervention plusieurs fois par semaine, avec un équipement dédié et des techniciens formés en continu. Cette expertise concentrée nous permet des tarifs compétitifs (30 à 40&nbsp;% sous le prix concession) et un haut taux de réussite sur les cas délicats. Les habitants de ${city.name} apprécient aussi notre <strong>transparence</strong> : devis envoyé sous 24&nbsp;h, validation écrite obligatoire avant tout démarrage, et aucune surprise sur la facture.`;

    const servicePresentation = `${service.introTitle ? '<strong>' + service.introTitle + '</strong> ' : ''}${service.introP1 || ''} ${service.introP2 || ''} Pour le détail technique complet, consultez notre <a href="../${serviceSlug}.html" style="color:var(--accent)">page ${service.name}</a>. Pour un devis personnalisé pour votre véhicule à ${city.name}, contactez-nous par téléphone, WhatsApp ou via notre formulaire — un mécanicien spécialisé vous répond directement.`;

    const html = render(TEMPLATE, {
      categorySlug,
      categoryLabel: category.label,
      serviceSlug,
      serviceName: service.name,
      zoneSlug: city.slug,
      zoneLabel: city.name,
      zoneFirstCity: city.name,
      citiesText: (city.nearbyDistricts || []).join(', '),
      areaServedJSON: JSON.stringify([city.name]),
      accessText: city.accessInfo,
      localContext: city.localContext,
      title: `${service.name} ${city.name} | Garage Boost — Plan-de-Cuques`,
      metaDesc: `${service.name} à ${city.name} : Garage Boost à Plan-de-Cuques (${city.distance}). Tarif ${service.price}, garantie 12 mois, devis sous 24h, récupération à domicile.`,
      keywords: `${svc} ${city.name}, garage ${city.name}, ${svc} ${city.name.toLowerCase()}, ${service.name} près de ${city.name}`,
      lead,
      introP1,
      introP2,
      whyZoneP: whyCity,
      servicePresentation,
      price: service.price,
      priceMin: service.priceMin || '0',
      pricingDesc: service.pricingDesc,
      image1: service.image1,
      image2: service.image2,
      symptomsHTML: buildSymptoms(service.symptoms),
      statsHTML: buildStats(service.stats),
      benefitsHTML: buildBenefits(service.benefits),
      whatIsTitle: service.whatIsTitle,
      whatIsP1: service.whatIsP1,
      whatIsP2: service.whatIsP2,
      whatIsP3: service.whatIsP3,
      processIntro: service.processIntro,
      processStepsHTML: buildProcessSteps(service.processSteps),
      faqHTML: buildFaq(service.faq),
      faqSchema: buildFaqSchema(service.faq),
      relatedHTML: buildRelated(service.related),
      citiesPillsHTML: buildCitiesPills(city.nearbyDistricts),
      otherZonesHTML: buildOtherAreas(serviceSlug, service.name, city.slug, city.name)
    });

    fs.writeFileSync(path.join(serviceDir, `${city.slug}.html`), html);
    summary.push({ file: `${categorySlug}/${serviceSlug}/${city.slug}.html`, words: countWords(html) });
    generated++;
  }
}

console.log(`\nDone — ${generated} pages service × ville générées.`);
if (summary.length) {
  const avg = Math.round(summary.reduce((a, b) => a + b.words, 0) / summary.length);
  const min = Math.min(...summary.map(s => s.words));
  console.log(`Moyenne mots/page : ${avg} | min : ${min}`);
}
