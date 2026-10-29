# Brief rédaction — pages service × ville à contenu unique (garageboost.fr)

Site : Garage Boost, garage auto indépendant, 1 avenue des Pères Blancs, 13380 Plan-de-Cuques (près de Marseille). Dépôt : C:\Users\HP\garageboost.

## Ce que tu produis
Un fichier par commune : `generator/city-service-content/{slug}.js`, même structure EXACTE que le modèle `generator/city-service-content/gardanne.js` (lis-le en entier d'abord, c'est la référence de ton et de format). Une entrée par service listé pour la commune.

Champs par service :
- `title` : H2 propre à la commune (≤ 70 car.)
- `lead` : 1–2 phrases, réponse directe et locale
- `metaDesc` : ≤ 155 caractères, contient la commune et un prix réel
- `intro` : 2 paragraphes
- `sections` : 2 sections `{ h, p }`
- `faq` : 2 questions `{ q, a }` (texte brut, sans HTML)
Cible ≈ 300 mots uniques par service. HTML inline autorisé dans intro/sections (`<strong>`), pas de liens.

## Règles NON négociables
1. **Aucune invention** : pas de client, d'avis, de témoignage, de statistique, de nombre de véhicules, d'événement daté, de partenariat. Pas de « nos clients de X nous disent… ».
2. **Prix, durées, garanties** : uniquement ceux de `generator/data.js` (champs `price`, `pricingDesc`, `faq` du service). Dépannage-remorquage : 89 € < 10 km, 149 € < 25 km, au-delà 1,80 €/km, majoration 50 % nuit/dimanche/fériés — pour une commune éloignée, dis honnêtement que le remorquage au-delà de 25 km est facturé au km, sur devis.
3. **Contexte local** : uniquement à partir de l'entrée de la commune dans `generator/cities.js` (distance, travelTime, accessInfo, trafficNote, localContext, nearbyDistricts) + géographie notoire et stable (axes routiers, massifs, étangs, zones d'activités connues). En cas de doute sur un fait, ne l'écris pas.
4. **Légal** : jamais « suppression » AdBlue/FAP/EGR ; reprogrammation = « modifie les caractéristiques du véhicule, à déclarer à l'assureur, une hausse de puissance relève en principe d'une nouvelle homologation ». Grêle : garantie événements climatiques, franchise à charge, pas de malus, libre choix du réparateur (loi Hamon) ; jamais « 0 € ».
5. **Unicité** : chaque page doit être différente des autres pages du MÊME service (autres communes) ET des autres pages de la MÊME commune (autres services). Ne répète pas la même intro de ville d'un service à l'autre : prends un angle différent par service (usage des véhicules, trajets, type de panne, saison…). Évite les phrases-types réutilisables.
6. **Syntaxe JS** : chaînes entre guillemets doubles `"…"`, apostrophes françaises libres ; **jamais de guillemet double à l'intérieur d'un texte** (utilise « … »). Termine par `};`.
7. Pas d'emoji. Français soigné, ton du site (concret, rassurant, sans superlatifs creux).

## Vérification avant de rendre
`node -e "const m=require('./generator/city-service-content/{slug}.js');for(const[k,v] of Object.entries(m)){console.log(k,v.metaDesc.length,v.intro.length,v.sections.length,v.faq.length)}"` depuis C:\Users\HP\garageboost — doit s'exécuter sans erreur, metaDesc ≤ 155, et une entrée pour CHAQUE service demandé (slugs exacts).
Ne lance PAS `npm run generate` ni de commit : un autre agent s'en charge.

## Consigne renforcée (vague 2 et suivantes)
Plusieurs communes partagent maintenant le même service (ex. décalaminage-hydrogene, mecanique-generale, reprogrammation-moteur, nettoyage-fap). AVANT d'écrire un service, lis les entrées déjà existantes de ce MÊME service dans les autres fichiers de `generator/city-service-content/` et n'en reprends AUCUNE formulation : ni les phrases sur le prix, ni les explications techniques (calamine, cartographie, régénération…), ni les tournures de FAQ. Varie les questions de FAQ (pas toujours « combien de temps » / « faut-il… »). Le contrôle automatique rejette toute page dont plus de 25 % du texte (séquences de 8 mots) se retrouve sur une autre page.

## Règle équipements et engagements (vague 3)
N'affirme AUCUN équipement, outil, prestation ou engagement qui ne figure pas textuellement dans `generator/data.js` (ex. interdit : « banc de géométrie 3D », réglage de parallélisme, véhicule de courtoisie garanti). Avant de rendre, relis chacune de tes phrases du type « nous disposons de… », « notre atelier est équipé… », « nous réglons… », « offert… » et vérifie-la par une recherche dans data.js ; supprime-la si tu ne la trouves pas.
Pour les communes proches de l'atelier (≤ 25 km), le dépannage coûte 89 € à moins de 10 km et 149 € jusqu'à 25 km (data.js) : utilise le bon palier selon la distance de la commune dans cities.js.

