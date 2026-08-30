import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Garage Boost <noreply@garageboost.fr>';
const TO_GARAGE = 'masgarage7@gmail.com';
const CC_GARAGE = [];
const SITE = 'https://garageboost.fr';

// =====================================================================
// Anti-spam / anti-abus (défense en profondeur)
// Un formulaire public non protégé peut être inondé par des bots :
// milliers d'envois → quota Resend épuisé + réputation d'expéditeur abîmée.
// =====================================================================
const ALLOWED_ORIGINS = [
  'https://garageboost.fr',
  'https://www.garageboost.fr',
];
const MIN_FILL_MS = 3000;              // remplissage < 3 s = bot
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // page ouverte > 2 h = périmé/replay
const MAX_FIELD_LEN = 3000;            // champ anormalement long = spam
const RATE_IP_BURST = { max: 3, windowMs: 5 * 60 * 1000 };  // 3 / 5 min / IP
const RATE_IP_HOUR = { max: 8, windowMs: 60 * 60 * 1000 };  // 8 / h / IP
const GLOBAL_HOURLY_CAP = 60;          // disjoncteur : envois max / h / instance

// Stores en mémoire (best-effort, par instance chaude). Pour un plafonnage
// global fiable multi-instances, brancher Vercel KV / Upstash (voir README).
const ipHits = new Map(); // ip -> [timestamps]
let globalHits = [];      // [timestamps] de la dernière heure

const prune = (arr, windowMs, now) => arr.filter((t) => now - t < windowMs);

function clientIp(req) {
  // Sur Vercel, x-vercel-forwarded-for / x-real-ip sont posés par la plateforme
  // (non spoofables). x-forwarded-for est, lui, fourni par le client : s'y fier
  // laisserait un bot forger une IP aléatoire par requête et neutraliser le
  // rate-limit par IP. On n'utilise donc QUE les sources de confiance.
  const trusted = req.headers['x-vercel-forwarded-for'] || req.headers['x-real-ip'];
  if (trusted) return String(trusted).split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function originAllowed(req) {
  const allow = new Set(
    [...ALLOWED_ORIGINS, process.env.ALLOWED_ORIGIN].filter(Boolean)
  );
  const origin = req.headers.origin;
  if (origin) return allow.has(origin);
  // Pas d'Origin : on retombe sur le Referer (les navigateurs l'envoient
  // sur un POST de formulaire ; un bot en POST direct n'a souvent ni l'un ni l'autre).
  const ref = req.headers.referer || req.headers.referrer;
  if (ref) return [...allow].some((o) => ref === o || ref.startsWith(o + '/'));
  return false;
}

function looksSpammy(data) {
  const vals = Object.entries(data)
    .filter(([k]) => !k.startsWith('_') && k !== 'cf-turnstile-response')
    .map(([, v]) => String(v || ''));
  if (vals.some((v) => v.length > MAX_FIELD_LEN)) return true;
  const blob = vals.join(' \n ');
  if (blob.length > 8000) return true;
  // Un lien dans un message de contact garage = signal de spam très fiable.
  if (/(https?:\/\/|www\.|\[url|<a\s|\bhref=)/i.test(blob)) return true;
  if (/\b(viagra|cialis|casino|crypto|bitcoin|forex|loan|escort|porn|seo\s|backlinks?|payday)\b/i.test(blob)) return true;
  // Trop d'URLs/BBCode encodés
  if ((blob.match(/xn--|%[0-9a-f]{2}/gi) || []).length > 6) return true;
  return false;
}

function rateLimited(ip, now) {
  let hits = prune(ipHits.get(ip) || [], RATE_IP_HOUR.windowMs, now);
  const burst = hits.filter((t) => now - t < RATE_IP_BURST.windowMs);
  if (burst.length >= RATE_IP_BURST.max) return true;
  if (hits.length >= RATE_IP_HOUR.max) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      if (!prune(v, RATE_IP_HOUR.windowMs, now).length) ipHits.delete(k);
    }
  }
  return false;
}

function globalCapped(now) {
  globalHits = prune(globalHits, 60 * 60 * 1000, now);
  if (globalHits.length >= GLOBAL_HOURLY_CAP) return true;
  globalHits.push(now);
  return false;
}

// Cloudflare Turnstile (CAPTCHA invisible, gratuit, RGPD-friendly).
// Actif uniquement si TURNSTILE_SECRET_KEY est défini côté serveur.
async function turnstileOk(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // non configuré → couche ignorée
  if (!token) return false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const j = await r.json();
    return !!j.success;
  } catch (e) {
    console.error('Turnstile verify error:', e);
    return false;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Neutralise les sauts de ligne avant injection dans un sujet d'email.
const oneLine = (s = '') => String(s).replace(/[\r\n]+/g, ' ').trim();

const escape = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );

