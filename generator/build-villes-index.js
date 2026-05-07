// Page index "villes.html" listant toutes les villes desservies
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const cities = require('./cities.js');

const cityCardsHTML = cities.map(c => `
  <a class="why-card" href="villes/${c.slug}.html" style="text-decoration:none;display:block">
    <span class="why-num">${c.population}</span>
    <span class="why-icon"><i class="fa-solid fa-location-dot"></i></span>
    <h3 class="why-title">${c.name}</h3>
    <p class="why-desc">${c.distance} de notre atelier · ${c.travelTime} de trajet. Tous nos services sont disponibles pour les habitants de ${c.name}.</p>
    <span style="color:var(--accent);font-size:0.85rem;font-weight:600;display:inline-flex;align-items:center;gap:6px;margin-top:14px">Voir le détail <i class="fa-solid fa-arrow-right"></i></span>
  </a>
`).join('\n');

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Villes desservies | Garage Boost Marseille — 19 villes en Provence</title>
<meta name="description" content="Garage Boost intervient dans 19 villes de la métropole Aix-Marseille-Provence : Marseille, Aubagne, Vitrolles, Aix-en-Provence, Salon-de-Provence, Toulon et plus.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://garageboost.fr/villes.html">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="assets/css/style.css">
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
<a href="index.html" class="logo"><span class="logo-text">Garage</span><span class="logo-text logo-text-bold">B<span class="logo-leaf"><i class="fa-solid fa-bolt"></i></span>ost</span></a>
<ul class="nav-menu">
<li><a href="tarifs.html">Tarifs</a></li>
<li><a href="rendez-vous.html">Prise de rendez-vous</a></li>
<li><a href="entretien-assistance.html">Entretien & assistance</a></li>
<li><a href="maintenance-moteur.html">Maintenance moteur</a></li>
<li><a href="carrosserie.html">Carrosserie</a></li>
<li><a href="location.html">Location</a></li>
<li><a href="faq.html">FAQ</a></li>
<li><a href="blog.html">Blog</a></li>
</ul>
<div class="nav-cta"><a href="contact.html" class="btn btn-outline">Contactez-nous</a></div>
</nav></div></header>

<section class="page-hero">
  <div class="container"><div class="page-hero-inner">
    <nav class="breadcrumb">
      <a href="index.html">Accueil</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span class="current">Villes desservies</span>
    </nav>
    <h1 class="page-title"><span class="accent">19 villes</span> de Provence desservies.</h1>
    <p class="page-lead">
      Garage Boost intervient dans toute la métropole Aix-Marseille-Provence et au-delà, depuis notre atelier de
      Plan-de-Cuques. Cliquez sur votre ville pour découvrir nos services localisés, tarifs, et modalités de récupération à domicile.
    </p>
  </div></div>
</section>

<section style="padding:60px 0">
  <div class="container">
    <div class="why-grid-3">
      ${cityCardsHTML}
    </div>
  </div>
</section>

<section class="cta-banner">
  <div class="container">
    <div class="cta-inner">
      <div>
        <h2 class="cta-title">Votre ville n'est pas listée ?<br><span class="gradient-text">Contactez-nous.</span></h2>
        <p class="cta-text">Nous étudions chaque demande au cas par cas, y compris pour les zones plus éloignées (Var, Vaucluse, Alpes-Maritimes).</p>
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

fs.writeFileSync(path.join(ROOT, 'villes.html'), html);
console.log(`✓ villes.html généré (index des ${cities.length} villes)`);
