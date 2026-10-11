// Génère llms.txt (résumé) + llms-full.txt (index détaillé) pour les IAs
// Tout est dérivé des données (data.js, cities.js, articles.js) : plus de
// fichier écrit à la main qui diverge du site (communes, liens .html…).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const data = require('./data.js');
const zones = require('./zones.js');
const cities = require('./cities.js');
const articles = require('./articles.js');
const BASE = 'https://garageboost.fr';

const strip = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const firstSentence = s => { const t = strip(s); const m = t.match(/^.{40,260}?[.!?](\s|$)/); return m ? m[0].trim() : t.slice(0, 220); };
const { summarize } = require('./article-summary.js');
const articleSummary = a => summarize(a).text;
const byModified = [...articles].sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified));

const SUMMARY = "Garage Boost est un garage automobile indépendant situé à Plan-de-Cuques (13380), commune limitrophe de Marseille (Bouches-du-Rhône). Il réalise l'entretien et la réparation toutes marques : maintenance moteur et anti-pollution, reprogrammation, mécanique générale, carrosserie et débosselage grêle, dépannage, et propose la location de véhicules.";

const COORDS = `- **Nom** : Garage Boost
- **Adresse** : 1 Avenue des Pères Blancs, 13380 Plan-de-Cuques, France (à environ 15 minutes du centre de Marseille)
- **Téléphone** : +33 6 63 21 63 50
- **WhatsApp** : https://wa.me/33663216350
- **Email** : masgarage7@gmail.com
- **Horaires atelier** : du lundi au samedi, 8h-19h ; dépannage 7j/7
- **Coordonnées GPS** : 43.3486, 5.4632
- **Note Google** : 4,9/5 (127 avis)
`;

const ENGAGEMENTS = `- Devis gratuit sous 24 heures ouvrées, validation écrite avant toute intervention
- Garantie 12 mois pièces et main-d'œuvre (24 mois sur les reprogrammations et la peinture)
- Pièces qualité d'origine ou équivalente
- Paiement en 3 ou 4 fois sans frais au-delà de 500 €
- Récupération du véhicule à domicile, offerte au-delà de 200 € d'intervention
- Entretien en garage indépendant sans perte de la garantie constructeur (plan d'entretien respecté)
- Pas de suppression ni de désactivation d'organes antipollution (AdBlue, FAP, EGR) : diagnostic et réparation uniquement
`;

const BRANDS = 'Renault, Peugeot, Citroën, Volkswagen, Audi, BMW, Mercedes, Ford, Opel, Fiat, Toyota, Honda, Nissan, Hyundai, Kia, Mazda, Volvo, Skoda, Seat, Dacia, Mini, Land Rover, Jeep, Porsche.';

const mainPages = [
  { url: '/', title: 'Accueil', desc: 'présentation du garage, des 4 catégories de services et des zones desservies' },
  { url: '/tarifs', title: 'Tarifs', desc: 'grille tarifaire détaillée par prestation' },
  { url: '/rendez-vous', title: 'Prise de rendez-vous', desc: 'formulaire en ligne' },
  { url: '/contact', title: 'Contact', desc: 'téléphone, WhatsApp, email, plan d\'accès' },
  { url: '/faq', title: 'FAQ', desc: 'questions fréquentes (reprogrammation, anti-pollution, mécanique, carrosserie, dépannage, tarifs, garanties)' },
  { url: '/villes', title: 'Villes desservies', desc: `${cities.length} communes avec page dédiée` },
  { url: '/blog', title: 'Blog', desc: `${articles.length} guides pratiques sur l'entretien et la réparation automobile` }
];

// ---------------------------------------------------------------- llms-full
let out = `# Garage Boost — garage automobile à Plan-de-Cuques, près de Marseille

> ${SUMMARY}

## Coordonnées

${COORDS}
## Pages essentielles

${mainPages.map(p => `- [${p.title}](${BASE}${p.url}) — ${p.desc}`).join('\n')}

## Services et tarifs

`;

for (const [catSlug, cat] of Object.entries(data.categories)) {
  out += `### ${cat.label}\n\n[Page catégorie](${BASE}/${catSlug})\n\n`;
  for (const [serviceSlug, service] of Object.entries(cat.services)) {
    out += `#### ${service.name}\n\n`;
    out += `- **URL** : ${BASE}/${catSlug}/${serviceSlug}\n`;
    out += `- **Tarif** : ${strip(service.price)} — ${strip(service.pricingDesc)}\n`;
    out += `- **En résumé** : ${firstSentence(service.lead)}\n`;
    if (service.faq && service.faq.length) {
      const f = service.faq.find(q => q && q.q && q.a);
      if (f) out += `- **Question fréquente** : ${strip(f.q)} — ${strip(f.a)}\n`;
    }
    out += `- **Pages locales** : ${zones.map(z => `[${z.label}](${BASE}/${catSlug}/${serviceSlug}/${z.slug})`).join(' · ')}\n\n`;
  }
}

out += `## Guides et articles (${articles.length})\n\n`;
for (const a of byModified) {
  out += `### ${strip(a.title)}\n\n`;
  out += `- **URL** : ${BASE}/blog/${a.slug}\n`;
  out += `- **Mis à jour** : ${a.dateModified}\n`;
  out += `- **Résumé** : ${articleSummary(a)}\n\n`;
}

out += `## Villes desservies (${cities.length} pages dédiées)\n\n`;
for (const city of cities) {
  out += `### ${city.name}\n\n`;
  out += `- **URL** : ${BASE}/villes/${city.slug}\n`;
  out += `- **Distance depuis l'atelier** : ${city.distance} (${city.travelTime})\n`;
  out += `- **Quartiers desservis** : ${city.nearbyDistricts.join(', ')}\n\n`;
}

out += `## Marques travaillées

${BRANDS}

## Engagements et garanties

${ENGAGEMENTS}`;

fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), out);
console.log(`✓ llms-full.txt généré (${Math.round(out.length / 1024)} Ko, ${out.split('\n').length} lignes)`);

// --------------------------------------------------------------- llms.txt
let short = `# Garage Boost

> ${SUMMARY}

## Informations clés

${COORDS}
## Services (tarifs indicatifs)

`;
for (const [catSlug, cat] of Object.entries(data.categories)) {
  short += `### ${cat.label}\n\n`;
  for (const [serviceSlug, service] of Object.entries(cat.services)) {
    short += `- [${service.name}](${BASE}/${catSlug}/${serviceSlug}) — ${strip(service.price)}\n`;
  }
  short += '\n';
}

short += `## Guides les plus récents

${byModified.slice(0, 12).map(a => `- [${strip(a.title)}](${BASE}/blog/${a.slug}) — ${articleSummary(a)}`).join('\n')}
- [Tous les guides](${BASE}/blog)

## Zone d'intervention

Métropole Aix-Marseille-Provence et au-delà (Bouches-du-Rhône, Var, Vaucluse, Alpes-Maritimes). ${cities.length} communes avec page dédiée : ${cities.map(c => c.name).join(', ')}.

## Pages principales

${mainPages.map(p => `- [${p.title}](${BASE}${p.url})`).join('\n')}

## Engagements

${ENGAGEMENTS}
## Plus de détails

Index complet et structuré : [llms-full.txt](${BASE}/llms-full.txt)
`;

fs.writeFileSync(path.join(ROOT, 'llms.txt'), short);
console.log(`✓ llms.txt généré (${Math.round(short.length / 1024)} Ko)`);
