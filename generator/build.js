// =====================================================================
// Garage Boost — Static page generator
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const data = require('./data.js');
const zones = require('./zones.js');
const articles = require('./articles.js');

// Maillage interne : service -> articles de blog pertinents (clusters thématiques)
const ARTICLE_LINKS = {
  'diagnostic-moteur': ['voyant-moteur-orange-8-causes', 'voiture-consomme-trop-12-raisons', 'controle-avant-achat-voiture-occasion'],
  'decalaminage-hydrogene': ['decalaminage-hydrogene-guide-complet', 'hydrogene-mecanique-revolution-propre', 'voiture-consomme-trop-12-raisons'],
  'nettoyage-fap': ['nettoyage-fap-methodes-comparees', 'fap-nettoyage-vs-remplacement', 'controle-anti-pollution-passer-sans-stress'],
  'nettoyage-catalyseur': ['controle-anti-pollution-passer-sans-stress', 'fumee-noire-echappement', 'voyant-moteur-orange-8-causes'],
  'reprogrammation-moteur': ['reprogrammation-moteur-stage-1-tout-savoir', 'stage-1-vs-stage-2', 'voiture-consomme-trop-12-raisons'],
  'suppression-adblue': ['adblue-comprendre-pannes-courantes', 'controle-anti-pollution-passer-sans-stress', 'voyant-moteur-orange-8-causes'],
  'traitement-egr': ['vanne-egr-symptomes-prix', 'fumee-noire-echappement', 'nettoyage-fap-methodes-comparees'],
  'voyants-moteur': ['voyant-moteur-orange-8-causes', 'vanne-egr-symptomes-prix', 'adblue-comprendre-pannes-courantes'],
  'depannage-remorquage': ['batterie-voiture-signes-faiblesse-duree-vie', 'preparer-voiture-ete-chaleur-marseille', 'voyant-moteur-orange-8-causes'],
  'depannage-scooter': ['batterie-voiture-signes-faiblesse-duree-vie', 'preparer-voiture-ete-chaleur-marseille', 'garage-boost-10-ans-plan-de-cuques'],
  'electricite-automobile': ['batterie-voiture-signes-faiblesse-duree-vie', 'voyant-moteur-orange-8-causes', 'calibrage-adas-pare-brise'],
  'mecanique-generale': ['distribution-moteur-quand-changer', 'embrayage-signes-usure', 'prix-revision-auto-marseille'],
  'ouverture-vehicule': ['batterie-voiture-signes-faiblesse-duree-vie', 'garage-boost-10-ans-plan-de-cuques', 'garage-independant-vs-concession'],
  'reproduction-cles': ['batterie-voiture-signes-faiblesse-duree-vie', 'garage-boost-10-ans-plan-de-cuques', 'controle-avant-achat-voiture-occasion'],
  'enlevement-epaves': ['controle-avant-achat-voiture-occasion', 'garage-boost-10-ans-plan-de-cuques', 'garage-independant-vs-concession'],
  'carrosserie-auto': ['controle-avant-achat-voiture-occasion', 'garage-independant-vs-concession', 'calibrage-adas-pare-brise'],
  'peinture-automobile': ['controle-avant-achat-voiture-occasion', 'garage-independant-vs-concession', 'garage-boost-10-ans-plan-de-cuques'],
  'pare-brise': ['calibrage-adas-pare-brise', 'garage-independant-vs-concession', 'controle-avant-achat-voiture-occasion'],
  'utilitaires': ['prix-revision-auto-marseille', 'controle-avant-achat-voiture-occasion', 'economiser-1000-euros-an-entretien'],
  'citadines': ['prix-revision-auto-marseille', 'economiser-1000-euros-an-entretien', 'preparer-voiture-ete-chaleur-marseille'],
  'vans-amenages': ['preparer-voiture-ete-chaleur-marseille', 'controle-avant-achat-voiture-occasion', 'prix-revision-auto-marseille'],
  'voiture-rallye': ['reprogrammation-moteur-stage-1-tout-savoir', 'stage-1-vs-stage-2', 'distribution-moteur-quand-changer'],
  'vehicules-occasion': ['controle-avant-achat-voiture-occasion', 'prix-revision-auto-marseille', 'garage-independant-vs-concession']
};

function buildArticleLinks(serviceSlug) {
  const slugs = ARTICLE_LINKS[serviceSlug] || [];
  return slugs.map(s => {
    const a = articles.find(art => art.slug === s);
    if (!a) return '';
    return `
      <a class="blog-card" href="../blog/${a.slug}.html">
        <div class="blog-card-img">
          <img src="${a.cover}" alt="${a.coverAlt}" loading="lazy" title="${a.coverAlt}">
          <span class="blog-card-cat">${a.category}</span>
        </div>
        <div class="blog-card-body">
          <h3 class="blog-card-title">${a.title}</h3>
          <p class="blog-card-excerpt">${a.excerpt}</p>
          <span class="blog-card-link">Lire l'article <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>`;
  }).join('\n');
}

