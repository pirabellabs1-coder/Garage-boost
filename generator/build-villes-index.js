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
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0a0e0c">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Villes desservies | Garage Boost Marseille — ${cities.length} villes en Provence</title>
<meta name="description" content="Garage Boost intervient dans ${cities.length} villes de la métropole Aix-Marseille-Provence : Marseille, Aubagne, Vitrolles, Aix-en-Provence, Salon-de-Provence, Toulon et plus.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://garageboost.fr/villes.html">

<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/roboto-900.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/poppins-400.woff2" crossorigin>
<link rel="preload" href="/assets/fa/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/assets/fa/css/all.min.css"></noscript>
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
<li><a href="/maintenance-moteur/gestion-adblue">Gestion AdBlue</a></li>
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
<li><a href="/blog">Blog</a></li>
</ul>
<div class="nav-cta"><a href="/contact" class="btn btn-outline">Contactez-nous</a><button class="menu-toggle" aria-label="Menu"><i class="fa-solid fa-bars"></i></button></div>
</nav></div></header>

<section class="page-hero">
  <div class="container"><div class="page-hero-inner">
    <nav class="breadcrumb">
      <a href="index.html">Accueil</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span class="current">Villes desservies</span>
    </nav>
    <h1 class="page-title"><span class="accent">${cities.length} villes</span> de Provence desservies.</h1>
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
