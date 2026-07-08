// =====================================================================
// Garage Boost — Local SEO page generator (3000+ mots, 2 images)
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'local-template.html'), 'utf8');
const data = require('./data.js');
const zones = require('./zones.js');

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
    if (cat.services[slug]) {
      return { categorySlug: catSlug, service: cat.services[slug] };
    }
  }
  return null;
}

function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : ''
  );
}

function buildSymptoms(symptoms) {
  return symptoms.map(s => `<li><i class="fa-solid fa-circle-check"></i> ${s}</li>`).join('\n');
}

function buildStats(stats) {
  return stats.map(s => `
    <div class="service-stat">
      <div class="service-stat-value">${s.value}</div>
      <div class="service-stat-label">${s.label}</div>
    </div>
  `).join('\n');
}

function buildBenefits(benefits) {
  return benefits.map((b, i) => `
    <div class="why-card">
      <span class="why-num">0${i + 1}</span>
      <span class="why-icon"><i class="fa-solid fa-${b.icon}"></i></span>
      <h3 class="why-title">${b.title}</h3>
      <p class="why-desc">${b.desc}</p>
    </div>
  `).join('\n');
}

function buildProcessSteps(steps) {
  return steps.map(s => `
    <div class="process-step">
      <span class="process-num">${s.num}</span>
      <h3 class="process-title">${s.title}</h3>
      <p class="process-desc">${s.desc}</p>
    </div>
  `).join('\n');
}

// Texte brut (sans HTML) pour le JSON-LD — le schéma doit refléter le contenu visible
function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// FAQPage JSON-LD construit à partir du MÊME tableau que la FAQ visible → éligibilité résultats enrichis + citations IA
function buildFaqSchema(faq) {
  if (!Array.isArray(faq) || !faq.length) return '';
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: stripHtml(f.q),
      acceptedAnswer: { '@type': 'Answer', text: stripHtml(f.a) }
    }))
  };
  return `<script type="application/ld+json">\n${JSON.stringify(obj).replace(/</g, '\\u003c')}\n</script>`;
}

