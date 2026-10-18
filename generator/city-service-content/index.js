// =====================================================================
// Contenu UNIQUE des pages « service × ville » — un fichier par commune
// (generator/city-service-content/{slug-commune}.js), une entrée par service :
//
//   'reprogrammation-moteur': {
//     title: "H2 d'introduction propre à la commune",
//     lead: "1-2 phrases sous le H1 (réponse directe, locale)",
//     metaDesc: "≤ 155 caractères, propre à la commune",
//     intro: ["paragraphe", "paragraphe"],            // HTML inline autorisé
//     sections: [{ h: "Titre", p: "paragraphe" }, …],  // 2 à 3 sections
//     faq: [{ q: "…", a: "…" }, …]                     // 2 à 3, texte brut
//   }
//
// Règle éditoriale : uniquement des faits vérifiables (géographie, axes,
// contexte local déjà validé dans cities.js, tarifs de data.js). Jamais de
// client, d'avis, de chiffre ou d'événement inventé.
// Une commune > 25 km n'a de page service × ville QUE si son contenu existe
// ici (voir city-services.js) : écrire le contenu = remettre la page en ligne.
// =====================================================================
const fs = require('fs');
const path = require('path');

const content = {};
for (const f of fs.readdirSync(__dirname)) {
  if (!f.endsWith('.js') || f === 'index.js') continue;
  content[f.replace(/\.js$/, '')] = require(path.join(__dirname, f));
}

function getUniqueContent(citySlug, serviceSlug) {
  const c = content[citySlug] && content[citySlug][serviceSlug];
  return c && c.intro && c.intro.length && c.sections && c.sections.length ? c : null;
}

/** Services rédigés pour une commune (même hors topServices). */
function contentServices(citySlug) {
  return Object.keys(content[citySlug] || {}).filter(s => getUniqueContent(citySlug, s));
}

module.exports = { getUniqueContent, contentServices };
