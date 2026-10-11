// =====================================================================
// Résumé « En bref » d'un article — source unique partagée par
// build-articles.js (encadré + JSON-LD "abstract") et build-llms-full.js.
//  - entrée dans article-tldr.js  → paragraphe
//  - sinon bloc <h2>En bref</h2><ul>…</ul> en tête du contenu → liste
//  - sinon l'extrait (excerpt) sert de résumé texte, sans encadré
// =====================================================================
const TLDR = require('./article-tldr.js');

const EN_BREF_RE = /<h2>En bref<\/h2>\s*(<ul>[\s\S]*?<\/ul>)/;
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function box(inner) {
  return `<aside class="article-tldr" aria-labelledby="tldr-title"><p class="article-tldr-title" id="tldr-title"><i class="fa-solid fa-bolt" aria-hidden="true"></i> En bref</p>${inner}</aside>`;
}

/**
 * @returns {{content: string, html: string, text: string}}
 *   content : contenu de l'article (bloc En bref retiré s'il y était)
 *   html    : encadré à insérer avant le contenu ('' si aucun)
 *   text    : résumé texte brut (abstract / llms)
 */
function summarize(article) {
  if (TLDR[article.slug]) {
    const t = TLDR[article.slug];
    return { content: article.content, html: box(`<p>${t}</p>`), text: t };
  }
  const m = article.content.match(EN_BREF_RE);
  if (m) {
    const text = [...m[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => strip(x[1])).join(' ');
    return { content: article.content.replace(m[0], ''), html: box(m[1]), text };
  }
  return { content: article.content, html: '', text: strip(article.excerpt) };
}

module.exports = { summarize };
