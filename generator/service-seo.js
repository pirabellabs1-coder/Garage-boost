// =====================================================================
// Garage Boost — Compléments SEO / AEO des pages services hub (build.js)
// - answer : bloc « En bref » sous le H1 = réponse directe (prix, durée,
//   lieu) que Google et les moteurs IA peuvent citer tels quels.
// - faq : questions réellement posées sur Google (« Autres questions »,
//   requêtes Search Console), affichées AVANT la FAQ de data.js et reprises
//   dans le FAQPage JSON-LD. Réservées aux pages hub : les pages zone et
//   service × ville gardent leur propre FAQ (contrôle d'unicité).
// Tous les prix proviennent de data.js : les modifier aux deux endroits.
// =====================================================================
module.exports = {
  'nettoyage-fap': {
    answer: "<strong>En bref :</strong> un nettoyage FAP coûte <strong>250 à 450 €</strong> en régénération sans démontage (environ 90 minutes) et <strong>390 à 650 €</strong> avec démontage et bain ultrason (1 à 2 jours), diagnostic inclus. C'est bien moins qu'un FAP neuf, souvent facturé 1 200 à 2 500 €. Atelier à Plan-de-Cuques, à 15 minutes du centre de Marseille, garantie 12 mois.",
    faq: [
      { q: "Combien coûte un nettoyage FAP à Marseille ?",
        a: "Chez Garage Boost, à Plan-de-Cuques : 250 à 450 € pour une régénération sans démontage (additif puis régénération forcée pilotée à la valise, environ 90 minutes), et 390 à 650 € pour un démontage avec bain ultrason (1 à 2 jours). Le diagnostic préalable est inclus et le devis est envoyé sous 24 heures ouvrées, avant tout travaux." },
      { q: "Régénération forcée à la valise ou nettoyage du FAP : quelle différence ?",
        a: "La régénération forcée fait monter le FAP en température pour brûler les suies. Elle ne retire pas les cendres, qui ne brûlent pas et s'accumulent avec les kilomètres. Notre méthode sans démontage associe un additif spécifique à la régénération forcée ; si le FAP est saturé au-delà d'environ 80 % ou chargé en cendres, le démontage avec bain ultrason est plus efficace. Le diagnostic mesure la saturation pour choisir la bonne méthode." },
      { q: "Peut-on continuer à rouler avec le voyant FAP allumé ?",
        a: "Sur une courte distance, oui, mais pas durablement. Un FAP colmaté fait monter la contre-pression à l'échappement : le moteur peut passer en mode dégradé, et la vanne EGR et le turbo travaillent davantage. Plus on attend, plus le colmatage progresse et plus un démontage devient nécessaire : faites contrôler le véhicule rapidement." }
    ]
  },
  'traitement-egr': {
    answer: "<strong>En bref :</strong> le nettoyage d'une vanne EGR coûte <strong>180 à 290 €</strong> (démontage, bain ultrason, joints neufs), contre 350 à 700 € pour une vanne neuve. Pour les injecteurs : 120 à 220 € par additif premium, 290 à 490 € avec démontage et bain ultrason. Le diagnostic préalable indique si le nettoyage suffit ou si une pièce doit être remplacée.",
    faq: [
      { q: "Combien coûte le nettoyage d'une vanne EGR ?",
        a: "180 à 290 € à notre atelier de Plan-de-Cuques, près de Marseille : démontage de la vanne, nettoyage en bain ultrason haute température, remontage avec joints neufs et effacement des codes défauts. Si la vanne est hors service (moteur électrique défaillant, pièce déformée), le remplacement par une vanne neuve coûte 350 à 700 € pour la pièce : le diagnostic le détermine avant tout travaux." },
      { q: "Quels sont les symptômes d'une vanne EGR encrassée ?",
        a: "Les signes les plus fréquents : perte de puissance, à-coups à l'accélération, ralenti instable, fumée noire, voyant moteur allumé et parfois passage en mode dégradé. Ces symptômes peuvent aussi venir d'un débitmètre, d'un turbo ou du FAP : une lecture des codes défauts permet de confirmer que la vanne EGR est en cause avant de la démonter." }
    ]
  },
  'gestion-adblue': {
    answer: "<strong>En bref :</strong> le diagnostic du système AdBlue (SCR) coûte <strong>90 €</strong>, déduit si vous faites la réparation chez nous. La panne vient le plus souvent d'un seul composant : capteur de qualité (200 à 400 €), sonde NOx (350 à 650 €), pompe ou injecteur à décristalliser. Nous réparons le système ; nous ne le désactivons jamais, c'est illégal sur route en France.",
    faq: [
      { q: "Peut-on rouler avec le voyant AdBlue allumé ?",
        a: "S'il s'agit d'un simple niveau bas, oui : faites l'appoint d'AdBlue rapidement. Si un message de défaut s'affiche avec un compte à rebours en kilomètres, le véhicule roule encore jusqu'à la fin du décompte, puis il refuse de redémarrer. Ne laissez pas le compteur arriver à zéro : faites diagnostiquer le système avant, pour réparer pendant que la voiture peut encore venir à l'atelier." },
      { q: "Pourquoi le voyant AdBlue reste allumé après le plein ?",
        a: "Il faut parfois rouler quelques minutes pour que le système détecte l'appoint. S'il reste allumé, les causes les plus courantes sont un capteur de niveau ou de qualité défaillant, un AdBlue cristallisé ou de mauvaise qualité, ou une pompe en défaut. Notre diagnostic à 90 € (déduit en cas de réparation) identifie le composant en cause." },
      { q: "Combien coûte une réparation AdBlue à Marseille ?",
        a: "Selon le composant : capteur de qualité 200 à 400 €, sonde NOx 350 à 650 €, décristallisation de la pompe ou de l'injecteur selon l'état. Le remplacement complet du système, souvent chiffré autour de 2 000 € en concession, est rarement nécessaire. Le devis est détaillé et envoyé avant toute intervention, avec une garantie de 12 mois." }
    ]
  },
  'decalaminage-hydrogene': {
    answer: "<strong>En bref :</strong> décalaminage hydrogène <strong>89 €</strong> jusqu'à 1.6 L, <strong>119 €</strong> jusqu'à 2.5 L et <strong>149 €</strong> au-delà, sans démontage, en 60 à 90 minutes. Le diagnostic OBD avant traitement et le contrôle après intervention sont inclus. Atelier à Plan-de-Cuques, près de Marseille.",
    faq: [
      { q: "Combien coûte un décalaminage hydrogène à Marseille ?",
        a: "À notre atelier de Plan-de-Cuques : 89 € pour les moteurs jusqu'à 1.6 L, 119 € jusqu'à 2.5 L et 149 € au-delà. Le prix comprend le diagnostic OBD préalable, le traitement complet de 60 à 90 minutes et le contrôle après intervention." },
      { q: "Le décalaminage hydrogène nettoie-t-il le FAP ?",
        a: "Il réduit la calamine en amont (chambre de combustion, soupapes, vanne EGR) et limite donc l'encrassement du FAP, mais il ne remplace pas le nettoyage d'un FAP déjà saturé. Dans ce cas, nous combinons les deux interventions : le diagnostic mesure la saturation du FAP pour vous dire si le décalaminage seul suffit." }
    ]
  },
  'diagnostic-moteur': {
    answer: "<strong>En bref :</strong> diagnostic moteur <strong>49 €</strong>, offert si vous faites la réparation chez nous. Lecture multimarque des codes défauts et mesures en temps réel, environ 30 minutes, compte-rendu écrit. Nous réparons ensuite FAP, EGR, AdBlue et calamine ; si la panne relève d'une réparation lourde, on vous le dit dès le diagnostic.",
    faq: [
      { q: "Combien coûte un diagnostic moteur à Marseille ?",
        a: "49 € TTC à notre atelier de Plan-de-Cuques, près de Marseille, offert si la réparation est validée chez Garage Boost. Il comprend la lecture multimarque des codes défauts, les mesures en temps réel et un compte-rendu écrit." },
      { q: "Pouvez-vous faire un diagnostic en urgence aujourd'hui ?",
        a: "Appelez le 06 63 21 63 50 : si un créneau est libre le jour même, nous vous le proposons. Un diagnostic standard dure environ 30 minutes. Si le véhicule ne peut plus rouler, notre service de dépannage peut l'amener à l'atelier." }
    ]
  }
};
