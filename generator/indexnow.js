// =====================================================================
// Garage Boost — Soumission IndexNow (Bing, Yandex, Naver, Seznam)
// =====================================================================
// Lit sitemap.xml et soumet toutes les URLs à l'API IndexNow.
// Usage : npm run indexnow            (toutes les URLs du sitemap)
//         npm run indexnow -- /contact /villes/marseille   (URLs ciblées)
// =====================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'garageboost.fr';
const BASE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// --- Clé -------------------------------------------------------------
const keyFile = path.join(__dirname, '.indexnow-key');
if (!fs.existsSync(keyFile)) {
  console.error('✗ Clé IndexNow introuvable (generator/.indexnow-key).');
  process.exit(1);
}
const KEY = fs.readFileSync(keyFile, 'utf8').trim();
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

if (!fs.existsSync(path.join(ROOT, `${KEY}.txt`))) {
  console.error(`✗ Le fichier de clé ${KEY}.txt est absent de la racine du site.`);
  process.exit(1);
}

// --- URLs ------------------------------------------------------------
const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
let urlList;

if (args.length) {
  urlList = args.map(u => (u.startsWith('http') ? u : `${BASE}${u.startsWith('/') ? '' : '/'}${u}`));
} else {
  const smPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(smPath)) {
    console.error('✗ sitemap.xml introuvable. Lance d’abord : node generator/build-all.js');
    process.exit(1);
  }
  const sm = fs.readFileSync(smPath, 'utf8');
  urlList = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
}

if (!urlList.length) {
  console.error('✗ Aucune URL à soumettre.');
  process.exit(1);
}

// --- Envoi (IndexNow accepte 10 000 URLs max par requête) -------------
const CHUNK = 10000;

async function submit(chunk, i, total) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: chunk };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => '');
  const label = total > 1 ? ` (lot ${i + 1}/${total})` : '';

  // 200 = accepté, 202 = accepté, validation de la clé en attente
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ ${chunk.length} URLs soumises${label} — HTTP ${res.status}`);
    return true;
  }
  console.error(`✗ Échec${label} — HTTP ${res.status} ${text ? '· ' + text.slice(0, 300) : ''}`);
  if (res.status === 403) {
    console.error('  → Clé refusée : vérifie que ' + KEY_LOCATION + ' répond 200 et contient exactement la clé.');
  }
  if (res.status === 422) {
    console.error('  → URLs non conformes au host déclaré, ou clé absente du fichier.');
  }
  return false;
}

(async () => {
  console.log(`IndexNow → ${HOST}`);
  console.log(`  clé      : ${KEY}`);
  console.log(`  keyLocation : ${KEY_LOCATION}`);
  console.log(`  URLs     : ${urlList.length}`);

  const chunks = [];
  for (let i = 0; i < urlList.length; i += CHUNK) chunks.push(urlList.slice(i, i + CHUNK));

  let ok = true;
  for (let i = 0; i < chunks.length; i++) {
    // Jusqu'à 3 tentatives : juste après publication de la clé, l'API peut
    // répondre "SiteVerificationNotCompleted" le temps qu'elle soit lue.
    let done = false;
    for (let attempt = 1; attempt <= 3 && !done; attempt++) {
      if (attempt > 1) {
        console.log(`  ↻ nouvelle tentative ${attempt}/3 dans 10 s…`);
        await new Promise(r => setTimeout(r, 10000));
      }
      done = await submit(chunks[i], i, chunks.length);
    }
    if (!done) ok = false;
  }

  // exitCode plutôt que process.exit() : laisse Node fermer proprement les
  // connexions HTTP encore ouvertes (sinon assertion libuv sous Windows).
  process.exitCode = ok ? 0 : 1;
})();
