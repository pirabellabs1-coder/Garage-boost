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
const { getUniqueContent } = require('./city-service-content');

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
  if (!city) return [];
  const top = [...new Set(city.topServices || [])];
  if (hasCityServicePages(city)) return top;
  // Communes > 25 km : page remise en ligne seulement avec un contenu UNIQUE
  // (remise en ligne par vagues, 2026-10-13 — voir city-service-content/)
  return top.filter(s => getUniqueContent(city.slug, s));
}

// ---------------------------------------------------------------------
// Fusion zone → ville (2026-10-11) : une page « service × zone » est
// supprimée (301) quand une commune NOMMÉE dans le libellé de la zone a sa
// propre page pour ce service (ex. « Mécanique — Aubagne, La Ciotat &
// Cassis » doublonnait « Mécanique à Aubagne »). On privilégie la 1re ville
// de la zone (zone.firstCity), puis l'ordre du libellé.
// Tous les liens vers une page zone passent par localServiceSlug().
// ---------------------------------------------------------------------
const zones = require('./zones.js');
const cities = require('./cities.js');
const cityByName = new Map(cities.map(c => [c.name, c]));

/** Slug de la commune qui absorbe la page zone, ou null si la page zone est conservée. */
function zoneMergeTarget(serviceSlug, zoneSlug) {
  const zone = zones.find(z => z.slug === zoneSlug);
  if (!zone) return null;
  const named = zone.label.split(/, | & /).map(s => s.trim());
  const order = [zone.firstCity, ...named.filter(n => n !== zone.firstCity)];
  for (const name of order) {
    const c = cityByName.get(name);
    if (c && c.slug !== zone.slug && servicesForCity(c).includes(serviceSlug)) return c.slug;
  }
  return null;
}

/** Dernier segment d'URL de la page locale à lier pour (service, zone). */
function localServiceSlug(serviceSlug, zoneSlug) {
  return zoneMergeTarget(serviceSlug, zoneSlug) || zoneSlug;
}

/** Libellé à afficher pour ce lien (nom de la commune si fusionnée). */
function localServiceLabel(serviceSlug, zone) {
  const t = zoneMergeTarget(serviceSlug, zone.slug);
  return t ? cities.find(c => c.slug === t).name : zone.label;
}

module.exports = { NEAR_KM, distanceKm, hasCityServicePages, servicesForCity, zoneMergeTarget, localServiceSlug, localServiceLabel };
