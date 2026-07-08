import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Garage Boost <noreply@garageboost.fr>';
const TO_GARAGE = 'masgarage7@gmail.com';
const CC_GARAGE = [];
const SITE = 'https://garageboost.fr';

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

  // Honeypot
  if (data._honey) return res.redirect(303, '/merci.html');

  const type = data._type === 'rdv' ? 'rdv' : 'contact';
  const customerEmail = (data['Email'] || '').trim();

  try {
    // To garage
    const owner = await resend.emails.send({
      from: FROM,
      to: TO_GARAGE,
      cc: CC_GARAGE.length ? CC_GARAGE : undefined,
      replyTo: customerEmail || undefined,
      subject: type === 'rdv'
        ? `🛠️ Nouvelle demande de RDV — ${data['Prénom'] || ''} ${data['Nom'] || ''}`.trim()
        : `✉️ Nouveau message contact — ${data['Prénom'] || ''} ${data['Nom'] || ''}`.trim(),
      html: buildOwnerEmail(data, type),
    });

    // Auto-response to customer
    let customer = { data: null, error: null };
    if (customerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
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
