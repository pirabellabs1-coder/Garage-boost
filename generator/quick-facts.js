// =====================================================================
// Bandeau « réponse rapide » sous le H1 des pages services (hub, zone,
// ville) : prix, devis, lieu. Lisible d'un coup d'œil par le visiteur et
// facilement citable par les moteurs IA (réponse directe en tête de page).
// =====================================================================
function quickFacts(service, place) {
  const where = place ? `Pour ${place} · atelier à Plan-de-Cuques (13380)` : 'Atelier à Plan-de-Cuques (13380), près de Marseille';
  const facts = [
    ['tag', `Tarif : ${service.price}`],
    ['file-invoice', 'Devis gratuit sous 24 h'],
    ['location-dot', where]
  ];
  return `<ul class="quick-facts" aria-label="L'essentiel">${facts.map(([icon, txt]) =>
    `<li><i class="fa-solid fa-${icon}" aria-hidden="true"></i> ${txt}</li>`).join('')}</ul>`;
}

module.exports = { quickFacts };
