// =====================================================================
// FAQ par article (contenu unique + schema FAQPage / rich results Google)
// Réponses en texte brut (réutilisées en visuel ET en JSON-LD).
// =====================================================================
module.exports = {

  'decalaminage-hydrogene-guide-complet': [
    { q: "Le décalaminage hydrogène est-il efficace sur tous les moteurs ?", a: "Il est surtout efficace sur les moteurs réellement encrassés : diesels à usage urbain, essence à injection directe (TSI, THP, EcoBoost), véhicules de plus de 80 000 km. Sur un moteur récent peu encrassé, le gain est plus modeste. Un diagnostic préalable permet d'évaluer le bénéfice attendu." },
    { q: "Combien de temps dure l'effet d'un décalaminage ?", a: "L'effet est durable tant que les causes d'encrassement ne reviennent pas. En usage urbain à Marseille, on recommande un décalaminage d'entretien tous les 30 000 km. En usage mixte ou autoroutier, tous les 50 000 km suffisent généralement." },
    { q: "Le décalaminage peut-il abîmer mon moteur ?", a: "Non, c'est l'un des procédés les plus doux : l'hydrogène est consommé par la combustion et ne laisse aucun résidu. Sur un moteur très encrassé, des résidus peuvent se détacher et allumer brièvement un voyant, qui s'efface après 100-200 km. C'est rare et bénin." },
    { q: "Quel est le prix d'un décalaminage hydrogène à Marseille ?", a: "Chez Garage Boost à Plan-de-Cuques, à partir de 89 € pour les motorisations jusqu'à 1.6L, 119 € jusqu'à 2.5L, 149 € au-delà. Le diagnostic OBD avant/après est inclus." }
  ],

  'nettoyage-fap-methodes-comparees': [
    { q: "Quelle méthode de nettoyage FAP choisir ?", a: "La régénération chimique sans démontage (90 min, dès 250 €) convient pour un FAP saturé à moins de 80 %. Au-delà, le démontage + bain ultrason haute température (1-2 jours, 390-650 €) récupère même les filtres très colmatés, jusqu'à 95 % de la capacité d'origine." },
    { q: "Nettoyer ou remplacer mon FAP ?", a: "Dans 90 % des cas, le nettoyage suffit et coûte 70 % moins cher qu'un FAP neuf (1 200 à 2 500 €). Le remplacement ne s'impose que si le support céramique est fondu ou cassé, ce que notre diagnostic identifie avant toute intervention." },
    { q: "Combien de temps tient un FAP nettoyé ?", a: "60 000 à 100 000 km en moyenne. En usage urbain pur (typique de Marseille), comptez plutôt 40 000 km ; en usage mixte ou autoroutier, jusqu'à 120 000 km. Un trajet autoroutier mensuel prolonge nettement la durée de vie." },
    { q: "Le voyant FAP s'éteint-il après le nettoyage ?", a: "Oui dans la grande majorité des cas, après la régénération et l'effacement des codes défauts. Si une autre cause persiste (vanne EGR, débitmètre), elle doit être traitée à part pour éviter un nouveau colmatage." }
  ],

  'reprogrammation-moteur-stage-1-tout-savoir': [
    { q: "La reprogrammation Stage 1 est-elle fiable ?", a: "Oui, si elle reste dans les marges de sécurité OEM (température échappement, pression turbo, débit injecteurs). Nos cartographies sont développées en interne et validées sur banc. La cartographie d'origine est sauvegardée pour un retour stock à tout moment." },
    { q: "Combien de gain de puissance espérer en Stage 1 ?", a: "Sur diesel turbo : +25 à 35 % de couple et +15 à 20 % de puissance. Sur essence turbo : +20 à 30 % de couple. Sur essence atmosphérique, les gains sont plus modestes (+5 à 10 %)." },
    { q: "La reprogrammation augmente-t-elle la consommation ?", a: "Au contraire : en éco-conduite, le couple disponible plus tôt permet de moins solliciter le moteur, d'où une économie de 0,5 à 1,5 L/100 km. C'est l'une des principales motivations de nos clients, avant même le gain de performance." },
    { q: "La reprogrammation est-elle légale ?", a: "Elle est légale en France pour un usage privé ou circuit, mais doit être déclarée à l'assureur et aux Mines pour rester en règle sur route. Nos cartos respectent les seuils Euro 5/6 ; nous remettons un certificat technique." }
  ],

  'adblue-comprendre-pannes-courantes': [
    { q: "Pourquoi mon voyant AdBlue s'allume-t-il ?", a: "Les causes fréquentes : réservoir vide (simple appoint), cristallisation de l'AdBlue, injecteur SCR encrassé, sonde NOx défaillante, ou calculateur SCR en défaut. Un diagnostic électronique identifie précisément l'origine avant tout remplacement coûteux." },
    { q: "Que se passe-t-il si je roule sans AdBlue ?", a: "Le véhicule passe en mode dégradé puis refuse de redémarrer une fois le réservoir vide (obligation antipollution). Il faut alors faire l'appoint et parfois forcer une réinitialisation via valise diagnostic." },
    { q: "Combien coûte une réparation du système AdBlue ?", a: "De l'appoint simple (quelques euros) au remplacement d'une sonde NOx ou d'un injecteur SCR (200 à 600 € selon la pièce et le véhicule). Le diagnostic préalable évite de changer une pièce inutilement." },
    { q: "Peut-on supprimer le système AdBlue ?", a: "C'est illégal sur route en France (sanction au contrôle technique et perte d'homologation). Nous ne pratiquons pas la suppression hors usage compétition. La réparation reste la seule solution conforme." }
  ],

  'vanne-egr-symptomes-prix': [
    { q: "Quels sont les symptômes d'une vanne EGR encrassée ?", a: "Perte de puissance, ralenti instable, à-coups, fumée noire, voyant moteur, surconsommation et parfois échec au contrôle technique. Ces signes apparaissent surtout sur les diesels à usage urbain." },
    { q: "Faut-il nettoyer ou remplacer la vanne EGR ?", a: "Si elle est seulement encrassée, un nettoyage (à partir de ~150 €) suffit. Si le moteur électrique ou le clapet est HS, le remplacement s'impose (250 à 600 € selon le modèle). Le diagnostic tranche." },
    { q: "Peut-on rouler avec une vanne EGR défaillante ?", a: "C'est déconseillé : le mode dégradé limite la puissance et l'encrassement s'aggrave, pouvant endommager le turbo et le FAP en aval. Mieux vaut traiter rapidement pour éviter une facture plus lourde." },
    { q: "Le nettoyage EGR règle-t-il le voyant moteur ?", a: "Oui si la vanne était la cause. Nous effaçons les codes défauts après intervention et vérifions par essai routier. Si le voyant persiste, une autre cause est recherchée (sonde, débitmètre, FAP)." }
  ],

  'voyant-moteur-orange-8-causes': [
    { q: "Puis-je rouler avec le voyant moteur orange allumé ?", a: "Sur de courtes distances et en douceur, oui, mais il faut faire un diagnostic rapidement. Le voyant signale une anomalie qui, ignorée, évolue souvent vers une panne plus grave et plus coûteuse. S'il clignote, arrêtez-vous." },
    { q: "Combien coûte un diagnostic de voyant moteur ?", a: "Chez Garage Boost, le diagnostic électronique est à 49 €, offert si vous validez la réparation. Il lit tous les calculateurs, les codes défauts et les valeurs réelles pour identifier la cause racine." },
    { q: "Effacer le voyant suffit-il à régler le problème ?", a: "Non. Effacer le code sans traiter la cause ne fait que masquer le problème, qui réapparaît. Nous refusons cette pratique : on identifie la cause, on l'explique, puis on chiffre la réparation." },
    { q: "Quelles sont les causes les plus fréquentes ?", a: "Sonde lambda, vanne EGR, FAP saturé, bobine ou bougie d'allumage, débitmètre, capteur de pression, bouchon de réservoir mal serré, ou problème d'injection. Seul le diagnostic permet de trancher avec certitude." }
  ],

  'voiture-consomme-trop-12-raisons': [
    { q: "Pourquoi ma voiture consomme-t-elle soudainement plus ?", a: "Causes fréquentes : pneus sous-gonflés, moteur encrassé, sonde lambda ou débitmètre défaillant, FAP/EGR colmaté, filtre à air sale, injecteurs encrassés, ou simplement une conduite plus urbaine. Un diagnostic identifie la cause précise." },
    { q: "Le décalaminage réduit-il vraiment la consommation ?", a: "Sur un moteur encrassé, oui : généralement 0,5 à 1,5 L/100 km récupérés grâce à une combustion plus efficace. Sur un moteur déjà propre, le gain est marginal." },
    { q: "La pression des pneus influence-t-elle la consommation ?", a: "Nettement : 0,5 bar de sous-pression augmente la consommation de 0,3 à 0,5 L/100 km et use les pneus 30 % plus vite. C'est le geste gratuit le plus rentable, à vérifier une fois par mois." },
    { q: "À partir de quand s'inquiéter d'une surconsommation ?", a: "Au-delà de +10 à 15 % par rapport à votre moyenne habituelle, surtout si elle est soudaine. C'est souvent le signe d'un capteur ou d'un organe anti-pollution en défaut, à diagnostiquer sans tarder." }
  ],

  'fumee-noire-echappement': [
    { q: "Que signifie une fumée noire à l'échappement ?", a: "Sur un diesel, elle indique une combustion incomplète : excès de gazole ou manque d'air. Causes typiques : injecteurs encrassés, débitmètre HS, vanne EGR bloquée, turbo fatigué ou filtre à air colmaté." },
    { q: "La fumée noire est-elle dangereuse pour le moteur ?", a: "Elle révèle un dysfonctionnement qui encrasse le FAP et le catalyseur, et peut faire échouer le contrôle technique. Non traitée, elle entraîne souvent des réparations plus lourdes en aval." },
    { q: "Comment supprimer la fumée noire ?", a: "En traitant la cause : nettoyage ou remplacement des injecteurs, de la vanne EGR, du débitmètre, décalaminage du moteur. Un diagnostic précis évite de changer des pièces au hasard." },
    { q: "Fumée noire et contrôle technique : quel risque ?", a: "Une opacité excessive entraîne une contre-visite anti-pollution. Un décalaminage et le traitement de la cause permettent généralement de repasser le contrôle avec succès." }
  ],

  'distribution-moteur-quand-changer': [
    { q: "Tous les combien changer la courroie de distribution ?", a: "Selon le constructeur, généralement entre 100 000 et 160 000 km ou 5 à 7 ans, le premier des deux atteint. Consultez le carnet d'entretien : l'intervalle varie fortement selon le modèle et la motorisation." },
    { q: "Que risque-t-on si la distribution casse ?", a: "Sur la plupart des moteurs, la rupture entraîne la casse moteur (soupapes tordues, pistons abîmés), soit une facture de plusieurs milliers d'euros. C'est pourquoi le remplacement préventif est essentiel." },
    { q: "Combien coûte un kit de distribution ?", a: "Comptez généralement 400 à 900 € selon le véhicule, pose comprise. Il est recommandé de remplacer la pompe à eau en même temps si elle est entraînée par la courroie, pour mutualiser la main-d'œuvre." },
    { q: "Chaîne ou courroie : quelle différence d'entretien ?", a: "La chaîne de distribution est conçue pour durer plus longtemps mais n'est pas éternelle (tension, guides). Un bruit de cliquetis à froid doit être diagnostiqué rapidement pour éviter la casse." }
  ],

  'plaquettes-frein-signes-usure': [
    { q: "Comment savoir si mes plaquettes sont usées ?", a: "Signes typiques : grincement ou couinement au freinage, voyant d'usure, distance de freinage allongée, vibrations, ou témoin sonore continu. Un contrôle visuel de l'épaisseur confirme l'usure." },
    { q: "Tous les combien changer les plaquettes de frein ?", a: "En moyenne tous les 30 000 à 50 000 km, mais cela dépend fortement de la conduite et de l'usage urbain. À Marseille, les trajets en ville et les reliefs accélèrent l'usure." },
    { q: "Faut-il changer les disques en même temps ?", a: "Pas systématiquement. On change les disques s'ils sont sous la cote minimale, voilés ou rayés. Un contrôle de l'épaisseur des disques est fait à chaque remplacement de plaquettes." },
    { q: "Peut-on rouler avec des plaquettes usées ?", a: "C'est dangereux : au-delà de l'usure des plaquettes, on attaque les disques (réparation plus chère) et la distance de freinage augmente. À traiter dès les premiers signes." }
  ],

  'fap-nettoyage-vs-remplacement': [
    { q: "Nettoyage ou remplacement du FAP : comment décider ?", a: "Le nettoyage convient dans 90 % des cas et coûte 70 % moins cher. Le remplacement ne s'impose que si le support céramique est fondu ou fissuré. Notre diagnostic mesure la contre-pression et l'état réel du filtre avant de décider." },
    { q: "Quel est l'écart de prix entre les deux ?", a: "Nettoyage : 250 à 650 € selon la méthode. FAP neuf : 1 200 à 2 500 € en concession. Un FAP reconditionné (~50 % du prix neuf) est une option intermédiaire si le nettoyage est impossible." },
    { q: "Un FAP nettoyé est-il aussi efficace qu'un neuf ?", a: "Le nettoyage professionnel restaure jusqu'à 95 % de la capacité de filtration d'origine, suffisant pour passer le contrôle technique et rouler des dizaines de milliers de kilomètres." },
    { q: "Comment éviter que le FAP se rebouche ?", a: "Un trajet autoroutier mensuel de 30 km, des vidanges à l'heure avec une huile faible cendres, et le traitement rapide des causes amont (EGR, débitmètre). Un décalaminage périodique limite aussi l'arrivée de calamine." }
  ],

  'garage-independant-vs-concession': [
    { q: "Un garage indépendant est-il moins cher que la concession ?", a: "Oui, généralement 30 à 40 % moins cher à qualité équivalente, grâce à une structure plus légère et des achats directs de pièces OEM (Bosch, Valeo, Delphi). La différence est nette sur la main-d'œuvre." },
    { q: "L'entretien hors concession annule-t-il la garantie ?", a: "Non. Depuis le règlement européen, vous pouvez faire entretenir votre véhicule dans un garage indépendant sans perdre la garantie constructeur, à condition de respecter le plan d'entretien et d'utiliser des pièces de qualité équivalente." },
    { q: "Les garages indépendants utilisent-ils des pièces de qualité ?", a: "Les ateliers sérieux utilisent des pièces OEM ou de qualité équivalente (les mêmes fournisseurs que les constructeurs). Demandez toujours les références des pièces posées, c'est un gage de transparence." },
    { q: "Un indépendant peut-il faire les opérations sous garantie ?", a: "Pour l'entretien courant, oui. Pour les rappels constructeur ou réparations prises en charge sous garantie, la concession reste nécessaire. Pour tout le reste, l'indépendant est compétitif." }
  ],

  'stage-1-vs-stage-2': [
    { q: "Quelle différence entre Stage 1 et Stage 2 ?", a: "Le Stage 1 est une optimisation purement logicielle, sans modification mécanique : idéal pour 90 % des conducteurs. Le Stage 2 ajoute des modifications matérielles (downpipe, intercooler, admission) pour aller plus loin, réservé à un usage sportif." },
    { q: "Le Stage 1 suffit-il pour un usage quotidien ?", a: "Oui largement. Il améliore l'agrément (couple disponible plus tôt) et peut réduire la consommation en éco-conduite, tout en restant fiable dans les marges OEM. Le Stage 2 n'apporte rien d'utile en usage routier normal." },
    { q: "Quel budget pour un Stage 1 et un Stage 2 ?", a: "Stage 1 : 350 à 690 € selon la motorisation. Stage 2 : 690 à 990 € pour la cartographie, plus 500 à 2 000 € d'accessoires selon les choix matériels." },
    { q: "Le Stage 2 fatigue-t-il davantage le moteur ?", a: "Sollicité plus fort, il demande un entretien rigoureux et un usage adapté. C'est pourquoi nous le réservons aux véhicules destinés à la performance, avec accompagnement sur les pièces nécessaires." }
  ],

  'controle-anti-pollution-passer-sans-stress': [
    { q: "Pourquoi échoue-t-on au contrôle anti-pollution ?", a: "Le plus souvent à cause d'une opacité des fumées trop élevée (diesel) ou d'émissions excessives : FAP saturé, EGR encrassée, catalyseur fatigué, injecteurs ou sondes en défaut. Un diagnostic identifie la cause avant la contre-visite." },
    { q: "Que faire avant une contre-visite anti-pollution ?", a: "Un décalaminage hydrogène et le traitement de la cause (FAP, EGR, sondes) permettent de réduire fortement les émissions. Notre taux de réussite dépasse 90 % sur les contre-visites pollution." },
    { q: "Un décalaminage aide-t-il à passer le contrôle technique ?", a: "Oui : il réduit les émissions polluantes jusqu'à 70 % sur un moteur encrassé, ce qui suffit souvent à repasser le contrôle. Pour les cas plus lourds, le nettoyage FAP/catalyseur complète l'intervention." },
    { q: "Combien de temps avant le contrôle faut-il intervenir ?", a: "Idéalement 1 à 2 semaines avant, pour laisser le temps de rouler après l'intervention et de stabiliser le système. Cela laisse aussi une marge pour un éventuel ajustement." }
  ],

  'economiser-1000-euros-an-entretien': [
    { q: "Comment réduire son budget entretien automobile ?", a: "Privilégier l'entretien préventif (chaque euro préventif économise 4 à 8 € de réparation), choisir un garage indépendant (-30 à -40 % vs concession), surveiller pneus et vidanges, et traiter les voyants rapidement avant l'aggravation." },
    { q: "L'entretien préventif est-il vraiment rentable ?", a: "Oui : un décalaminage à 100 € évite un turbo à 1 500 €, une distribution à temps (700 €) évite un moteur HS à 5 000 €. Anticiper coûte toujours moins cher que réparer dans l'urgence." },
    { q: "Quels gestes gratuits font économiser le plus ?", a: "Vérifier la pression des pneus chaque mois, adopter une conduite souple, faire un trajet autoroutier mensuel pour le FAP, et tenir un carnet d'entretien à jour. Ces gestes réduisent consommation et usure." },
    { q: "Comment éviter les mauvaises surprises sur un devis ?", a: "Demandez un devis écrit détaillé, les références des pièces, et plusieurs avis pour les grosses réparations. Un atelier sérieux justifie chaque ligne et propose des options quand elles existent." }
  ],

  'zfe-marseille-2026-ce-qui-change': [
    { q: "Qu'est-ce que la ZFE de Marseille ?", a: "La Zone à Faibles Émissions de la métropole Aix-Marseille-Provence restreint progressivement la circulation des véhicules les plus polluants selon leur vignette Crit'Air, afin d'améliorer la qualité de l'air." },
    { q: "Quels véhicules sont concernés par la ZFE ?", a: "Les restrictions visent d'abord les véhicules les plus anciens (Crit'Air 5, 4 puis 3 selon le calendrier). Vérifiez la vignette Crit'Air de votre véhicule et le calendrier en vigueur sur le territoire métropolitain." },
    { q: "Comment garder mon véhicule conforme plus longtemps ?", a: "Un entretien anti-pollution rigoureux (FAP, EGR, décalaminage) maintient les émissions au plus bas. Cela ne change pas la vignette Crit'Air, mais garantit que le véhicule reste sain et passe le contrôle technique." },
    { q: "La reprogrammation change-t-elle la classification Crit'Air ?", a: "Non : la vignette Crit'Air dépend de la norme Euro d'homologation, pas de la cartographie. Nos reprogrammations respectent les seuils Euro 5/6 mais ne modifient pas le classement administratif." }
  ],

  'hydrogene-mecanique-revolution-propre': [
    { q: "Comment l'hydrogène nettoie-t-il un moteur ?", a: "Injecté dans l'admission, l'hydrogène (procédé HHO) réagit avec les dépôts de carbone pendant la combustion et les transforme en eau et CO₂, évacués par l'échappement. Le moteur est nettoyé de l'intérieur, sans démontage." },
    { q: "Le décalaminage hydrogène est-il écologique ?", a: "Oui : le rejet principal est de la vapeur d'eau, sans produit chimique nocif ni déchet polluant. C'est l'une des méthodes de dépollution moteur les plus respectueuses de l'environnement." },
    { q: "Quelle différence avec un additif chimique en bidon ?", a: "Les additifs agissent surtout en surface (injecteurs, soupapes). L'hydrogène nettoie en profondeur tout le circuit, de l'admission à l'échappement, EGR et turbo compris. L'effet est bien plus prononcé et durable." },
    { q: "L'hydrogène est-il l'avenir de la mécanique propre ?", a: "Pour le nettoyage moteur, c'est déjà une technologie mature et éprouvée. Comme carburant, l'hydrogène reste en développement, mais le décalaminage HHO illustre bien son potentiel pour réduire les émissions du parc existant." }
  ],

  'embrayage-signes-usure': [
    { q: "Quels sont les signes d'un embrayage usé ?", a: "Pédale qui patine (le régime monte sans que la voiture accélère), point de patinage très haut, à-coups, odeur de brûlé, difficulté à passer les vitesses. Ces signes s'aggravent progressivement." },
    { q: "Combien de temps dure un embrayage ?", a: "En moyenne 120 000 à 200 000 km, mais l'usage urbain et la conduite (démarrages en côte, demi-embrayage) influencent fortement. À Marseille, les reliefs et les bouchons l'usent plus vite." },
    { q: "Combien coûte un remplacement d'embrayage ?", a: "Généralement 500 à 1 200 € selon le véhicule, la main-d'œuvre étant importante (dépose de la boîte). On remplace le kit complet (disque, mécanisme, butée) en une seule intervention." },
    { q: "Peut-on rouler avec un embrayage qui patine ?", a: "C'est déconseillé : un embrayage qui patine s'use vite et peut endommager le volant moteur, augmentant la facture. Mieux vaut le diagnostiquer dès les premiers signes." }
  ],

  'calibrage-adas-pare-brise': [
    { q: "Pourquoi calibrer les ADAS après un changement de pare-brise ?", a: "Les caméras d'aide à la conduite (freinage d'urgence, régulateur adaptatif, lecture des panneaux) sont fixées au pare-brise. Après remplacement, elles doivent être recalibrées, sinon ces aides peuvent mal fonctionner et devenir dangereuses." },
    { q: "Le calibrage ADAS est-il obligatoire ?", a: "Oui sur les véhicules équipés : c'est une étape de sécurité indispensable après tout remplacement de pare-brise. Chez Garage Boost, le calibrage statique est inclus dans le tarif de remplacement." },
    { q: "Combien coûte un calibrage ADAS ?", a: "Beaucoup de centres le facturent 150 à 300 € en supplément. Nous l'incluons dans le tarif de remplacement du pare-brise sur les véhicules équipés, sans surcoût caché." },
    { q: "Mon impact est-il réparable sans changer le pare-brise ?", a: "Si l'impact fait moins de 2,5 cm, est hors champ de vision et à plus de 10 cm du bord, une réparation par injection de résine (49 €) suffit, sans calibrage nécessaire." }
  ],

  'garage-boost-10-ans-plan-de-cuques': [
    { q: "Depuis quand Garage Boost existe-t-il ?", a: "Garage Boost est implanté à Plan-de-Cuques (13380) depuis plus de 10 ans, avec plus de 5 000 véhicules passés à l'atelier et une note Google de 4,9/5 sur 127+ avis vérifiés." },
    { q: "Quelles prestations propose Garage Boost ?", a: "Maintenance moteur et anti-pollution (décalaminage, FAP, EGR, reprogrammation), entretien et dépannage, carrosserie/peinture/pare-brise, et location de véhicules. Toutes marques, toutes motorisations." },
    { q: "Quelle zone Garage Boost dessert-il ?", a: "Toute la métropole Aix-Marseille-Provence : Marseille, Allauch, Aubagne, La Ciotat, Cassis, Vitrolles, Marignane, Aix-en-Provence, Salon-de-Provence et plus, avec récupération du véhicule à domicile offerte au-delà de 200 € d'intervention." },
    { q: "Quels sont les horaires et contacts ?", a: "Ouvert du lundi au samedi de 8h à 19h, dépannage 7j/7. Téléphone et WhatsApp au 06 63 21 63 50, atelier au 1 Avenue des Pères Blancs, 13380 Plan-de-Cuques. Devis gratuit sous 24h." }
  ],

  'prix-revision-auto-marseille': [
    { q: "Quelle différence entre une révision et un contrôle technique ?", a: "La révision est un entretien préventif (vidange, filtres, contrôles) réalisé par un garage selon le carnet constructeur. Le contrôle technique est une inspection réglementaire obligatoire, réalisée par un centre agréé indépendant, qui vérifie la conformité et la sécurité du véhicule. Les deux sont complémentaires mais distincts." },
    { q: "Puis-je faire ma révision hors concession sans perdre la garantie ?", a: "Oui. Le règlement européen autorise l'entretien dans le garage de votre choix sans perte de garantie constructeur, à condition de respecter le plan d'entretien et d'utiliser des pièces de qualité équivalente. Un atelier indépendant sérieux tamponne votre carnet et conserve les justificatifs." },
    { q: "Tous les combien faut-il faire une révision ?", a: "Selon le carnet d'entretien, généralement une fois par an ou tous les 15 000 à 30 000 km, le premier des deux atteint. La condition de temps compte autant que le kilométrage : une vidange annuelle reste nécessaire même sur un véhicule peu roulé, car l'huile vieillit." },
    { q: "Comment éviter de payer trop cher une révision à Marseille ?", a: "Demandez un devis écrit détaillé, comparez le périmètre exact des opérations (un forfait à 99 € ne couvre souvent que la vidange), privilégiez un indépendant sérieux (-30 à -40 % vs concession) et exigez les références des pièces. Chez Garage Boost, devis personnalisé gratuit sous 24h." }
  ],

  'preparer-voiture-ete-chaleur-marseille': [
    { q: "Quand faire vérifier sa climatisation ?", a: "Idéalement au printemps, avant les fortes chaleurs et la ruée estivale. Si l'air est moins froid qu'avant, une recharge de gaz s'impose (le circuit perd environ 10 % de gaz par an). Pensez aussi au remplacement du filtre habitacle et à l'assainissement du circuit contre les odeurs." },
    { q: "Pourquoi la chaleur use-t-elle la batterie ?", a: "La chaleur accélère l'évaporation de l'électrolyte et la corrosion interne de la batterie. Une batterie fatiguée par les étés lâche souvent brutalement, parfois à l'automne. Au-delà de 4 ans ou en cas de démarrage laborieux, un test de batterie permet d'anticiper avant un long trajet." },
    { q: "Quelle pression de pneus adopter en été ?", a: "Respectez les valeurs constructeur (portière ou trappe à carburant), mesurées à froid, et ajustez selon la charge si vous partez chargé. La chaleur augmente la pression interne : un pneu sous-gonflé chauffe trop et risque l'éclatement, surtout à vitesse soutenue et en charge." },
    { q: "Faut-il un check-up avant de partir en vacances ?", a: "Vivement recommandé avant un long trajet chargé : freinage, pneus, niveaux, climatisation, batterie, éclairage et courroies sont vérifiés. Pour un coût modéré, vous évitez l'immobilisation loin de chez vous, toujours plus coûteuse. Garage Boost réalise ce bilan rapidement avec compte-rendu écrit." }
  ]

};