const SHELL = (title, bodyHtml) => `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0a0e0c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f3f5f1">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0e0c;padding:32px 16px">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#141a17;border:1px solid #232b27;border-radius:16px;overflow:hidden">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#BDE32D 0%,#8bb821 100%);padding:28px 32px;text-align:left">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="vertical-align:middle">
                  <div style="display:inline-block;background:#0a0e0c;width:44px;height:44px;border-radius:10px;text-align:center;line-height:44px;vertical-align:middle">
                    <span style="color:#BDE32D;font-size:24px;font-weight:900">⚡</span>
                  </div>
                  <span style="display:inline-block;vertical-align:middle;margin-left:12px;font-size:22px;font-weight:900;color:#0a0e0c;letter-spacing:-0.5px">GARAGE BOOST</span>
                </td>
                <td style="text-align:right;color:#0a0e0c;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;vertical-align:middle">
                  Plan-de-Cuques · 13380
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px">
            ${bodyHtml}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#10161300;border-top:1px solid #232b27;padding:24px 32px;text-align:center;color:#9ba39a;font-size:12px;line-height:1.6">
            <div style="margin-bottom:8px">
              <a href="tel:+33663216350" style="color:#BDE32D;text-decoration:none;font-weight:700">06 63 21 63 50</a> ·
              <a href="mailto:masgarage7@gmail.com" style="color:#BDE32D;text-decoration:none;font-weight:700">masgarage7@gmail.com</a>
            </div>
            <div style="color:#5a605c">
              1 Avenue des Pères Blancs · 13380 Plan-de-Cuques · Marseille
            </div>
            <div style="margin-top:12px">
              <a href="${SITE}" style="color:#5a605c;text-decoration:none;font-size:11px">garageboost.fr</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

const FIELD = (label, value) => value
  ? `<tr>
      <td style="padding:12px 0;border-bottom:1px dashed #232b27;font-size:11px;color:#9ba39a;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;width:160px;vertical-align:top">${escape(label)}</td>
      <td style="padding:12px 0;border-bottom:1px dashed #232b27;font-size:14px;color:#f3f5f1;vertical-align:top">${escape(value)}</td>
    </tr>`
  : '';

function buildOwnerEmail(d, type) {
  const isRdv = type === 'rdv';
  const title = isRdv ? 'Nouvelle demande de rendez-vous' : 'Nouveau message contact';
  const fullname = `${d['Prénom'] || ''} ${d['Nom'] || ''}`.trim();

  const fields = [
    FIELD('Service', d['Service']),
    FIELD('Prénom', d['Prénom']),
    FIELD('Nom', d['Nom']),
    FIELD('Email', d['Email']),
    FIELD('Téléphone', d['Téléphone']),
    FIELD('Véhicule', d['Véhicule']),
    FIELD('Année', d['Année']),
    FIELD('Kilométrage', d['Kilométrage']),
    FIELD('Date préférée', d['Date']),
    FIELD('Plage horaire', d['Plage']),
    FIELD('Sujet', d['Sujet']),
    FIELD('Message', d['Message']),
    FIELD('Précisions', d['Précisions']),
  ].filter(Boolean).join('');

  const body = `
    <div style="background:#1c2420;border-left:3px solid #BDE32D;padding:14px 18px;border-radius:8px;margin-bottom:24px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#BDE32D;font-weight:700;margin-bottom:4px">${isRdv ? 'Demande RDV' : 'Contact'}</div>
      <div style="font-size:20px;font-weight:800;color:#ffffff;line-height:1.3">${escape(title)}</div>
      ${fullname ? `<div style="margin-top:6px;color:#9ba39a;font-size:14px">de <strong style="color:#f3f5f1">${escape(fullname)}</strong></div>` : ''}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      ${fields}
    </table>

    <div style="margin-top:28px;padding:16px;background:#1c2420;border-radius:10px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#BDE32D;font-weight:700;margin-bottom:8px">Actions rapides</div>
      ${d['Téléphone'] ? `<a href="tel:${escape(d['Téléphone'].replace(/\s/g,''))}" style="display:inline-block;margin-right:10px;background:#BDE32D;color:#0a0e0c;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px">📞 Appeler</a>` : ''}
      ${d['Email'] ? `<a href="mailto:${escape(d['Email'])}" style="display:inline-block;background:transparent;border:1px solid #BDE32D;color:#BDE32D;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px">✉️ Répondre</a>` : ''}
    </div>
  `;

  return SHELL(title, body);
}

function buildCustomerEmail(d, type) {
  const isRdv = type === 'rdv';
  const fullname = `${d['Prénom'] || ''} ${d['Nom'] || ''}`.trim();
  const greeting = fullname ? `Bonjour ${escape(fullname.split(' ')[0])},` : 'Bonjour,';

  const summary = isRdv ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:16px">
      ${FIELD('Service', d['Service'])}
      ${FIELD('Date préférée', d['Date'])}
      ${FIELD('Plage horaire', d['Plage'])}
      ${FIELD('Véhicule', d['Véhicule'])}
    </table>
  ` : '';

  const body = `
    <div style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:8px">${greeting}</div>

    <p style="color:#f3f5f1;font-size:15px;line-height:1.6;margin:0 0 16px">
      ${isRdv
        ? 'Nous avons bien reçu votre demande de rendez-vous. <strong style="color:#BDE32D">Nous vous répondons sous 2 heures ouvrées</strong> par SMS, email ou WhatsApp avec la confirmation officielle.'
        : 'Nous avons bien reçu votre message. <strong style="color:#BDE32D">Nous vous répondons sous 2 heures ouvrées</strong>.'
      }
    </p>

    ${summary ? `
      <div style="background:#1c2420;border-left:3px solid #BDE32D;padding:16px 18px;border-radius:8px;margin:20px 0">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#BDE32D;font-weight:700;margin-bottom:8px">Récapitulatif</div>
        ${summary}
      </div>
    ` : ''}

    <p style="color:#9ba39a;font-size:14px;line-height:1.6;margin:20px 0 0">
      Pour toute urgence ou modification, appelez-nous directement au
      <a href="tel:+33663216350" style="color:#BDE32D;text-decoration:none;font-weight:700">06 63 21 63 50</a>
      ou écrivez sur WhatsApp <a href="https://wa.me/33663216350" style="color:#25D366;text-decoration:none;font-weight:700">cliquez ici</a>.
    </p>

    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #232b27;color:#9ba39a;font-size:14px">
      À très vite,<br>
      <strong style="color:#f3f5f1">L'équipe Garage Boost</strong>
    </div>
  `;

  return SHELL('Confirmation de votre demande - Garage Boost', body);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let data = req.body;
  if (typeof data === 'string') {
    try { data = Object.fromEntries(new URLSearchParams(data)); } catch {}
  }
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const type = data._type === 'rdv' ? 'rdv' : 'contact';
  const now = Date.now();
  const ip = clientIp(req);

  // Rejet silencieux : on renvoie un "succès" apparent SANS envoyer d'email.
  // Le bot croit avoir réussi, aucun quota Resend consommé, aucun feedback exploitable.
  const drop = (reason) => {
    console.warn(`[form] blocked (${reason})`, ip, req.headers.origin || req.headers.referer || '-');
    return res.redirect(303, `/merci.html?type=${type}`);
  };

  // 1) Honeypots (champs invisibles ; un humain ne les remplit jamais)
  if (data._honey || data.website || data.url) return drop('honeypot');

  // 2) Même origine uniquement (bloque les POST directs / cross-site des bots)
  if (!originAllowed(req)) return drop('origin');

  // 3) Piège temporel (soumission quasi instantanée = bot)
  const ts = Number(data._ts);
  if (ts && (now - ts < MIN_FILL_MS || now - ts > MAX_AGE_MS)) return drop('timetrap');

  // 4) Heuristiques de contenu (liens, mots-clés spam, champs surdimensionnés)
  if (looksSpammy(data)) return drop('content');

  // 5) Cloudflare Turnstile (si configuré)
  if (!(await turnstileOk(data['cf-turnstile-response'], ip))) return drop('turnstile');

  // 6) Limitation de débit + disjoncteur global (protège le quota Resend)
  if (rateLimited(ip, now)) {
    console.warn('[form] rate limited', ip);
    return res.redirect(303, `/merci.html?type=${type}&error=1`);
  }
  if (globalCapped(now)) {
    console.error('[form] GLOBAL HOURLY CAP atteint — attaque probable, envois suspendus');
    return res.redirect(303, `/merci.html?type=${type}&error=1`);
  }

  const customerEmail = (data['Email'] || '').trim();

  try {
    // To garage
    const who = oneLine(`${data['Prénom'] || ''} ${data['Nom'] || ''}`);
    const owner = await resend.emails.send({
      from: FROM,
      to: TO_GARAGE,
      cc: CC_GARAGE.length ? CC_GARAGE : undefined,
      replyTo: EMAIL_RE.test(customerEmail) ? customerEmail : undefined,
      subject: type === 'rdv'
        ? `🛠️ Nouvelle demande de RDV — ${who}`.trim()
        : `✉️ Nouveau message contact — ${who}`.trim(),
      html: buildOwnerEmail(data, type),
    });

    // Accusé de réception au client — envoyé UNIQUEMENT si l'email garage est
    // bien parti (sinon le formulaire deviendrait un relais d'envoi vers des
    // adresses arbitraires). Désactivable via DISABLE_AUTORESPONSE=1.
    let customer = { data: null, error: null };
    const autoRespond = process.env.DISABLE_AUTORESPONSE !== '1';
    if (autoRespond && !(owner && owner.error) && EMAIL_RE.test(customerEmail)) {
      customer = await resend.emails.send({
        from: FROM,
        to: customerEmail,
        subject: type === 'rdv'
          ? 'Confirmation de votre demande de rendez-vous — Garage Boost'
          : 'Confirmation de votre message — Garage Boost',
        html: buildCustomerEmail(data, type),
      });
    }

    // Le SDK Resend ne throw PAS : il faut vérifier .error
    if (owner && owner.error) {
      console.error('Resend owner error:', owner.error);
      return res.redirect(303, `/merci.html?type=${type}&error=1`);
    }
    return res.redirect(303, `/merci.html?type=${type}`);
  } catch (err) {
    console.error('Resend exception:', err);
    return res.redirect(303, '/merci.html?type=' + type + '&error=1');
  }
}
