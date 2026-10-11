// =====================================================================
// Garage Boost — FAQPage JSON-LD de faq.html généré depuis la FAQ visible
// faq.html est écrit à la main : à chaque build, on relit toutes les
// questions affichées (.faq-q / .faq-a) et on régénère le balisage, pour
// que le schéma corresponde toujours exactement au contenu visible
// (exigence Google) et couvre toutes les questions (citations IA).
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'faq.html');

const decode = s => s
  .replace(/<[^>]+>/g, '')
  .replace(/&#8239;|&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'")
  .replace(/\s+/g, ' ').trim();

let html = fs.readFileSync(FILE, 'utf8');
const items = [];
const re = /<button class="faq-q">([\s\S]*?)<span class="faq-icon">[\s\S]*?<\/button>\s*<div class="faq-a">([\s\S]*?)<\/div>/g;
for (const m of html.matchAll(re)) items.push({ q: decode(m[1]), a: decode(m[2]) });

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(i => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }))
};
const block = '<script type="application/ld+json">\n' + JSON.stringify(schema, null, 1) + '\n</script>';

const existing = /<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@type":\s*"FAQPage"[\s\S]*?<\/script>/;
if (!existing.test(html)) throw new Error('faq-schema : bloc FAQPage introuvable dans faq.html');
html = html.replace(existing, block);
fs.writeFileSync(FILE, html);
console.log(`✓ faq.html : FAQPage régénéré (${items.length} questions)`);
