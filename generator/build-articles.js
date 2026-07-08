// =====================================================================
// Garage Boost — Blog articles generator
// Génère blog/<slug>.html + met à jour blog.html (index)
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'article-template.html'), 'utf8');
const articles = require('./articles.js');
const FAQ = require('./article-faq.js');
const EXTRA = require('./article-extra.js');

// =====================================================================
// Helpers réutilisés dans l'appendice
// =====================================================================
const fig = (img, caption) => `<figure><img src="${img}" alt="${caption}" loading="lazy" title="${caption}"><figcaption>${caption}</figcaption></figure>`;
const ctaBox = (icon, title, desc, href, btnText) =>
  `<div class="article-cta"><div class="article-cta-icon"><i class="fa-solid fa-${icon}"></i></div><div class="article-cta-text"><strong>${title}</strong><p>${desc}</p></div><a href="../${href}" class="btn btn-primary">${btnText} <span class="btn-arrow"><i class="fa-solid fa-arrow-right"></i></span></a></div>`;

// Mapping catégorie → service principal + image illustrative + CTA
const CATEGORY_MAP = {
  'Anti-pollution': {
    img: '/assets/img/1492144534655-ae79c964c9d7.webp',
    imgCaption: "Atelier spécialisé anti-pollution moteur à Plan-de-Cuques",
    servicePage: 'maintenance-moteur.html',
    serviceTitle: 'Tous nos services anti-pollution',
    serviceDesc: "Décalaminage hydrogène, nettoyage FAP/EGR, suppression AdBlue, traitement injecteurs. Devis gratuit sous 24h.",
    btnText: 'Découvrir nos services'
  },
  'Reprogrammation': {
    img: '/assets/img/1486006920555-c77dcf18193c.webp',
    imgCaption: "Banc de reprogrammation moteur professionnel",
    servicePage: 'maintenance-moteur/reprogrammation-moteur.html',
    serviceTitle: 'Reprogrammation moteur Stage 1 & 2',
    serviceDesc: "Cartographies développées en interne, testées sur banc dynamométrique. Garantie 24 mois, sauvegarde origine systématique.",
    btnText: 'En savoir plus'
  },
  'Diagnostic': {
    img: '/assets/img/1487754180451-c456f719a1fc.webp',
    imgCaption: "Diagnostic électronique multimarque sur véhicule",
    servicePage: 'maintenance-moteur/diagnostic-moteur.html',
    serviceTitle: 'Diagnostic moteur électronique',
    serviceDesc: "Lecture multimarque OBD2 + valise constructeur. Identification précise de la cause sous 90 minutes.",
    btnText: 'Diagnostiquer mon véhicule'
  },
  'Mécanique': {
    img: '/assets/img/1583121274602-3e2820c69888.webp',
    imgCaption: "Atelier mécanique générale Garage Boost",
    servicePage: 'entretien-assistance/mecanique-generale.html',
    serviceTitle: 'Mécanique générale toutes marques',
    serviceDesc: "Vidange, freins, distribution, embrayage, suspension. Pièces qualité OEM, garantie 12 mois.",
    btnText: 'Voir nos prestations'
  },
  'Comparatif': {
    img: '/assets/img/1503376780353-7e6692767b70.webp',
    imgCaption: "Atelier indépendant moderne à Plan-de-Cuques",
    servicePage: 'tarifs.html',
    serviceTitle: 'Nos tarifs transparents',
    serviceDesc: "Grille tarifaire complète sur 5 catégories : moteur, entretien, carrosserie, dépannage, location.",
    btnText: 'Consulter les tarifs'
  },
  'Conseils': {
    img: '/assets/img/1494976388531-d1058494cdd8.webp',
    imgCaption: "Conseils techniques de notre équipe",
    servicePage: 'rendez-vous.html',
    serviceTitle: 'Demander un conseil personnalisé',
    serviceDesc: "Notre équipe vous répond sous 24h ouvrées. Devis gratuit, sans engagement.",
    btnText: 'Prendre rendez-vous'
  },
  'Actualité': {
    img: '/assets/img/1607706189992-eae578626c86.webp',
    imgCaption: "Suivez l'actualité automobile à Marseille",
    servicePage: 'contact.html',
    serviceTitle: 'Une question sur cette actualité ?',
    serviceDesc: "Notre équipe vous accompagne dans vos démarches et vous conseille selon votre véhicule.",
    btnText: 'Nous contacter'
  },
  'Technologie': {
    img: '/assets/img/1517524206127-48bbd363f3d7.webp',
    imgCaption: "Technologies modernes de mécanique automobile",
    servicePage: 'maintenance-moteur.html',
    serviceTitle: 'Notre expertise technique',
    serviceDesc: "Équipement de pointe : banc dynamométrique, station hydrogène, cabine peinture, calibrage ADAS.",
    btnText: 'Découvrir nos services'
  },
  'À propos': {
    img: '/assets/img/1503376780353-7e6692767b70.webp',
    imgCaption: "Notre atelier de Plan-de-Cuques",
    servicePage: 'contact.html',
    serviceTitle: 'Venez nous rencontrer',
    serviceDesc: "Atelier ouvert du lundi au samedi, 8h à 19h. Stationnement gratuit, accueil sans rendez-vous.",
    btnText: 'Nous contacter'
  }
};

