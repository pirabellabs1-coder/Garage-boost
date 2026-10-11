// =====================================================================
// Garage Boost — width/height sur toutes les <img> (anti-CLS)
// Sans dimensions, le navigateur ne réserve pas la place de l'image :
// la mise en page « saute » au chargement (Cumulative Layout Shift).
// On lit les vraies dimensions des fichiers locaux (WebP, PNG, JPEG, SVG)
// et on les ajoute aux <img> qui n'en ont pas. Le CSS (max-width:100%;
// height:auto / object-fit) garde l'affichage responsive.
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

function readSize(file) {
  const b = fs.readFileSync(file);
  // WebP
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (chunk === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21);
      return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  // PNG
  if (b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  // JPEG : parcours des segments jusqu'au SOF
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  // SVG : viewBox ou width/height
  const txt = b.toString('utf8', 0, Math.min(b.length, 2000));
  const vb = txt.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
  if (vb) return { w: Math.round(+vb[1]), h: Math.round(+vb[2]) };
  return null;
}

const sizeCache = new Map();
function sizeOf(src, htmlFile) {
  if (/^(https?:|data:)/.test(src)) return null;
  const clean = src.split(/[?#]/)[0];
  const abs = clean.startsWith('/') ? path.join(ROOT, clean) : path.resolve(path.dirname(htmlFile), clean);
  if (sizeCache.has(abs)) return sizeCache.get(abs);
  let size = null;
  try { if (fs.existsSync(abs)) size = readSize(abs); } catch { size = null; }
  sizeCache.set(abs, size);
  return size;
}

function listHtml(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['generator', 'node_modules', '.git', 'assets', 'api'].includes(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) listHtml(f, acc);
    else if (e.name.endsWith('.html')) acc.push(f);
  }
  return acc;
}

let files = 0, imgs = 0;
for (const f of listHtml(ROOT)) {
  const before = fs.readFileSync(f, 'utf8');
  const after = before.replace(/<img\b[^>]*>/g, tag => {
    if (/\swidth=/.test(tag) || /\sheight=/.test(tag)) return tag;
    const m = tag.match(/\ssrc="([^"]+)"/);
    const size = m && sizeOf(m[1], f);
    if (!size || !size.w || !size.h) return tag;
    imgs++;
    return tag.replace(/<img\b/, `<img width="${size.w}" height="${size.h}"`);
  });
  if (after !== before) { fs.writeFileSync(f, after); files++; }
}
console.log(`✓ Dimensions d'images : ${imgs} <img> complétées dans ${files} fichiers`);