// Service icon mapping for related cards
const SERVICE_ICONS = {
  'diagnostic-moteur': 'microchip',
  'decalaminage-hydrogene': 'fire-flame-curved',
  'nettoyage-fap': 'filter',
  'nettoyage-catalyseur': 'circle-nodes',
  'reprogrammation-moteur': 'bolt',
  'suppression-adblue': 'droplet-slash',
  'traitement-egr': 'recycle',
  'voyants-moteur': 'triangle-exclamation',
  'depannage-remorquage': 'truck-pickup',
  'depannage-scooter': 'motorcycle',
  'electricite-automobile': 'bolt-lightning',
  'mecanique-generale': 'screwdriver-wrench',
  'ouverture-vehicule': 'key',
  'reproduction-cles': 'fingerprint',
  'enlevement-epaves': 'recycle',
  'carrosserie-auto': 'car-burst',
  'peinture-automobile': 'spray-can',
  'pare-brise': 'square',
  'utilitaires': 'truck',
  'citadines': 'car-side',
  'vans-amenages': 'campground',
  'voiture-rallye': 'flag-checkered',
  'vehicules-occasion': 'handshake'
};

// Find a service across all categories (for related links)
function findService(slug) {
  for (const [catSlug, cat] of Object.entries(data.categories)) {
    if (cat.services[slug]) {
      return { categorySlug: catSlug, name: cat.services[slug].name, lead: cat.services[slug].lead };
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

function buildTargetList(items) {
  return items.map(item => `<li>${item}</li>`).join('\n');
}

function buildWhyList(items) {
  return items.map(item => `<li>${item}</li>`).join('\n');
}

function buildContent(content) {
  return content.map(c => `<h3>${c.h}</h3>\n<p>${c.p}</p>`).join('\n');
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

function buildCitiesPills(serviceSlug) {
  // Generate clickable links for each zone
  return zones.map(zone => `
    <a class="zone-pill" href="${serviceSlug}/${zone.slug}.html"><i class="fa-solid fa-location-dot"></i> ${zone.label}</a>
  `).join('\n');
}

function buildRelated(related, currentCategorySlug) {
  return related.map(slug => {
    const s = findService(slug);
    if (!s) return '';
    const icon = SERVICE_ICONS[slug] || 'cog';
    const href = s.categorySlug === currentCategorySlug
      ? `${slug}.html`
      : `../${s.categorySlug}/${slug}.html`;
    return `
      <a class="related-card" href="${href}">
        <div class="related-card-icon"><i class="fa-solid fa-${icon}"></i></div>
        <h3>${s.name}</h3>
        <p>${s.lead.substring(0, 110)}...</p>
        <span class="related-card-link">Découvrir <i class="fa-solid fa-arrow-right"></i></span>
      </a>
    `;
  }).join('\n');
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
  const outDir = path.join(ROOT, categorySlug);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const [slug, service] of Object.entries(category.services)) {
    const html = render(TEMPLATE, {
      categorySlug,
      categoryLabel: category.label,
      slug,
      name: service.name,
      title: service.title,
      metaDesc: service.metaDesc,
      keywords: service.keywords,
      h1Pre: service.h1Pre,
      h1Accent: service.h1Accent,
      lead: service.lead,
      image1: service.image1,
      imageAlt1: service.imageAlt1,
      image2: service.image2,
      imageAlt2: service.imageAlt2,
      price: service.price,
      priceMin: service.priceMin,
      pricingDesc: service.pricingDesc,
      introTitle: service.introTitle,
      introP1: service.introP1,
      introP2: service.introP2,
      symptomsHTML: buildSymptoms(service.symptoms),
      benefitsTitle: service.benefitsTitle,
      statsHTML: buildStats(service.stats),
      benefitsHTML: buildBenefits(service.benefits),
      whatIsTitle: service.whatIsTitle,
      whatIsP1: service.whatIsP1,
      whatIsP2: service.whatIsP2,
      whatIsP3: service.whatIsP3,
      processIntro: service.processIntro,
      processStepsHTML: buildProcessSteps(service.processSteps),
      targetTitle: service.targetTitle,
      targetIntro: service.targetIntro,
      targetListHTML: buildTargetList(service.targetList),
      whyP: service.whyP,
      whyListHTML: buildWhyList(service.whyList),
      contentHTML: buildContent(service.content),
      faqHTML: buildFaq(service.faq),
      faqSchema: buildFaqSchema(service.faq),
      relatedHTML: buildRelated(service.related, categorySlug),
      articlesHTML: buildArticleLinks(slug),
      citiesPillsHTML: buildCitiesPills(slug),
      ctaTitle: service.ctaTitle,
      ctaTitleAccent: service.ctaTitleAccent,
      ctaText: service.ctaText
    });

    const outFile = path.join(outDir, `${slug}.html`);
    fs.writeFileSync(outFile, html);
    const words = countWords(html);
    summary.push({ file: `${categorySlug}/${slug}.html`, words });
    generated++;
    console.log(`  ✓ ${categorySlug}/${slug}.html  (${words} mots)`);
  }
}

console.log(`\nDone — ${generated} pages générées.`);
const avg = Math.round(summary.reduce((a, b) => a + b.words, 0) / summary.length);
console.log(`Moyenne mots/page : ${avg}`);
const tooShort = summary.filter(s => s.words < 2000);
if (tooShort.length) {
  console.log(`\n⚠️  ${tooShort.length} page(s) sous 2000 mots :`);
  tooShort.forEach(s => console.log(`     ${s.file} (${s.words})`));
}