// Appendice court : CTA service ciblé + FAQ propre à l'article (anti-duplicate)
function buildAppendix(article) {
  const cat = CATEGORY_MAP[article.category] || CATEGORY_MAP['Conseils'];
  let html = '\n\n' + ctaBox('wrench', cat.serviceTitle, cat.serviceDesc, cat.servicePage, cat.btnText);
  if (article.faq && article.faq.length) {
    html += '\n\n<h2>Questions fréquentes</h2>\n' + article.faq.map(function (f) { return '<h3>' + f.q + '</h3>\n<p>' + f.a + '</p>'; }).join('\n');
  }
  return html;
}

function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : ''
  );
}

function formatDateFR(dateStr) {
  const months = ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function countWords(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(/\s+/).filter(Boolean).length;
}

function buildRelated(relatedSlugs, currentSlug) {
  return relatedSlugs.filter(s => s !== currentSlug).map(slug => {
    const a = articles.find(art => art.slug === slug);
    if (!a) return '';
    return `
      <a class="blog-card" href="${slug}.html">
        <div class="blog-card-img">
          <img src="${a.cover}" alt="${a.coverAlt}" loading="lazy" title="${a.coverAlt}">
          <span class="blog-card-cat">${a.category}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span><i class="fa-solid fa-calendar"></i> ${formatDateFR(a.dateModified)}</span>
            <span><i class="fa-solid fa-clock"></i> ${a.readTime} min</span>
          </div>
          <h3 class="blog-card-title">${a.title}</h3>
          <p class="blog-card-excerpt">${a.excerpt}</p>
          <span class="blog-card-link">Lire l'article <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </a>
    `;
  }).join('\n');
}

const outDir = path.join(ROOT, 'blog');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let generated = 0;
const summary = [];

for (const article of articles) {
  article.faq = article.faq || FAQ[article.slug] || [];
  const fullContent = article.content + (EXTRA[article.slug] || '') + buildAppendix(article);
  const wordCount = countWords(fullContent);
  const faqSchema = article.faq.length
    ? '<script type="application/ld+json">' + JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: article.faq.map(function (f) { return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }; })
      }) + '</script>'
    : '';

  const html = render(TEMPLATE, {
    slug: article.slug,
    title: article.title,
    metaDesc: article.metaDesc,
    keywords: article.keywords,
    category: article.category,
    coverImage: article.cover,
    coverAlt: article.coverAlt,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    dateDisplay: formatDateFR(article.dateModified),
    readTime: article.readTime,
    wordCount: wordCount,
    contentHTML: fullContent,
    faqSchema: faqSchema,
    relatedHTML: buildRelated(article.related, article.slug)
  });

  const outFile = path.join(outDir, `${article.slug}.html`);
  fs.writeFileSync(outFile, html);
  summary.push({ file: `blog/${article.slug}.html`, words: wordCount });
  generated++;
  console.log(`  ✓ blog/${article.slug}.html  (${wordCount} mots)`);
}

