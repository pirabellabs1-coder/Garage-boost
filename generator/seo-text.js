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

/** Phrases entières jusqu'à `max` caractères (au moins la première). */
function firstSentences(text, max = 200) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  const parts = s.match(/[^.!?]+[.!?]+(\s|$)/g) || [s];
  let out = '';
  for (const p of parts) {
    if (out && (out + p).trim().length > max) break;
    out += p;
  }
  return out.trim();
}

/** Extrait coupé sur un mot entier, suivi de « … » s'il a été raccourci. */
function excerpt(text, max = 120) {
  const s = String(text || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, s.lastIndexOf(' ', max)).replace(/[,;:–—-]\s*$/, '') + '…';
}

/** « de » + nom de commune avec élision/contraction : d'Aubagne, du Puy…, des Pennes… */
function deVille(name) {
  if (/^Le /.test(name)) return 'du ' + name.slice(3);
  if (/^Les /.test(name)) return 'des ' + name.slice(4);
  if (/^[AEIOUYÉÈÊÂÎH]/i.test(name)) return "d'" + name;
  return 'de ' + name;
}
/** « à » + nom de commune : au Puy…, aux Pennes…, à Aubagne */
function aVille(name) {
  if (/^Le /.test(name)) return 'au ' + name.slice(3);
  if (/^Les /.test(name)) return 'aux ' + name.slice(4);
  return 'à ' + name;
}

module.exports = { fitTitle, clampMeta, firstSentences, excerpt, deVille, aVille, TITLE_MAX, META_MAX };
