# Protection anti-spam du formulaire (`/api/form`)

Suite à une attaque (milliers d'envois → quota Resend épuisé), le endpoint est
protégé par plusieurs couches. **Tout est déjà actif sans configuration.**

## Couches actives par défaut (aucune action requise)

1. **Honeypots** — champs invisibles `_honey` et `website` : si remplis → rejet.
2. **Même origine** — seuls les POST venant de `garageboost.fr` sont acceptés
   (bloque les POST directs / cross-site des bots).
3. **Piège temporel** — champ `_ts` : une soumission en moins de 3 s est un bot.
4. **Heuristiques de contenu** — liens dans le message, mots-clés spam, champs
   surdimensionnés → rejet.
5. **Limitation de débit** — 3 envois / 5 min et 8 / h par IP ; disjoncteur
   global à 60 envois / h par instance (protège le quota Resend).
6. **Accusé de réception sécurisé** — envoyé au client seulement si l'email
   garage est parti (évite d'utiliser le formulaire comme relais de spam).

Les envois bloqués renvoient un « succès » apparent **sans** consommer de quota.

## Recommandé : activer Cloudflare Turnstile (CAPTCHA invisible, gratuit)

C'est la protection définitive contre les bots. 3 étapes :

1. Créer un widget Turnstile (gratuit) : <https://dash.cloudflare.com/?to=/:account/turnstile>
   → récupérer **Site Key** (publique) et **Secret Key** (privée).
2. Coller la **Site Key** dans `data-sitekey="..."` du `<div id="cf-ts">` de
   `contact.html` **et** `rendez-vous.html`. Le widget s'affiche alors tout seul.
3. Ajouter la **Secret Key** dans Vercel → Settings → Environment Variables :
   `TURNSTILE_SECRET_KEY = <secret>`. Redéployer.

Le CSP autorise déjà `challenges.cloudflare.com`. Tant que ces clés ne sont pas
posées, la couche Turnstile est simplement ignorée (les autres restent actives).

## Variables d'environnement (Vercel)

| Variable | Rôle | Défaut |
|---|---|---|
| `RESEND_API_KEY` | Clé Resend (obligatoire) | — |
| `TURNSTILE_SECRET_KEY` | Active la vérification Turnstile | absent = couche ignorée |
| `ALLOWED_ORIGIN` | Origine supplémentaire autorisée (ex. domaine de preview) | — |
| `DISABLE_AUTORESPONSE` | `1` = ne pas envoyer l'accusé de réception (économise le quota en cas d'attaque) | envoi actif |

## À faire côté comptes après une attaque

- **Roter la clé Resend** (`RESEND_API_KEY`) si elle a pu fuiter, et vérifier que
  le compte n'est pas suspendu / le quota rétabli.
- Surveiller les logs Vercel : les rejets sont tracés `[form] blocked (...)`, et
  le disjoncteur global loggue `GLOBAL HOURLY CAP atteint`.

## Limite connue

La limitation de débit est **en mémoire** (par instance serverless). Pour un
plafonnage global fiable multi-instances, brancher **Vercel KV / Upstash Redis**
(remplacer `ipHits`/`globalHits` par un compteur Redis). Non nécessaire tant que
Turnstile est actif.