console.log(`\nDone — ${generated} articles générés.`);
const avg = Math.round(summary.reduce((a, b) => a + b.words, 0) / summary.length);
const total = summary.reduce((a, b) => a + b.words, 0);
console.log(`Moyenne mots/article : ${avg}`);
console.log(`Total mots blog : ${total}`);

// =====================================================================
// Build blog.html (index)
// =====================================================================

// Trier par dateModified desc
const sorted = [...articles].sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified));

const cardsHTML = sorted.map(a => `
  <a class="blog-card" href="blog/${a.slug}.html" data-cat="${a.category}">
    <div class="blog-card-img">
      <img src="${a.cover}" alt="${a.coverAlt}" loading="lazy" title="${a.coverAlt}">
      <span class="blog-card-cat">${a.category}</span>
    </div>
    <div class="blog-card-body">
      <div class="blog-card-meta">
        <span><i class="fa-solid fa-calendar"></i> ${formatDateFR(a.dateModified)}</span>
        <span><i class="fa-solid fa-clock"></i> ${a.readTime} min</span>
      </div>
      <h3 class="blog-card-title">${a.title}</h3>
      <p class="blog-card-excerpt">${a.excerpt}</p>
      <span class="blog-card-link">Lire l'article <i class="fa-solid fa-arrow-right"></i></span>
    </div>
  </a>
`).join('\n');

// Catégories uniques
const categories = [...new Set(articles.map(a => a.category))];

const blogIndexHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0a0e0c">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog Garage Boost Marseille | Conseils auto, FAP, reprogrammation, anti-pollution</title>
<meta name="description" content="Blog Garage Boost : guides pédagogiques sur le décalaminage hydrogène, le nettoyage FAP, la reprogrammation moteur et l'entretien automobile à Marseille.">
<meta name="keywords" content="blog auto Marseille, conseils décalaminage, guide FAP, blog reprogrammation moteur, articles entretien voiture">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://garageboost.fr/blog.html">

<meta property="og:type" content="website">
<meta property="og:title" content="Blog Garage Boost Marseille">
<meta property="og:description" content="Guides techniques et pédagogiques sur l'automobile.">
<meta property="og:url" content="https://garageboost.fr/blog.html">

<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/roboto-900.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/poppins-400.woff2" crossorigin>
<link rel="preload" href="/assets/fa/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/assets/fa/css/all.min.css"></noscript>
<link rel="stylesheet" href="assets/css/style.css">

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
{"@type":"ListItem","position":1,"name":"Accueil","item":"https://garageboost.fr/"},
{"@type":"ListItem","position":2,"name":"Blog","item":"https://garageboost.fr/blog.html"}]}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog Garage Boost Marseille",
  "description": "Articles techniques et pédagogiques sur l'automobile, l'anti-pollution, la mécanique et l'entretien.",
  "url": "https://garageboost.fr/blog.html",
  "publisher": {
    "@type": "Organization",
    "name": "Garage Boost",
    "url": "https://garageboost.fr"
  }
}
</script>
</head>
<body>

<div class="topbar"><div class="container topbar-inner">
<div class="topbar-socials">
<a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
<a href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
<a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
<a href="#" aria-label="Vimeo"><i class="fa-brands fa-vimeo-v"></i></a>
</div>
<div class="topbar-info">
<span><i class="fa-solid fa-location-dot"></i> Plan-de-Cuques – 13380 Marseille</span>
<span><i class="fa-solid fa-envelope"></i> <a href="mailto:masgarage7@gmail.com">masgarage7@gmail.com</a></span>
<span><i class="fa-solid fa-phone"></i> <a href="tel:+33663216350">06 63 21 63 50</a></span>
</div>
</div></div>