function buildFaq(faq) {
  return faq.map((f, i) => `
    <div class="faq-item${i === 0 ? ' open' : ''}">
      <button class="faq-q">${f.q}<span class="faq-icon"><i class="fa-solid fa-plus"></i></span></button>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('\n');
}

function buildRelated(related, currentCategorySlug, currentZoneSlug) {
  return related.map(slug => {
    const r = findService(slug);
    if (!r) return '';
    const icon = SERVICE_ICONS[slug] || 'cog';
    // Link to local zone version if it exists, otherwise main service
    const href = `../../${r.categorySlug}/${slug}/${currentZoneSlug}.html`;
    return `
      <a class="related-card" href="${href}">
        <div class="related-card-icon"><i class="fa-solid fa-${icon}"></i></div>
        <h3>${r.service.name}</h3>
        <p>${r.service.lead.substring(0, 110)}...</p>
        <span class="related-card-link">Découvrir <i class="fa-solid fa-arrow-right"></i></span>
      </a>
    `;
  }).join('\n');
}

function buildCitiesPills(cities) {
  return cities.map(c => `<span class="zone-pill"><i class="fa-solid fa-circle-check"></i> ${c}</span>`).join('\n');
}

function buildOtherZones(currentZoneSlug, serviceSlug, serviceName) {
  return zones.filter(z => z.slug !== currentZoneSlug).map(z => `
    <a class="zone-pill" href="${z.slug}.html"><i class="fa-solid fa-location-dot"></i> ${serviceName} ${z.label}</a>
  `).join('\n');
}

function countWords(html) {
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '')
                   .replace(/<style[\s\S]*?<\/style>/g, '')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
  return text.split(/\s+/).filter(Boolean).length;
}

let generated = 0;
const summary = [];

for (const [categorySlug, category] of Object.entries(data.categories)) {
  for (const [serviceSlug, service] of Object.entries(category.services)) {

    const serviceDir = path.join(ROOT, categorySlug, serviceSlug);
    if (!fs.existsSync(serviceDir)) fs.mkdirSync(serviceDir, { recursive: true });

    for (const zone of zones) {
      const citiesText = zone.cities.join(', ');
      const areaServedJSON = JSON.stringify(zone.cities);

      // Texte localisé personnalisé
      const otherCities = zone.cities.filter(c => c !== zone.firstCity).join(', ') || '';

      const lead = `${service.lead.substring(0, 200)} Service identique pour les clients de ${zone.label} : ${citiesText}.`;

      const introP1 = `Vous résidez à ${zone.firstCity}${otherCities ? ` ou dans une commune voisine (${otherCities})` : ''} et cherchez un atelier spécialisé pour ${service.name.toLowerCase()} ? <strong>Garage Boost à Plan-de-Cuques</strong> est votre partenaire de confiance pour cette intervention. Notre atelier accueille régulièrement des clients de toute la zone ${zone.label}, attirés par notre rigueur technique, nos tarifs justes et notre garantie 12 mois sur l'ensemble de nos prestations mécaniques.`;

      const introP2 = `Notre prestation ${service.name.toLowerCase()} est <strong>strictement identique</strong> que vous veniez de Plan-de-Cuques ou de ${zone.firstCity} : même protocole technique, mêmes pièces qualité OEM, même garantie 12 mois, même tarif (${service.price}). Pour vous éviter le déplacement, nous proposons un service de récupération de votre véhicule à domicile dans toute la zone ${zone.label}, offert au-delà de 200€ d'intervention validée.`;

      const whyZoneP = `Vous trouverez peut-être des garages plus proches géographiquement de chez vous à ${zone.firstCity}, mais Garage Boost se distingue par sa <strong>spécialisation</strong> sur ${service.name.toLowerCase()}. Nous réalisons cette intervention plusieurs fois par semaine avec un équipement professionnel dédié et des techniciens formés en continu sur les évolutions techniques du secteur. Cette expertise concentrée nous permet de proposer des tarifs compétitifs (-30 à -40% par rapport aux concessionnaires) et un taux de réussite élevé sur les cas complexes. Nos clients de ${zone.label} apprécient également notre transparence sur les devis (envoyés sous 24h, validation écrite obligatoire avant tout démarrage de l'intervention) et notre note Google de 4,9/5 sur 127+ avis vérifiés à travers toute la métropole Aix-Marseille-Provence.`;

      const servicePresentation = `${service.introTitle ? '<strong>' + service.introTitle + '</strong> ' : ''}${service.introP1} ${service.introP2 ? service.introP2 : ''} Pour découvrir le détail technique complet de notre prestation, consultez notre <a href="../${serviceSlug}.html" style="color:var(--accent)">page principale ${service.name}</a>. Sinon, contactez-nous directement par téléphone, WhatsApp ou via notre formulaire de prise de rendez-vous en ligne — un mécanicien spécialisé vous répond personnellement, sans intermédiaire commercial ni standard téléphonique.`;

      const html = render(TEMPLATE, {
        categorySlug,
        categoryLabel: category.label,
        serviceSlug,
        serviceName: service.name,
        zoneSlug: zone.slug,
        zoneLabel: zone.label,
        zoneFirstCity: zone.firstCity,
        citiesText,
        areaServedJSON,
        accessText: zone.access,
        localContext: zone.localContext,
        title: `${service.name} ${zone.label} | Garage Boost Marseille`,
        metaDesc: `${service.name} dans la zone ${zone.label} (${citiesText}). Garage Boost à Plan-de-Cuques. Tarif ${service.price}, garantie 12 mois, devis sous 24h. Récupération à domicile.`,
        keywords: `${service.name.toLowerCase()} ${zone.firstCity}, ${service.name.toLowerCase()} ${zone.cities[1] || ''}, garage ${zone.firstCity}, ${service.name.toLowerCase()} ${zone.label.toLowerCase()}`,
        lead,
        introP1,
        introP2,
        whyZoneP,
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
        relatedHTML: buildRelated(service.related, categorySlug, zone.slug),
        citiesPillsHTML: buildCitiesPills(zone.cities),
        otherZonesHTML: buildOtherZones(zone.slug, serviceSlug, service.name)
      });

      const outFile = path.join(serviceDir, `${zone.slug}.html`);
      fs.writeFileSync(outFile, html);
      const words = countWords(html);
      summary.push({ file: `${categorySlug}/${serviceSlug}/${zone.slug}.html`, words });
      generated++;
    }
  }
}

console.log(`\nDone — ${generated} pages SEO locales générées.`);
const avg = Math.round(summary.reduce((a, b) => a + b.words, 0) / summary.length);
console.log(`Moyenne mots/page : ${avg}`);
// Seuil qualité : on vise du contenu utile et non du bourrage. ~1200 mots de contenu réel suffisent.
const tooShort = summary.filter(s => s.words < 1200);
if (tooShort.length) {
  console.log(`\n⚠️  ${tooShort.length} page(s) sous 1200 mots (contenu potentiellement trop mince)`);
  console.log(`Min: ${Math.min(...summary.map(s => s.words))} mots`);
}
