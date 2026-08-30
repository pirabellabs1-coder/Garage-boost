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
const { servicesForCity } = require('./city-services.js');

const SERVICE_ICONS = {
  'diagnostic-moteur': 'microchip', 'decalaminage-hydrogene': 'fire-flame-curved',
  'nettoyage-fap': 'filter', 'nettoyage-catalyseur': 'circle-nodes',
  'reprogrammation-moteur': 'bolt', 'gestion-adblue': 'droplet',
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
// Maillage latéral : le MÊME service dans les communes voisines (même zone).
// Sans ces liens, chaque page service × ville n'a qu'UN SEUL lien entrant (sa
// page ville) — signal d'importance trop faible pour être correctement indexée.
// On ne lie que des pages réellement générées (servicesForCity), donc jamais de
// lien mort.
function buildNearbyCities(serviceSlug, serviceName, city) {
  const neighbours = cities.filter(c =>
    c.slug !== city.slug &&
    c.zoneSlug === city.zoneSlug &&
    !zoneSlugs.has(c.slug) &&
    servicesForCity(c).includes(serviceSlug)
  ).slice(0, 12);

  if (!neighbours.length) return '';

  const pills = neighbours.map(c =>
    `<a class="zone-pill" href="${c.slug}.html"><i class="fa-solid fa-location-dot"></i> ${serviceName} ${c.name}</a>`
  ).join('\n');

  return `
      <h3 style="margin-top:40px">${serviceName} dans les communes voisines de ${city.name}</h3>
      <p style="color:var(--text-muted);margin-bottom:18px">
        Nous intervenons dans toute la zone. Si vous habitez une commune limitrophe de ${city.name},
        consultez la page dédiée à votre ville&nbsp;:
      </p>
      <div class="cities-pills">
${pills}
      </div>`;
}

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
  // Source de vérité partagée avec build-cities.js et build-sitemap.js
  // (voir generator/city-services.js — ne pas redéfinir la liste ici)
  const services = servicesForCity(city);

  for (const serviceSlug of services) {
    const r = findService(serviceSlug);
    if (!r) continue;
    const { categorySlug, service } = r;
    const category = data.categories[categorySlug];
    const serviceDir = path.join(ROOT, categorySlug, serviceSlug);
    if (!fs.existsSync(serviceDir)) fs.mkdirSync(serviceDir, { recursive: true });

    const svc = service.name.toLowerCase();
    const districts = (city.nearbyDistricts || []).slice(0, 4).join(', ');
    const b0 = (service.benefits && service.benefits[0]) ? service.benefits[0].desc : '';

    const lead = `${service.lead.substring(0, 170)} À ${city.distance} de ${city.name} (environ ${city.travelTime}), Garage Boost réalise votre ${svc} avec devis sous 24&nbsp;h et garantie 12 mois.`;

    const introP1 = `Vous cherchez un spécialiste du <strong>${svc} à ${city.name}</strong> ? Garage Boost, atelier indépendant installé à Plan-de-Cuques (à ${city.distance} de ${city.name}, soit environ ${city.travelTime} de route), reçoit chaque semaine des automobilistes de ${city.name} et des quartiers voisins${districts ? ` (${districts})` : ''} pour cette intervention. Notre force tient en un mot : la <strong>spécialisation</strong>. Là où un garage généraliste touche à tout, nous réalisons le ${svc} de façon récurrente, avec l'équipement dédié et l'expérience qui font la différence, y compris sur les cas les plus délicats. C'est ce qui rassure nos clients de ${city.name} : ils confient leur véhicule à un atelier qui maîtrise vraiment cette prestation, pas à un généraliste qui la sous-traite ou l'improvise.`;

    const introP2 = `${city.localContext} C'est précisément dans ce contexte que le <strong>${svc}</strong> prend tout son sens pour les automobilistes de ${city.name}${b0 ? ` : ${b0.charAt(0).toLowerCase()}${b0.slice(1)}` : '.'} La prestation est <strong>strictement identique</strong> pour tous nos clients — même protocole, mêmes pièces qualité d'origine, même garantie et même tarif (${service.price}) — que vous veniez de ${city.name} ou de Plan-de-Cuques. Et pour vous éviter le trajet, nous proposons la <strong>récupération de votre véhicule à domicile</strong> partout à ${city.name}, offerte au-delà de 200&nbsp;€ d'intervention validée.`;

    const whyCity = `Pourquoi choisir Garage Boost pour votre <strong>${svc} à ${city.name}</strong> plutôt qu'un garage de quartier ? D'abord pour la <strong>spécialisation</strong> : nous réalisons cette intervention plusieurs fois par semaine, avec un matériel dédié et des techniciens formés en continu — un savoir-faire concentré qui fait la différence sur les cas complexes. Ensuite pour les <strong>tarifs</strong> : 30 à 40&nbsp;% sous le prix concession à qualité égale. Enfin pour la <strong>transparence</strong> : devis détaillé envoyé sous 24&nbsp;h, validation écrite obligatoire avant tout démarrage, compte-rendu remis à la restitution, et aucune surprise sur la facture. Cette exigence nous vaut une note de <strong>4,9/5 sur Google</strong> (plus de 127 avis vérifiés) auprès de clients de toute la métropole Aix-Marseille-Provence, dont beaucoup viennent de ${city.name} et de ses environs.`;

    const servicePresentation = `<strong>${service.name} à ${city.name} : comment ça se passe ?</strong> ${service.introP1 || ''}</p>` +
      `<p>${service.introP2 || ''} Pour un automobiliste de ${city.name}, tout commence par un <strong>diagnostic et un devis clairs</strong> : vous savez exactement ce qui sera fait et à quel prix avant que l'on touche au véhicule. L'intervention est ensuite réalisée dans notre atelier de Plan-de-Cuques, à ${city.distance} de ${city.name}, puis nous vous rendons la voiture prête, avec sa garantie 12 mois et son compte-rendu écrit.</p>` +
      `<p>Beaucoup de nos clients de ${city.name} arrivent en cherchant «&nbsp;<strong>${svc} ${city.name}</strong>&nbsp;», «&nbsp;garage ${svc} près de ${city.name}&nbsp;» ou «&nbsp;prix ${svc} ${city.name}&nbsp;» : notre réponse est la même dans tout le secteur${districts ? ` (${districts})` : ''}, sans surcoût lié à la distance ni tarif «&nbsp;client de passage&nbsp;». Et si vous ne pouvez pas vous déplacer, notre dépanneuse vient chercher votre véhicule directement à ${city.name} et vous le ramène une fois l'intervention terminée.</p>` +
      `<p>Pour le détail technique complet de la prestation, consultez notre <a href="../${serviceSlug}.html" style="color:var(--accent)">page dédiée ${service.name}</a>, ou demandez dès maintenant votre <strong>devis ${svc} pour ${city.name}</strong> par téléphone, WhatsApp ou via le formulaire en ligne — un mécanicien spécialisé vous répond directement, sans standard téléphonique ni intermédiaire commercial.`;

    // FAQ locale (utile + mots-clés + enrichit le schema FAQPage), en tête de la FAQ service
    const cityFaq = [
      { q: `Intervenez-vous à ${city.name} pour un ${svc} ?`,
        a: `Oui. Notre atelier est à Plan-de-Cuques, à ${city.distance} de ${city.name} (environ ${city.travelTime} de route). Nous recevons régulièrement des clients de ${city.name} pour un ${svc}, et nous proposons la récupération de votre véhicule à domicile, offerte au-delà de 200 € d'intervention validée — idéal si vous préférez ne pas vous déplacer.` },
      { q: `Combien coûte un ${svc} pour un habitant de ${city.name} ?`,
        a: `Le tarif est de ${service.price}, identique pour tous nos clients : pas de surcoût lié à la distance ni de tarif « client de passage » pour ${city.name}. ${(service.pricingDesc || '').replace(/<[^>]+>/g, '')} Un devis détaillé et gratuit vous est envoyé sous 24 heures ouvrées, avec validation écrite avant tout démarrage.` },
      { q: `Quel est le délai pour un rendez-vous ${svc} depuis ${city.name} ?`,
        a: `Pour une intervention standard, comptez 48 à 72 heures ; pour une opération plus lourde, 5 à 10 jours ; en cas d'urgence, nous faisons au plus vite. Vous réservez en ligne ou par téléphone depuis ${city.name}, avec une confirmation sous 2 heures ouvrées.` },
      { q: `Sur quelles marques réalisez-vous le ${svc} ?`,
        a: `Toutes les marques européennes, asiatiques et américaines (Renault, Peugeot, Citroën, Volkswagen, Audi, BMW, Mercedes, Ford, Toyota, Dacia et bien d'autres), toutes motorisations essence, diesel et hybride. Nous intervenons aussi bien sur les véhicules récents des habitants de ${city.name} que sur les modèles plus anciens.` },
      { q: `Le ${svc} est-il garanti, et puis-je payer en plusieurs fois ?`,
        a: `Oui : garantie 12 mois pièces et main-d'œuvre (24 mois sur les reprogrammations), avec attestation écrite remise à chaque facture. Et pour toute prestation supérieure à 500 €, le règlement peut se faire en 3 ou 4 fois sans frais, sous réserve d'éligibilité — une facilité appréciée par nos clients de ${city.name}.` }
    ];
    const faq = [...cityFaq, ...(service.faq || [])];

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
      faqHTML: buildFaq(faq),
      faqSchema: buildFaqSchema(faq),
      relatedHTML: buildRelated(service.related),
      citiesPillsHTML: buildCitiesPills(city.nearbyDistricts),
      otherZonesHTML: buildOtherAreas(serviceSlug, service.name, city.slug, city.name),
      nearbyCitiesBlock: buildNearbyCities(serviceSlug, service.name, city)
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
