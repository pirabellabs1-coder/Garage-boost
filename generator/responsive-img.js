// =====================================================================
// Garage Boost — Images adaptées au mobile (srcset)
// Les photos font 1280 px de large : un téléphone n'en affiche que ~400.
// Pour chaque WebP de assets/img plus large que 800 px, on crée une
// variante « -800w.webp » (une seule fois, avec sharp) et on ajoute
// srcset/sizes aux <img> : le navigateur prend la plus légère adaptée.
// Variantes commitées ; sharp n'est requis que pour une nouvelle image
// (`npm i --no-save sharp`).
// =====================================================================
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const IMG = path.join(ROOT, 'assets/img');
const W = 800;

function webpWidth(file) {
  const b = fs.readFileSync(file);
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return 1 + b.readUIntLE(24, 3);
  if (chunk === 'VP8 ') return b.readUInt16LE(26) & 0x3fff;
  if (chunk === 'VP8L') return (b.readUInt32LE(21) & 0x3fff) + 1;
  return 0;
}

const sources = fs.readdirSync(IMG).filter(f => f.endsWith('.webp') && !f.endsWith(`-${W}w.webp`));
const missing = [];
const widths = {};
for (const f of sources) {
  const w = webpWidth(path.join(IMG, f));
  if (w <= W) continue;
  widths[f] = w;
  if (!fs.existsSync(path.join(IMG, f.replace(/\.webp$/, `-${W}w.webp`)))) missing.push(f);
}

function srcsetAttrs(file, prefix) {
  const small = file.replace(/\.webp$/, `-${W}w.webp`);
  return `${prefix}srcset="/assets/img/${small} ${W}w, /assets/img/${file} ${widths[file]}w" ${prefix}sizes="(max-width: 900px) 100vw, ${W}px"`;
}

function addSrcset() {
  const listHtml = (dir, acc = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['generator', 'node_modules', '.git', 'assets', 'api'].includes(e.name)) continue;
      const f = path.join(dir, e.name);
      if (e.isDirectory()) listHtml(f, acc);
      else if (e.name.endsWith('.html')) acc.push(f);
    }
    return acc;
  };
  let files = 0, imgs = 0;
  for (const f of listHtml(ROOT)) {
    const before = fs.readFileSync(f, 'utf8');
    let after = before.replace(/<img\b[^>]*>/g, tag => {
      if (/\ssrcset=/.test(tag)) return tag;
      const m = tag.match(/\ssrc="\/assets\/img\/([^"?#]+\.webp)"/);
      if (!m || !widths[m[1]] || missing.includes(m[1])) return tag;
      imgs++;
      return tag.replace(/\ssrc="[^"]+"/, s => `${s} ${srcsetAttrs(m[1], '')}`);
    });
    // Préchargement d'une image de la page (couverture d'article) : même choix
    // que le <img>, sinon le navigateur télécharge deux fois l'image
    after = after.replace(/<link rel="preload" as="image" href="\/assets\/img\/([^"?#]+\.webp)"(?![^>]*imagesrcset)[^>]*>/g, (tag, file) => {
      if (!widths[file] || missing.includes(file) || !new RegExp(`<img[^>]*src="/assets/img/${file}"`).test(after)) return tag;
      return tag.replace(/>$/, ` ${srcsetAttrs(file, 'image')}>`);
    });
    if (after !== before) { fs.writeFileSync(f, after); files++; }
  }
  console.log(`✓ Images responsive : ${imgs} <img> avec srcset dans ${files} fichiers`);
}

if (!missing.length) addSrcset();
else {
  let sharp;
  try { sharp = require('sharp'); } catch {
    console.warn(`⚠ Images responsive : ${missing.length} variante(s) ${W}w manquante(s) (${missing.join(', ')}). Lancer \`npm i --no-save sharp\` puis relancer le build. Ces images restent servies en pleine taille.`);
    addSrcset();
    return;
  }
  const done = require('child_process').spawnSync(process.execPath, ['-e', `
    const sharp = require('sharp'), path = require('path');
    Promise.all(${JSON.stringify(missing)}.map(f => sharp(path.join(${JSON.stringify(IMG)}, f)).resize(${W}).webp({ quality: 70 }).toFile(path.join(${JSON.stringify(IMG)}, f.replace(/\\.webp$/, '-${W}w.webp')))))
      .then(() => console.log('✓ ${missing.length} variante(s) ${W}w créée(s)'));
  `], { stdio: 'inherit', cwd: ROOT });
  if (done.status === 0) missing.length = 0;
  addSrcset();
}