## Vague 4 — diagnostic-moteur + neutralisation (2026-10-18)
1. **Ajouter une entrée `'diagnostic-moteur'`** dans le fichier de la commune (même structure que les autres entrées). Faits : service `diagnostic-moteur` de data.js (prix 49 €, offert si la réparation est validée chez Garage Boost, durée, outils cités dans data.js uniquement). 60+ communes auront cette page : l'angle DOIT être propre à la commune (type de trajets, panne typique liée à l'usage local, situation d'achat d'occasion, voyant en route sur un axe précis, etc.) et aucune formulation ne doit être reprise d'une autre page diagnostic-moteur existante (lis-les avant d'écrire).
2. **Neutraliser les généralités sur la population** dans TOUT le fichier de la commune : les phrases du type « beaucoup de voitures/foyers/conducteurs… », « de nombreux habitants… », « la plupart des conducteurs… », « X compte beaucoup de… » affirment un fait non vérifiable. Reformule-les en situation conditionnelle ou générique (« Une voiture qui dort dehors… », « Pour un foyer qui a deux voitures… », « Quand on roule surtout sur l'A51… ») sans changer le sens utile ni les prix. Ne modifie rien d'autre.

## Vague 5 — recentrage antipollution (2026-10-29)
Le garage se recentre sur **FAP, EGR, AdBlue, décalaminage, diagnostic, dépannage**. Il ne prend plus les pannes moteur lourdes (moteur à ouvrir, culasse, boîte) ni l'électronique complexe (faisceaux, calculateurs, multiplexage).
1. **Services de la vague** : `gestion-adblue`, `traitement-egr`, `nettoyage-fap`. Ajouter l'entrée dans le fichier existant de la commune (ne rien modifier d'autre dans le fichier). Faits et prix UNIQUEMENT depuis data.js :
   - gestion-adblue : diagnostic du système SCR dès 90 € (déduit en cas de réparation), réparation 90-690 € selon le composant (capteur de qualité, sonde NOx, pompe, injecteur AdBlue, décristallisation), devis avant intervention, garantie 12 mois.
   - traitement-egr : vanne EGR 180-290 € (démontage, ultrason, joints neufs) ; injecteurs 120-220 € (additif) ou 290-490 € (démontage + bain ultrason).
   - nettoyage-fap : dès 250 € régénération chimique sans démontage (90 min), 390-650 € démontage + bain ultrason (1-2 jours), diagnostic préalable inclus.
2. **Légal AdBlue/FAP/EGR (absolu)** : jamais « suppression », « désactivation », « OFF », « défapage », « reprogrammation pour rouler sans AdBlue », « rouler sans AdBlue », « bouchon/obturation EGR », « émulateur ». On parle de diagnostic, nettoyage, réparation, remise en conformité. Une phrase dissuasive est permise (« désactiver un organe antipollution est illégal, nous ne le faisons pas ») mais pas obligatoire, et jamais dans title/lead/metaDesc.
3. **Pas de promesse hors périmètre** : ne promets pas de remplacer/coder un calculateur, de chercher une panne dans un faisceau, ni de réparer moteur/turbo/boîte. Si le sujet s'y prête, une phrase du type « si la cause dépasse l'antipollution (moteur, électronique), nous vous le disons dès le diagnostic » est bienvenue (formule-la à ta façon).
4. **Angle local réel** (cities.js) : profil de trajets (rocade L2, A50, A51, A7, A55, routes de collines, trajets courts urbains, embouteillages) → c'est ce qui encrasse FAP/EGR ou fige l'AdBlue. Pas de statistique, pas de « beaucoup de diesels à X ». Tarif dépannage selon distance (89 € < 10 km, 149 € ≤ 25 km).
5. **Unicité** : avant d'écrire un service, lis TOUTES les entrées existantes de ce même service dans `generator/city-service-content/*.js` (nettoyage-fap en a ~20). D'autres rédacteurs écrivent en parallèle pour d'autres communes : varie fortement les angles, les titres, les questions de FAQ. Le contrôle rejette > 25 % de texte commun.
6. **Vague 5 lot 2 (communes > 25 km, 2026-10-29)** : mêmes règles. Dépannage : au-delà de 25 km, le remorquage est facturé 1,80 €/km sur devis (majoration 50 % nuit/dimanche/fériés) — dis-le honnêtement, ou oriente vers l'assistance du contrat. Indique le temps de trajet réel (cities.js) sans le minimiser. 26 communes ≤ 25 km ont déjà leurs pages AdBlue/EGR/FAP (vague 5 lot 1) : lis-les aussi et n'en reprends aucune formulation. Ne crée PAS de fichier salon-de-provence.js (l'URL est occupée par la page zone).
