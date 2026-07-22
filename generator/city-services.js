// =====================================================================
// Garage Boost — Source de vérité : quels services par ville ?
// =====================================================================
// PARTAGÉ par les trois étapes qui doivent rester d'accord :
//   - build-city-services.js  → GÉNÈRE les pages service × ville
//   - build-cities.js         → LIE ces pages depuis la page ville
//   - build-sitemap.js        → les DÉCLARE dans le sitemap
//
// Toute divergence entre ces trois-là produit des pages orphelines :
// générées et présentes dans le sitemap, mais sans aucun lien entrant,
// donc quasi jamais indexées par Google.
// (C'est exactement ce qui était arrivé aux 62 pages diagnostic-moteur ×
//  ville : ajoutées par CORE à la génération, mais absentes des liens.)
// =====================================================================

// Service socle proposé pour TOUTES les communes, en plus de leurs
// prestations les plus demandées localement.
const CORE = ['diagnostic-moteur'];

/**
 * Liste des services pour lesquels une page « service × ville » existe.
 * @param {{topServices?: string[]}} city
 * @returns {string[]} slugs de services, sans doublon
 */
function servicesForCity(city) {
  return [...new Set([...((city && city.topServices) || []), ...CORE])];
}

module.exports = { CORE, servicesForCity };
