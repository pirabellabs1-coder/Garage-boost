// =====================================================================
// Longueurs SEO : titles ≤ 60 caractères, meta descriptions ≤ 158.
// Au-delà, Google tronque l'affichage ("…") et réécrit souvent le snippet.
// =====================================================================
const TITLE_MAX = 60;
const META_MAX = 158;

/** Premier candidat qui tient dans la limite ; à défaut le plus court. */
function fitTitle(...candidates) {
  const list = candidates.filter(Boolean).map(s => String(s).replace(/\s+/g, ' ').trim());
  return list.find(t => t.length <= TITLE_MAX) || list.reduce((a, b) => (b.length < a.length ? b : a));
}

/** Coupe proprement une description : fin de phrase, sinon dernier mot + « … ». */
function clampMeta(text, max = META_MAX) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const head = s.slice(0, max);
  const end = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '));
  if (end >= 90) return head.slice(0, end + 1);
  return head.slice(0, head.lastIndexOf(' ')).replace(/[,;:–—-]\s*$/, '') + '…';
}

module.exports = { fitTitle, clampMeta, TITLE_MAX, META_MAX };
