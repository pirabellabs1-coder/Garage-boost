// =====================================================================
// Garage Boost — Source de vérité : quels services par ville ?
// =====================================================================
// PARTAGÉ par les étapes qui doivent rester d'accord :
//   - build-city-services.js  → GÉNÈRE les pages service × ville
//   - build-cities.js         → LIE ces pages depuis la page ville
//   - build.js                → LIE ces pages depuis le hub service
//   - build-sitemap.js        → les DÉCLARE dans le sitemap
//
// Toute divergence produit des pages orphelines (générées, dans le
// sitemap, mais sans lien entrant) ou des liens cassés.
//
// Élagage du 2026-10-11 (décision client) : les ~340 pages service × ville
// partageaient ~50 % de texte (risque « scaled content »). On ne génère
// plus de page service × ville que pour les communes à ≤ 25 km de
// l'atelier, et seulement pour leurs topServices (plus de socle
// diagnostic-moteur pour toutes). Les URL retirées sont redirigées en 301
// vers la fiche ville (voir vercel.json, bloc « élagage service × ville »).
// Les fiches des communes éloignées lient alors les pages ZONE du service.
// =====================================================================

const NEAR_KM = 25;

/** Distance routière en km depuis l'atelier (« Sur place » = 0). */
function distanceKm(city) {
  if (/sur place/i.test(String(city.distance))) return 0;
  const n = parseFloat(String(city.distance).replace(',', '.'));
  return Number.isFinite(n) ? n : Infinity;
}

/** La commune a-t-elle des pages service × ville dédiées ? */
function hasCityServicePages(city) {
  return distanceKm(city) <= NEAR_KM;
}

/**
 * Liste des services pour lesquels une page « service × ville » existe.
 * @param {{topServices?: string[], distance?: string}} city
 * @returns {string[]} slugs de services, sans doublon
 */
function servicesForCity(city) {
  if (!city || !hasCityServicePages(city)) return [];
  return [...new Set(city.topServices || [])];
}

module.exports = { NEAR_KM, distanceKm, hasCityServicePages, servicesForCity };