<header class="header"><div class="container"><nav class="nav">
<a href="/" class="logo" aria-label="Garage Boost"><span class="logo-text">Garage</span><span class="logo-text logo-text-bold">B<span class="logo-leaf"><i class="fa-solid fa-bolt"></i></span>ost</span></a>
<ul class="nav-menu">
<li><a href="/tarifs">Tarifs</a></li>
<li><a href="/rendez-vous">Prise de rendez-vous</a></li>
<li><a href="/entretien-assistance" class="has-sub">Entretien & assistance</a><ul class="nav-submenu">
<li><a href="/entretien-assistance/depannage-remorquage">Dépannage & remorquage</a></li>
<li><a href="/entretien-assistance/depannage-scooter">Dépannage scooter</a></li>
<li><a href="/entretien-assistance/electricite-automobile">Électricité automobile</a></li>
<li><a href="/entretien-assistance/mecanique-generale">Mécanique générale</a></li>
<li><a href="/entretien-assistance/ouverture-vehicule">Ouverture de véhicule</a></li>
<li><a href="/entretien-assistance/reproduction-cles">Reproduction de clés</a></li>
<li><a href="/entretien-assistance/enlevement-epaves">Enlèvement d'épaves</a></li>
</ul></li>
<li><a href="/maintenance-moteur" class="has-sub">Maintenance moteur &amp; anti-pollution</a><ul class="nav-submenu">
<li><a href="/maintenance-moteur/diagnostic-moteur">Diagnostic moteur</a></li>
<li><a href="/maintenance-moteur/decalaminage-hydrogene">Décalaminage hydrogène</a></li>
<li><a href="/maintenance-moteur/nettoyage-fap">Nettoyage FAP</a></li>
<li><a href="/maintenance-moteur/nettoyage-catalyseur">Nettoyage catalyseur</a></li>
<li><a href="/maintenance-moteur/reprogrammation-moteur">Reprogrammation moteur</a></li>
<li><a href="/maintenance-moteur/suppression-adblue">Suppression AdBlue</a></li>
<li><a href="/maintenance-moteur/traitement-egr">Traitement EGR & injecteurs</a></li>
<li><a href="/maintenance-moteur/voyants-moteur">Voyants moteur</a></li>
</ul></li>
<li><a href="/carrosserie" class="has-sub">Carrosserie</a><ul class="nav-submenu">
<li><a href="/carrosserie/carrosserie-auto">Carrosserie auto</a></li>
<li><a href="/carrosserie/peinture-automobile">Peinture automobile</a></li>
<li><a href="/carrosserie/pare-brise">Pare-brise</a></li>
</ul></li>
<li><a href="/location" class="has-sub">Location de véhicules</a><ul class="nav-submenu">
<li><a href="/location/utilitaires">Utilitaires</a></li>
<li><a href="/location/citadines">Citadines</a></li>
<li><a href="/location/vans-amenages">Vans aménagés</a></li>
<li><a href="/location/voiture-rallye">Voiture de rallye</a></li>
<li><a href="/location/vehicules-occasion">Véhicules d'occasion</a></li>
</ul></li>
<li><a href="/faq">FAQ</a></li>
<li><a href="/blog" style="color:var(--accent)">Blog</a></li>
</ul>
<div class="nav-cta"><a href="/contact" class="btn btn-outline">Contactez-nous</a><button class="menu-toggle" aria-label="Menu"><i class="fa-solid fa-bars"></i></button></div>
</nav></div></header>

