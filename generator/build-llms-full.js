// Génère llms-full.txt avec toutes les pages détaillées pour les IAs
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const data = require('./data.js');
const zones = require('./zones.js');
const cities = require('./cities.js');
const BASE = 'https://garageboost.fr';

let out = `# Garage Boost Marseille — Index complet pour LLMs

> Garage automobile indépendant à Plan-de-Cuques (13380 Marseille) spécialisé en maintenance moteur, anti-pollution, reprogrammation, carrosserie, dépannage et location. Note Google 4,9/5 sur 127+ avis. Toutes marques.

## Coordonnées

- **Adresse** : 1 Avenue des Pères Blancs, 13380 Plan-de-Cuques, France
- **Téléphone** : +33 6 63 21 63 50
- **Email** : masgarage7@gmail.com
- **GPS** : 43.3486, 5.4632
- **Horaires** : Lun-Sam 8h-19h, dépannage 7j/7

## Pages essentielles

`;

// Pages principales
const mainPages = [
  { url: '/', title: 'Accueil', desc: 'Page d\'accueil avec présentation des 4 catégories de services et zones desservies' },
  { url: '/tarifs.html', title: 'Tarifs', desc: 'Grille tarifaire complète avec 46 prix sur 5 catégories' },
  { url: '/rendez-vous.html', title: 'Prise de rendez-vous', desc: 'Formulaire en ligne, sélection service, créneau, confirmation sous 2h' },
  { url: '/contact.html', title: 'Contact', desc: 'Téléphone, WhatsApp, email, formulaire, carte Google Maps' },
  { url: '/faq.html', title: 'FAQ', desc: '30 questions sur 7 thèmes (reprogrammation, anti-pollution, mécanique, carrosserie, dépannage, tarifs, garanties)' },
  { url: '/villes.html', title: 'Villes desservies', desc: `${cities.length} communes avec pages dédiées` }
];

mainPages.forEach(p => {
  out += `- [${p.title}](${BASE}${p.url}) — ${p.desc}\n`;
});

out += '\n## Catégories de services\n\n';

const categoryDescs = {
  'maintenance-moteur': '8 services moteur et anti-pollution (diagnostic, décalaminage hydrogène, FAP, EGR, catalyseur, reprogrammation Stage 1/2, AdBlue, voyants moteur)',
  'entretien-assistance': '7 services d\'entretien et dépannage (mécanique générale, électricité auto, dépannage 7j/7, scooter, ouverture véhicule, reproduction clés, enlèvement épaves)',
  'carrosserie': '3 services carrosserie (carrosserie auto, peinture cabine, pare-brise avec calibrage ADAS)',
  'location': '5 services location (citadines, utilitaires, vans aménagés, voiture rallye, véhicules occasion certifiés)'
};

for (const [catSlug, cat] of Object.entries(data.categories)) {
  out += `### ${cat.label}\n\n`;
  out += `${categoryDescs[catSlug] || ''}\n\n`;
  out += `[Page catégorie](${BASE}/${catSlug}.html)\n\n`;

  for (const [serviceSlug, service] of Object.entries(cat.services)) {
    out += `#### ${service.name}\n\n`;
    out += `- **URL** : ${BASE}/${catSlug}/${serviceSlug}.html\n`;
    out += `- **Tarif** : ${service.price}\n`;
    out += `- **Description** : ${service.lead.replace(/<[^>]+>/g, '').substring(0, 200)}\n`;
    out += `- **Pages locales** : ${zones.map(z => `[${z.label}](${BASE}/${catSlug}/${serviceSlug}/${z.slug}.html)`).join(' · ')}\n\n`;
  }
}

out += `## Villes desservies (${cities.length} pages dédiées)\n\n`;
for (const city of cities) {
  out += `### ${city.name}\n\n`;
  out += `- **URL** : ${BASE}/villes/${city.slug}.html\n`;
  out += `- **Population** : ${city.population}\n`;
  out += `- **Distance** : ${city.distance} (${city.travelTime})\n`;
  out += `- **Quartiers desservis** : ${city.nearbyDistricts.join(', ')}\n`;
  out += `- **Services les plus demandés** : ${city.topServices.join(', ')}\n\n`;
}

out += `## Marques travaillées

Renault, Peugeot, Citroën, Volkswagen, Audi, BMW, Mercedes, Ford, Opel, Fiat, Toyota, Honda, Nissan, Hyundai, Kia, Mazda, Volvo, Skoda, Seat, Dacia, Mini, Land Rover, Jeep, Porsche.

## Engagements & Garanties

- Devis gratuit sous 24h ouvrées
- Garantie 12 mois pièces et main-d'œuvre (24 mois reprogrammations)
- Pièces qualité OEM exclusivement
- Tarifs -30 à -40% vs concession
- Paiement 3 ou 4 fois sans frais au-delà de 500€
- Récupération à domicile dans toute la zone Marseille (offerte au-delà de 200€)
- Compte-rendu écrit systématique
- Note 4,9/5 sur 127+ avis Google vérifiés

## Mots-clés sémantiques

garage Marseille, garage Plan-de-Cuques, mécanicien Marseille, reprogrammation moteur, décalaminage hydrogène, nettoyage FAP, suppression AdBlue, traitement EGR, carrosserie auto, peinture cabine, pare-brise, calibrage ADAS, dépannage auto 7j/7, remorquage Marseille, ouverture véhicule, reproduction clé, location utilitaire, location van aménagé, voiture rallye, occasion certifiée.
`;

fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), out);
const size = Math.round(out.length / 1024);
console.log(`✓ llms-full.txt généré (${size} Ko, ${out.split('\n').length} lignes)`);