<section class="page-hero">
  <div class="container"><div class="page-hero-inner">
    <nav class="breadcrumb"><a href="index.html">Accueil</a><i class="fa-solid fa-chevron-right"></i><span class="current">Blog</span></nav>
    <h1 class="page-title">Le blog <span class="accent">Garage Boost.</span></h1>
    <p class="page-lead">
      Guides techniques et pédagogiques pour mieux comprendre votre véhicule, anticiper les pannes et économiser
      sur l'entretien. Rédigés par notre équipe technique avec données 2026 vérifiées.
    </p>
    <!-- Mobile : select natif (compact) -->
    <div class="blog-filter-mobile">
      <i class="fa-solid fa-filter"></i>
      <select id="blogFilterSelect">
        <option value="all">Tous les articles</option>
        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('\n')}
      </select>
      <i class="fa-solid fa-chevron-down"></i>
    </div>

    <!-- Desktop : pills horizontales scrollables -->
    <div class="blog-filter-wrap">
      <div class="blog-filter">
        <button class="blog-filter-btn active" data-cat="all"><i class="fa-solid fa-grid-2"></i> Tous <span class="blog-filter-count">${articles.length}</span></button>
        ${categories.map(cat => {
          const count = articles.filter(a => a.category === cat).length;
          return `<button class="blog-filter-btn" data-cat="${cat}">${cat} <span class="blog-filter-count">${count}</span></button>`;
        }).join('\n')}
      </div>
    </div>
  </div></div>
</section>

<section style="padding:60px 0">
  <div class="container">
    <div class="blog-grid" id="blogGrid">
      ${cardsHTML}
    </div>
    <p id="blogEmpty" style="display:none;text-align:center;color:var(--text-muted);padding:40px 0">
      Aucun article dans cette catégorie pour le moment.
    </p>
  </div>
</section>

<script>
// Fonction de filtrage partagée
function filterBlog(cat) {
  let visible = 0;
  document.querySelectorAll('.blog-grid .blog-card').forEach(card => {
    const cardCat = card.dataset.cat;
    if (cat === 'all' || cardCat === cat) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  document.getElementById('blogEmpty').style.display = visible === 0 ? 'block' : 'none';

  // Sync entre desktop pills et mobile select
  document.querySelectorAll('.blog-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  const sel = document.getElementById('blogFilterSelect');
  if (sel && sel.value !== cat) sel.value = cat;
}

// Pills desktop
document.querySelectorAll('.blog-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => filterBlog(btn.dataset.cat));
});

// Select mobile
const selectMobile = document.getElementById('blogFilterSelect');
if (selectMobile) selectMobile.addEventListener('change', e => filterBlog(e.target.value));
</script>

<section class="cta-banner">
  <div class="container">
    <div class="cta-inner">
      <div>
        <h2 class="cta-title">Une question pratique ?<br><span class="gradient-text">Notre équipe répond.</span></h2>
        <p class="cta-text">Au-delà des articles, notre équipe technique est disponible par téléphone, WhatsApp ou en atelier.</p>
      </div>
      <div class="cta-actions">
        <a href="contact.html" class="btn btn-primary">Nous contacter<span class="btn-arrow"><i class="fa-solid fa-arrow-right"></i></span></a>
        <a href="tel:+33663216350" class="btn btn-ghost"><i class="fa-solid fa-phone"></i> 06 63 21 63 50</a>
      </div>
    </div>
  </div>
</section>

<footer class="footer"><div class="container">
<div class="footer-bottom" style="border:none;padding:30px 0">
<div>© 2026 Garage Boost — Tous droits réservés</div>
<div><a href="mentions-legales.html">Mentions légales</a> · <a href="politique-confidentialite.html">Confidentialité</a> · Réalisé par <a href="https://pirabellabs.com" style="color:var(--accent)">Pirabel Labs</a>, agence web marketing et SEO</div>
</div>
</div></footer>

<a href="https://wa.me/33663216350" target="_blank" rel="noopener" class="wa-float" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
<script src="assets/js/main.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, 'blog.html'), blogIndexHTML);
console.log(`✓ blog.html (index) régénéré avec ${articles.length} articles`);
