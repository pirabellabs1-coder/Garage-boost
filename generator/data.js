// =====================================================================
// Garage Boost — Sub-services data (23 services, ~3000 mots/page)
// =====================================================================

// Images Unsplash vérifiées (toutes testées et fonctionnelles)
const IMG = {
  engineBay: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1400&q=80',
  mechanic: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80',
  fap: 'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&w=1400&q=80',
  carEngine: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
  garage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
  workshop: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80',
  body: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=1400&q=80',
  paint: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1400&q=80',
  diagnostic: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&w=1400&q=80',
  carInterior: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80',
  service: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80'
};

// Helper FAQ items réutilisables
const COMMON_FAQ_GUARANTEE = { q: "Quelle garantie offrez-vous sur cette intervention ?", a: "Toutes nos interventions bénéficient d'une garantie pièces et main-d'œuvre de 12 mois minimum (24 mois sur les reprogrammations). En cas de défaut lié à notre travail pendant cette période, la reprise est gratuite et prioritaire. Nous vous remettons une attestation de garantie écrite à chaque facture." };
const COMMON_FAQ_PAYMENT = { q: "Acceptez-vous le paiement en plusieurs fois ?", a: "Oui, paiement en 3 ou 4 fois sans frais via notre partenaire pour toute prestation supérieure à 500€, sous réserve d'éligibilité. Carte bancaire, espèces, virement et chèque acceptés. Aucun supplément quel que soit le mode de règlement choisi." };

module.exports = {
  categories: {

    // =================================================================
    // MAINTENANCE MOTEUR (8 services)
    // =================================================================
    'maintenance-moteur': {
      label: 'Maintenance moteur & anti-pollution',
      services: {

        'diagnostic-moteur': {
          name: 'Diagnostic moteur',
          title: 'Diagnostic moteur Marseille | OBD2 multimarque - Garage Boost Plan-de-Cuques',
          metaDesc: "Diagnostic moteur électronique à Plan-de-Cuques (Marseille). Lecture multimarque OBD2 + valise constructeur, identification précise des codes défauts. 49€, offert si intervention validée.",
          keywords: 'diagnostic moteur Marseille, OBD2 Plan-de-Cuques, codes défauts auto, valise diagnostic Marseille, lecture calculateur',
          h1Pre: 'Diagnostic moteur',
          h1Accent: 'précis & fiable.',
          lead: "Voyant moteur allumé, perte de puissance, ralenti instable ? Notre diagnostic électronique multimarque identifie la cause racine en 30 à 90 minutes. OBD2 + valise constructeur, mesures temps réel.",
          image1: IMG.mechanic, imageAlt1: 'Diagnostic électronique moteur sur véhicule à Plan-de-Cuques',
          image2: IMG.engineBay, imageAlt2: 'Outil de diagnostic OBD2 multimarque Garage Boost',
          price: 'Dès 49 €', priceMin: '49',
          pricingDesc: "Diagnostic complet 49€ TTC, incluant lecture multimarque, mesures temps réel et compte-rendu écrit. Offert si intervention de réparation validée chez Garage Boost.",
          introTitle: 'Comprendre la panne avant de la réparer.',
          introP1: "Quand un voyant s'allume sur le tableau de bord ou que le moteur fonctionne bizarrement, le premier réflexe doit être un <strong>diagnostic électronique professionnel</strong>. Trop de mécaniciens débutent par changer des pièces au pif, ce qui entraîne des frais inutiles et ne résout souvent pas le problème de fond.",
          introP2: "Chez Garage Boost à Plan-de-Cuques, le diagnostic est <strong>la base de toute intervention sérieuse</strong> sur un véhicule moderne. Notre valise dernière génération dialogue avec l'ensemble des calculateurs (moteur, ABS, ESP, airbags, BSI), lit les codes défauts présents et passés, accède aux valeurs en temps réel et permet la reprogrammation de paramètres.",
          symptoms: [
            'Voyant moteur orange ou rouge allumé',
            'Perte de puissance soudaine',
            'Mode dégradé qui se déclenche',
            'Ralenti instable ou qui cale',
            'Fumée anormale à l\'échappement',
            'Démarrage difficile à froid',
            'À-coups en accélération',
            'Surconsommation sans raison'
          ],
          benefitsTitle: 'Le diagnostic, première étape essentielle.',
          stats: [
            { value: '30 min', label: 'Diagnostic standard' },
            { value: '50+', label: 'Calculateurs lus' },
            { value: '95%', label: 'Pannes identifiées du 1er coup' }
          ],
          benefits: [
            { icon: 'circuit-board', title: 'Multimarque', desc: 'Compatible Bosch, Siemens, Continental, Delphi, Marelli. Toutes marques européennes, asiatiques et américaines.' },
            { icon: 'gauge-high', title: 'Valeurs réelles', desc: 'Lecture en temps réel : pression turbo, débit air, lambda, T° échappement, position EGR, débit injecteurs.' },
            { icon: 'gift', title: 'Offert si validé', desc: 'Le diagnostic (49€) est gratuit dès lors que vous validez l\'intervention de réparation chez Garage Boost.' }
          ],
          whatIsTitle: "Le diagnostic moteur, c'est quoi exactement ?",
          whatIsP1: "Le <strong>diagnostic moteur électronique</strong> consiste à interroger les calculateurs (ECU) qui pilotent votre véhicule via le port OBD2 standardisé. Sur les véhicules modernes, jusqu'à 50 calculateurs interagissent en permanence : gestion moteur, transmission, ABS, ESP, airbags, climatisation, suspension pilotée, ADAS. Quand un dysfonctionnement est détecté, le calculateur enregistre un <strong>code défaut (DTC)</strong> et allume parfois un voyant.",
          whatIsP2: "Notre rôle de mécanicien-diagnosticien, c'est de lire ces codes, d'analyser les conditions dans lesquelles ils sont apparus (freezframes), de mesurer en temps réel les valeurs des capteurs, et d'<strong>interpréter</strong> ces données pour remonter à la cause racine. Un même code peut avoir plusieurs origines : capteur défectueux, câblage abîmé, pièce défaillante en amont, problème mécanique sous-jacent.",
          whatIsP3: "C'est cette analyse fine qui distingue un véritable diagnostic d'un simple <strong>scan OBD basique</strong>. Notre valise multimarque, couplée à 10 ans d'expérience sur les motorisations modernes, nous permet d'identifier la cause précise dans 95% des cas dès la première intervention. Sur les pannes intermittentes ou complexes, un essai routier instrumenté vient compléter l'analyse.",
          processIntro: "Notre processus de diagnostic suit 5 étapes éprouvées pour identifier la cause racine de tout dysfonctionnement, en moins de 90 minutes dans la majorité des cas.",
          processSteps: [
            { num: '1', title: 'Connexion OBD', desc: 'Branchement de la valise au port OBD sous tableau de bord, lecture initiale.' },
            { num: '2', title: 'Lecture défauts', desc: 'Extraction de tous les codes défauts (DTC) actifs et passés sur tous les calculateurs.' },
            { num: '3', title: 'Mesures temps réel', desc: 'Analyse des valeurs capteurs : pression turbo, lambda, débit air, température.' },
            { num: '4', title: 'Essai routier', desc: 'Si nécessaire, essai instrumenté pour reproduire le symptôme et valider l\'analyse.' },
            { num: '5', title: 'Rapport écrit', desc: 'Compte-rendu détaillé, identification de la cause, devis de réparation transparent.' }
          ],
          targetTitle: "À qui s'adresse le diagnostic moteur ?",
          targetIntro: "Notre diagnostic électronique répond à de nombreuses situations courantes pour les automobilistes de Marseille et Plan-de-Cuques :",
          targetList: [
            "Conducteurs avec un <strong>voyant moteur allumé</strong> qui ne savent pas d'où ça vient",
            "Véhicules en <strong>mode dégradé</strong> avec puissance limitée",
            "Automobilistes ayant <strong>échoué au contrôle technique</strong> pour cause de pollution",
            "Acheteurs souhaitant un <strong>contrôle préalable avant achat occasion</strong>",
            "Propriétaires constatant une <strong>surconsommation soudaine</strong> sans raison apparente",
            "Conducteurs avec <strong>bruits, vibrations ou comportements anormaux</strong> du véhicule",
            "Garages indépendants demandant un <strong>second avis technique</strong> sur un cas complexe"
          ],
          whyP: "Garage Boost, c'est l'expertise diagnostic d'un atelier spécialisé moteur, à Plan-de-Cuques au cœur de Marseille. Voici les raisons pour lesquelles nos clients reviennent et nous recommandent dans toute la métropole Aix-Marseille-Provence.",
          whyList: [
            "<strong>Valise professionnelle multimarque</strong> dernière génération, mise à jour mensuellement",
            "<strong>10 ans d'expérience</strong> sur les motorisations essence, diesel et hybride toutes marques",
            "<strong>Note Google 4,9/5</strong> sur 127+ avis vérifiés à Plan-de-Cuques et Marseille",
            "<strong>Diagnostic offert</strong> dès lors que vous validez l'intervention de réparation",
            "<strong>Compte-rendu écrit</strong> remis systématiquement, transparence totale sur les défauts identifiés",
            "<strong>Devis de réparation sous 24h</strong> ouvrées, sans engagement",
            "<strong>Récupération à domicile gratuite</strong> au-delà de 200€ d'intervention validée"
          ],
          content: [
            { h: "Diagnostic = cause, pas symptôme", p: "Un voyant moteur n'est qu'un <strong>symptôme</strong>. Le code défaut associé désigne soit le composant défaillant, soit le circuit qui présente une anomalie. Mais attention : le code peut indiquer le capteur défectueux, ou le câblage du capteur, ou la pièce que ce capteur surveille. Notre travail, c'est d'<strong>interpréter correctement</strong> le code et les valeurs réelles pour identifier la cause racine, pas juste de remplacer la première pièce qui apparaît à la lecture du défaut. Cette analyse fine évite des dépenses inutiles." },
            { h: "Toutes marques, toutes motorisations", p: "Notre matériel professionnel couvre Renault, Peugeot, Citroën, Volkswagen, Audi, BMW, Mercedes, Ford, Opel, Fiat, Toyota, Honda, Nissan, Hyundai, Kia, Mazda, Volvo, Skoda, Seat, Dacia, Mini, Land Rover, Jeep, Porsche et plus. Toutes motorisations (essence, diesel, hybride léger ou rechargeable). Sur les véhicules électriques, nous diagnostiquons les périphériques (climatisation, freinage régénératif, capteurs) mais renvoyons sur des spécialistes habilités haute tension pour la batterie principale." },
            { h: "Cas particuliers : pannes intermittentes", p: "Les pannes les plus difficiles à diagnostiquer sont les <strong>pannes intermittentes</strong> : voyant qui s'allume puis s'éteint, défaut qui ne réapparaît pas en atelier, comportement bizarre uniquement à chaud ou à froid. Pour ces cas, nous proposons une <strong>session diagnostic étendue</strong> incluant essai routier prolongé, mesures sous différents régimes et températures, parfois pose temporaire d'un enregistreur OBD que vous emportez quelques jours. Cette approche permet de capturer le défaut en conditions réelles." }
          ],
          faq: [
            { q: "Pourquoi le diagnostic est-il payant si je ne fais pas la réparation ?", a: "Parce que le diagnostic mobilise une heure de technicien spécialisé et un matériel professionnel coûteux. Un atelier qui propose un diagnostic gratuit sans contrepartie compense inévitablement ailleurs (pièces gonflées, prestations facturées). Notre transparence : 49€ de diagnostic offerts dès lors que vous validez l'intervention." },
            { q: "Le diagnostic peut-il prendre plus longtemps ?", a: "Oui, dans 5% des cas environ : symptômes intermittents qui ne se manifestent pas à l'examen, défauts multiples qui se masquent les uns les autres, ou pannes électriques complexes nécessitant un démontage partiel. Dans ce cas, nous vous appelons avant de poursuivre et établissons un devis horaire transparent." },
            { q: "Pouvez-vous effacer un voyant sans réparer ?", a: "Techniquement oui, mais ce serait masquer un problème qui réapparaîtra au prochain démarrage. Nous refusons cette pratique. Notre engagement : trouver la cause, vous l'expliquer, vous chiffrer la réparation. La décision finale vous revient." },
            { q: "Faut-il prendre rendez-vous ?", a: "C'est préférable pour vous garantir un créneau dédié, mais nous acceptons aussi les passages sans rendez-vous aux heures ouvrées. Pour un diagnostic urgent (voyant allumé en route), appelez-nous directement, on s'arrange." },
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['decalaminage-hydrogene', 'reprogrammation-moteur', 'voyants-moteur'],
          ctaTitle: 'Voyant moteur allumé ?',
          ctaTitleAccent: 'Diagnostic en 30 minutes.',
          ctaText: 'Apportez votre véhicule à Plan-de-Cuques ou demandez la récupération à domicile dans toute la zone Marseille.'
        },

        'decalaminage-hydrogene': {
          name: 'Décalaminage hydrogène',
          title: 'Décalaminage hydrogène Marseille | Sans démontage - Garage Boost Plan-de-Cuques',
          metaDesc: "Décalaminage hydrogène à Plan-de-Cuques (Marseille). Nettoyage moteur sans démontage en 60-90 min, élimine la calamine, restaure performances et protège FAP/EGR/turbo. 100% écologique. Dès 89€.",
          keywords: 'décalaminage hydrogène Marseille, nettoyage moteur sans démontage, décrassage moteur Plan-de-Cuques, décarbonisation moteur, anti-calamine',
          h1Pre: 'Décalaminage',
          h1Accent: 'hydrogène moteur.',
          lead: "Procédé écologique en 60-90 minutes, sans démontage. L'hydrogène délogue la calamine accumulée dans la chambre de combustion, sur les soupapes, dans le turbo et l'EGR. Performances restaurées, conso optimisée.",
          image1: IMG.carEngine, imageAlt1: 'Décalaminage hydrogène moteur diesel Marseille',
          image2: IMG.workshop, imageAlt2: 'Station hydrogène professionnelle Garage Boost Plan-de-Cuques',
          price: 'Dès 89 €', priceMin: '89',
          pricingDesc: "À partir de 89€ pour les motorisations jusqu'à 1.6L, 119€ jusqu'à 2.5L, 149€ au-delà. Inclut diagnostic OBD préalable, traitement complet 60-90 min et contrôle post-intervention.",
          introTitle: 'La calamine, ennemi invisible de votre moteur.',
          introP1: "Avec le kilométrage et les <strong>petits trajets urbains typiques de Marseille</strong>, votre moteur s'encrasse. La combustion incomplète laisse des dépôts de carbone — la fameuse <strong>calamine</strong> — sur les soupapes d'admission, dans la chambre de combustion, sur la vanne EGR, dans le turbo et le collecteur d'échappement.",
          introP2: "Ces dépôts dégradent progressivement les performances, augmentent la consommation, allument des voyants moteur et finissent par endommager des pièces coûteuses (FAP, turbo). Le <strong>décalaminage hydrogène</strong> est la solution moderne, efficace et 100% écologique pour nettoyer votre moteur de l'intérieur, en 60 à 90 minutes seulement.",
          symptoms: [
            'Perte de puissance et reprises molles',
            'Surconsommation de carburant',
            'Fumée noire à l\'accélération',
            'Voyant moteur ou EGR allumé',
            'Ralenti instable ou qui cale',
            'Démarrage difficile',
            'Échec contrôle technique pollution',
            'À-coups dans les bas régimes'
          ],
          benefitsTitle: 'Les bénéfices concrets du décalaminage.',
          stats: [
            { value: '-15%', label: 'Consommation carburant' },
            { value: '-70%', label: 'Émissions polluantes' },
            { value: '90 min', label: 'Sans démontage' }
          ],
          benefits: [
            { icon: 'leaf', title: '100% écologique', desc: "Rejet : vapeur d'eau et CO₂. Aucun produit chimique nocif, aucun déchet polluant. Une démarche verte." },
            { icon: 'wrench', title: 'Sans démontage', desc: "Aucune pièce démontée, aucun joint remplacé. Procédé non invasif sur le moteur, zéro risque mécanique." },
            { icon: 'gauge-high', title: 'Performances retrouvées', desc: "Reprises plus toniques, ralenti stabilisé, conso en baisse de 0,5 à 1,5 L/100 km en moyenne." }
          ],
          whatIsTitle: "Le décalaminage hydrogène, c'est quoi ?",
          whatIsP1: "Le <strong>décalaminage hydrogène</strong> représente une technologie avancée conçue pour améliorer l'efficacité de combustion interne des moteurs en éliminant les dépôts carbonés accumulés <strong>sans démontage nécessaire</strong>. Cette méthode, basée sur le traitement oxy-hydrogène (HHO), introduit un mélange gazeux riche en hydrogène dans le moteur par l'admission d'air.",
          whatIsP2: "Au cours de ce processus, l'<strong>hydrogène réagit chimiquement avec le carbone</strong> (les dépôts de suie) pour former de l'eau (H₂O) et du dioxyde de carbone (CO₂), nettoyant ainsi le système d'injection, la chambre de combustion, les pistons, les composants du système d'échappement et le catalyseur. Cette réaction contribue non seulement à la réduction des émissions nocives mais favorise également une oxydation efficace des particules de suie.",
          whatIsP3: "En plus d'améliorer le rendement énergétique du moteur, le décalaminage hydrogène aide à <strong>restaurer la performance originale</strong>, à diminuer la consommation de carburant et à prolonger la durée de vie des composants moteur par la prévention de l'accumulation future de dépôts. Cette méthode de dépollution moteur diesel et essence est particulièrement bénéfique pour maintenir une opération propre et efficace sur le long terme — solution écologique et économique pour les propriétaires de véhicules à Plan-de-Cuques, Marseille et toute la métropole.",
          processIntro: "Le décalaminage moteur à l'hydrogène est un procédé de nettoyage interne <strong>non invasif</strong> qui se réalise sans démontage. Voici les 5 étapes de notre intervention à l'atelier de Plan-de-Cuques.",
          processSteps: [
            { num: '1', title: 'Diagnostic OBD préalable', desc: 'Lecture codes défauts pour évaluer l\'état d\'encrassement (EGR, turbo, FAP).' },
            { num: '2', title: 'Injection hydrogène', desc: 'Production HHO par électrolyse, injection dans l\'admission moteur en marche.' },
            { num: '3', title: 'Élimination calamine', desc: 'Réaction chimique : suie transformée en H₂O + CO₂, évacués par échappement.' },
            { num: '4', title: 'Additif complémentaire', desc: 'Additif carburant professionnel pour prolonger l\'effet sur les premiers kms.' },
            { num: '5', title: 'Contrôle post-traitement', desc: 'Diagnostic de vérification, effacement codes défauts liés à l\'encrassement.' }
          ],
          targetTitle: "À qui s'adresse le décalaminage hydrogène ?",
          targetIntro: "Le décalaminage moteur à l'hydrogène est recommandé pour de nombreux profils de véhicules et d'usages, particulièrement adapté aux conditions de circulation urbaine de Marseille :",
          targetList: [
            "Les <strong>véhicules diesel</strong> effectuant principalement des trajets urbains à Marseille (la calamine s'accumule plus vite en ville)",
            "Les <strong>véhicules à essence avec injection directe</strong> (TSI, EcoBoost, TFSI), particulièrement sensibles à l'encrassement des soupapes",
            "Les véhicules ayant <strong>échoué au contrôle technique pollution</strong> (contre-visite anti-pollution)",
            "Les moteurs présentant des <strong>symptômes d'encrassement</strong> : perte de puissance, surconsommation, fumée, voyant moteur",
            "En <strong>entretien préventif tous les 20 000 à 30 000 km</strong> pour maintenir performances optimales",
            "Les véhicules de flotte (taxi, VTC, livraison, artisans) qui parcourent intensivement la zone Marseille — Plan-de-Cuques — Aubagne"
          ],
          whyP: "Garage Boost est spécialiste du décalaminage hydrogène à Plan-de-Cuques avec plus de 5 000 interventions réalisées depuis 2018. Voici pourquoi nos clients de Marseille et de toute la métropole nous font confiance pour leur dépollution moteur.",
          whyList: [
            "<strong>5 000+ décalaminages réalisés</strong> avec un taux de satisfaction de 95%",
            "<strong>Station HHO professionnelle</strong> dernière génération, calibrée pour chaque cylindrée",
            "<strong>Diagnostic OBD inclus</strong> avant et après traitement",
            "<strong>Additif carburant premium offert</strong> pour prolonger l'effet du décalaminage",
            "<strong>Tarif à partir de 89€</strong> tout inclus, parmi les plus compétitifs de la zone Marseille",
            "<strong>Note 4,9/5 sur 127+ avis Google</strong> à Plan-de-Cuques",
            "<strong>Compte-rendu avant/après</strong> avec mesures et photos pour visualiser l'efficacité"
          ],
          content: [
            { h: "Quels sont les bénéfices concrets ?", p: "Sur un moteur encrassé, vous remarquerez après l'intervention : <strong>reprises plus toniques</strong> à bas régime, <strong>ralenti stabilisé</strong>, <strong>moins de fumée</strong> à l'échappement, <strong>conso en baisse</strong> (généralement 0,5 à 1,5 L/100 km en usage normal), <strong>protection durable</strong> des composants critiques (FAP, EGR, turbo, sondes lambda). Sur certains véhicules, les voyants moteur liés à l'encrassement disparaissent. L'effet est progressif sur les premières centaines de kilomètres post-intervention." },
            { h: "Quelle fréquence pour un décalaminage ?", p: "Pour un usage <strong>urbain quotidien</strong> à Marseille, nous recommandons un décalaminage <strong>tous les 30 000 km</strong> en entretien préventif. Pour un usage routier mixte, tous les 50 000 km suffisent. Les véhicules de flotte (taxi, VTC, livraison) qui parcourent beaucoup en ville peuvent bénéficier d'un décalaminage annuel ou tous les 40 000 km. Il s'agit d'une intervention <strong>préventive</strong> qui prolonge la durée de vie globale du moteur et protège les composants anti-pollution coûteux." },
            { h: "Combiner décalaminage et nettoyage FAP", p: "Sur les véhicules diesel modernes équipés d'un FAP, le décalaminage hydrogène est très efficace en complément d'un nettoyage FAP. Le décalaminage traite la cause amont (encrassement chambre de combustion et EGR), le nettoyage FAP traite la conséquence aval (filtre saturé). Cette combinaison permet de remettre votre véhicule en parfait état anti-pollution pour 350 à 600€, contre 1 200 à 2 500€ pour un remplacement FAP neuf en concession." }
          ],
          faq: [
            { q: "Le décalaminage hydrogène est-il vraiment efficace ?", a: "Oui, sur un moteur réellement encrassé. Sur un moteur récent peu kilométré ou qui a déjà été décalaminé récemment, l'effet sera plus modeste. Notre diagnostic préalable nous permet d'évaluer le niveau d'encrassement et donc le bénéfice attendu. Plus de 5 000 décalaminages réalisés chez Garage Boost avec un taux de satisfaction supérieur à 95% sur Marseille et la région." },
            { q: "Est-ce que ça peut endommager le moteur ?", a: "Non, c'est l'un des procédés les plus doux du marché. L'hydrogène est consommé par la combustion (il ne reste rien dans le moteur). Le seul risque potentiel : si votre moteur est très encrassé, des résidus peuvent se détacher en blocs et déclencher temporairement un voyant moteur (qui s'efface après 100-200 km). C'est rare et bénin." },
            { q: "Quelle différence avec un additif chimique en bidon ?", a: "Les additifs chimiques agissent en surface, principalement sur les injecteurs et les soupapes. Le décalaminage hydrogène nettoie en profondeur tout le circuit d'admission jusqu'à l'échappement, y compris la vanne EGR, le turbo et le collecteur. Les bénéfices sont nettement plus prononcés et durables." },
            { q: "Le décalaminage permet-il de passer le contrôle technique ?", a: "Oui, dans la grande majorité des cas. Le décalaminage hydrogène réduit les émissions polluantes jusqu'à 70%, ce qui permet généralement de repasser le contrôle technique avec succès. Notre taux de réussite est supérieur à 90% sur les contre-visites pollution à Marseille." },
            { q: "Combien de temps faut-il prévoir ?", a: "Comptez 60 à 90 minutes selon la cylindrée du moteur. Vous pouvez attendre sur place dans notre salle d'accueil (café offert), ou nous laisser le véhicule et revenir le chercher. Pas de démontage, donc pas de risque de déboires." },
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['nettoyage-fap', 'traitement-egr', 'reprogrammation-moteur'],
          ctaTitle: 'Moteur fatigué, perte de pep ?',
          ctaTitleAccent: 'Décalaminage en 90 min.',
          ctaText: '89€ tarif de base, sans démontage, 100% écologique. Performances retrouvées et économie de carburant.'
        },

        'nettoyage-fap': {
          name: 'Nettoyage FAP',
          title: 'Nettoyage FAP Marseille | Sans démontage ou bain ultrason - Garage Boost',
          metaDesc: "Nettoyage filtre à particules (FAP) à Plan-de-Cuques (Marseille). Régénération sans démontage ou bain ultrason haute température. Économie 70% vs remplacement neuf. Dès 250€.",
          keywords: 'nettoyage FAP Marseille, régénération FAP Plan-de-Cuques, FAP bouché solution, alternative remplacement FAP, FAP colmaté Marseille',
          h1Pre: 'Nettoyage FAP',
          h1Accent: 'sans remplacement.',
          lead: "FAP saturé, voyant FAP allumé, mode dégradé déclenché ? Notre traitement professionnel restaure 95% de la capacité du filtre, en chimique sans démontage ou en bain ultrason. Économie 70% vs neuf.",
          image1: IMG.fap, imageAlt1: 'Nettoyage filtre à particules FAP diesel Marseille',
          image2: IMG.engineBay, imageAlt2: 'Station de régénération FAP ultrason Garage Boost Plan-de-Cuques',
          price: '250 - 650 €', priceMin: '250',
          pricingDesc: "À partir de 250€ pour la régénération chimique sans démontage (90 min), 390 à 650€ avec démontage et bain ultrason haute température (1-2 jours). Diagnostic préalable inclus.",
          introTitle: 'FAP colmaté ? On le régénère, on ne le remplace pas.',
          introP1: "Le <strong>filtre à particules (FAP)</strong> piège les microparticules de suie produites par la combustion diesel. Au fil des kilomètres, il se charge progressivement, puis se régénère automatiquement à haute température (700°C+). Mais cette régénération nécessite des trajets longs à régime soutenu — exactement ce qu'on n'a pas en usage urbain typique de Marseille et Plan-de-Cuques.",
          introP2: "Résultat : le FAP <strong>se colmate progressivement</strong>, puis bloque, déclenche un mode dégradé, allume des voyants, et finit par causer un échec au contrôle technique anti-pollution. Notre solution : régénérer professionnellement votre FAP existant à plus de 95% de sa capacité initiale, pour 250 à 650€ selon la méthode — au lieu de 1 200 à 2 500€ pour un remplacement neuf.",
          symptoms: [
            'Voyant FAP allumé sur le tableau de bord',
            'Voyant moteur orange persistant',
            'Perte de puissance importante',
            'Mode dégradé qui s\'enclenche',
            'Fumée noire à l\'accélération',
            'Surconsommation de 1 à 2 L/100 km',
            'Tentatives de régénération échouées',
            'Échec contre-visite anti-pollution'
          ],
          benefitsTitle: "L'alternative économique au FAP neuf.",
          stats: [
            { value: '-70%', label: 'Économie vs remplacement' },
            { value: '95%', label: 'Capacité restaurée' },
            { value: '100k', label: 'Km supplémentaires moyens' }
          ],
          benefits: [
            { icon: 'euro-sign', title: '-70% vs neuf', desc: "Un FAP neuf coûte 1 200 à 2 500€. Notre traitement : 250 à 650€. Économie immédiate sur votre budget auto." },
            { icon: 'recycle', title: 'Écologique', desc: "Régénérer plutôt que jeter : moins de déchets, moins de fabrication. Geste responsable pour l'environnement." },
            { icon: 'gauge-high', title: '95% de capacité', desc: "Restauration jusqu'à 95% de la capacité de filtration d'origine. Comme neuf, pour des dizaines de milliers de km." }
          ],
          whatIsTitle: "Le FAP, c'est quoi et pourquoi ça se bouche ?",
          whatIsP1: "Le <strong>filtre à particules diesel (FAP ou DPF)</strong> est un dispositif anti-pollution obligatoire sur les véhicules diesel depuis la norme Euro 5 (2009). Sa structure céramique en nid d'abeilles piège les microparticules (PM2.5, PM10) issues de la combustion incomplète du gazole. Sans lui, votre voiture rejetterait directement dans l'air des particules cancérigènes responsables de 48 000 décès prématurés par an en France.",
          whatIsP2: "Pour rester opérationnel, le FAP doit <strong>se régénérer périodiquement</strong> en montant à 600-700°C, ce qui brûle les particules accumulées. Cette régénération s'enclenche automatiquement quand le moteur tourne longtemps à régime soutenu (autoroute, route). Problème : en usage <strong>urbain typique de Marseille</strong> (trajets courts, embouteillages, ralentissements), ces conditions ne sont jamais réunies. Le FAP se charge sans pouvoir se nettoyer — il finit par saturer.",
          whatIsP3: "Une fois le seuil critique atteint (généralement 80% de saturation), le calculateur déclenche une <strong>régénération forcée</strong> en injectant plus de carburant. Si elle échoue (trajet trop court), le voyant FAP s'allume et le véhicule passe en mode dégradé. À ce stade, deux options : remplacer le FAP (très cher) ou le <strong>nettoyer professionnellement</strong> chez Garage Boost. La régénération professionnelle est efficace dans 90% des cas — sauf si le support céramique est cassé ou fondu (régénération précédente mal pilotée).",
          processIntro: "Notre processus de régénération FAP suit 5 étapes selon la méthode choisie (chimique sans démontage ou bain ultrason haute température après dépose).",
          processSteps: [
            { num: '1', title: 'Diagnostic FAP', desc: 'Mesure contre-pression, taux de saturation, état céramique. Choix de la méthode.' },
            { num: '2', title: 'Injection produit', desc: 'Additif chimique injecté via sonde différentielle (méthode 1) ou dépose FAP (méthode 2).' },
            { num: '3', title: 'Traitement actif', desc: 'Régénération forcée pilotée (90 min) ou bain ultrason 80°C (1-2 jours).' },
            { num: '4', title: 'Rinçage et séchage', desc: 'Évacuation résidus, séchage à 200°C avant remontage du FAP.' },
            { num: '5', title: 'Validation finale', desc: 'Diagnostic post-traitement, effacement défauts, essai routier de contrôle.' }
          ],
          targetTitle: "À qui s'adresse le nettoyage FAP ?",
          targetIntro: "Tous les conducteurs de véhicules diesel équipés d'un FAP qui présentent des symptômes de saturation peuvent bénéficier de notre intervention — particulièrement adaptée aux usages urbains de Marseille :",
          targetList: [
            "<strong>Conducteurs urbains</strong> dont le FAP n'a pas le temps de se régénérer naturellement (trajets courts, embouteillages)",
            "Véhicules avec <strong>voyant FAP ou moteur allumé</strong> et perte de puissance",
            "Diesels en <strong>échec au contrôle technique</strong> sur l'opacité des fumées",
            "Conducteurs ayant reçu un <strong>devis concession exorbitant</strong> pour remplacement FAP",
            "Flottes professionnelles (VTC, taxi, livraison) avec <strong>FAP saturé prématurément</strong>",
            "Véhicules récents (post-2009) avec <strong>plus de 100 000 km</strong> en usage urbain",
            "Tous propriétaires de <strong>diesels Euro 5 et Euro 6</strong> souhaitant éviter un remplacement coûteux"
          ],
          whyP: "Garage Boost à Plan-de-Cuques propose les deux méthodes professionnelles de régénération FAP, ce qui nous permet de traiter 90% des cas sans recours au remplacement. Voici les raisons de nous faire confiance pour votre nettoyage FAP à Marseille.",
          whyList: [
            "<strong>Deux méthodes disponibles</strong> : chimique sans démontage et bain ultrason haute température",
            "<strong>Diagnostic préalable inclus</strong> pour identifier la méthode la mieux adaptée à votre cas",
            "<strong>Tarif transparent</strong> annoncé avant intervention, aucun supplément à la livraison",
            "<strong>Garantie 12 mois</strong> sur la régénération, reprise gratuite si défaut lié à notre travail",
            "<strong>Compte-rendu écrit</strong> avec mesures de contre-pression avant/après",
            "<strong>FAP reconditionné en alternative</strong> si la régénération est impossible (-50% vs neuf)",
            "<strong>Récupération à domicile</strong> dans toute la zone Marseille / Plan-de-Cuques / Aubagne"
          ],
          content: [
            { h: "Méthode 1 : régénération chimique sans démontage", p: "Notre méthode rapide et économique : nous injectons un <strong>additif spécifique</strong> dans le FAP via la sonde différentielle, puis nous procédons à une régénération forcée pilotée par notre valise diagnostic. Le moteur monte en température, le FAP atteint 600-700°C, et les particules de suie sont brûlées et expulsées. Durée : 90 minutes. Tarif : 250 à 450€. Cette méthode convient pour un FAP saturé à moins de 80% — au-delà, le bain ultrason est plus efficace." },
            { h: "Méthode 2 : démontage + bain ultrason", p: "Pour les FAP très colmatés, nous démontons le FAP et le plongeons dans un <strong>bain ultrason haute température</strong> avec un produit spécifique. Les ondes ultrasoniques détachent les particules incrustées, le bain dissout les résidus, et le FAP est rincé puis séché à 200°C avant remontage. Durée : 1 à 2 jours. Tarif : 390 à 650€. Cette méthode permet de récupérer même les FAP les plus colmatés, jusqu'à 95% de la capacité d'origine." },
            { h: "Comment éviter qu'il se rebouche ?", p: "Après régénération, plusieurs gestes simples prolongent la durée de vie : <strong>une fois par mois minimum, faire 30 km d'autoroute à 110 km/h en 5e ou 6e</strong> pour permettre une régénération naturelle ; <strong>vérifier les codes défauts</strong> au moindre voyant pour traiter rapidement les causes d'encrassement (vanne EGR, débitmètre, turbo) ; <strong>respecter les vidanges</strong> avec une huile faible cendres adaptée diesel ; <strong>compléter par un décalaminage hydrogène</strong> tous les 30 000 km pour limiter l'arrivée de calamine en amont du FAP." }
          ],
          faq: [
            { q: "Mon FAP est-il récupérable ?", a: "Dans 90% des cas oui. Notre diagnostic électronique mesure le taux de saturation et l'état du support céramique. Si la régénération est techniquement possible, nous la proposons. Sinon, nous orientons vers un FAP reconditionné ou neuf, en restant transparent sur les coûts." },
            { q: "Combien de temps tient un FAP régénéré ?", a: "60 000 à 100 000 km en moyenne, selon votre profil de conduite. En usage urbain pur (typique Marseille), plus court (40 000 km). En usage mixte ou autoroutier, plus long (jusqu'à 120 000 km)." },
            { q: "Peut-on supprimer le FAP au lieu de le régénérer ?", a: "Techniquement oui, mais c'est illégal sur route en France (sanction au contrôle technique). Nous ne pratiquons pas cette suppression sauf pour des véhicules destinés exclusivement à la compétition. La régénération reste la seule solution légale et durable." },
            { q: "Le voyant disparaît-il après l'intervention ?", a: "Oui, dans la majorité des cas, le voyant FAP s'éteint immédiatement après la régénération réussie et l'effacement des codes défauts. Si une autre cause sous-jacente persiste (ex : vanne EGR hors service), il faudra traiter cette cause séparément." },
            { q: "Le nettoyage FAP est-il pris en charge par l'assurance ?", a: "Non, sauf cas particulier de panne consécutive à un sinistre. C'est considéré comme de l'entretien. En revanche, certaines garanties constructeur peuvent couvrir le FAP en cas de défaillance prématurée — nous vérifions pour vous au cas par cas." },
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['decalaminage-hydrogene', 'traitement-egr', 'nettoyage-catalyseur'],
          ctaTitle: 'FAP saturé, voyant allumé ?',
          ctaTitleAccent: 'On le régénère.',
          ctaText: 'Diagnostic offert, devis sous 24h. Économie de 70% vs remplacement neuf.'
        },

        'nettoyage-catalyseur': {
          name: 'Nettoyage catalyseur',
          title: 'Nettoyage catalyseur Marseille | Restauration efficacité - Garage Boost',
          metaDesc: "Nettoyage catalyseur à Plan-de-Cuques (Marseille). Restauration de l'efficacité catalytique pour passer le contrôle anti-pollution. Alternative au remplacement neuf (1500-2500€). Dès 290€.",
          keywords: 'nettoyage catalyseur Marseille, catalyseur encrassé Plan-de-Cuques, restauration catalyseur, alternative remplacement catalyseur, contrôle pollution échappement',
          h1Pre: 'Nettoyage', h1Accent: 'catalyseur.',
          lead: "Catalyseur en perte d'efficacité, échec au contrôle technique pollution ? Notre traitement professionnel restaure l'efficacité catalytique sans remplacement. Économie massive vs neuf.",
          image1: IMG.fap, imageAlt1: 'Nettoyage catalyseur véhicule diesel à Marseille',
          image2: IMG.engineBay, imageAlt2: 'Restauration catalyseur Garage Boost Plan-de-Cuques',
          price: 'Dès 290 €', priceMin: '290',
          pricingDesc: "À partir de 290€ pour un traitement complet. Inclut diagnostic OBD, traitement haute température, contrôle des sondes lambda et essai routier de validation.",
          introTitle: "Catalyseur encrassé : on évite le remplacement.",
          introP1: "Le <strong>catalyseur</strong> est l'un des composants anti-pollution les plus coûteux à remplacer (1 500 à 2 500€ neuf). Sa fonction : transformer les gaz toxiques (CO, HC, NOx) en gaz inoffensifs grâce à des métaux précieux (platine, palladium, rhodium) qui catalysent les réactions chimiques.",
          introP2: "Avec le kilométrage et certains défauts (mélange trop riche, huile qui passe, calamine), le catalyseur perd progressivement son efficacité. Notre <strong>traitement professionnel</strong> restaure cette efficacité dans la majorité des cas — pour 290€ au lieu de 2 000€ en moyenne pour un remplacement neuf.",
          symptoms: ['Échec contrôle technique sur émissions', 'Voyant moteur orange allumé', 'Codes défauts catalyseur (P0420, P0430)', 'Odeur d\'œuf pourri à l\'échappement', 'Perte de puissance progressive', 'Surconsommation soudaine', 'Bruit de cliquetis dans l\'échappement', 'Contre-visite anti-pollution'],
          benefitsTitle: 'Restauration catalytique sans remplacement.',
          stats: [{value:'-85%', label:'Économie vs catalyseur neuf'}, {value:'90%', label:'Cas traités sans remplacement'}, {value:'2 jours', label:'Délai d\'intervention'}],
          benefits: [
            { icon: 'euro-sign', title: '-85% vs neuf', desc: "Catalyseur neuf : 1 500-2 500€. Notre traitement : 290€. Économie immédiate sur votre budget." },
            { icon: 'leaf', title: 'Anti-pollution', desc: "Restauration de l'efficacité catalytique pour respecter les seuils Euro et passer le CT." },
            { icon: 'check-circle', title: '90% de réussite', desc: "Notre méthode fonctionne dans 9 cas sur 10 selon le degré d'encrassement initial." }
          ],
          whatIsTitle: "Le catalyseur, c'est quoi exactement ?",
          whatIsP1: "Le <strong>catalyseur</strong> est un dispositif placé dans la ligne d'échappement après le moteur. Sa structure interne en nid d'abeilles est recouverte de métaux précieux (platine, palladium, rhodium) qui catalysent trois réactions chimiques essentielles : oxydation du monoxyde de carbone (CO → CO₂), oxydation des hydrocarbures imbrûlés (HC → CO₂ + H₂O), et réduction des oxydes d'azote (NOx → N₂).",
          whatIsP2: "Pour fonctionner, le catalyseur doit atteindre une <strong>température de fonctionnement de 400-800°C</strong>. Les sondes lambda en amont et en aval surveillent en permanence son efficacité. Quand le catalyseur perd plus de 20% d'efficacité, le calculateur enregistre un code défaut (typiquement P0420 ou P0430) et allume le voyant moteur.",
          whatIsP3: "Notre traitement professionnel utilise un <strong>produit chimique spécifique</strong> injecté dans la ligne d'échappement, combiné à une montée en température contrôlée pour brûler les dépôts qui obstruent les canaux du nid d'abeilles. Le résultat : la surface catalytique est restaurée, les sondes lambda voient à nouveau une bonne efficacité, et le code défaut s'efface durablement.",
          processIntro: "Notre processus de nettoyage catalyseur en 5 étapes pour restaurer l'efficacité de votre catalyseur en 1 à 2 jours.",
          processSteps: [
            {num:'1', title:'Diagnostic complet', desc:'Lecture codes défauts, mesure efficacité catalytique via sondes lambda.'},
            {num:'2', title:'Préparation', desc:'Nettoyage admission et injecteurs en amont pour optimiser le traitement.'},
            {num:'3', title:'Traitement', desc:'Injection produit spécifique + montée en température contrôlée.'},
            {num:'4', title:'Contrôle sondes', desc:'Vérification fonctionnement sondes lambda amont et aval.'},
            {num:'5', title:'Validation', desc:'Effacement codes défauts, essai routier, mesure des émissions.'}
          ],
          targetTitle: "À qui s'adresse le nettoyage catalyseur ?",
          targetIntro: "Plusieurs profils de véhicules tirent un grand bénéfice de notre intervention de nettoyage catalyseur :",
          targetList: [
            "Véhicules en <strong>échec au contrôle technique anti-pollution</strong>",
            "Conducteurs avec <strong>codes défauts P0420 ou P0430</strong> liés au catalyseur",
            "Diesels avec <strong>plus de 150 000 km</strong> en usage urbain à Marseille",
            "Véhicules ayant <strong>consommé de l'huile</strong> par le moteur (qui empoisonne le catalyseur)",
            "Tous propriétaires souhaitant <strong>éviter un remplacement coûteux</strong> en concession"
          ],
          whyP: "Garage Boost à Plan-de-Cuques traite les catalyseurs encrassés de toute la zone Marseille avec un taux de réussite de 90%. Voici pourquoi nous faire confiance.",
          whyList: [
            "<strong>Diagnostic préalable rigoureux</strong> pour évaluer la faisabilité",
            "<strong>Produits professionnels</strong> certifiés efficaces sur catalyseurs",
            "<strong>Tarif fixe à 290€</strong> annoncé avant intervention",
            "<strong>Garantie 12 mois</strong> sur le résultat",
            "<strong>Si la régénération échoue</strong>, remplacement par catalyseur reconditionné -50% vs neuf",
            "<strong>Récupération à domicile</strong> dans toute la zone Marseille"
          ],
          content: [
            {h:"Quand le nettoyage ne suffit pas ?", p:"Dans certains cas, la régénération chimique ne peut pas restaurer le catalyseur : <strong>support céramique fondu</strong> (suite à un mélange trop riche prolongé), <strong>empoisonnement par huile moteur</strong> (consommation excessive due à des segments défaillants), ou <strong>structure mécaniquement endommagée</strong> (impact, choc thermique). Dans ce cas, nous proposons un catalyseur <strong>reconditionné</strong> à 600-1 000€ — solution intermédiaire entre la régénération et le neuf, avec garantie 12 mois également."},
            {h:"Pourquoi notre traitement fonctionne", p:"Beaucoup de garages tentent simplement d'effacer le code défaut P0420 sans traiter la cause. Le voyant revient en quelques jours. Notre approche est différente : nous traitons <strong>physiquement la surface catalytique</strong> avec un produit qui dissout les dépôts, puis nous validons que les sondes lambda voient une efficacité restaurée. C'est cette validation qui garantit la durabilité du résultat."}
          ],
          faq: [
            {q:"Mon catalyseur est-il forcément récupérable ?", a:"Dans 90% des cas oui. Notre diagnostic préalable mesure l'état réel via les sondes lambda et identifie si la cause est un encrassement (réversible) ou une dégradation mécanique (irréversible)."},
            {q:"Quelle différence avec les additifs en bidon ?", a:"Les additifs grand public sont peu concentrés et agissent principalement sur les injecteurs. Notre traitement professionnel cible spécifiquement le catalyseur avec un produit dédié à concentration efficace."},
            {q:"Combien de temps tient le résultat ?", a:"Si la cause initiale (mélange riche, huile) est traitée, le résultat est durable. Si elle persiste, le catalyseur peut se ré-encrasser dans 12-24 mois. Notre diagnostic identifie ces causes pour les traiter en amont."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['nettoyage-fap', 'decalaminage-hydrogene', 'diagnostic-moteur'],
          ctaTitle: 'Catalyseur en perte d\'efficacité ?',
          ctaTitleAccent: 'On le restaure.',
          ctaText: 'Évitez le remplacement neuf à 2000€. Notre traitement à 290€ marche dans 90% des cas.'
        },

        'reprogrammation-moteur': {
          name: 'Reprogrammation moteur',
          title: 'Reprogrammation moteur Marseille | Stage 1 & 2 sur banc - Garage Boost',
          metaDesc: "Reprogrammation moteur Stage 1 et Stage 2 à Plan-de-Cuques (Marseille). Cartographies développées en interne, +15-30% de couple, conso optimisée. Garantie 24 mois. Dès 350€.",
          keywords: 'reprogrammation moteur Marseille, Stage 1 Plan-de-Cuques, reprog auto Stage 2, optimisation cartographie ECU, gain puissance moteur',
          h1Pre: 'Reprogrammation', h1Accent: 'moteur sur mesure.',
          lead: "Optimisation de la cartographie d'origine pour gagner couple, puissance et réactivité — tout en réduisant la consommation. Cartos testées sur banc, sauvegarde de l'origine, garantie 24 mois.",
          image1: IMG.engineBay, imageAlt1: 'Reprogrammation moteur Stage 1 banc essais Marseille',
          image2: IMG.workshop, imageAlt2: 'Cartographie ECU Garage Boost Plan-de-Cuques',
          price: '350 - 990 €', priceMin: '350',
          pricingDesc: "Stage 1 : 350-690€ selon motorisation. Stage 2 : 690-990€ avec accessoires (downpipe, intercooler). Sauvegarde carto origine + garantie 24 mois inclus.",
          introTitle: "Plus de couple, moins de consommation.",
          introP1: "La <strong>reprogrammation moteur</strong> consiste à modifier la cartographie du calculateur (ECU) pour optimiser le couple et la puissance tout en préservant la fiabilité. Contrairement à une idée reçue, ce n'est pas réservé aux passionnés de tuning : <strong>plus de 60% de nos reprogrammations</strong> sont demandées pour gagner en agrément de conduite et en économie de carburant.",
          introP2: "Une cartographie optimisée délivre le couple plus tôt dans les régimes, ce qui permet de moins solliciter le moteur en conduite normale. Résultat : <strong>-0,5 à -1,5 L/100 km en éco</strong>, des reprises plus toniques en ville et sur autoroute, et une boîte de vitesses qui bénéficie d'un meilleur étagement.",
          symptoms: ['Manque de pep en relance', 'Boîte qui passe trop tôt les rapports', 'Conso élevée en usage mixte', 'Souhait d\'agrément supplémentaire', 'Préparation track day occasionnel', 'Diesel qui semble bridé d\'origine', 'Démarrage difficile avec turbo', 'Performances en dessous des fiches techniques'],
          benefitsTitle: 'Performance ET économie réunies.',
          stats: [{value:'+25%', label:'Couple en moyenne'}, {value:'-1L', label:'/100km en éco'}, {value:'24 mois', label:'Garantie incluse'}],
          benefits: [
            {icon:'gauge-high', title:'Plus de couple', desc:"+15 à 30% selon motorisation. Reprises plus franches dès les bas régimes, conduite plus agréable."},
            {icon:'leaf', title:'Conso réduite', desc:"En éco-conduite, économie de 0,5 à 1,5 L/100 km grâce au couple disponible plus tôt."},
            {icon:'rotate-left', title:'Réversible 100%', desc:"Cartographie d'origine sauvegardée. Retour stock possible à tout moment pour 49€."}
          ],
          whatIsTitle: "Stage 1, Stage 2 : quelle différence ?",
          whatIsP1: "La <strong>reprogrammation Stage 1</strong> est une optimisation logicielle pure : on modifie la cartographie d'origine pour gagner en couple et en puissance sans aucune modification mécanique. C'est le choix idéal pour 90% des conducteurs souhaitant améliorer l'agrément ou réduire leur consommation. Tarif : 350-690€ selon motorisation. Garantie 24 mois.",
          whatIsP2: "La <strong>reprogrammation Stage 2</strong> nécessite des modifications matérielles (downpipe sport, intercooler haute performance, admission renforcée) pour aller plus loin dans les gains. Réservée aux véhicules destinés à un usage sportif ou track day. Tarif : 690-990€ pour la carto + entre 500€ et 2 000€ d'accessoires selon les choix. Idéal pour passionnés de performance pure.",
          whatIsP3: "Dans les deux cas, nous travaillons sur les calculateurs <strong>Bosch (EDC15/16/17, MED9/17, ME17), Siemens (SID201/202/208, SIM2K), Continental (SID301/305), Delphi (DCM3/6.2) et Marelli</strong>. La cartographie d'origine est sauvegardée dans notre base avant toute modification, ce qui permet un retour stock à tout moment (avant revente, contrôle technique strict, ou simple changement d'avis).",
          processIntro: "Notre processus de reprogrammation en 5 étapes garantit un résultat optimal et la préservation de la fiabilité de votre moteur.",
          processSteps: [
            {num:'1', title:'Diagnostic préalable', desc:'Vérification état moteur, lecture codes défauts, prise de mesures.'},
            {num:'2', title:'Lecture ECU', desc:'Extraction de la cartographie d\'origine via OBD ou banc.'},
            {num:'3', title:'Modification', desc:'Optimisation cartographie selon votre profil et nos protocoles.'},
            {num:'4', title:'Flash & test', desc:'Réécriture de la nouvelle carto, test sur banc dynamométrique.'},
            {num:'5', title:'Validation', desc:'Essai routier de validation, mesures finales, livraison du véhicule.'}
          ],
          targetTitle: "À qui s'adresse la reprogrammation moteur ?",
          targetIntro: "La reprogrammation moteur convient à de nombreux profils de conducteurs et types de véhicules :",
          targetList: [
            "Conducteurs souhaitant <strong>plus de couple en relance</strong> sans changer de véhicule",
            "Automobilistes voulant <strong>réduire leur consommation</strong> en usage mixte",
            "Propriétaires de <strong>diesels turbo</strong> sous-exploités d'origine",
            "Passionnés préparant un <strong>véhicule sportif ou track day</strong> (Stage 2)",
            "Pros (artisans, livreurs, VTC) avec <strong>flotte intensive</strong> souhaitant agrément + économies",
            "Tous véhicules essence/diesel/hybride léger <strong>post-2005</strong>"
          ],
          whyP: "Garage Boost développe ses propres cartographies en interne depuis 2018, ce qui nous différencie des reprogrammeurs qui revendent des cartos génériques. Voici pourquoi nous faire confiance pour votre reprogrammation à Plan-de-Cuques.",
          whyList: [
            "<strong>Cartos développées en interne</strong>, pas de fichiers génériques achetés en ligne",
            "<strong>Banc dynamométrique</strong> pour valider chaque carto en conditions réelles",
            "<strong>Sauvegarde origine systématique</strong> dans notre base sécurisée",
            "<strong>Garantie 24 mois</strong> sur la reprogrammation, exceptionnelle dans le secteur",
            "<strong>Marges OEM respectées</strong> pour préserver la fiabilité du moteur",
            "<strong>Reprogrammation reversible 100%</strong> pour 49€ à tout moment",
            "<strong>1 200+ reprogrammations réalisées</strong> à Plan-de-Cuques et toute la zone Marseille"
          ],
          content: [
            {h:"Est-ce que ça abîme le moteur ?", p:"Non, si la reprogrammation est faite par un professionnel sérieux. Nos cartographies restent dans les <strong>marges de sécurité OEM</strong> du constructeur (température échappement max, pression turbo limite, débit injecteurs). La pièce qui souffre le plus reste l'embrayage : un Stage 1 fatigue légèrement l'embrayage d'origine, à surveiller à partir de 100 000 km. Sur les boîtes DSG/DCT modernes, aucun impact notable."},
            {h:"Légalité et assurance", p:"La reprogrammation est <strong>légale en France pour usage privé ou circuit</strong>, mais doit être déclarée à votre assureur et au service des mines pour rester en règle sur route. Nos cartos respectent les seuils Euro 5/6, mais une déclaration formelle reste de votre responsabilité. Nous vous remettons un certificat technique à présenter aux autorités le cas échéant."}
          ],
          faq: [
            {q:"Combien de couple/puissance peut-on espérer gagner ?", a:"Sur diesel turbo : +25 à 35% de couple et +15 à 20% de puissance. Sur essence turbo : +20 à 30% de couple et +15 à 25% de puissance. Sur essence atmo : gains plus modestes (+5 à 10%). Hybrides et électriques non concernés."},
            {q:"Et la consommation, augmente-t-elle ?", a:"Paradoxalement, en conduite normale, elle <strong>diminue de 0,5 à 1,5 L/100 km</strong> car le couple est disponible plus tôt et vous montez moins haut dans les régimes. Si vous exploitez les performances supplémentaires en sportif, elle augmentera évidemment."},
            {q:"Peut-on revenir à la programmation d'origine ?", a:"Oui, à 100%. Nous sauvegardons systématiquement la cartographie d'usine avant toute intervention. Le retour stock se fait en 30 minutes pour environ 49€."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['decalaminage-hydrogene', 'diagnostic-moteur', 'suppression-adblue'],
          ctaTitle: 'Plus de couple, moins de conso ?',
          ctaTitleAccent: 'Reprogrammation Stage 1.',
          ctaText: 'À partir de 350€ avec garantie 24 mois et sauvegarde de la carto origine.'
        },

        'suppression-adblue': {
          name: 'Suppression AdBlue',
          title: 'Suppression AdBlue Marseille | Désactivation logicielle - Garage Boost',
          metaDesc: "Suppression AdBlue logicielle à Plan-de-Cuques (Marseille). Désactivation propre du système SCR, alternative au remplacement (1500-2500€). Sans erreur calculateur. Dès 290€.",
          keywords: 'suppression AdBlue Marseille, désactivation AdBlue Plan-de-Cuques, AdBlue défectueux, alternative remplacement AdBlue, défaut SCR diesel',
          h1Pre: 'Suppression', h1Accent: 'AdBlue logicielle.',
          lead: "Système AdBlue défectueux ? Capteur de qualité, pompe ou calculateur HS ? Notre suppression logicielle désactive proprement le système SCR sans erreur. Économie de 1 200 à 2 200€ vs remplacement.",
          image1: IMG.carEngine, imageAlt1: 'Suppression AdBlue diesel Marseille Plan-de-Cuques',
          image2: IMG.workshop, imageAlt2: 'Désactivation système SCR Garage Boost',
          price: '290 - 590 €', priceMin: '290',
          pricingDesc: "À partir de 290€ pour la désactivation logicielle complète. Variable selon véhicule (Mercedes, BMW, Audi, Renault, Peugeot, Citroën). Inclut diagnostic et garantie 12 mois.",
          introTitle: "AdBlue défectueux : la solution économique.",
          introP1: "Les véhicules diesel récents (généralement post-2015) sont équipés du système SCR (Selective Catalytic Reduction) qui injecte un additif urée — l'<strong>AdBlue</strong> — dans la ligne d'échappement pour neutraliser les NOx. Problème : ce système tombe régulièrement en panne (capteur de qualité AdBlue, pompe d'injection, calculateur dédié, dépôts cristallins), souvent en dehors de la garantie.",
          introP2: "Le remplacement complet du système chez le concessionnaire coûte <strong>1 500 à 2 500€</strong>. Notre <strong>suppression logicielle</strong> désactive proprement le système au niveau du calculateur, supprime les voyants associés, et permet au véhicule de rouler normalement sans AdBlue, pour seulement 290 à 590€.",
          symptoms: ['Voyant AdBlue allumé', 'Compte à rebours avant immobilisation', 'Erreur cristallisation pompe AdBlue', 'Capteur qualité AdBlue défectueux', 'Calculateur SCR HS', 'Refus de démarrage à zéro AdBlue', 'Code défaut système SCR', 'Devis concession exorbitant'],
          benefitsTitle: 'L\'alternative économique au remplacement.',
          stats: [{value:'-80%', label:'Économie vs remplacement'}, {value:'2-3h', label:'Durée intervention'}, {value:'12 mois', label:'Garantie incluse'}],
          benefits: [
            {icon:'euro-sign', title:'-80% vs neuf', desc:"Remplacement complet : 1 500-2 500€. Notre suppression logicielle : 290-590€."},
            {icon:'shield-halved', title:'Sans erreur', desc:"Désactivation propre : aucun voyant, aucune limitation, calculateur stable durablement."},
            {icon:'rotate-left', title:'Réversible', desc:"Sauvegarde de la programmation initiale. Réactivation possible si revente du véhicule."}
          ],
          whatIsTitle: "Le système AdBlue, c'est quoi ?",
          whatIsP1: "L'<strong>AdBlue</strong> est un additif urée (32,5% d'urée + eau déminéralisée) injecté dans le système d'échappement des diesels modernes. Il réagit avec les oxydes d'azote (NOx) à haute température dans le catalyseur SCR pour les transformer en azote (N₂) et eau (H₂O) — gaz inoffensifs.",
          whatIsP2: "Le système SCR comprend plusieurs composants : <strong>réservoir AdBlue</strong>, pompe d'injection, capteur de qualité, calculateur dédié, sondes NOx amont et aval, catalyseur SCR. Chacun de ces composants peut tomber en panne, déclenchant un voyant et finalement un compte à rebours avant immobilisation totale du véhicule (300, 200, 100 km, puis impossibilité de démarrer).",
          whatIsP3: "Notre <strong>suppression logicielle</strong> désactive l'ensemble du système au niveau du calculateur moteur : plus de voyant, plus de compte à rebours, plus de risque d'immobilisation. Le moteur fonctionne normalement, mais les NOx ne sont plus traités. Le véhicule reste roulable, et reste légal en cas de système physiquement défaillant — la suppression devient discutable au CT si le système fonctionnait correctement à l'origine.",
          processIntro: "Notre processus de suppression AdBlue en 5 étapes pour une désactivation propre et durable de votre système SCR défaillant.",
          processSteps: [
            {num:'1', title:'Diagnostic complet', desc:'Vérification de la défaillance réelle du système AdBlue/SCR.'},
            {num:'2', title:'Sauvegarde ECU', desc:'Lecture et sauvegarde de la cartographie d\'origine du calculateur.'},
            {num:'3', title:'Modification', desc:'Désactivation des paramètres SCR dans le code calculateur.'},
            {num:'4', title:'Réécriture', desc:'Flash de la nouvelle programmation sans erreurs résiduelles.'},
            {num:'5', title:'Validation', desc:'Effacement codes défauts, contrôle visuel des voyants, essai routier.'}
          ],
          targetTitle: "À qui s'adresse la suppression AdBlue ?",
          targetIntro: "La suppression AdBlue concerne les conducteurs de diesels récents confrontés à une défaillance technique du système SCR :",
          targetList: [
            "Véhicules avec <strong>système AdBlue physiquement défaillant</strong> (pompe, capteur, calculateur)",
            "Diesels avec <strong>compte à rebours d'immobilisation</strong> en cours",
            "Propriétaires ayant reçu un <strong>devis concession à 2 000€+</strong> pour remplacement",
            "Conducteurs de <strong>véhicules anciens hors garantie</strong> avec AdBlue capricieux",
            "Flottes professionnelles souhaitant <strong>éviter les immobilisations</strong> coûteuses",
            "Véhicules destinés à un <strong>usage off-road ou agricole</strong> où l'AdBlue pose problème"
          ],
          whyP: "Garage Boost réalise des suppressions AdBlue depuis 2019 sur toutes les marques équipées du système SCR. Voici pourquoi nous choisir pour cette intervention sensible.",
          whyList: [
            "<strong>Désactivation propre</strong> sans messages d'erreur résiduels",
            "<strong>Sauvegarde de la programmation</strong> originale pour réactivation possible",
            "<strong>Compatible toutes marques</strong> : Mercedes, BMW, Audi, VW, Renault, Peugeot, Citroën",
            "<strong>Garantie 12 mois</strong> sur la suppression et le résultat",
            "<strong>Tarif transparent</strong> annoncé avant intervention selon véhicule",
            "<strong>Conseil honnête</strong> : nous refusons la suppression si le système fonctionne"
          ],
          content: [
            {h:"Légalité et CT : ce qu'il faut savoir", p:"La suppression AdBlue est dans une zone <strong>juridiquement grise</strong>. Légalement, votre véhicule doit respecter les normes Euro de sa génération, mais en cas de système physiquement défaillant, la suppression logicielle est tolérée (alternative au remplacement coûteux). Au CT, l'opacité des fumées est mesurée : si elle reste dans les seuils Euro de votre véhicule, pas de problème. Pour les Mercedes/BMW récents, certains contrôles techniques peuvent détecter la suppression — à évaluer au cas par cas. Nous vous conseillons honnêtement selon votre profil."},
            {h:"Quand préférer la réparation ?", p:"Si votre système AdBlue est <strong>physiquement réparable</strong> à coût raisonnable (capteur 200€, pompe 400€), nous vous orientons d'abord vers la réparation. La suppression logicielle reste l'option pour les pannes calculateur (3 000€ neuf), les pannes multiples cumulées, ou les véhicules très anciens où le coût de réparation dépasse la valeur résiduelle."}
          ],
          faq: [
            {q:"La suppression est-elle vraiment réversible ?", a:"Oui, à 100%. Nous conservons une sauvegarde de votre programmation d'origine dans notre base sécurisée. La réactivation se fait en 1-2h pour environ 49-89€ selon le véhicule, par exemple avant une revente."},
            {q:"Mon véhicule est sous garantie : faut-il attendre ?", a:"Si votre véhicule est encore sous garantie constructeur, exigez la réparation gratuite — c'est leur obligation. La suppression logicielle annule la garantie sur les éléments concernés. Solution : faites valoir vos droits d'abord, suppression seulement si la garantie est expirée."},
            {q:"Le voyant disparaît immédiatement ?", a:"Oui, dès la fin de l'intervention. Plus de voyant AdBlue, plus de compte à rebours, plus de message dans le combiné. Le véhicule fonctionne comme avant, sans la contrainte AdBlue."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['reprogrammation-moteur', 'diagnostic-moteur', 'voyants-moteur'],
          ctaTitle: 'AdBlue défectueux ?',
          ctaTitleAccent: 'On désactive proprement.',
          ctaText: 'Économie de 1 200-2 200€ vs remplacement complet. Garantie 12 mois.'
        },

        'traitement-egr': {
          name: 'Traitement EGR & injecteurs',
          title: 'Nettoyage EGR & injecteurs Marseille | Démontage ultrason - Garage Boost',
          metaDesc: "Nettoyage vanne EGR et injecteurs à Plan-de-Cuques (Marseille). Démontage, bain ultrason, joints neufs. Restaure les performances et résout les voyants moteur. Dès 180€.",
          keywords: 'nettoyage EGR Marseille, vanne EGR encrassée Plan-de-Cuques, nettoyage injecteurs ultrason, traitement EGR Marseille, restauration injection diesel',
          h1Pre: 'Traitement', h1Accent: 'EGR & injecteurs.',
          lead: "Vanne EGR encrassée ou injecteurs HS ? Démontage, nettoyage ultrason haute température, remontage avec joints neufs. Restauration des performances pour 180-290€ vs 800-1500€ neuf.",
          image1: IMG.engineBay, imageAlt1: 'Nettoyage vanne EGR ultrason à Marseille',
          image2: IMG.workshop, imageAlt2: 'Démontage et nettoyage injecteurs Garage Boost',
          price: '180 - 290 €', priceMin: '180',
          pricingDesc: "EGR : 180-290€ démontage + ultrason + joints neufs. Injecteurs : 120-220€ traitement par additif premium ou 290-490€ démontage + bain ultrason selon état.",
          introTitle: "EGR encrassée : symptômes et solutions.",
          introP1: "La <strong>vanne EGR (Exhaust Gas Recirculation)</strong> recycle une partie des gaz d'échappement vers l'admission pour réduire les NOx. Ces gaz contiennent suie et vapeurs d'huile qui s'accumulent et finissent par bloquer le mécanisme. Une EGR encrassée provoque <strong>perte de puissance, voyant moteur, à-coups en accélération</strong>.",
          introP2: "Notre solution : démontage de la vanne, nettoyage en bain ultrason haute température, remontage avec joints neufs. Cette intervention restaure 100% du fonctionnement original pour 180-290€ — bien moins cher qu'un remplacement neuf à 400-800€.",
          symptoms: ['Voyant EGR ou moteur allumé', 'Perte de puissance progressive', 'À-coups à l\'accélération', 'Démarrage difficile à froid', 'Fumée noire à l\'échappement', 'Surconsommation', 'Échec contrôle technique pollution', 'Code défaut EGR (P0401, P0402, P0403)'],
          benefitsTitle: 'Restauration sans remplacement.',
          stats: [{value:'-65%', label:'Économie vs neuf'}, {value:'4h', label:'Durée intervention'}, {value:'95%', label:'Cas traités sans changement'}],
          benefits: [
            {icon:'recycle', title:'Sans changement', desc:"Démontage et nettoyage profond plutôt que remplacement coûteux. 95% des cas traités."},
            {icon:'gauge-high', title:'Performances restaurées', desc:"Vanne fonctionnelle à 100%, voyant éteint, performances comme neuves."},
            {icon:'leaf', title:'Démarche écologique', desc:"Pas de pièces jetées : on prolonge la vie de la vanne existante."}
          ],
          whatIsTitle: "Le rôle de l'EGR et des injecteurs",
          whatIsP1: "La <strong>vanne EGR</strong> est un dispositif anti-pollution qui ouvre et ferme un circuit reliant l'échappement à l'admission. En recyclant une partie des gaz brûlés, elle abaisse la température de combustion et réduit la formation de NOx. Sur les diesels modernes, elle fonctionne en permanence pendant la conduite.",
          whatIsP2: "Les <strong>injecteurs</strong> pulvérisent le carburant dans la chambre de combustion sous haute pression (1 500 à 2 500 bars sur les diesels modernes). Avec le temps, ils s'encrassent par dépôts de gomme et de calamine, ce qui dégrade la pulvérisation et donc la combustion. Nettoyage par additif premium ou démontage + ultrason selon le degré d'encrassement.",
          whatIsP3: "Ces deux composants sont <strong>liés</strong> : un injecteur encrassé provoque une combustion incomplète, qui produit plus de suie, qui encrasse plus vite l'EGR. Un nettoyage combiné EGR + injecteurs traite la cause et la conséquence, garantissant un résultat durable.",
          processIntro: "Notre processus de traitement EGR et injecteurs en 5 étapes pour une restauration durable.",
          processSteps: [
            {num:'1', title:'Diagnostic préalable', desc:'Lecture codes défauts, mesure débit injecteurs et fonctionnement EGR.'},
            {num:'2', title:'Démontage', desc:'Dépose de la vanne EGR ou des injecteurs selon le diagnostic.'},
            {num:'3', title:'Bain ultrason', desc:'Nettoyage en machine ultrason haute température, durée 1-2h.'},
            {num:'4', title:'Remontage', desc:'Joints neufs, contrôle visuel, montage selon couples constructeur.'},
            {num:'5', title:'Validation', desc:'Diagnostic post-intervention, effacement codes, essai routier.'}
          ],
          targetTitle: "À qui s'adresse ce traitement ?",
          targetIntro: "Plusieurs profils de véhicules diesel bénéficient grandement de notre traitement EGR + injecteurs :",
          targetList: [
            "Diesels avec <strong>plus de 100 000 km</strong> en usage urbain",
            "Véhicules avec <strong>codes défauts EGR récurrents</strong>",
            "Conducteurs constatant <strong>perte de puissance progressive</strong>",
            "Diesels en <strong>contre-visite contrôle technique</strong>",
            "Véhicules ayant souffert d'une <strong>longue période sans entretien</strong>",
            "Tous diesels Euro 5 et Euro 6 nécessitant <strong>remise à niveau anti-pollution</strong>"
          ],
          whyP: "Garage Boost à Plan-de-Cuques traite plus de 200 vannes EGR et 500 sets d'injecteurs par an, avec un taux de succès de 95%. Voici notre proposition de valeur sur cette intervention.",
          whyList: [
            "<strong>Machine ultrason professionnelle</strong> haute température dernière génération",
            "<strong>Joints neufs systématiques</strong>, jamais de réutilisation",
            "<strong>Tarif fixe annoncé</strong>, aucun supplément à la livraison",
            "<strong>Garantie 12 mois</strong> sur l'intervention",
            "<strong>Diagnostic combiné EGR + injecteurs</strong> pour traiter la cause complète",
            "<strong>Retour à neuf des performances</strong> dans 95% des cas"
          ],
          content: [
            {h:"Quand remplacer plutôt que nettoyer ?", p:"Dans certains cas, le nettoyage ne suffit pas : <strong>moteur de vanne EGR HS</strong> (panne électrique), <strong>injecteurs avec siège piezo défaillant</strong>, <strong>fissure ou déformation mécanique</strong>. Notre diagnostic préalable identifie ces cas et nous orientons alors vers le remplacement. Coût d'un remplacement EGR : 350-700€ pièce neuve OEM. Injecteur neuf : 200-400€ pièce."},
            {h:"Combiner avec décalaminage hydrogène", p:"Pour un résultat optimal, nous recommandons souvent de <strong>combiner le traitement EGR/injecteurs avec un décalaminage hydrogène</strong>. Le décalaminage nettoie la chambre de combustion et le collecteur, le traitement EGR/injecteurs traite les composants démontables. Pack combiné : 350-450€, soit -15% par rapport à la somme des deux interventions séparées."}
          ],
          faq: [
            {q:"Combien de temps tient le résultat ?", a:"Si la cause d'encrassement est traitée (calamine, mauvais carburant), le résultat tient 60 000-100 000 km. En usage urbain pur, plus court. Un décalaminage tous les 30 000 km en complément prolonge la durée de vie."},
            {q:"Faut-il vraiment démonter ou les additifs suffisent ?", a:"Pour une EGR très encrassée, démontage obligatoire (les additifs n'atteignent pas les dépôts internes). Pour les injecteurs faiblement encrassés, un additif premium peut suffire (120-220€). Notre diagnostic identifie le bon protocole."},
            {q:"Voyant EGR éteint après l'intervention ?", a:"Oui, dans 95% des cas, le voyant s'éteint après le nettoyage et l'effacement des codes défauts. Si une autre cause persiste (capteur, débitmètre), il faudra la traiter séparément."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['nettoyage-fap', 'decalaminage-hydrogene', 'diagnostic-moteur'],
          ctaTitle: 'EGR encrassée, voyant moteur ?',
          ctaTitleAccent: 'Démontage + ultrason.',
          ctaText: 'Restauration complète pour 180-290€ vs remplacement neuf à 600€+.'
        },

        'voyants-moteur': {
          name: 'Voyants moteur',
          title: 'Voyants moteur Marseille | Diagnostic & résolution - Garage Boost',
          metaDesc: "Diagnostic voyants moteur (orange, rouge, clignotant) à Plan-de-Cuques (Marseille). Lecture codes défauts, identification cause, devis sous 24h. Résolution durable.",
          keywords: 'voyant moteur allumé Marseille, voyant moteur orange Plan-de-Cuques, voyant rouge moteur, code défaut auto, voyant moteur clignotant solution',
          h1Pre: 'Voyants', h1Accent: 'moteur résolus.',
          lead: "Voyant moteur orange, rouge ou clignotant ? Notre diagnostic identifie la cause précise sous 90 minutes. Lecture multimarque OBD2 + valise constructeur, devis transparent.",
          image1: IMG.mechanic, imageAlt1: 'Diagnostic voyant moteur Marseille',
          image2: IMG.engineBay, imageAlt2: 'Résolution voyant moteur Garage Boost Plan-de-Cuques',
          price: 'Dès 49 €', priceMin: '49',
          pricingDesc: "Diagnostic complet 49€, offert si intervention validée. Réparation selon cause identifiée — devis transparent envoyé sous 24h.",
          introTitle: "Voyant moteur : ne pas l'ignorer.",
          introP1: "Un voyant moteur qui s'allume, c'est votre véhicule qui vous parle. Le <strong>voyant orange</strong> signale un défaut non immédiatement dangereux mais à traiter rapidement. Le <strong>voyant rouge</strong> impose un arrêt rapide pour éviter une casse moteur. Le <strong>voyant clignotant</strong> indique un raté de combustion en cours qui peut endommager le catalyseur en quelques minutes.",
          introP2: "Notre approche : <strong>diagnostiquer précisément la cause</strong> avant toute action. Lecture des codes défauts, mesures temps réel des capteurs, essai routier si nécessaire. Le diagnostic complet est facturé 49€ et devient gratuit si vous validez la réparation chez Garage Boost.",
          symptoms: ['Voyant moteur orange permanent', 'Voyant moteur clignotant', 'Voyant rouge avec mode dégradé', 'Voyant qui s\'éteint puis se rallume', 'Plusieurs voyants simultanés', 'Voyant FAP ou EGR allumé', 'Voyant ABS ou ESP avec voyant moteur', 'Voyant après ravitaillement carburant'],
          benefitsTitle: 'Identification précise de la cause.',
          stats: [{value:'30 min', label:'Diagnostic standard'}, {value:'95%', label:'Pannes identifiées du 1er coup'}, {value:'24h', label:'Devis de réparation'}],
          benefits: [
            {icon:'magnifying-glass', title:'Diagnostic précis', desc:"Lecture multimarque + analyse temps réel pour identifier la cause racine, pas le symptôme."},
            {icon:'gift', title:'Offert si réparé', desc:"Le diagnostic (49€) devient gratuit si vous validez la réparation chez nous."},
            {icon:'file-lines', title:'Rapport écrit', desc:"Compte-rendu détaillé avec code défaut, cause, devis transparent."}
          ],
          whatIsTitle: "Voyants moteur : couleurs et significations",
          whatIsP1: "Le <strong>voyant moteur orange (ou jaune)</strong>, qui ressemble à un moteur stylisé, signale qu'un défaut a été détecté par le calculateur. Le véhicule reste roulable, mais une visite chez le mécanicien sous quelques jours est recommandée pour éviter une aggravation. Causes typiques : défaut capteur, FAP, EGR, sonde lambda, débitmètre.",
          whatIsP2: "Le <strong>voyant moteur rouge</strong> ou rouge clignotant impose un arrêt rapide. Continuer à rouler peut causer une casse mécanique grave. Causes typiques : pression d'huile basse, surchauffe moteur, défaut grave de combustion. Coupez le contact dès que possible et faites remorquer le véhicule.",
          whatIsP3: "Le <strong>voyant moteur clignotant</strong> est le plus critique : il indique un raté de combustion en cours. Le carburant non brûlé arrive dans le catalyseur où il s'enflamme, ce qui peut faire fondre le support céramique en quelques minutes (catalyseur HS = 1 500€). Ralentissez immédiatement, ne montez pas dans les régimes, rejoignez l'atelier le plus proche.",
          processIntro: "Notre processus de diagnostic voyant moteur en 5 étapes pour identifier précisément la cause et proposer une solution durable.",
          processSteps: [
            {num:'1', title:'Lecture OBD', desc:'Connexion valise, extraction codes défauts présents et passés.'},
            {num:'2', title:'Analyse', desc:'Étude des freezframes, conditions d\'apparition du défaut.'},
            {num:'3', title:'Mesures réelles', desc:'Vérification valeurs capteurs en temps réel pour confirmer la cause.'},
            {num:'4', title:'Essai routier', desc:'Si nécessaire, reproduction du symptôme en conditions réelles.'},
            {num:'5', title:'Devis et action', desc:'Rapport écrit, devis de réparation transparent, action après validation.'}
          ],
          targetTitle: "Quand consulter pour un voyant moteur ?",
          targetIntro: "Tout voyant moteur mérite un diagnostic, mais certains exigent une intervention immédiate :",
          targetList: [
            "<strong>Voyant rouge ou rouge clignotant</strong> : arrêt immédiat, faire remorquer",
            "<strong>Voyant orange clignotant</strong> : urgence catalyseur, ralentir et venir directement",
            "<strong>Voyant orange permanent</strong> : RDV sous quelques jours pour éviter aggravation",
            "<strong>Voyant qui s'allume après ravitaillement</strong> : possible mauvais carburant ou défaut bouchon",
            "<strong>Plusieurs voyants simultanés</strong> : diagnostic complet nécessaire",
            "<strong>Voyant après choc ou impact</strong> : capteur déplacé ou faisceau abîmé"
          ],
          whyP: "Garage Boost résout plus de 200 voyants moteur par mois à Plan-de-Cuques. Voici pourquoi nous faire confiance pour identifier et traiter votre défaut.",
          whyList: [
            "<strong>Valise multimarque dernière génération</strong> mise à jour mensuellement",
            "<strong>10 ans d'expérience</strong> sur les motorisations modernes",
            "<strong>Diagnostic offert</strong> dès lors que vous validez la réparation",
            "<strong>Compte-rendu écrit</strong> systématique, transparence totale",
            "<strong>Devis transparent sous 24h</strong> avant toute intervention",
            "<strong>Garantie 12 mois</strong> sur la réparation",
            "<strong>Récupération à domicile</strong> si véhicule non roulant"
          ],
          content: [
            {h:"Que faire si le voyant s'allume en route ?", p:"Pour un <strong>voyant orange permanent</strong>, vous pouvez continuer normalement votre trajet et prendre RDV sous quelques jours. Pour un <strong>voyant orange clignotant</strong>, ralentissez et évitez les régimes élevés (catalyseur en danger). Pour un <strong>voyant rouge</strong>, arrêtez-vous dès que possible en sécurité et appelez notre dépanneuse 06 63 21 63 50 — surtout si pression d'huile ou surchauffe."},
            {h:"Pourquoi le voyant peut s'éteindre puis se rallumer ?", p:"Sur certains défauts intermittents, le voyant s'éteint quand les conditions du défaut ne sont plus présentes (ex : défaut uniquement à chaud, ou uniquement en accélération). Le code défaut reste mémorisé dans le calculateur même voyant éteint. Notre <strong>lecture des codes défauts passés</strong> permet d'identifier ces problèmes intermittents difficiles à reproduire en atelier."}
          ],
          faq: [
            {q:"Peut-on rouler avec un voyant moteur orange ?", a:"Oui, à condition de ne pas trop attendre. Le voyant orange signale un défaut détecté mais non immédiatement dangereux. Prenez rendez-vous sous une semaine pour éviter qu'il ne se transforme en panne plus grave."},
            {q:"Combien coûte un diagnostic voyant moteur ?", a:"49€ pour un diagnostic complet incluant lecture codes, mesures temps réel et compte-rendu écrit. Offert si vous validez la réparation chez Garage Boost."},
            {q:"Le voyant peut-il s'éteindre tout seul ?", a:"Oui, pour certains défauts ponctuels (ex : mauvais carburant, capteur perturbé temporairement). Mais le code défaut reste mémorisé. Si le voyant se rallume plus de 2 fois, diagnostic obligatoire."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['diagnostic-moteur', 'decalaminage-hydrogene', 'nettoyage-fap'],
          ctaTitle: 'Voyant moteur allumé ?',
          ctaTitleAccent: 'Diagnostic en 30 min.',
          ctaText: 'On identifie la cause précise avant de toucher à la moindre pièce.'
        }

      }
    },

    // =================================================================
    // ENTRETIEN & ASSISTANCE (7 services)
    // =================================================================
    'entretien-assistance': {
      label: 'Entretien & assistance',
      services: {

        'mecanique-generale': {
          name: 'Mécanique générale',
          title: 'Mécanique générale Marseille | Vidange, freins, distribution - Garage Boost',
          metaDesc: "Mécanique générale à Plan-de-Cuques (Marseille). Vidange, freins, distribution, embrayage, suspension, climatisation. Toutes marques. Devis transparent. Garantie 12 mois.",
          keywords: 'mécanique générale Marseille, garage entretien Plan-de-Cuques, vidange Marseille, plaquettes frein 13380, distribution courroie',
          h1Pre: 'Mécanique', h1Accent: 'générale.',
          lead: "Vidange, freins, distribution, embrayage, suspension, climatisation. Notre équipe couvre toutes les opérations d'entretien programmé et réparations courantes sur toutes marques de véhicules.",
          image1: IMG.mechanic, imageAlt1: 'Mécanique générale véhicule à Plan-de-Cuques Marseille',
          image2: IMG.engineBay, imageAlt2: 'Atelier mécanique Garage Boost',
          price: 'Dès 89 €', priceMin: '89',
          pricingDesc: "Vidange dès 89€, plaquettes avant 159€, distribution 490-890€, embrayage 590-990€, climatisation 79-149€. Tarifs détaillés sur notre page tarifs.",
          introTitle: "L'entretien complet de votre véhicule.",
          introP1: "La <strong>mécanique générale</strong> couvre l'ensemble des opérations d'entretien programmé et des réparations courantes de votre véhicule. Chez Garage Boost, nous traitons tout ce qui concerne le moteur (vidange, filtres, bougies, courroies), la transmission, le freinage, la suspension, la direction, la climatisation et l'éclairage.",
          introP2: "Notre engagement : <strong>tarifs justes (-30 à -40% vs concession)</strong>, pièces qualité OEM, garantie 12 mois pièces et main-d'œuvre, devis détaillé sous 24h avant tout démarrage. Nous travaillons sans surprise et avec rigueur, ce qui explique notre note de 4,9/5 sur Google.",
          symptoms: ['Bruits anormaux au freinage', 'Vibrations dans le volant', 'Voyants entretien allumés', 'Embrayage qui patine', 'Distribution proche de l\'échéance', 'Climatisation peu efficace', 'Fuite de liquide sous le véhicule', 'Pneumatiques usés irrégulièrement'],
          benefitsTitle: 'Toutes les opérations d\'entretien sous un seul toit.',
          stats: [{value:'-35%', label:'Économie vs concession'}, {value:'12 mois', label:'Garantie incluse'}, {value:'24h', label:'Devis sous'}],
          benefits: [
            {icon:'oil-can', title:'Toutes opérations', desc:"Vidange, freins, distribution, embrayage, suspension, climatisation. Atelier complet."},
            {icon:'cog', title:'Pièces OEM', desc:"Bosch, Valeo, Delphi, Continental, Mahle, Sachs. Aucune pièce low-cost qui lâche à 6 mois."},
            {icon:'euro-sign', title:'Tarifs justes', desc:"-30 à -40% vs concession à qualité égale. Devis transparent, pas de frais cachés."}
          ],
          whatIsTitle: "Mécanique générale : ce que nous traitons",
          whatIsP1: "<strong>Le moteur</strong> : vidange (89€), filtres à huile/air/habitacle/carburant, bougies (essence et préchauffage diesel), courroies accessoires, courroie de distribution complète (490-890€ kit complet), sondes lambda, débitmètres. Toutes interventions périodiques selon préconisations constructeur.",
          whatIsP2: "<strong>Le freinage</strong> : plaquettes avant (159€), plaquettes arrière (149€), kit complet plaquettes + disques avant (290€), étriers, durites, liquide de frein (purge complète 49€), frein de parking. Notre engagement : pièces Brembo, Bosch ou TRW selon vos préférences et budget.",
          whatIsP3: "<strong>La transmission</strong> : embrayage complet kit (590-990€), volant moteur bi-masse, boîte de vitesses (vidange, joints), cardans, transmissions. <strong>La suspension</strong> : amortisseurs, rotules, biellettes, silentblocs, ressorts. <strong>La climatisation</strong> : recharge fluide R134a/R1234yf (79€), désinfection circuit, remplacement compresseur si nécessaire.",
          processIntro: "Notre processus d'entretien standard en 5 étapes garantit qualité et transparence à chaque visite.",
          processSteps: [
            {num:'1', title:'Accueil & inspection', desc:'Examen visuel, lecture codes défauts, mesure usure des consommables.'},
            {num:'2', title:'Devis détaillé', desc:'Liste des opérations nécessaires, pièces, main-d\'œuvre, validation écrite.'},
            {num:'3', title:'Intervention', desc:'Démontage, remplacement avec pièces OEM, contrôles intermédiaires.'},
            {num:'4', title:'Contrôle qualité', desc:'Essai routier, mesures finales, validation des réglages.'},
            {num:'5', title:'Livraison', desc:'Compte-rendu écrit, lavage offert, carnet d\'entretien tamponné.'}
          ],
          targetTitle: "À qui s'adresse la mécanique générale ?",
          targetIntro: "La mécanique générale couvre tous les besoins d'entretien et réparation de votre véhicule, quel que soit votre profil :",
          targetList: [
            "Conducteurs souhaitant <strong>respecter le carnet d'entretien</strong> sans aller en concession",
            "Propriétaires constatant des <strong>signes d'usure</strong> (bruits, voyants, vibrations)",
            "Véhicules approchant des <strong>échéances importantes</strong> (distribution, embrayage)",
            "Conducteurs préparant un <strong>contrôle technique</strong> en mode anticipé",
            "Pros (artisans, livreurs, VTC) avec <strong>besoin d'entretien régulier</strong>",
            "Tous propriétaires de <strong>véhicules essence, diesel ou hybride</strong> toutes marques"
          ],
          whyP: "Garage Boost à Plan-de-Cuques est l'atelier de référence pour la mécanique générale dans toute la zone Marseille. Voici pourquoi nos clients reviennent et nous recommandent.",
          whyList: [
            "<strong>Atelier complet</strong> : 4 ponts élévateurs, banc géométrie 3D, climatisation, électricité",
            "<strong>10 ans d'expérience</strong> sur toutes marques européennes, asiatiques et américaines",
            "<strong>Pièces OEM qualité constructeur</strong> exclusivement",
            "<strong>Tarifs -30 à -40% vs concession</strong> à qualité égale",
            "<strong>Garantie 12 mois</strong> pièces et main-d'œuvre",
            "<strong>Pré-contrôle technique gratuit</strong> à chaque révision",
            "<strong>Récupération à domicile</strong> et véhicule de prêt sur demande"
          ],
          content: [
            {h:"Quand faire la révision de son véhicule ?", p:"En règle générale, comptez une <strong>révision tous les 15 000 à 20 000 km ou tous les 12 mois</strong> selon ce qui arrive en premier. Les véhicules essence longue durée peuvent espacer à 25 000-30 000 km mais nous ne le recommandons pas en usage urbain typique de Marseille. Pour les diesels en usage urbain, une vidange tous les 10 000 km reste l'idéal pour préserver le moteur et le FAP. La révision complète chez Garage Boost coûte entre 149€ et 249€ et inclut un contrôle 50 points."},
            {h:"Distribution moteur : ne pas attendre", p:"La distribution est l'organe le plus critique du moteur. Si la <strong>courroie ou la chaîne</strong> casse, le moteur s'arrête net et les soupapes percutent les pistons, causant des dégâts à 3 000-8 000€. La fréquence de remplacement varie selon le constructeur (60 000 à 240 000 km, 5 à 10 ans). Notre kit complet inclut courroie, galets tendeurs et pompe à eau pour 490-890€."}
          ],
          faq: [
            {q:"Vous travaillez sur les véhicules sous garantie ?", a:"Oui. Depuis 2018, le règlement européen vous autorise à entretenir votre véhicule où vous voulez sans perdre la garantie constructeur, à condition d'utiliser des pièces de qualité OEM et de respecter le carnet. C'est exactement ce que nous faisons."},
            {q:"Quelle huile utilisez-vous pour les vidanges ?", a:"Nous utilisons les huiles préconisées par le constructeur de votre véhicule (5W30, 5W40, 0W20…). Marques de référence : Total, Castrol, Mobil 1. Nous adaptons selon votre type de moteur et votre kilométrage."},
            {q:"Faites-vous l'entretien des hybrides ?", a:"Oui, nous traitons les hybrides légers et rechargeables sur la partie thermique (moteur, transmission, freinage régénératif). Pour les véhicules 100% électriques, nous renvoyons vers des spécialistes habilités haute tension."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['electricite-automobile', 'diagnostic-moteur', 'decalaminage-hydrogene'],
          ctaTitle: 'Vidange, freins, distribution ?',
          ctaTitleAccent: 'On s\'en occupe.',
          ctaText: 'Devis sous 24h, RDV en 48-72h, garantie 12 mois sur toutes nos interventions.'
        },

        'electricite-automobile': {
          name: 'Électricité automobile',
          title: 'Électricité automobile Marseille | Diagnostic & réparation - Garage Boost',
          metaDesc: "Électricité automobile à Plan-de-Cuques (Marseille). Diagnostic batterie, alternateur, démarreur, faisceaux, calculateurs, ABS, ESP. Toutes marques. 59€/h.",
          keywords: 'électricité automobile Marseille, diagnostic électrique auto, batterie alternateur Plan-de-Cuques, court-circuit voiture, calculateur HS',
          h1Pre: 'Électricité', h1Accent: 'automobile.',
          lead: "Diagnostic des problèmes électriques et électroniques : batterie, alternateur, démarreur, faisceaux, calculateurs, ABS, ESP, capteurs. Notre poste électrique professionnel résout les pannes complexes.",
          image1: IMG.engineBay, imageAlt1: 'Diagnostic électrique automobile Marseille',
          image2: IMG.workshop, imageAlt2: 'Poste électricité auto Garage Boost Plan-de-Cuques',
          price: '59 €/h', priceMin: '59',
          pricingDesc: "59€ la première heure de diagnostic électrique. Réparation selon cause identifiée — devis transparent envoyé sous 24h. Diagnostic offert si intervention validée.",
          introTitle: "L'électronique auto, notre spécialité.",
          introP1: "Les véhicules modernes embarquent jusqu'à <strong>50 calculateurs</strong> connectés sur plusieurs bus CAN, des dizaines de capteurs, des systèmes ADAS (caméras, radars), et une électronique présente jusque dans les sièges. Quand un voyant bizarre s'allume ou qu'un fusible saute, le diagnostic peut être complexe.",
          introP2: "Nos outils professionnels permettent de tester chaque ligne, vérifier les masses, identifier les fuites de courant et reprogrammer les calculateurs si nécessaire. <strong>Tarif de base : 59€ la première heure</strong>, devis ensuite selon cause identifiée.",
          symptoms: ['Voyants multiples allumés', 'Fusible qui saute systématiquement', 'Voyant batterie allumé', 'Démarrage difficile ou impossible', 'Vitres ou centralisation HS', 'Climatisation ou éclairage défaillants', 'Voyant ABS ou ESP', 'Décharge batterie inexpliquée'],
          benefitsTitle: 'Diagnostic et réparation électronique.',
          stats: [{value:'50+', label:'Calculateurs lus'}, {value:'95%', label:'Pannes identifiées'}, {value:'59 €', label:'1ère heure diagnostic'}],
          benefits: [
            {icon:'bolt', title:'Diagnostic complet', desc:"Test de chaque ligne, vérification masses, identification fuites de courant."},
            {icon:'circuit-board', title:'Reprogrammation', desc:"Calculateurs, codages capteurs, mise à jour firmware si nécessaire."},
            {icon:'gift', title:'Offert si validé', desc:"Le diagnostic devient gratuit dès lors que vous validez la réparation."}
          ],
          whatIsTitle: "L'électricité automobile, qu'est-ce qui peut tomber ?",
          whatIsP1: "Le <strong>circuit de charge</strong> (batterie, alternateur, régulateur) est le premier point de vigilance. Une batterie a une durée de vie de 4 à 6 ans en moyenne (160-290€ remplacement avec codage). L'alternateur dure 200 000-300 000 km (390-590€). Le démarreur tient 250 000+ km (290-490€). Symptômes typiques : démarrage difficile, voyant batterie, accessoires faibles.",
          whatIsP2: "Le <strong>réseau de calculateurs</strong> (ECU, BSI, ABS, climatisation, instrumentation) communique via bus CAN/LIN. Une panne d'un calculateur peut paralyser plusieurs fonctions. Le diagnostic exige des outils professionnels qui dialoguent avec chaque calculateur. Réparation : reprogrammation logicielle (89-290€), remplacement (souvent 800-2 500€ neuf, alternative reconditionnée).",
          whatIsP3: "Les <strong>capteurs et faisceaux</strong> représentent 60% des pannes électriques. Capteurs vilebrequin, arbre à cames, pression, débit, température : leur défaillance déclenche des codes défauts moteur. Faisceaux : usure, rongeurs, humidité créent des courts-circuits. Réparation : 80-350€ selon la complexité de l'accès.",
          processIntro: "Notre processus de diagnostic électrique en 5 étapes pour identifier précisément la cause de toute panne électronique.",
          processSteps: [
            {num:'1', title:'Lecture multi-ECU', desc:'Diagnostic complet de tous les calculateurs accessibles via OBD.'},
            {num:'2', title:'Mesures électriques', desc:'Tension batterie, charge alternateur, masses, continuités.'},
            {num:'3', title:'Test composants', desc:'Test individuel des capteurs, actionneurs, relais suspects.'},
            {num:'4', title:'Analyse faisceau', desc:'Si nécessaire, vérification des faisceaux et connecteurs.'},
            {num:'5', title:'Réparation', desc:'Devis transparent, intervention après validation, contrôle final.'}
          ],
          targetTitle: "À qui s'adresse le diagnostic électrique ?",
          targetIntro: "Tous les conducteurs confrontés à un problème électrique ou électronique sur leur véhicule peuvent bénéficier de notre intervention :",
          targetList: [
            "Voyants multiples allumés simultanément (plus complexe qu'un simple voyant moteur)",
            "<strong>Fusibles qui sautent</strong> systématiquement (court-circuit à identifier)",
            "<strong>Démarrages difficiles</strong> ou véhicule qui ne démarre plus",
            "Pannes de fonctions électroniques (vitres, centralisation, climatisation, autoradio)",
            "Suspicion de <strong>fuite de courant</strong> (batterie déchargée régulièrement)",
            "Calculateurs HS suite à inversion polarité ou foudre",
            "Mises à jour calculateurs (codages, programmations OEM)"
          ],
          whyP: "Garage Boost à Plan-de-Cuques dispose d'un poste électricité automobile complet et 10 ans d'expérience sur les pannes électriques complexes des véhicules modernes.",
          whyList: [
            "<strong>Multimètres et oscilloscopes</strong> professionnels",
            "<strong>Valise multimarque</strong> dialoguant avec tous calculateurs",
            "<strong>Outils de codage et reprogrammation</strong> calculateurs",
            "<strong>Banc de test composants</strong> (capteurs, alternateurs, démarreurs)",
            "<strong>Stock pièces électriques courantes</strong> (batteries, fusibles, relais, ampoules)",
            "<strong>Tarif horaire transparent</strong> à 59€ avec devis détaillé sous 24h"
          ],
          content: [
            {h:"Pannes intermittentes : nos méthodes", p:"Les pannes électriques intermittentes sont les plus difficiles à diagnostiquer : court-circuit qui apparaît uniquement par temps humide, capteur qui défaille à chaud, calculateur qui plante après vibration. Notre approche : <strong>session diagnostic prolongée</strong>, simulation des conditions de défaillance, parfois pose temporaire d'un enregistreur OBD sur plusieurs jours pour capturer le défaut en conditions réelles."},
            {h:"Codage et apprentissage calculateurs", p:"Sur les véhicules récents, le simple remplacement d'un calculateur ne suffit pas : il faut le <strong>coder et l'apprendre</strong> au véhicule (codes VIN, paramètres optionnels, apprentissage des autres calculateurs). Nous disposons des outils OEM ou équivalents pour réaliser ces opérations délicates : codage clés, ajustement débit injecteurs, codage caméras ADAS, paramétrage suspension pilotée, etc."}
          ],
          faq: [
            {q:"Pourquoi ma batterie se décharge sans raison ?", a:"Trois causes principales : batterie en fin de vie (4-6 ans), alternateur qui ne charge plus (test simple), ou fuite de courant (consommateur qui reste allumé). Notre diagnostic identifie précisément la cause en 30-60 minutes."},
            {q:"Pouvez-vous reprogrammer les clés perdues ?", a:"Oui pour la majorité des marques. Nous codons les clés vierges au véhicule et désactivons les anciennes clés (sécurité). Tarif : 89-290€ selon véhicule, plus la clé physique."},
            {q:"Fait sauter mes fusibles, c'est grave ?", a:"Cela signifie qu'il y a un court-circuit quelque part. Continuer peut endommager des composants ou provoquer un incendie. Diagnostic urgent recommandé."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['mecanique-generale', 'diagnostic-moteur', 'depannage-remorquage'],
          ctaTitle: 'Panne électrique mystérieuse ?',
          ctaTitleAccent: 'On la trouve.',
          ctaText: '59€ la première heure de diagnostic. Devis transparent et garantie 12 mois sur la réparation.'
        },

        'depannage-remorquage': {
          name: 'Dépannage & remorquage',
          title: 'Dépannage & remorquage Marseille | 7j/7 - Garage Boost Plan-de-Cuques',
          metaDesc: "Dépannage et remorquage 7j/7 à Marseille et Plan-de-Cuques. Intervention 30-60 min en zone proche, dépanneuse plateau, prise en charge assurance. Dès 89€.",
          keywords: 'dépannage auto Marseille, remorquage Plan-de-Cuques, dépanneuse 7j/7 13380, panne voiture Marseille, dépanneur auto urgence',
          h1Pre: 'Dépannage', h1Accent: '& remorquage 7j/7.',
          lead: "Panne, accrochage, batterie HS, clé perdue ? Notre service de dépannage intervient en 30 à 60 minutes dans la zone Marseille / Plan-de-Cuques / Aubagne, 7 jours sur 7 y compris week-ends.",
          image1: IMG.garage, imageAlt1: 'Dépannage et remorquage 7j/7 Marseille',
          image2: IMG.mechanic, imageAlt2: 'Dépanneuse Garage Boost Plan-de-Cuques',
          price: '89 - 149 €', priceMin: '89',
          pricingDesc: "Dépannage local <10 km : 89€. Remorquage zone élargie <25 km : 149€. Au-delà : 1,80€/km. Majoration 50% nuit/dimanche/jours fériés.",
          introTitle: "Dépannage rapide, 7 jours sur 7.",
          introP1: "Une panne ne prévient jamais. Que ce soit un démarrage impossible un lundi matin, un accident sur l'A50 un samedi soir, ou un voyant rouge en pleine montée vers Allauch, notre <strong>service de dépannage 7j/7</strong> intervient rapidement avec une dépanneuse plateau professionnelle.",
          introP2: "Notre <strong>délai d'intervention en zone proche</strong> (Plan-de-Cuques, Marseille, Allauch, Aubagne) est de 30 à 60 minutes en heures ouvrées, 60 à 90 minutes les soirs et week-ends. Sur Aix, Vitrolles, Salon : 60 à 90 minutes. Au-delà : devis selon distance.",
          symptoms: ['Panne immobilisante en route', 'Accident ou collision', 'Batterie morte', 'Crevaison ou roue HS', 'Embrayage ou boîte cassés', 'Surchauffe moteur', 'Clé perdue ou bloquée', 'Panne sèche carburant'],
          benefitsTitle: 'Dépannage 24/7 dans toute la zone Marseille.',
          stats: [{value:'30-60', label:'minutes en zone proche'}, {value:'7j/7', label:'Y compris dimanches'}, {value:'89 €', label:'Tarif local'}],
          benefits: [
            {icon:'truck-pickup', title:'Dépanneuse plateau', desc:"Plateau hydraulique pour tous types de véhicules, citadines aux utilitaires."},
            {icon:'clock', title:'Intervention rapide', desc:"30-60 minutes en zone proche en heures ouvrées. Toujours disponibles."},
            {icon:'handshake', title:'Prise en charge assurance', desc:"Nous gérons directement avec votre assurance pour vous éviter l'avance."}
          ],
          whatIsTitle: "Notre service de dépannage en détail",
          whatIsP1: "Notre <strong>dépanneuse plateau</strong> est équipée pour transporter en toute sécurité tous types de véhicules : citadines, berlines, SUV, utilitaires légers, voitures accidentées (même sans roues), véhicules de collection. Système hydraulique, sangles d'attache certifiées, éclairage de signalisation conforme.",
          whatIsP2: "Selon la nature de la panne, notre technicien peut <strong>tenter une réparation sur place</strong> avant d'embarquer le véhicule : dépannage batterie (test + recharge ou remplacement), panne sèche, démarrage assisté, fusibles. Cette intervention sur place est <strong>incluse dans le tarif</strong>, vous évitant un remorquage inutile.",
          whatIsP3: "Si la panne nécessite une intervention atelier, votre véhicule est embarqué et acheminé chez nous (ou chez le garage de votre choix dans la zone). Vous repartez en taxi (à votre charge) ou avec un <strong>véhicule de prêt</strong> si disponible. Diagnostic et devis dans les 24h ouvrées suivantes.",
          processIntro: "Notre processus de dépannage en 5 étapes pour vous remettre en route le plus rapidement possible.",
          processSteps: [
            {num:'1', title:'Appel d\'urgence', desc:'Appelez 06 63 21 63 50, décrivez panne, localisation, type de véhicule.'},
            {num:'2', title:'Mobilisation', desc:'Notre dépanneuse part dans 5-15 minutes selon disponibilité.'},
            {num:'3', title:'Arrivée sur site', desc:'Sécurisation zone, examen véhicule, tentative réparation sur place.'},
            {num:'4', title:'Embarquement', desc:'Si nécessaire, chargement plateau et acheminement à l\'atelier choisi.'},
            {num:'5', title:'Suivi', desc:'Diagnostic et devis sous 24h, vous tenir informé(e) à chaque étape.'}
          ],
          targetTitle: "Quand appeler le dépannage ?",
          targetIntro: "Notre service de dépannage et remorquage répond à toutes les situations d'urgence et de blocage automobile :",
          targetList: [
            "<strong>Panne immobilisante</strong> sur la route ou à l'arrêt",
            "<strong>Accident ou collision</strong> sans dégâts corporels graves",
            "<strong>Batterie morte</strong> ne permettant pas de démarrer",
            "<strong>Surchauffe moteur</strong> ou voyant rouge allumé",
            "<strong>Embrayage cassé</strong> ou boîte de vitesses HS",
            "<strong>Clé perdue ou bloquée</strong> dans le véhicule",
            "<strong>Crevaison sans roue de secours</strong> ou roue de secours HS",
            "Véhicule en <strong>fourrière</strong> à récupérer"
          ],
          whyP: "Garage Boost dispose d'une dépanneuse propre 7j/7 et d'une équipe rodée aux situations d'urgence. Voici pourquoi nous appeler en cas de panne dans la zone Marseille.",
          whyList: [
            "<strong>Délai 30-60 min</strong> en zone proche en heures ouvrées",
            "<strong>7j/7 actif</strong> y compris dimanches et jours fériés",
            "<strong>Réparation sur place tentée</strong> avant embarquement",
            "<strong>Tarif fixe annoncé</strong> avant intervention selon zone",
            "<strong>Prise en charge directe</strong> avec assurances et assistances",
            "<strong>Acheminement vers garage de votre choix</strong> ou notre atelier",
            "<strong>Diagnostic et devis sous 24h</strong> ouvrées si réparation chez nous"
          ],
          content: [
            {h:"Que faire en attendant la dépanneuse ?", p:"<strong>1)</strong> Sécurisez la zone : gilet jaune obligatoire, triangle de signalisation à 30 mètres, déplacement hors voie de circulation si possible. <strong>2)</strong> Coupez le contact, mettez les feux de détresse. <strong>3)</strong> En cas d'accident, notez les coordonnées des autres parties impliquées et faites le constat amiable. <strong>4)</strong> Restez en sécurité (derrière la glissière sur autoroute). <strong>5)</strong> Attendez patiemment notre arrivée, un technicien vous appelle à 5-10 minutes de votre position."},
            {h:"Prise en charge par votre assurance", p:"La majorité des assurances auto et cartes bancaires premium incluent une <strong>assistance dépannage 0 km</strong> ou avec franchise. Si c'est votre cas, appelez votre assistance d'abord : elle peut nous mandater directement et prendre en charge le coût intégral du dépannage. Donnez-leur notre adresse (1 Avenue des Pères Blancs, 13380 Plan-de-Cuques) si vous voulez que votre véhicule soit acheminé chez nous pour réparation."}
          ],
          faq: [
            {q:"Quel est votre délai d'intervention ?", a:"30 à 60 minutes en zone proche (Plan-de-Cuques, Marseille, Allauch, Aubagne) en heures ouvrées. 60-90 minutes les soirs et week-ends. Sur Aix, Vitrolles, Salon : 60-90 minutes en journée. Au-delà : devis selon distance."},
            {q:"Vous intervenez la nuit ?", a:"Oui, 7j/7 avec une majoration de 50% sur les heures de nuit (20h-7h), dimanches et jours fériés. Notre dépanneuse est mobilisable à tout moment."},
            {q:"Est-ce facturé même si je ne fais pas la réparation ?", a:"Le déplacement est facturé (89€ à 149€ selon zone), mais le diagnostic sur place est offert. Si la réparation peut se faire à domicile, c'est inclus. Sinon, on remorque et on devise avant tout travaux."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['depannage-scooter', 'mecanique-generale', 'electricite-automobile'],
          ctaTitle: 'Panne ou accident ?',
          ctaTitleAccent: 'On arrive.',
          ctaText: 'Appelez le 06 63 21 63 50, intervention 30-60 min en zone proche.'
        },

        'depannage-scooter': {
          name: 'Dépannage scooter',
          title: 'Dépannage scooter Marseille | Intervention 7j/7 - Garage Boost',
          metaDesc: "Dépannage scooter à Marseille et Plan-de-Cuques. Démarrage, batterie, panne sèche, courroie. Intervention rapide 7j/7. Tous types de scooters et deux-roues thermiques.",
          keywords: 'dépannage scooter Marseille, panne scooter Plan-de-Cuques, mécanicien scooter 13380, démarrage scooter, batterie scooter Marseille',
          h1Pre: 'Dépannage', h1Accent: 'scooter & 2-roues.',
          lead: "Démarrage difficile, batterie HS, panne sèche, courroie cassée ? Notre service de dépannage scooter intervient rapidement à Marseille et Plan-de-Cuques. Tous types et marques.",
          image1: IMG.garage, imageAlt1: 'Dépannage scooter Marseille',
          image2: IMG.mechanic, imageAlt2: 'Mécanicien scooter Garage Boost Plan-de-Cuques',
          price: 'Dès 69 €', priceMin: '69',
          pricingDesc: "À partir de 69€ pour un dépannage local zone Marseille/Plan-de-Cuques. Devis transparent selon panne identifiée. Pièces et main-d'œuvre garanties 12 mois.",
          introTitle: "Dépannage scooter & deux-roues.",
          introP1: "À Marseille, le scooter est souvent un véhicule essentiel pour les déplacements quotidiens. Une panne, c'est une journée gâchée ou un retard professionnel. Notre <strong>service de dépannage scooter</strong> intervient rapidement pour les pannes courantes.",
          introP2: "Démarrage difficile, batterie morte, panne sèche, courroie cassée, problème de carburateur ou d'injection : nos techniciens spécialisés deux-roues identifient et résolvent la panne sur place quand c'est possible. Sinon, transport vers notre atelier.",
          symptoms: ['Démarrage impossible', 'Batterie déchargée', 'Panne sèche carburant', 'Courroie cassée ou usée', 'Allumage défaillant', 'Variateur ou embrayage HS', 'Bruits anormaux moteur', 'Échappement défaillant'],
          benefitsTitle: 'Service spécialisé deux-roues thermiques.',
          stats: [{value:'7j/7', label:'Intervention'}, {value:'30 min', label:'Zone proche'}, {value:'69 €', label:'Tarif de base'}],
          benefits: [
            {icon:'motorcycle', title:'Tous deux-roues', desc:"Scooters 50 à 500cc, motos thermiques. Toutes marques (Yamaha, Honda, Piaggio, MBK)."},
            {icon:'tools', title:'Réparation sur place', desc:"Batterie, fusible, démarrage, panne sèche réparés sur place quand possible."},
            {icon:'clock', title:'Intervention rapide', desc:"30-60 min en zone Marseille/Plan-de-Cuques en heures ouvrées."}
          ],
          whatIsTitle: "Pannes scooter courantes",
          whatIsP1: "<strong>La batterie</strong> est la première cause de panne sur scooter. Une batterie a une durée de vie de 2-3 ans en usage urbain (vibrations, températures). Symptômes : démarrage difficile à froid, kick obligatoire, accessoires faibles. Remplacement : 49-129€ selon modèle.",
          whatIsP2: "<strong>La courroie de transmission</strong> (sur scooter automatique) est un consommable à changer tous les 15 000-20 000 km. Une courroie qui casse immobilise le scooter. Symptômes annonciateurs : à-coups en accélération, perte de vitesse de pointe. Remplacement courroie + galets : 89-180€.",
          whatIsP3: "<strong>L'allumage et la carburation</strong> (carburateur ou injection) sont les autres points sensibles. Bougie HS, filtre à air saturé, gicleurs encrassés, injecteur défaillant : ces pannes affectent le démarrage et le fonctionnement. Diagnostic + réparation : 80-250€ selon complexité.",
          processIntro: "Notre processus de dépannage scooter en 5 étapes pour vous remettre rapidement sur la route.",
          processSteps: [
            {num:'1', title:'Appel & description', desc:'Type de scooter, marque, panne suspectée, localisation précise.'},
            {num:'2', title:'Intervention', desc:'Notre technicien arrive sous 30-60 min en zone proche.'},
            {num:'3', title:'Diagnostic', desc:'Examen sur place, identification de la panne.'},
            {num:'4', title:'Réparation', desc:'Sur place si possible (batterie, fusible), sinon transport atelier.'},
            {num:'5', title:'Restitution', desc:'Compte-rendu écrit, garantie 12 mois, conseils d\'entretien.'}
          ],
          targetTitle: "À qui s'adresse le dépannage scooter ?",
          targetIntro: "Notre service couvre tous les conducteurs de scooters et deux-roues thermiques en panne :",
          targetList: [
            "Conducteurs de <strong>scooters 50cc</strong> en panne (Vivacity, Buxy, Booster, Trekker)",
            "Propriétaires de <strong>scooters 125cc à 500cc</strong> (Vespa, MP3, Burgman, X-Max)",
            "<strong>Livreurs et coursiers</strong> dont l'activité dépend du scooter",
            "Étudiants et jeunes conducteurs avec <strong>premier scooter</strong>",
            "Conducteurs ayant <strong>un scooter peu utilisé</strong> qui ne démarre plus"
          ],
          whyP: "Garage Boost dispose d'un coin moto/scooter dédié dans son atelier de Plan-de-Cuques avec mécanicien spécialisé deux-roues. Voici pourquoi nous faire confiance.",
          whyList: [
            "<strong>Mécanicien spécialisé</strong> deux-roues thermiques",
            "<strong>Outillage spécifique scooter</strong> (extracteur variateur, démontage carter)",
            "<strong>Stock pièces courantes</strong> : batteries, courroies, bougies, filtres",
            "<strong>Toutes marques</strong> : Yamaha, Honda, Piaggio, Peugeot, MBK, Kymco, SYM",
            "<strong>Tarif transparent</strong> annoncé avant intervention",
            "<strong>Garantie 12 mois</strong> pièces et main-d'œuvre"
          ],
          content: [
            {h:"Entretien préventif scooter", p:"Pour éviter les pannes, un entretien régulier reste la meilleure prévention. Nous recommandons : <strong>vidange tous les 3 000 km</strong>, contrôle batterie tous les 6 mois, remplacement courroie tous les 15 000-20 000 km, contrôle freinage à chaque vidange, nettoyage filtre à air tous les 5 000 km. Forfait entretien complet : 89€ pour 50cc, 129€ pour 125cc, sur devis pour gros cubage."},
            {h:"Cas particulier : scooter qui ne démarre plus après stockage", p:"Si votre scooter est resté immobilisé plusieurs semaines (vacances, hiver), trois causes possibles : batterie déchargée (recharge ou remplacement), <strong>essence éventée</strong> dans le carburateur (nettoyage cuve obligatoire, le carburant s'oxyde en 2-3 mois), bougie noyée. Nettoyage carburateur scooter : 79-129€ selon modèle. Astuce préventive : avant un stockage long, ajoutez un additif de stabilisation carburant et roulez 5 minutes pour qu'il imprègne le circuit ; coupez ensuite le robinet d'essence si présent et stockez le scooter à l'abri de l'humidité dans un local sec."},
            {h:"Conseils pour prolonger la durée de vie de votre scooter", p:"Quelques bonnes pratiques simples allongent considérablement la longévité de votre deux-roues : <strong>respectez scrupuleusement les vidanges</strong> (3 000 km), surveillez la pression des pneus chaque mois, contrôlez le niveau de liquide de frein et d'huile de transmission, évitez les démarrages brutaux à froid, ne laissez jamais la batterie complètement déchargée plus de quelques jours. Ces gestes économisent des centaines d'euros sur la durée de vie globale du véhicule, et évitent les pannes immobilisantes au pire moment."}
          ],
          faq: [
            {q:"Vous travaillez sur les motos ou seulement scooters ?", a:"Nous traitons les scooters et les motos thermiques courantes (toutes marques). Pour les motos très spécifiques (sportives haut de gamme, customisées), nous renvoyons vers des spécialistes dédiés."},
            {q:"Combien coûte une batterie scooter neuve ?", a:"Entre 49€ pour un scooter 50cc d'entrée de gamme et 129€ pour un 500cc. Posée et codée si nécessaire. Garantie 12 mois."},
            {q:"Faites-vous l'entretien régulier ?", a:"Oui, forfait entretien périodique disponible : vidange, filtres, bougie, contrôle général à partir de 89€ pour les 50cc."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['depannage-remorquage', 'mecanique-generale', 'electricite-automobile'],
          ctaTitle: 'Scooter en panne ?',
          ctaTitleAccent: 'Intervention rapide.',
          ctaText: 'Appelez le 06 63 21 63 50. 30-60 min en zone Marseille/Plan-de-Cuques.'
        },

        'ouverture-vehicule': {
          name: 'Ouverture de véhicule',
          title: 'Ouverture véhicule Marseille | Clés perdues, bloquées - Garage Boost',
          metaDesc: "Ouverture de véhicule sans dégradation à Plan-de-Cuques (Marseille). Clés perdues, bloquées dans le véhicule, cassées dans la serrure. Technicien certifié serrurier auto.",
          keywords: 'ouverture véhicule Marseille, clés perdues voiture Plan-de-Cuques, ouvrir voiture sans clé, serrurier auto Marseille, déblocage portière',
          h1Pre: 'Ouverture', h1Accent: 'de véhicule.',
          lead: "Clés perdues, bloquées dans le véhicule, cassées dans la serrure ? Ouverture sans dégradation par technicien certifié serrurier auto. Intervention rapide à Marseille et Plan-de-Cuques.",
          image1: IMG.garage, imageAlt1: 'Ouverture véhicule sans dégradation Marseille',
          image2: IMG.mechanic, imageAlt2: 'Serrurier auto Garage Boost Plan-de-Cuques',
          price: 'Dès 89 €', priceMin: '89',
          pricingDesc: "À partir de 89€ pour ouverture sans dégradation en zone Marseille / Plan-de-Cuques. Intervention 30 min, sans casser la vitre. Toutes marques.",
          introTitle: "Bloqué dehors ? On ouvre, on ne casse rien.",
          introP1: "Vous avez perdu vos clés, elles sont coincées à l'intérieur du véhicule verrouillé, ou cassées dans la serrure ? Pas de panique : notre <strong>technicien certifié serrurier auto</strong> intervient rapidement pour ouvrir votre véhicule <strong>sans aucune dégradation</strong>.",
          introP2: "Nos outils professionnels (sondes, crochets, instruments de manipulation) permettent de débloquer la majorité des serrures de véhicules en 5 à 15 minutes. Aucune vitre cassée, aucune portière forcée, aucune trace visible. Tarif fixe à 89€ en zone proche.",
          symptoms: ['Clés perdues définitivement', 'Clés oubliées dans le véhicule verrouillé', 'Clé cassée dans la serrure', 'Serrure gelée ou bloquée', 'Centralisation HS', 'Clé électronique HS', 'Acheteur d\'occasion sans clé', 'Récupération véhicule en fourrière'],
          benefitsTitle: 'Ouverture sans dégradation, garantie.',
          stats: [{value:'5-15', label:'Minutes en moyenne'}, {value:'0', label:'Dégât véhicule'}, {value:'89 €', label:'Tarif zone proche'}],
          benefits: [
            {icon:'key', title:'Sans dégradation', desc:"Outillage professionnel : sondes, crochets, manipulateurs. Aucune trace après intervention."},
            {icon:'certificate', title:'Technicien certifié', desc:"Serrurier auto certifié, expérience sur toutes marques européennes, asiatiques, américaines."},
            {icon:'clock', title:'Intervention rapide', desc:"30-60 min en zone Marseille/Plan-de-Cuques en heures ouvrées."}
          ],
          whatIsTitle: "Comment ouvrir un véhicule sans clé ?",
          whatIsP1: "Plusieurs méthodes professionnelles existent pour <strong>ouvrir un véhicule verrouillé sans clé</strong>, sans rien casser : utilisation d'une <strong>sonde flexible</strong> pour atteindre le bouton de déverrouillage intérieur via le joint de portière, manipulation directe de la serrure avec outils dédiés, contournement de la centralisation électronique sur certains véhicules récents.",
          whatIsP2: "Pour les <strong>clés cassées dans la serrure</strong>, nous utilisons des extracteurs spéciaux qui permettent de retirer la partie restante sans abîmer le mécanisme. Si la serrure est elle-même endommagée, nous proposons son remplacement (180-350€ selon modèle).",
          whatIsP3: "Pour les <strong>clés électroniques perdues</strong>, deux options : reproduction d'une clé secondaire à partir de votre clé existante (89-290€ avec codage transpondeur), ou fabrication d'une clé complète depuis zéro si toutes les clés sont perdues (190-490€ selon véhicule, codage calculateur inclus).",
          processIntro: "Notre processus d'ouverture en 5 étapes pour vous remettre l'accès à votre véhicule sans aucune dégradation.",
          processSteps: [
            {num:'1', title:'Appel & infos', desc:'Marque, modèle, année du véhicule, localisation, type de blocage.'},
            {num:'2', title:'Vérification droits', desc:'Pièce d\'identité + carte grise pour s\'assurer que vous êtes propriétaire.'},
            {num:'3', title:'Intervention', desc:'Notre technicien arrive avec son outillage professionnel complet.'},
            {num:'4', title:'Ouverture', desc:'Méthode adaptée au véhicule, ouverture en 5-15 minutes en moyenne.'},
            {num:'5', title:'Conseils & options', desc:'Si nécessaire, reproduction de clé secondaire pour éviter la récidive.'}
          ],
          targetTitle: "Quand faire appel à nous ?",
          targetIntro: "Notre service d'ouverture véhicule s'adresse à toutes les situations de blocage automobile :",
          targetList: [
            "<strong>Clés oubliées</strong> à l'intérieur du véhicule verrouillé",
            "<strong>Clés perdues</strong> définitivement (à la plage, en sortie, vol)",
            "<strong>Clé cassée</strong> dans la serrure ou démantibulée",
            "<strong>Serrure gelée</strong> ou bloquée mécaniquement",
            "<strong>Centralisation HS</strong> empêchant le déverrouillage électronique",
            "<strong>Récupération véhicule</strong> sans clés (achat occasion, succession)",
            "<strong>Récupération en fourrière</strong> avec procédure d'identification"
          ],
          whyP: "Garage Boost à Plan-de-Cuques dispose d'un technicien serrurier auto certifié avec 8 ans d'expérience. Voici pourquoi nous appeler en cas de blocage.",
          whyList: [
            "<strong>Certification serrurier auto</strong> et 8 ans d'expérience",
            "<strong>Outillage professionnel complet</strong> pour toutes marques",
            "<strong>Aucune dégradation</strong> garantie sur 95% des cas",
            "<strong>Tarif fixe annoncé</strong> avant intervention",
            "<strong>Vérification d'identité systématique</strong> pour la sécurité",
            "<strong>Reproduction de clé possible</strong> dans la foulée",
            "<strong>Intervention 7j/7</strong> avec majoration nuit/dimanche"
          ],
          content: [
            {h:"Vérification d'identité : indispensable", p:"Avant toute intervention d'ouverture, nous demandons systématiquement votre <strong>pièce d'identité et votre carte grise</strong>. Cette vérification est essentielle pour s'assurer que vous êtes bien le propriétaire ou un utilisateur légitime du véhicule. Pour les locations, présentez le contrat. Pour les véhicules d'entreprise, une attestation de l'employeur. Cette procédure protège tout le monde contre les tentatives de vol."},
            {h:"Comment éviter de se retrouver bloqué ?", p:"Quelques bonnes pratiques : <strong>toujours avoir une clé de secours</strong> chez un proche ou un voisin, faire <strong>reproduire une clé électronique supplémentaire</strong> dès l'achat du véhicule, ne jamais laisser les clés sur le contact même quelques secondes (verrouillage automatique sur certains véhicules), changer la pile de la clé électronique tous les 3-4 ans (signe de faiblesse : portée diminue)."}
          ],
          faq: [
            {q:"Combien de temps faut-il pour ouvrir mon véhicule ?", a:"En moyenne 5 à 15 minutes selon le modèle. Les véhicules récents avec serrures complexes peuvent nécessiter 20-30 minutes. Toujours sans dégradation."},
            {q:"Pouvez-vous reprogrammer une clé électronique ?", a:"Oui, sur la majorité des marques. Si vous avez perdu toutes vos clés, nous fabriquons une clé neuve et la codons au véhicule (190-490€ selon marque)."},
            {q:"Dois-je payer si vous n'arrivez pas à ouvrir ?", a:"Non. Si nous échouons (cas extrêmement rare avec nos outils), aucun frais ne vous est facturé. Cela arrive sur certains véhicules très récents avec systèmes de sécurité avancés."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['reproduction-cles', 'depannage-remorquage', 'electricite-automobile'],
          ctaTitle: 'Bloqué dehors ?',
          ctaTitleAccent: 'On ouvre sans casser.',
          ctaText: 'Appelez le 06 63 21 63 50. Intervention 30-60 min en zone Marseille/Plan-de-Cuques.'
        },

        'reproduction-cles': {
          name: 'Reproduction de clés',
          title: 'Reproduction clés auto Marseille | Codage transpondeur - Garage Boost',
          metaDesc: "Reproduction de clés automobiles à Plan-de-Cuques (Marseille). Clés mécaniques et électroniques avec codage transpondeur. Toutes marques. Dès 89€.",
          keywords: 'reproduction clé auto Marseille, double clé voiture Plan-de-Cuques, codage clé transpondeur, clé électronique Marseille, fabrication clé voiture',
          h1Pre: 'Reproduction', h1Accent: 'de clés auto.',
          lead: "Reproduction de clés mécaniques et électroniques avec codage du transpondeur. Toutes marques européennes, asiatiques et américaines. Travail rapide à Plan-de-Cuques.",
          image1: IMG.workshop, imageAlt1: 'Reproduction clé voiture Marseille',
          image2: IMG.mechanic, imageAlt2: 'Codage transpondeur clé électronique Plan-de-Cuques',
          price: '89 - 290 €', priceMin: '89',
          pricingDesc: "Clé mécanique : 89-150€. Clé électronique avec transpondeur : 150-290€ selon marque. Fabrication clé complète si toutes perdues : 190-490€ avec codage.",
          introTitle: "Une clé secondaire, c'est essentiel.",
          introP1: "Avoir une <strong>clé secondaire</strong> de votre véhicule, c'est éviter les situations de blocage coûteuses (clés perdues = 250-490€ de fabrication + immobilisation). Nous reproduisons toutes types de clés : mécaniques simples, électroniques avec transpondeur, télécommandes intégrées.",
          introP2: "Notre <strong>matériel professionnel de codage</strong> nous permet d'apprendre la nouvelle clé au calculateur antidémarrage de votre véhicule. Sans ce codage, une clé reproduite ne démarrerait pas le moteur sur les véhicules modernes (post-2000).",
          symptoms: ['Une seule clé en possession', 'Clé électronique en panne', 'Pile clé faible (portée réduite)', 'Achat véhicule occasion 1 clé', 'Toutes les clés perdues', 'Souhait de clé pour un proche', 'Clé cassée mécaniquement', 'Télécommande HS sur clé existante'],
          benefitsTitle: 'Toutes marques, toutes générations.',
          stats: [{value:'15-45', label:'Minutes intervention'}, {value:'95%', label:'Marques couvertes'}, {value:'89 €', label:'Tarif clé simple'}],
          benefits: [
            {icon:'key', title:'Toutes clés', desc:"Mécaniques, électroniques avec transpondeur, télécommandes intégrées laser."},
            {icon:'shield-halved', title:'Codage sécurisé', desc:"Apprentissage de la clé au calculateur antidémarrage. Sécurité préservée."},
            {icon:'rotate-left', title:'Désactivation anciennes', desc:"Sur demande, désactivation d'anciennes clés (cas de revente, séparation)."}
          ],
          whatIsTitle: "Types de clés et procédures",
          whatIsP1: "<strong>Clé mécanique simple</strong> (véhicules avant 1995) : reproduction directe sur machine à reproduire, 30 minutes maximum. Tarif : 25-50€. Aujourd'hui rare car la majorité des véhicules ont une protection électronique.",
          whatIsP2: "<strong>Clé avec transpondeur</strong> (1995-2010) : la clé contient une puce électronique reconnue par le calculateur antidémarrage. Reproduction physique + codage transpondeur. Tarif : 89-150€. 30-45 minutes d'intervention.",
          whatIsP3: "<strong>Clé électronique télécommande</strong> (2005+) : clé complexe avec télécommande de centralisation et transpondeur. Reproduction nécessite codage avancé du calculateur, parfois communication avec le serveur du constructeur. Tarif : 150-290€ selon marque (jusqu'à 490€ pour fabrication clé neuve sans clé existante).",
          processIntro: "Notre processus de reproduction de clé en 5 étapes pour une clé secondaire fonctionnelle.",
          processSteps: [
            {num:'1', title:'Identification véhicule', desc:'Marque, modèle, année. Vérification carte grise et identité.'},
            {num:'2', title:'Choix de la clé', desc:'Clé vierge adaptée à votre véhicule (forme, type électronique).'},
            {num:'3', title:'Reproduction physique', desc:'Découpe sur machine à reproduire ou fraisage laser pour clés modernes.'},
            {num:'4', title:'Codage transpondeur', desc:'Apprentissage de la clé au calculateur antidémarrage du véhicule.'},
            {num:'5', title:'Test & validation', desc:'Test démarrage, télécommande, validation finale du fonctionnement.'}
          ],
          targetTitle: "À qui s'adresse ce service ?",
          targetIntro: "La reproduction de clés concerne tous les conducteurs souhaitant disposer d'une clé secondaire ou remplacer une clé HS :",
          targetList: [
            "Propriétaires avec <strong>une seule clé en possession</strong> (risque élevé de blocage)",
            "<strong>Acheteurs d'occasion</strong> n'ayant reçu qu'une clé du précédent propriétaire",
            "Conducteurs avec <strong>clé électronique en panne</strong> (pile faible, défaut composant)",
            "<strong>Familles partageant un véhicule</strong> souhaitant chacun sa clé",
            "Cas extrême : <strong>toutes les clés perdues</strong> (fabrication complète depuis zéro)"
          ],
          whyP: "Garage Boost à Plan-de-Cuques dispose d'une station de codage clés professionnelle avec abonnement aux serveurs constructeurs. Voici pourquoi nous choisir.",
          whyList: [
            "<strong>Stock clés vierges</strong> pour les marques courantes (sortie le jour même)",
            "<strong>Machine à reproduire laser</strong> pour clés modernes haute précision",
            "<strong>Station codage professionnelle</strong> avec abonnement OEM",
            "<strong>Toutes marques</strong> : européennes, asiatiques, américaines, premium",
            "<strong>Tarif transparent annoncé</strong> avant intervention selon marque",
            "<strong>Garantie 12 mois</strong> sur la clé reproduite et son codage"
          ],
          content: [
            {h:"Que faire si toutes les clés sont perdues ?", p:"Si vous avez perdu <strong>toutes les clés</strong> de votre véhicule, la procédure est plus complexe et plus coûteuse : nous devons commander une clé vierge auprès du concessionnaire (avec preuve de propriété), la coder au calculateur, parfois reprogrammer le calculateur lui-même. Tarif : 190-490€ selon marque, 24-72h de délai. Solution préventive : toujours avoir une clé secondaire."},
            {h:"Combien de clés un véhicule peut-il avoir ?", p:"La plupart des véhicules acceptent <strong>4 à 8 clés codées simultanément</strong>. Sur certaines marques premium (Audi, BMW, Mercedes), jusqu'à 10. Au-delà, il faut désactiver une ancienne clé pour en activer une nouvelle. Cette gestion est utile lors de revente : vous pouvez désactiver vos anciennes clés pour ne céder à l'acheteur que des clés neuves codées."}
          ],
          faq: [
            {q:"Combien de temps pour reproduire une clé ?", a:"15-30 minutes pour clé mécanique. 30-45 minutes pour clé avec transpondeur. 60-90 minutes pour clé électronique avec télécommande. Toutes les opérations se font à l'atelier."},
            {q:"Faut-il apporter la carte grise ?", a:"Oui, obligatoire. Nous vérifions que vous êtes propriétaire avant toute reproduction de clé pour des raisons de sécurité évidentes."},
            {q:"Pouvez-vous désactiver mes anciennes clés ?", a:"Oui, sur demande. Utile lors d'une revente ou si une clé a été perdue dans un endroit où elle pourrait être utilisée. Service inclus dans le codage de la nouvelle clé."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['ouverture-vehicule', 'electricite-automobile', 'mecanique-generale'],
          ctaTitle: 'Une clé secondaire ?',
          ctaTitleAccent: 'Reproduction rapide.',
          ctaText: 'À partir de 89€, codage inclus, garantie 12 mois. RDV sous 48h.'
        },

        'enlevement-epaves': {
          name: 'Enlèvement d\'épaves',
          title: 'Enlèvement épave Marseille | Reprise sur RDV VHU - Garage Boost',
          metaDesc: "Enlèvement d'épaves à Plan-de-Cuques (Marseille). Reprise sur rendez-vous, certificat de destruction VHU agréé, démarches préfecture incluses. Devis personnalisé.",
          keywords: 'enlèvement épave Marseille, reprise voiture épave Plan-de-Cuques, certificat destruction VHU, voiture hors d\'usage Marseille, démantèlement auto',
          h1Pre: 'Enlèvement', h1Accent: 'd\'épave sur RDV.',
          lead: "Reprise de votre véhicule hors d'usage sur rendez-vous avec certificat de destruction VHU agréé. Démarches préfecture incluses. Devis personnalisé selon état et zone.",
          image1: IMG.garage, imageAlt1: 'Enlèvement épave VHU sur rendez-vous Marseille',
          image2: IMG.mechanic, imageAlt2: 'Reprise véhicule hors d\'usage Garage Boost',
          price: 'Sur devis', priceMin: '0',
          pricingDesc: "Reprise sur rendez-vous avec devis personnalisé selon état du véhicule, accessibilité et zone géographique. Certificat de destruction VHU agréé et démarches préfecture inclus dans la prestation.",
          introTitle: "Votre épave : reprise sur rendez-vous.",
          introP1: "Votre véhicule est <strong>hors d'usage</strong> (accident, panne moteur grave, corrosion, immatriculation impossible) et stagne devant chez vous ? Plutôt que de le laisser pourrir, nous proposons une <strong>reprise sur rendez-vous</strong> avec remise du <strong>certificat de destruction officiel</strong> nécessaire pour la radiation définitive auprès de la préfecture.",
          introP2: "Vous évitez les amendes pour stationnement abusif, vous récupérez la place de parking, et nous nous occupons de toutes les démarches administratives. Le véhicule est démantelé en <strong>centre VHU agréé</strong> pour recyclage écologique : pièces récupérées, fluides traités, métaux refondus. Démarche 100% conforme à la réglementation. Tarif établi sur devis selon état du véhicule, accessibilité et zone géographique.",
          symptoms: ['Véhicule accidenté irréparable', 'Panne moteur grave (joint culasse, segments)', 'Corrosion structurelle importante', 'Véhicule sans contrôle technique récent', 'Carte grise perdue ou non disponible', 'Coût réparation > valeur véhicule', 'Place de parking occupée inutilement', 'Démarche succession véhicule défunt'],
          benefitsTitle: 'Service sur RDV, démarches incluses.',
          stats: [{value:'Sur devis', label:'Tarif personnalisé'}, {value:'48-72h', label:'Délai d\'intervention'}, {value:'100%', label:'Démarches incluses'}],
          benefits: [
            {icon:'calendar-check', title:'Sur rendez-vous', desc:"Devis personnalisé selon véhicule et zone, intervention planifiée à votre convenance."},
            {icon:'file-lines', title:'Certificat officiel', desc:"Certificat de destruction VHU agréé, valable préfecture pour radiation définitive."},
            {icon:'leaf', title:'Recyclage écologique', desc:"Démantèlement en centre VHU agréé, recyclage des métaux et traitement des fluides."}
          ],
          whatIsTitle: "Qu'est-ce qu'une épave automobile ?",
          whatIsP1: "Un véhicule est considéré <strong>épave (VHU = Véhicule Hors d'Usage)</strong> quand il ne peut plus rouler de manière fiable et que le coût de réparation dépasse sa valeur résiduelle. Cas typiques : accident grave avec déformation structurelle, panne moteur ou boîte irréparable, corrosion généralisée, véhicule sans CT récent et défaut critique non réparable.",
          whatIsP2: "Légalement, un véhicule épave doit être <strong>radié de la circulation</strong> via une procédure spécifique en préfecture (cerfa 13754*03). Sans cette radiation, vous restez officiellement propriétaire du véhicule et redevable des éventuelles infractions ou amendes. La radiation nécessite un certificat de destruction émis par un centre VHU agréé.",
          whatIsP3: "Notre service prend en charge l'<strong>intégralité de la procédure</strong> : récupération du véhicule, démantèlement par notre partenaire centre VHU agréé, émission du certificat de destruction officiel, transmission du dossier à la préfecture. Vous n'avez rien à faire au-delà de nous appeler et de nous remettre le véhicule avec sa carte grise (si disponible).",
          processIntro: "Notre processus d'enlèvement d'épave en 5 étapes pour vous débarrasser de votre véhicule hors d'usage en toute légalité.",
          processSteps: [
            {num:'1', title:'Contact', desc:'Appelez 06 63 21 63 50, donnez modèle, état, localisation, situation administrative.'},
            {num:'2', title:'Vérifications', desc:'Validation carte grise, identité, état du véhicule (photos parfois demandées).'},
            {num:'3', title:'Récupération', desc:'Notre dépanneuse se déplace dans les 48-72h chez vous selon devis.'},
            {num:'4', title:'Démantèlement', desc:'Acheminement vers centre VHU agréé partenaire pour traitement écologique.'},
            {num:'5', title:'Certificat & radiation', desc:'Certificat de destruction officiel envoyé, radiation préfecture déclarée.'}
          ],
          targetTitle: "Quels véhicules pouvons-nous reprendre ?",
          targetIntro: "Notre service couvre la majorité des situations d'épaves automobiles, sous conditions :",
          targetList: [
            "<strong>Voitures particulières</strong> hors d'usage toutes marques",
            "<strong>Utilitaires légers</strong> (-3,5T) en panne irréparable",
            "<strong>Scooters et motos</strong> hors d'usage",
            "Véhicules <strong>accidentés gravement</strong> non réparables économiquement",
            "Véhicules <strong>sans contrôle technique</strong> avec défauts critiques",
            "Successions : <strong>véhicules de défunts</strong> à radier (procédure spécifique)",
            "Véhicules <strong>en fourrière</strong> à régulariser"
          ],
          whyP: "Garage Boost travaille avec un centre VHU agréé partenaire pour vous offrir un service simple, conforme et transparent. Voici pourquoi nous choisir pour votre épave.",
          whyList: [
            "<strong>Reprise sur RDV avec devis transparent</strong> en zone Marseille / Plan-de-Cuques / Aubagne / Aix / Vitrolles",
            "<strong>Centre VHU agréé partenaire</strong> avec recyclage écologique conforme",
            "<strong>Certificat de destruction officiel</strong> émis sous 7-15 jours",
            "<strong>Démarches préfecture incluses</strong>, vous n'avez rien à faire",
            "<strong>Délai 48-72h</strong> pour récupération chez vous",
            "<strong>Récupération possible sans carte grise</strong> dans certains cas (justificatif autre)",
            "<strong>Service successions</strong> avec accompagnement spécifique aux héritiers"
          ],
          content: [
            {h:"Cas particulier : carte grise perdue", p:"Si vous n'avez plus la carte grise du véhicule (perte, vol, papier abîmé), le processus est légèrement différent : nous vous accompagnons dans la <strong>demande de duplicata préalable</strong> auprès de la préfecture, ce qui prend 7-15 jours. Sans duplicata, certains centres VHU peuvent accepter une déclaration de perte + pièce d'identité + facture d'achat ou tout justificatif de propriété. Nous étudions chaque cas individuellement."},
            {h:"Combien de temps pour la radiation officielle ?", p:"Une fois le véhicule récupéré, le centre VHU émet le certificat de destruction sous 7 à 15 jours. Ce certificat déclenche automatiquement la <strong>radiation définitive auprès de la préfecture</strong>. Vous recevez ensuite l'attestation de radiation par courrier (ou consultable sur ANTS). À partir de cette date, vous n'êtes plus considéré propriétaire du véhicule et toutes vos obligations cessent (assurance, contrôle technique, taxes éventuelles)."}
          ],
          faq: [
            {q:"Combien coûte l'enlèvement ?", a:"Le tarif est établi sur devis lors de la prise de rendez-vous, en fonction de l'état du véhicule, de l'accessibilité (étage, parking sous-sol, voirie étroite) et de la zone géographique. Dans la majorité des cas, la valorisation des pièces et métaux récupérés permet de proposer un tarif très contenu, parfois nul. Devis ferme avant intervention."},
            {q:"Mon véhicule a-t-il une valeur de reprise ?", a:"Pour une épave classée VHU, généralement non. La valeur des pièces récupérées et des métaux compense en partie le coût du démantèlement et du transport. Sur certains véhicules récents avec pièces revalorisables, une petite reprise peut être proposée et déduite du devis."},
            {q:"Que se passe-t-il après la reprise ?", a:"Le véhicule est acheminé en centre VHU agréé, dépollué (vidange tous fluides, traitement des batteries), démantelé. Pièces réutilisables récupérées, carcasse compactée et envoyée en aciérie pour refonte."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['depannage-remorquage', 'mecanique-generale', 'electricite-automobile'],
          ctaTitle: 'Une épave devant chez vous ?',
          ctaTitleAccent: 'On la reprend sur RDV.',
          ctaText: 'Devis personnalisé, démarches incluses, certificat de destruction officiel. RDV sous 48-72h.'
        }

      }
    },

    // =================================================================
    // CARROSSERIE (3 services)
    // =================================================================
    'carrosserie': {
      label: 'Carrosserie',
      services: {

        'carrosserie-auto': {
          name: 'Carrosserie auto',
          title: 'Carrosserie auto Marseille | Réparation choc, redressage - Garage Boost',
          metaDesc: "Atelier carrosserie auto à Plan-de-Cuques (Marseille). Réparation choc, redressage tôle, débosselage marbre, remplacement éléments. Toutes assurances. Garantie 12 mois.",
          keywords: 'carrosserie auto Marseille, réparation carrosserie Plan-de-Cuques, débosselage Marseille, redressage tôle 13380, remplacement aile porte capot',
          h1Pre: 'Carrosserie', h1Accent: 'auto.',
          lead: "Réparation après choc, redressage tôle, débosselage marbre traction, remplacement éléments complets (aile, porte, capot, pare-chocs). Toutes marques, toutes assurances.",
          image1: IMG.body, imageAlt1: 'Réparation carrosserie auto Marseille',
          image2: IMG.paint, imageAlt2: 'Atelier carrosserie Garage Boost Plan-de-Cuques',
          price: '90 - 890 €', priceMin: '90',
          pricingDesc: "Petit choc : 90-290€. Élément complet : 350-590€. Remplacement complet : 490-890€. Tarifs incluant peinture cabine et garantie 12 mois tôlerie.",
          introTitle: "Réparation après choc, comme à l'origine.",
          introP1: "Un choc sur le parking, un accrochage en ville, une rayure profonde après un acte de vandalisme : ce sont des aléas que tout automobiliste rencontre tôt ou tard. La bonne nouvelle, c'est que <strong>la majorité de ces désordres se réparent</strong> proprement, sans remplacer l'élément complet, et souvent pour un coût bien inférieur à ce que vous imaginez.",
          introP2: "Notre atelier de carrosserie à Plan-de-Cuques dispose d'une <strong>cabine de peinture professionnelle</strong> avec séchage infrarouge, d'un poste de débosselage par marbre traction, d'outils de DSP (débosselage sans peinture), et d'un poste de calibrage ADAS pour les véhicules récents équipés de caméras.",
          symptoms: ['Choc avant ou arrière', 'Rayures profondes', 'Bosse sans cassure peinture', 'Élément déformé après accident', 'Aile, porte ou capot endommagés', 'Pare-chocs cassé ou décollé', 'Phare brisé après impact', 'Dégât grêle ou catastrophe naturelle'],
          benefitsTitle: 'Finition concours, prix justes.',
          stats: [{value:'12 mois', label:'Garantie tôlerie'}, {value:'24 mois', label:'Garantie peinture'}, {value:'-30%', label:'vs concession'}],
          benefits: [
            {icon:'paint-brush', title:'Cabine pro', desc:"Peinture cabine fermée pressurisée avec séchage IR. Finition impeccable garantie."},
            {icon:'palette', title:'Teinte exacte', desc:"Mélangeur électronique pour la teinte d'origine constructeur, raccord ombré invisible."},
            {icon:'shield', title:'Toutes assurances', desc:"AXA, MAAF, MMA, Macif, Allianz... Gestion directe, pas d'avance de trésorerie."}
          ],
          whatIsTitle: "Carrosserie : ce que nous traitons",
          whatIsP1: "<strong>Petit choc / rayure profonde</strong> : redressage léger, ponçage, mastiquage, apprêt, peinture localisée avec raccord ombré sur les éléments adjacents. 90 à 290€. Idéal pour les petits accrochages parking ou rayures malveillantes.",
          whatIsP2: "<strong>Réparation élément (aile, porte, capot, pare-chocs)</strong> : débosselage au marbre traction si nécessaire, remplacement de la zone abîmée, mastiquage, apprêt, peinture cabine complète de l'élément. 350 à 590€ par élément. Restitution à l'identique de l'origine.",
          whatIsP3: "<strong>Remplacement élément complet</strong> : pièce neuve OEM ou équivalent qualité, dépose-pose, peinture teinte d'origine, montage finitions. 490 à 890€ selon élément et véhicule. Pour les chocs importants où la réparation n'est pas économiquement justifiée.",
          processIntro: "Notre processus de réparation carrosserie en 5 étapes pour restaurer votre véhicule à son état d'origine.",
          processSteps: [
            {num:'1', title:'Devis détaillé', desc:'Examen, identification éléments, devis sous 24h, gestion assurance si applicable.'},
            {num:'2', title:'Préparation', desc:'Démontage éléments concernés, ponçage, traitement anti-rouille si nécessaire.'},
            {num:'3', title:'Redressage', desc:'Marbre traction si déformation, mastiquage des aspérités, apprêt deux couches.'},
            {num:'4', title:'Peinture cabine', desc:'Application teinte d\'origine, vernis, séchage IR. Raccord ombré sur adjacents.'},
            {num:'5', title:'Remontage & contrôle', desc:'Montage final, polish léger, lavage, contrôle qualité, restitution.'}
          ],
          targetTitle: "À qui s'adresse la carrosserie ?",
          targetIntro: "Notre atelier traite tous types de dommages carrosserie pour les automobilistes de Marseille et région :",
          targetList: [
            "<strong>Accrochages parking</strong> ou en ville (chocs latéraux, frottements)",
            "<strong>Accidents</strong> avec déformation d'éléments (avant, arrière, latéral)",
            "<strong>Vandalisme</strong> : rayures profondes, élément délibérément abîmé",
            "<strong>Catastrophes naturelles</strong> : grêle, inondation, chute d'arbre",
            "<strong>Vieillissement</strong> : retouches d'éléments oxydés ou délavés par UV",
            "Préparation <strong>avant revente</strong> pour valoriser le véhicule",
            "<strong>Véhicules de collection</strong> avec restauration esthétique partielle"
          ],
          whyP: "Garage Boost dispose d'un atelier carrosserie moderne et complet à Plan-de-Cuques. Voici pourquoi nos clients de toute la zone Marseille nous confient leurs réparations carrosserie.",
          whyList: [
            "<strong>Cabine de peinture pressurisée</strong> avec séchage infrarouge moderne",
            "<strong>Marbre traction professionnel</strong> pour redressage chocs structurels",
            "<strong>Mélangeur électronique</strong> pour teinte exacte constructeur",
            "<strong>Calibrage ADAS</strong> intégré pour véhicules récents",
            "<strong>Partenariat avec toutes assurances</strong> auto françaises",
            "<strong>Garantie 12 mois tôlerie + 24 mois peinture</strong>",
            "<strong>Compte-rendu photo avant/après</strong> pour transparence totale"
          ],
          content: [
            {h:"Petit choc, grosse facture évitée : le DSP", p:"Le <strong>débosselage sans peinture (DSP)</strong> est une technique magique : nos outils permettent de ramener la tôle à sa forme d'origine sans la peindre, à condition que la peinture ne soit pas fissurée. Idéal pour les bosses de grêle, les chocs de portière, les coups de chariot de supermarché. Le résultat est invisible et le coût bien inférieur à une réparation classique : 90 à 290€ selon la taille, contre 350 à 590€ pour un débosselage + peinture. Cette technique préserve aussi la <strong>peinture d'origine</strong>, ce qui maintient la valeur de revente du véhicule."},
            {h:"Travail direct avec les assurances", p:"Pour vous simplifier la vie, Garage Boost est <strong>partenaire de la majorité des compagnies d'assurance auto</strong> françaises. En cas de sinistre carrosserie, nous établissons le devis selon les barèmes assureurs, gérons l'expertise contradictoire si nécessaire, facturons directement votre compagnie et vous restituons votre véhicule remis à neuf. Vous n'avez à payer que la franchise contractuelle. Cette gestion directe vous évite l'avance de trésorerie et la paperasse administrative."}
          ],
          faq: [
            {q:"Combien de temps pour réparer un choc ?", a:"Petit choc : 1 à 2 jours. Réparation élément + peinture : 3 à 5 jours. Remplacement élément complet : 5 à 8 jours selon disponibilité des pièces. Délais incluant le séchage cabine, le polish et les retouches."},
            {q:"Vous gérez directement avec mon assurance ?", a:"Oui, nous travaillons en direct avec la majorité des compagnies (AXA, MAAF, MMA, Macif, Allianz, Generali, Direct Assurance). Vous ne faites aucune avance sur la franchise, on s'occupe de toute la paperasse."},
            {q:"La peinture sera-t-elle invisible ?", a:"Oui, dans 99% des cas. Notre mélangeur électronique identifie la teinte exacte de votre véhicule, et notre raccord ombré sur les éléments adjacents rend la réparation totalement invisible. Garantie 24 mois sur la peinture."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['peinture-automobile', 'pare-brise', 'mecanique-generale'],
          ctaTitle: 'Choc, rayure, dommage ?',
          ctaTitleAccent: 'On répare comme neuf.',
          ctaText: 'Devis gratuit sous 24h. Envoyez photos sur WhatsApp pour un premier chiffrage immédiat.'
        },

        'peinture-automobile': {
          name: 'Peinture automobile',
          title: 'Peinture auto Marseille | Cabine pro, teinte d\'origine - Garage Boost',
          metaDesc: "Peinture automobile cabine professionnelle à Plan-de-Cuques (Marseille). Teinte d'origine constructeur, raccord ombré invisible. Du retouche-stylo à la peinture complète véhicule.",
          keywords: 'peinture auto Marseille, peinture voiture Plan-de-Cuques, cabine peinture auto, peinture complète véhicule, mélangeur électronique teinte',
          h1Pre: 'Peinture', h1Accent: 'automobile cabine.',
          lead: "Peinture cabine professionnelle, teinte d'origine constructeur, raccord ombré pour finition invisible. Du retouche-stylo à la peinture complète véhicule. Garantie 24 mois.",
          image1: IMG.paint, imageAlt1: 'Peinture automobile cabine Marseille',
          image2: IMG.body, imageAlt2: 'Mélangeur électronique teinte Garage Boost',
          price: '290 - 3490 €', priceMin: '290',
          pricingDesc: "Retouche localisée : 90-290€. Peinture élément (aile, porte) : 290-490€. Peinture complète véhicule : 1990-3490€. Garantie 24 mois.",
          introTitle: "La précision qui fait la différence.",
          introP1: "Nous travaillons exclusivement en <strong>cabine fermée pressurisée</strong>, avec filtration de l'air, température et hygrométrie contrôlées, et séchage infrarouge. Cette infrastructure garantit une finition impeccable, sans poussière ni coulures.",
          introP2: "Notre <strong>mélangeur électronique</strong> identifie le code couleur exact de votre véhicule (essai sur cale d'abord pour valider la teinte), et nos peintres certifiés appliquent l'apprêt, la teinte et le vernis selon les standards constructeur. Pour les métallisés, nacrés ou tri-couches, le procédé est plus complexe mais le rendu final reste identique à la peinture d'origine.",
          symptoms: ['Rayure profonde non polishable', 'Élément à repeindre après tôlerie', 'Décoloration UV de la peinture', 'Différence de teinte entre éléments', 'Repeinture totale (changement couleur)', 'Vernis qui pèle', 'Rouille superficielle traitée', 'Préparation revente véhicule'],
          benefitsTitle: 'Cabine professionnelle, teinte exacte.',
          stats: [{value:'24 mois', label:'Garantie peinture'}, {value:'Cabine IR', label:'Séchage rapide'}, {value:'100%', label:'Teinte d\'origine'}],
          benefits: [
            {icon:'palette', title:'Mélangeur électronique', desc:"Identification code couleur exact + essais sur cale avant application définitive."},
            {icon:'fan', title:'Cabine pressurisée', desc:"Filtration air, température et hygrométrie contrôlées. Pas de poussière."},
            {icon:'fire', title:'Séchage infrarouge', desc:"Polymérisation rapide pour rendu optimal et restitution dans la journée si possible."}
          ],
          whatIsTitle: "Notre processus de peinture",
          whatIsP1: "Étape 1 : <strong>identification de la teinte d'origine</strong> via le code couleur figurant sur la plaque constructeur (souvent sous le capot ou dans la portière). Notre mélangeur électronique reconstitue la formule exacte avec les pigments adaptés (métallisé, nacré, tri-couches).",
          whatIsP2: "Étape 2 : <strong>préparation de la surface</strong> — ponçage, nettoyage, masticage si nécessaire, application d'apprêt deux couches avec ponçage intermédiaire. Cette préparation représente 70% du temps total et conditionne 100% de la qualité finale.",
          whatIsP3: "Étape 3 : <strong>application de la peinture</strong> en cabine — pistolage en plusieurs passes pour obtenir l'opacité parfaite, application du vernis (1 ou 2 couches selon finition), séchage cabine 30-60 min selon température. Étape 4 : <strong>polish léger</strong> pour parfaire le rendu, contrôle qualité, lavage extérieur, restitution.",
          processIntro: "Notre processus de peinture en 5 étapes pour un rendu identique à l'origine.",
          processSteps: [
            {num:'1', title:'Identification teinte', desc:'Code couleur, mélangeur électronique, essai sur cale.'},
            {num:'2', title:'Préparation', desc:'Démontage éléments, ponçage, mastiquage, traitement anti-rouille.'},
            {num:'3', title:'Apprêt', desc:'Application apprêt 2 couches, ponçage intermédiaire pour adhérence.'},
            {num:'4', title:'Peinture & vernis', desc:'Application peinture en plusieurs passes + vernis, séchage cabine IR.'},
            {num:'5', title:'Finitions', desc:'Polish léger, contrôle qualité, lavage offert, restitution propre.'}
          ],
          targetTitle: "À qui s'adresse la peinture auto ?",
          targetIntro: "Notre prestation peinture s'adresse à tous les conducteurs souhaitant restaurer ou modifier l'aspect esthétique de leur véhicule :",
          targetList: [
            "Conducteurs avec <strong>rayures profondes</strong> non polishables",
            "Véhicules ayant subi une <strong>réparation tôlerie</strong> nécessitant peinture",
            "Voitures avec <strong>peinture délavée par les UV</strong> (toits, capots)",
            "Propriétaires souhaitant <strong>changer la couleur du véhicule</strong>",
            "Préparation de <strong>véhicule à la revente</strong> pour valoriser",
            "Véhicules de <strong>collection ou youngtimer</strong> en restauration",
            "Pros (artisans, livreurs) avec <strong>flotte au logo dégradé</strong>"
          ],
          whyP: "Garage Boost dispose d'une cabine de peinture professionnelle dernière génération à Plan-de-Cuques. Voici nos arguments pour confier votre peinture auto à notre atelier marseillais.",
          whyList: [
            "<strong>Cabine pressurisée</strong> avec filtration et séchage IR dernière génération",
            "<strong>Mélangeur électronique</strong> avec base de données toutes marques",
            "<strong>Peintures eau (water-based)</strong> conformes aux normes environnementales",
            "<strong>Peintres certifiés</strong> avec 10+ ans d'expérience",
            "<strong>Garantie 24 mois</strong> sur la peinture (tenue, écaillage, décoloration)",
            "<strong>Raccords ombrés systématiques</strong> pour rendu invisible",
            "<strong>Polish & lustrage offerts</strong> en finition de chaque prestation"
          ],
          content: [
            {h:"Peinture complète : combien ça coûte ?", p:"Une <strong>peinture complète véhicule</strong> représente 30-50 heures de travail réparties sur 10-14 jours d'immobilisation. Le tarif varie selon le véhicule : 1 990€ pour une citadine en monocouche standard, 2 490€ pour une berline en métallisé, 2 990€ pour un SUV ou utilitaire, jusqu'à 3 490€ pour un nacré tri-couches haut de gamme. Tarif incluant : démontage des éléments amovibles, traitement anti-rouille si nécessaire, peinture intégrale en cabine, vernis 2 couches, polish final."},
            {h:"Peintures eau (water-based) : pourquoi nous les utilisons", p:"L'industrie carrosserie évolue vers des peintures à <strong>base d'eau plus respectueuses de l'environnement</strong> que les anciennes peintures solvant. Avantages : émissions de COV (composés organiques volatils) divisées par 5, conditions de travail plus saines pour nos peintres, qualité de finition identique. Nous utilisons les peintures Glasurit (BASF), DuPont/Axalta ou Standox selon la marque de votre véhicule. Garantie identique à 24 mois."}
          ],
          faq: [
            {q:"Combien de temps pour une peinture localisée ?", a:"1 à 2 jours pour une peinture localisée (élément ou retouche). 3-5 jours pour un élément complet avec préparation. 10-14 jours pour une peinture complète véhicule. Tous délais incluant séchage cabine et polish final."},
            {q:"La peinture sera-t-elle vraiment invisible ?", a:"Oui dans 99% des cas, grâce à notre raccord ombré sur les éléments adjacents et à notre mélangeur électronique pour la teinte exacte. Sur certaines couleurs particulières (tri-couches très spécifiques), des écarts mineurs peuvent persister, toujours signalés au devis."},
            {q:"Que comprend la garantie 24 mois ?", a:"La garantie couvre l'écaillage, la décoloration anormale, l'adhérence défaillante, et tout défaut lié à notre application. Elle ne couvre pas les dégradations dues à l'usage (rayures, chocs, frottements), aux UV intensifs (lavages stationnés au soleil sans cire), ou aux produits inadaptés."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['carrosserie-auto', 'pare-brise', 'mecanique-generale'],
          ctaTitle: 'Une peinture qui fait peau neuve ?',
          ctaTitleAccent: 'Cabine pro à votre service.',
          ctaText: 'Du retouche-stylo à la peinture complète véhicule. Devis sous 24h, garantie 24 mois.'
        },

        'pare-brise': {
          name: 'Pare-brise',
          title: 'Pare-brise Marseille | Réparation impact, remplacement - Garage Boost',
          metaDesc: "Réparation impact pare-brise (49€) ou remplacement complet (290-590€) à Plan-de-Cuques (Marseille). Calibrage ADAS inclus. Sans franchise avec assurance bris de glace.",
          keywords: 'pare-brise Marseille, remplacement pare-brise Plan-de-Cuques, réparation impact pare-brise, calibrage ADAS Marseille, bris de glace 13380',
          h1Pre: 'Pare-brise', h1Accent: '& vitrage auto.',
          lead: "Réparation impact (résine), remplacement complet pare-brise / vitres latérales / lunette arrière. Calibrage ADAS pour véhicules récents. Pris en charge par votre assurance bris de glace.",
          image1: IMG.body, imageAlt1: 'Réparation impact pare-brise Marseille',
          image2: IMG.paint, imageAlt2: 'Remplacement pare-brise Garage Boost Plan-de-Cuques',
          price: '49 - 590 €', priceMin: '49',
          pricingDesc: "Réparation impact : 49€ (souvent sans franchise). Remplacement pare-brise : 290-590€ selon véhicule, calibrage ADAS inclus. Vitres latérales : 150-350€.",
          introTitle: "Impact ou remplacement : la bonne décision.",
          introP1: "Un <strong>impact de moins de 2,5 cm de diamètre</strong>, situé hors champ de vision direct du conducteur et à plus de 10 cm du bord, peut être réparé par injection de résine pour 49€. La résine stoppe la propagation de la fissure et restaure la transparence.",
          introP2: "Au-delà, le <strong>remplacement complet</strong> est nécessaire : notre intervention dure une demi-journée et inclut le retrait de l'ancien pare-brise, l'installation du pare-brise neuf (OEM ou équivalent qualité) avec colle polyuréthane séchage rapide, et le <strong>calibrage des caméras ADAS</strong> si votre véhicule en est équipé.",
          symptoms: ['Impact de gravillon récent', 'Fissure qui s\'étend progressivement', 'Pare-brise fendu ou cassé', 'Champ visuel obstrué par fissure', 'Vitre latérale brisée (vandalisme)', 'Lunette arrière fissurée', 'Assistance ADAS désactivée', 'Échec contrôle technique vision'],
          benefitsTitle: 'Vitrage auto, expertise complète.',
          stats: [{value:'49 €', label:'Réparation impact'}, {value:'2-3h', label:'Remplacement complet'}, {value:'0 €', label:'Souvent sans franchise'}],
          benefits: [
            {icon:'wand-magic-sparkles', title:'Réparation invisible', desc:"Injection résine pour stopper la fissure et restaurer la transparence du pare-brise."},
            {icon:'cogs', title:'Calibrage ADAS', desc:"Recalibrage des caméras d'assistance après remplacement, indispensable et inclus."},
            {icon:'shield', title:'Sans franchise', desc:"Pris en charge à 100% par la majorité des assurances bris de glace, sans avance."}
          ],
          whatIsTitle: "Réparation ou remplacement : comment décider ?",
          whatIsP1: "<strong>Réparation par injection résine</strong> possible si : impact <2,5 cm de diamètre, fissure simple non multiple, hors champ de vision direct du conducteur (zone bleue à éviter), à plus de 10 cm du bord du pare-brise, sans pénétration des couches internes du verre feuilleté. Tarif : 49€, intervention 30 minutes, garantie 12 mois.",
          whatIsP2: "<strong>Remplacement complet obligatoire</strong> si : impact >2,5 cm, fissure qui s'étend, plusieurs impacts, fissure dans le champ de vision direct, fissure de plus de 30 cm, pénétration des couches feuilletées. Tarif : 290-590€ selon véhicule (jusqu'à 1 200€ sur premium avec capteurs).",
          whatIsP3: "Le <strong>calibrage ADAS</strong> est obligatoire après remplacement sur les véhicules équipés de caméras (régulateur adaptatif, freinage d'urgence, lecture panneaux, alerte sortie de file). Sans calibrage, ces aides peuvent fonctionner mal et créer des dangers. Notre poste de calibrage statique est inclus dans le tarif de remplacement, contrairement à beaucoup de centres qui le facturent en supplément (150-300€).",
          processIntro: "Notre processus pare-brise en 5 étapes pour un travail propre et durable.",
          processSteps: [
            {num:'1', title:'Évaluation impact', desc:'Mesure taille, position, gravité. Décision réparation ou remplacement.'},
            {num:'2', title:'Devis & assurance', desc:'Devis selon véhicule, gestion directe avec assurance bris de glace.'},
            {num:'3', title:'Intervention', desc:'Réparation résine (30 min) ou dépose-pose pare-brise (2-3h).'},
            {num:'4', title:'Calibrage ADAS', desc:'Recalibrage caméras assistance si véhicule équipé (post-2018 généralement).'},
            {num:'5', title:'Validation & livraison', desc:'Test étanchéité, essai routier si calibrage dynamique, restitution propre.'}
          ],
          targetTitle: "Vitrage auto : qui peut bénéficier de notre service ?",
          targetIntro: "Notre prestation pare-brise et vitrage auto couvre toutes les situations courantes :",
          targetList: [
            "<strong>Conducteurs autoroute</strong> ayant pris un gravillon (cause n°1 d'impact)",
            "<strong>Victimes de vandalisme</strong> avec vitre latérale brisée",
            "Propriétaires avec <strong>fissure qui s'étend</strong> dans le pare-brise",
            "Véhicules en <strong>contrôle technique</strong> refusés sur vision",
            "Conducteurs souhaitant <strong>activer leur garantie bris de glace</strong>",
            "Véhicules récents nécessitant <strong>calibrage ADAS</strong> post-remplacement"
          ],
          whyP: "Garage Boost à Plan-de-Cuques propose une prestation pare-brise complète avec calibrage ADAS inclus. Voici pourquoi nous choisir.",
          whyList: [
            "<strong>Pare-brise OEM ou équivalent qualité</strong> (jamais de pièces low-cost)",
            "<strong>Colle polyuréthane professionnelle</strong> séchage rapide pour étanchéité parfaite",
            "<strong>Calibrage ADAS inclus</strong> dans le tarif (statique + dynamique si nécessaire)",
            "<strong>Partenaire assurances</strong> : prise en charge directe sans avance",
            "<strong>Intervention rapide</strong> : 30 min pour réparation, 2-3h pour remplacement",
            "<strong>Garantie 12 mois</strong> sur la pose et l'étanchéité",
            "<strong>Service récupération à domicile</strong> dans toute la zone Marseille"
          ],
          content: [
            {h:"Calibrage ADAS : pourquoi c'est crucial", p:"Si votre véhicule est équipé d'<strong>Aide à la Conduite Avancée (ADAS)</strong> — la majorité des véhicules produits depuis 2018 — un simple remplacement de pare-brise sans calibrage des caméras peut causer des dysfonctionnements graves : freinage automatique qui se déclenche au mauvais moment, régulateur adaptatif qui se trompe de distance, alertes de sortie de file fausses. Notre poste de calibrage statique recale précisément les caméras (calibrage dynamique sur route si besoin)."},
            {h:"Garantie bris de glace : ce qu'il faut savoir", p:"La <strong>garantie bris de glace</strong> est généralement incluse dans les contrats d'assurance auto (vérifiez votre contrat). Elle couvre la réparation et le remplacement du pare-brise, des vitres latérales et de la lunette arrière. Souvent <strong>sans franchise</strong> pour la réparation par injection résine, parfois avec franchise réduite pour le remplacement (50-150€). Nous gérons directement la prise en charge avec votre assurance."}
          ],
          faq: [
            {q:"Mon impact est-il réparable ?", a:"Si l'impact fait moins de 2,5 cm, est hors champ de vision direct, à plus de 10 cm du bord, et qu'il n'y a qu'un seul impact, oui. Notre technicien évalue précisément en 5 minutes."},
            {q:"Combien de temps pour un remplacement ?", a:"2-3 heures incluant la dépose, la pose, le calibrage ADAS et le séchage colle polyuréthane (1h minimum avant utilisation). Restitution dans la demi-journée."},
            {q:"L'assurance prend-elle en charge ?", a:"Oui dans 95% des cas pour la garantie bris de glace. Réparation impact : souvent sans franchise. Remplacement : franchise selon votre contrat (50-150€ généralement). Nous gérons directement avec votre assureur."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['carrosserie-auto', 'peinture-automobile', 'electricite-automobile'],
          ctaTitle: 'Impact ou pare-brise cassé ?',
          ctaTitleAccent: 'On répare ou remplace.',
          ctaText: 'Réparation 49€ souvent sans franchise. Remplacement avec calibrage ADAS inclus.'
        }

      }
    },

    // =================================================================
    // LOCATION (5 services)
    // =================================================================
    'location': {
      label: 'Location de véhicules',
      services: {

        'citadines': {
          name: 'Location citadines',
          title: 'Location citadine Marseille | Clio, 208, Twingo - Garage Boost',
          metaDesc: "Location de citadines à Plan-de-Cuques (Marseille). Clio, Peugeot 208, Twingo, Sandero. À partir de 39€/jour, 200 km inclus, assurance tous risques.",
          keywords: 'location citadine Marseille, louer voiture économique Plan-de-Cuques, location Clio Marseille, location 208 13380',
          h1Pre: 'Location', h1Accent: 'citadines.',
          lead: "Clio, Peugeot 208, Twingo, Sandero. Citadines économiques, agiles, parfaites pour la ville et les courts trajets. À partir de 39€/jour avec assurance tous risques incluse.",
          image1: IMG.garage, imageAlt1: 'Location citadine Marseille Plan-de-Cuques',
          image2: IMG.body, imageAlt2: 'Flotte citadines Garage Boost',
          price: 'Dès 39 €/j', priceMin: '39',
          pricingDesc: "À partir de 39€/jour, 200 km inclus. Tarifs dégressifs semaine (-15%) et mois (-30%). Assurance tous risques + assistance 24/7 incluses.",
          introTitle: "La citadine, mobilité urbaine sans contrainte.",
          introP1: "La <strong>citadine</strong> est le véhicule de location le plus polyvalent : agile en ville, économique sur autoroute, facile à garer. Notre flotte propose Renault Clio, Peugeot 208, Renault Twingo et Dacia Sandero. Tous récents (moins de 3 ans), entretenus dans nos ateliers, avec carnet de service à jour.",
          introP2: "À partir de <strong>39€/jour avec 200 km inclus</strong>, la citadine est la solution idéale pour : véhicule de remplacement pendant réparation de votre voiture, déplacements professionnels ponctuels, week-end ou vacances en France, prêt familial, conduite accompagnée.",
          symptoms: ['Voiture en réparation - besoin de remplacement', 'Visite famille ou amis hors région', 'Déplacement professionnel ponctuel', 'Week-end ou court séjour', 'Période de transition avant achat', 'Voiture personnelle indisponible'],
          benefitsTitle: 'Mobilité économique et fiable.',
          stats: [{value:'39 €', label:'/jour à partir de'}, {value:'200 km', label:'inclus par jour'}, {value:'< 3 ans', label:'Âge moyen flotte'}],
          benefits: [
            {icon:'wallet', title:'Tarif économique', desc:"À partir de 39€/jour, dégressif sur semaine (-15%) et mois (-30%)."},
            {icon:'shield', title:'Assurance incluse', desc:"Tous risques + assistance routière 24/7 + véhicule de remplacement si panne."},
            {icon:'leaf', title:'Économique en conso', desc:"4-6 L/100 km en mixte, parfait pour minimiser les frais carburant."}
          ],
          whatIsTitle: "Notre flotte de citadines",
          whatIsP1: "<strong>Renault Clio</strong> : 5 places, 2 ou 3 portes, motorisation essence 1.0 TCe ou diesel 1.5 dCi. Conso moyenne 5 L/100 km. Climatisation, GPS, USB, Bluetooth en série. Idéale ville et autoroute.",
          whatIsP2: "<strong>Peugeot 208</strong> : 5 places, finition récente, motorisation essence ou diesel selon disponibilité. Conduite agréable, agréments tableau de bord élevé (i-Cockpit). Excellent rapport confort/prix.",
          whatIsP3: "<strong>Renault Twingo / Dacia Sandero</strong> : citadines compactes, idéales pour la ville et les budgets serrés. Twingo : moteur arrière, ultra-maniable, parfaite Marseille. Sandero : roomy, économique, fiable.",
          processIntro: "Notre processus de location en 5 étapes simples pour récupérer votre véhicule rapidement.",
          processSteps: [
            {num:'1', title:'Réservation', desc:'Téléphone, WhatsApp ou formulaire. Précisez modèle, dates, kilométrage estimé.'},
            {num:'2', title:'Confirmation', desc:'Devis ferme sous 2h, acompte 30% pour confirmer le créneau.'},
            {num:'3', title:'Récupération', desc:'À l\'atelier ou livraison à domicile. Permis B, identité, carte bancaire.'},
            {num:'4', title:'État des lieux', desc:'Inspection contradictoire avec photos, signature contrat clair.'},
            {num:'5', title:'Restitution', desc:'Plein-plein, état des lieux retour, libération caution sous 7 jours.'}
          ],
          targetTitle: "Pour qui la location citadine ?",
          targetIntro: "La location de citadine s'adresse à une variété de profils urbains et occasionnels :",
          targetList: [
            "Conducteurs avec <strong>véhicule en réparation</strong> nécessitant remplacement",
            "<strong>Déplacements professionnels ponctuels</strong> sans véhicule de fonction",
            "Familles ou couples pour <strong>visites famille hors région</strong>",
            "<strong>Week-ends ou courts séjours</strong> en France",
            "Conduite <strong>accompagnée pour jeunes conducteurs</strong>",
            "Période de <strong>transition avant achat véhicule</strong>",
            "Étudiants ou jeunes actifs en <strong>besoin ponctuel</strong>"
          ],
          whyP: "Garage Boost à Plan-de-Cuques propose une location simple, transparente et économique. Voici nos arguments.",
          whyList: [
            "<strong>Tarif transparent</strong> annoncé à l'avance, sans frais cachés",
            "<strong>Flotte récente</strong> (moins de 3 ans) entretenue en interne",
            "<strong>Assurance tous risques</strong> + assistance 24/7 incluses",
            "<strong>200 km/jour</strong> inclus, dégressif sur semaine/mois",
            "<strong>Annulation gratuite</strong> jusqu'à 72h avant",
            "<strong>Plein-plein</strong> simple et juste",
            "<strong>Livraison domicile</strong> dans toute la zone Marseille (49€)"
          ],
          content: [
            {h:"Pourquoi pas un grand loueur ?", p:"Les grands loueurs nationaux (Sixt, Hertz, Europcar) ont des flottes immenses mais une <strong>relation client souvent impersonnelle</strong> : centres d'appels lointains, contrats avec petits caractères, franchises piégeuses. Chez Garage Boost, l'expérience est différente : accueil par un mécanicien qui connaît chaque véhicule, contrat clair en 5 minutes, tarif transparent, interlocuteur unique disponible 7 jours sur 7. Pour les Marseillais, cette différence se sent."},
            {h:"Conditions de location", p:"Pour louer une citadine chez Garage Boost, vous devez avoir <strong>21 ans minimum</strong>, être titulaire du permis B depuis 2 ans, présenter une pièce d'identité valide et une carte bancaire à votre nom (pour la caution de 600€). Le permis et l'identité sont vérifiés à la prise du véhicule. État des lieux contradictoire avec photos pour la transparence des deux côtés. Pour les jeunes conducteurs (moins de 25 ans), une majoration assurance s'applique (12€/jour) pour couvrir le surcoût d'assurance imposé par notre courtier — pratique standard chez tous les loueurs."},
            {h:"Que se passe-t-il en cas de panne ?", p:"En cas de <strong>panne mécanique</strong> non liée à votre conduite (panne franche, défaut technique), notre <strong>assistance 24/7 incluse</strong> intervient gratuitement : dépannage sur place si possible, ou remorquage et mise à disposition d'un véhicule de remplacement. Aucun frais à votre charge, simple appel au numéro figurant dans le contrat. Notre flotte étant entretenue en interne par notre atelier, le taux de panne reste très faible — moins d'1% des locations."}
          ],
          faq: [
            {q:"Quels modèles avez-vous en flotte ?", a:"Renault Clio, Peugeot 208, Renault Twingo, Dacia Sandero. Selon disponibilité au moment de votre réservation. Précisez vos préférences, on adapte."},
            {q:"Combien coûte le kilométrage supplémentaire ?", a:"0,15€/km au-delà des 200 km/jour inclus. Pour les locations longues, on peut négocier des forfaits kilométriques avantageux selon votre projet."},
            {q:"Y a-t-il une caution ?", a:"Oui, 600€ pris en empreinte CB ou virement à la prise du véhicule. Libération sous 7 jours après restitution sans dommage."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['utilitaires', 'vans-amenages', 'vehicules-occasion'],
          ctaTitle: 'Besoin d\'une citadine ?',
          ctaTitleAccent: 'Réservez en 2 min.',
          ctaText: 'Dès 39€/jour, assurance + 200 km inclus. Annulation gratuite jusqu\'à 72h avant.'
        },

        'utilitaires': {
          name: 'Location utilitaires',
          title: 'Location utilitaire Marseille | Kangoo, Trafic, Master - Garage Boost',
          metaDesc: "Location d'utilitaires à Plan-de-Cuques (Marseille). Kangoo, Berlingo (3-6m³), Trafic (8m³), Master/Boxer (12m³). Idéal déménagement, livraison, chantier. Dès 49€/jour.",
          keywords: 'location utilitaire Marseille, location camionnette Plan-de-Cuques, location Master 12m3, location Trafic Marseille, déménagement utilitaire',
          h1Pre: 'Location', h1Accent: 'utilitaires.',
          lead: "Kangoo, Berlingo (3-6m³), Trafic (8m³), Master/Boxer (12m³). Idéal déménagement, livraison, chantier. Rampe d'accès incluse. À partir de 49€/jour.",
          image1: IMG.garage, imageAlt1: 'Location utilitaire camionnette Marseille',
          image2: IMG.mechanic, imageAlt2: 'Flotte utilitaires Garage Boost Plan-de-Cuques',
          price: '49 - 79 €/j', priceMin: '49',
          pricingDesc: "Petit utilitaire (3-6m³) : 49€/jour. Moyen (8m³) : 65€/jour. Grand (12m³) : 79€/jour. 250 km inclus, rampe d'accès, assurance tous risques.",
          introTitle: "L'utilitaire, votre allié déménagement.",
          introP1: "Que ce soit pour un <strong>déménagement, une livraison professionnelle ou un chantier</strong>, l'utilitaire est l'outil indispensable. Notre flotte couvre toutes les tailles : du petit Kangoo au grand Master 12m³, tous équipés rampe d'accès et arrimage.",
          introP2: "À partir de <strong>49€/jour avec 250 km inclus</strong>, plus économique que les grands loueurs traditionnels (Sixt, Europcar) à qualité équivalente. Pas de paperasse, pas de frais cachés, juste un utilitaire propre, équipé, prêt à partir.",
          symptoms: ['Déménagement studio à 4 pièces', 'Transport mobilier ou électroménager', 'Livraison ponctuelle professionnelle', 'Chantier nécessitant transport matériaux', 'Activité commerciale temporaire', 'Évacuation déchets ou encombrants', 'Voyage avec beaucoup de bagages', 'Achat meuble grande taille'],
          benefitsTitle: 'Tous volumes, tarifs transparents.',
          stats: [{value:'3-12m³', label:'Toutes tailles'}, {value:'250 km', label:'inclus/jour'}, {value:'49 €', label:'/j à partir de'}],
          benefits: [
            {icon:'box', title:'3 à 12 m³', desc:"Kangoo (3m³), Trafic (6-8m³), Master/Boxer (12m³). Adapté à votre besoin."},
            {icon:'ramp', title:'Rampe incluse', desc:"Rampe d'accès pour charger meubles lourds, sangles d'arrimage incluses."},
            {icon:'truck', title:'Tarifs justes', desc:"49 à 79€/jour, dégressif semaine/mois. Sans frais cachés."}
          ],
          whatIsTitle: "Notre flotte d'utilitaires",
          whatIsP1: "<strong>Kangoo / Berlingo (3-4m³)</strong> : petit utilitaire idéal pour un studio ou des objets ponctuels. 5 sièges si besoin, double porte arrière, place pour 1-2 mètres cubes de mobilier. Tarif : 49€/jour.",
          whatIsP2: "<strong>Trafic / Vivaro / Boxer L1H1 (6-8m³)</strong> : utilitaire moyen pour 1 à 3 pièces, déménagement studio ou T2. Hauteur permettant de tenir debout dedans. Rampe d'accès incluse. Tarif : 65€/jour.",
          whatIsP3: "<strong>Master / Movano / Boxer L3H2 (12m³)</strong> : grand utilitaire pour 3-5 pièces, déménagement complet. Volume idéal pour un déménagement T3 sans rotation. Hauteur 2,4m intérieur. Rampe d'accès, sangles arrimage. Tarif : 79€/jour.",
          processIntro: "Notre processus de location utilitaire en 5 étapes simples pour vous équiper rapidement.",
          processSteps: [
            {num:'1', title:'Choix taille', desc:'Estimez votre volume, on conseille selon nombre de pièces ou type de cargo.'},
            {num:'2', title:'Réservation', desc:'Téléphone ou WhatsApp. Confirmation sous 2h, acompte 30%.'},
            {num:'3', title:'Récupération', desc:'À l\'atelier. Permis B (BE pour 12m³ surchargé), identité, CB caution.'},
            {num:'4', title:'Mission', desc:'Vous chargez, vous transportez, vous déchargez. Aussi simple que ça.'},
            {num:'5', title:'Restitution', desc:'Plein-plein, état des lieux, libération caution sous 7 jours.'}
          ],
          targetTitle: "Pour qui la location utilitaire ?",
          targetIntro: "L'utilitaire de location répond à de nombreux besoins ponctuels et professionnels :",
          targetList: [
            "<strong>Particuliers en déménagement</strong> studio à grand T3",
            "<strong>Professionnels en livraison ponctuelle</strong> (artisans, commerçants)",
            "<strong>Chantiers</strong> nécessitant transport matériaux ponctuel",
            "Achat de <strong>meubles grande taille</strong> (canapé, lit king-size, électroménager)",
            "<strong>Évacuation déchets</strong> ou encombrants vers déchetterie",
            "<strong>Activités commerciales temporaires</strong> (marchés, foires, événementiel)",
            "<strong>Vacances en groupe</strong> avec beaucoup de bagages et matériel"
          ],
          whyP: "Garage Boost loue des utilitaires depuis 2018 à Plan-de-Cuques avec une réputation de transparence et de simplicité. Voici nos arguments face aux grands loueurs.",
          whyList: [
            "<strong>Tarifs nets</strong> sans frais cachés, sans suppléments à la livraison",
            "<strong>Flotte propre et entretenue</strong> en interne (pas de surprise mécanique)",
            "<strong>Réservation flexible</strong> jusqu'à 72h sans frais",
            "<strong>Disponibilité 7j/7</strong> sur réservation, contrairement aux loueurs fermés dimanches",
            "<strong>Plein-plein simple</strong>, pas de système de plein partiel piégeux",
            "<strong>Conseil personnalisé</strong> sur la taille adaptée à votre besoin",
            "<strong>Livraison domicile</strong> possible dans la zone Marseille (49€)"
          ],
          content: [
            {h:"Quelle taille pour mon déménagement ?", p:"Règle simple : <strong>1m³ par pièce de meuble standard</strong>. Pour un studio (lit, armoire, table, électroménager léger) : 4-5m³ → Kangoo ou Trafic. Pour un T2 (chambre + salon + cuisine) : 8-10m³ → Trafic ou Master. Pour un T3 (3-4 pièces meublées) : 12m³ → Master en une fois ou Trafic en 2 rotations selon distance. Hésitation ? Appelez-nous, on conseille selon votre liste d'objets."},
            {h:"Permis et conditions", p:"<strong>Permis B suffit</strong> pour tous nos utilitaires jusqu'à 3,5T en charge. Au-delà (très rare sur nos modèles courants), permis BE nécessaire. Âge minimum : 21 ans avec permis depuis 2 ans. Caution : 600-1500€ selon taille du véhicule, prise en empreinte CB. Plein-plein, kilométrage 250 km/jour inclus."},
            {h:"Aide au chargement et déchargement", p:"Pour les déménagements importants, nous pouvons mettre en relation avec des <strong>aides au chargement</strong> de confiance dans la zone Marseille (étudiants, jobeurs ponctuels, équipes pro). Service tiers facturé directement par eux (15-25€/heure typiquement). Cette mise en relation reste optionnelle mais utile si vous êtes seul(e) ou avec des objets lourds. Sinon, sangles et couvertures de protection sont fournies dans le véhicule pour vous équiper."}
          ],
          faq: [
            {q:"Faut-il un permis spécial pour le 12m³ ?", a:"Non, le permis B suffit (jusqu'à 3,5T en charge totale). Notre Master 12m³ est en 3,5T, donc accessible avec permis B classique."},
            {q:"Y a-t-il une rampe d'accès ?", a:"Oui sur Trafic et Master. Idéale pour charger électroménager, gros meubles, palettes. Sangles d'arrimage fournies."},
            {q:"Tarif location à la semaine ?", a:"Tarif dégressif : -15% sur 7 jours, -30% sur 28 jours. Devis sur mesure pour locations supérieures à 1 mois."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['citadines', 'vans-amenages', 'vehicules-occasion'],
          ctaTitle: 'Déménagement, livraison ?',
          ctaTitleAccent: 'L\'utilitaire qu\'il vous faut.',
          ctaText: 'De 3 à 12 m³, dès 49€/jour, rampe et assurance incluses. Réservation 2 minutes.'
        },

        'vans-amenages': {
          name: 'Location van aménagé',
          title: 'Location van aménagé Marseille | Vanlife clé en main - Garage Boost',
          metaDesc: "Location de vans aménagés à Plan-de-Cuques (Marseille). Lit double, kitchenette, panneau solaire, autonomie. Idéal vanlife, week-ends, road trips. Dès 99€/jour.",
          keywords: 'location van aménagé Marseille, location vanlife Plan-de-Cuques, van Trafic aménagé, location campervan Marseille, road trip Provence',
          h1Pre: 'Location', h1Accent: 'van aménagé.',
          lead: "Vans entièrement équipés pour la vanlife : lit double, kitchenette, panneau solaire, eau, électricité 12V. À partir de 99€/jour avec assurance et assistance.",
          image1: IMG.garage, imageAlt1: 'Location van aménagé vanlife Marseille',
          image2: IMG.body, imageAlt2: 'Van aménagé Trafic Garage Boost Plan-de-Cuques',
          price: 'Dès 99 €/j', priceMin: '99',
          pricingDesc: "À partir de 99€/jour, 200 km inclus. Tarif dégressif sur 3+ jours. Assurance tous risques, assistance 24/7, vaisselle et linge fournis sur demande.",
          introTitle: "La vanlife, version clé en main.",
          introP1: "Le <strong>van aménagé</strong> est la solution idéale pour explorer la Provence, la Côte d'Azur, les Calanques, la Camargue ou les Alpes en toute liberté. Dormez où vous voulez, cuisinez à votre rythme, vivez l'expérience nomade sans investir dans votre propre véhicule.",
          introP2: "Notre flotte propose des vans <strong>Citroën Jumpy, Renault Trafic, VW Transporter</strong> aménagés professionnellement : lit double 140×200 cm avec matelas confort, kitchenette avec frigo 12V, réchaud 2 feux et évier, panneau solaire 100W pour autonomie électrique, rangements astucieux.",
          symptoms: ['Envie de voyager en autonomie', 'Découvrir la Provence ou Côte d\'Azur', 'Premier essai vanlife avant achat', 'Week-end nature ou montagne', 'Road trip en couple ou en famille', 'Festival ou événement multi-jours', 'Voyage avec animaux', 'Nuits sur la plage en toute légalité'],
          benefitsTitle: 'Liberté totale, équipement complet.',
          stats: [{value:'2 - 4', label:'Couchages'}, {value:'200 km', label:'inclus/jour'}, {value:'99 €', label:'/j à partir de'}],
          benefits: [
            {icon:'bed', title:'Lit double 140x200', desc:"Matelas confort haute densité, draps et oreillers fournis sur demande."},
            {icon:'kitchen-set', title:'Kitchenette équipée', desc:"Frigo 12V, réchaud 2 feux gaz, évier eau froide, vaisselle complète."},
            {icon:'solar-panel', title:'Autonomie solaire', desc:"Panneau 100W + batterie auxiliaire 100Ah. 2-3 jours sans branchement."}
          ],
          whatIsTitle: "Équipement de nos vans",
          whatIsP1: "<strong>Espace nuit</strong> : lit double 140×200 cm avec matelas confort 14 cm haute densité, oreillers et draps fournis sur demande (15€). Espace tête au-dessus du lit, rideaux occultants pour intimité.",
          whatIsP2: "<strong>Espace cuisine</strong> : frigo compresseur 12V (40L), réchaud 2 feux à gaz avec bouteille pleine, évier eau froide avec réservoir 30L, plan de travail, rangements pour vaisselle et nourriture, vaisselle complète 4 personnes.",
          whatIsP3: "<strong>Espace électrique</strong> : panneau solaire 100W sur le toit, batterie auxiliaire 100Ah indépendante du véhicule, prises 220V (avec convertisseur) + USB, éclairage LED intérieur, ventilateur de toit certaines configurations.",
          processIntro: "Notre processus de location van en 5 étapes pour partir l'esprit tranquille.",
          processSteps: [
            {num:'1', title:'Réservation', desc:'Choix du modèle, dates, destinations. Devis sous 2h.'},
            {num:'2', title:'Briefing', desc:'À la prise, on vous montre tout (gaz, eau, électrique, conduite).'},
            {num:'3', title:'Récupération', desc:'Permis B, identité, caution 2000€ en empreinte CB.'},
            {num:'4', title:'Voyage', desc:'Profitez ! Notre assistance 24/7 disponible en cas de besoin.'},
            {num:'5', title:'Restitution', desc:'Plein-plein, vidange WC chimique si utilisé, libération caution.'}
          ],
          targetTitle: "Pour qui la location van aménagé ?",
          targetIntro: "Le van aménagé séduit de nombreux profils de voyageurs en quête d'autonomie :",
          targetList: [
            "<strong>Couples souhaitant un weekend nature</strong> ou court séjour autonome",
            "<strong>Familles avec 1-2 enfants</strong> pour des vacances flexibles",
            "<strong>Premiers vanlifers</strong> souhaitant tester avant achat",
            "<strong>Festivaliers</strong> qui combinent transport et hébergement",
            "<strong>Photographes ou créateurs</strong> en road trip création",
            "Voyageurs avec <strong>animaux de compagnie</strong> (autorisés)",
            "<strong>Gens d'affaires</strong> en mobilité longue avec besoin de calme"
          ],
          whyP: "Garage Boost propose à Plan-de-Cuques quelques vans soigneusement aménagés et entretenus. Voici pourquoi nos clients reviennent location après location.",
          whyList: [
            "<strong>Vans entretenus en interne</strong>, contrôlés avant chaque sortie",
            "<strong>Aménagement professionnel</strong> avec mobilier sur mesure",
            "<strong>Briefing complet</strong> à la prise pour partir serein",
            "<strong>Assistance 24/7 incluse</strong> partout en France",
            "<strong>Animaux acceptés</strong> sans supplément",
            "<strong>Tarif dégressif</strong> sur 3+ jours",
            "<strong>Local de stockage</strong> à votre domicile sur demande pour matériel"
          ],
          content: [
            {h:"Conseils pour votre road trip", p:"Quelques conseils pour profiter au mieux : <strong>réservez vos emplacements aires camping-cars</strong> en saison (été), respectez les zones de stationnement autorisées (lien vers app Park4Night utile), prévoyez une glacière isotherme pour augmenter l'autonomie froid, emportez réchaud bouteille gaz petite (sécurité), maintenez la batterie en circulation (ne stationnez pas plus de 24h sans démarrer si pas d'ensoleillement)."},
            {h:"Conditions et caution", p:"<strong>Permis B + 25 ans + 3 ans de permis</strong> minimum (assureur). Caution 2000€ pris en empreinte CB. Plein-plein essence/diesel selon véhicule. Vidange WC chimique gratuite à la restitution si utilisé proprement. Animaux : 25€ par animal sur la totalité de la location (couvre nettoyage spécifique). Pour les locations longues (semaine et plus), nous proposons une option pack draps + vaisselle + ustensiles cuisine pour 39€ supplémentaire — pratique si vous voulez voyager léger sans encombrer votre voiture personnelle de matériel logistique."}
          ],
          faq: [
            {q:"Combien de personnes peut accueillir le van ?", a:"Selon configuration : 2 à 4 places conduite + couchage. Notre van Trafic L2 dort 2 adultes confortablement. Avec banquette convertible : 1-2 enfants supplémentaires possibles."},
            {q:"Peut-on stationner où on veut ?", a:"En France, le camping sauvage est globalement toléré pour 1 nuit hors zones interdites (parcs naturels, plages, sites classés). Aires camping-cars officielles partout en Provence. App Park4Night ou Park4Night Premium recommandée."},
            {q:"Les chiens sont-ils acceptés ?", a:"Oui, sans souci, moyennant 25€ pour la totalité de la location (couvre nettoyage spécifique anti-poils). Indispensable de l'indiquer à la réservation."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['utilitaires', 'citadines', 'vehicules-occasion'],
          ctaTitle: 'Vanlife clé en main ?',
          ctaTitleAccent: 'À partir de 99€/jour.',
          ctaText: 'Lit double, kitchenette, autonomie solaire. Réservez votre escapade en 2 min.'
        },

        'voiture-rallye': {
          name: 'Location voiture rallye',
          title: 'Location voiture rallye Marseille | Track day, événement - Garage Boost',
          metaDesc: "Location de voiture de rallye à Plan-de-Cuques (Marseille) pour track day, événements, tournages. Préparation moteur, arceau cage, baquets. Sur devis.",
          keywords: 'location voiture rallye Marseille, location voiture sport Plan-de-Cuques, track day Castellet, location pour film auto, voiture compétition Marseille',
          h1Pre: 'Location', h1Accent: 'voiture rallye.',
          lead: "Voitures de compétition préparées pour track day, tournages, événements professionnels. Avec assurance dédiée, briefing technique, et logistique optionnelle. Sur devis.",
          image1: IMG.garage, imageAlt1: 'Location voiture rallye Marseille track day',
          image2: IMG.engineBay, imageAlt2: 'Voiture rallye préparée Garage Boost',
          price: 'Sur devis', priceMin: '300',
          pricingDesc: "Tarif sur devis selon véhicule, durée et kilométrage prévu. Comprend assurance compétition dédiée, briefing technique, accompagnement piste si demandé.",
          introTitle: "Vivez l'adrénaline, sans investir.",
          introP1: "Notre flotte de <strong>voitures de rallye</strong> s'adresse aux passionnés de pilotage souhaitant vivre l'expérience circuit ou compétition sans les contraintes de possession (achat 30-100k€, entretien lourd, stockage, assurance compétition).",
          introP2: "Préparation moteur custom, arceau cage 6 points homologué, baquets Sparco, harnais 4 points, extincteur, coupe-circuit. Assurance compétition dédiée, briefing technique obligatoire avant chaque sortie. Possibilité de logistique camion sur demande.",
          symptoms: ['Track day Paul Ricard / Castellet', 'Tournage publicité ou film auto', 'Événement professionnel ou incentive', 'Anniversaire pilotage', 'Test avant achat voiture compétition', 'Coaching pilotage sportif', 'Stage pilotage entreprise', 'Compétition régionale ou nationale'],
          benefitsTitle: 'Sensations pures, sécurité maximale.',
          stats: [{value:'6 pts', label:'Arceau homologué'}, {value:'Sparco', label:'Baquets'}, {value:'24/7', label:'Assistance piste'}],
          benefits: [
            {icon:'flag-checkered', title:'Préparation pro', desc:"Moteur préparé, arceau cage, baquets, harnais 4 points, extincteur, coupe-circuit."},
            {icon:'shield-halved', title:'Assurance compétition', desc:"Couverture circuit dédiée incluse, vous concentrez-vous sur le pilotage uniquement."},
            {icon:'graduation-cap', title:'Briefing inclus', desc:"Briefing technique avant sortie : véhicule, sécurité, ligne idéale si circuit connu."}
          ],
          whatIsTitle: "Notre flotte rallye et compétition",
          whatIsP1: "Notre flotte évolue selon les saisons et événements. Modèles régulièrement disponibles : <strong>Renault Clio Cup</strong>, <strong>Peugeot 208 Rally4</strong>, <strong>Citroën C3 R5</strong>, <strong>BMW M3 préparée track</strong>. Chaque véhicule est préparé selon les standards FIA pour la sécurité et la performance.",
          whatIsP2: "<strong>Préparation type</strong> : moteur Stage 2 (downpipe, intercooler, admission), suspension réglable Bilstein ou Öhlins, frein big brake (étriers 4 ou 6 pistons), pneus slicks ou semi-slicks, arceau cage homologué 6 points, baquets Sparco avec harnais 4 points, extincteur 2L, coupe-circuit accessible intérieur et extérieur.",
          whatIsP3: "<strong>Briefing technique</strong> obligatoire avant chaque sortie : 30 minutes pour vous expliquer le véhicule (commandes spécifiques, comportement, limites), les règles de sécurité circuit, les zones critiques de la piste si circuit connu. Possibilité de pilote-instructeur en supplément pour coaching.",
          processIntro: "Notre processus de location track day en 5 étapes pour une expérience pilotage en toute sécurité.",
          processSteps: [
            {num:'1', title:'Définition projet', desc:'Type d\'événement, circuit, dates, niveau pilote, options souhaitées.'},
            {num:'2', title:'Devis personnalisé', desc:'Devis ferme sous 24h selon véhicule, durée, logistique.'},
            {num:'3', title:'Briefing', desc:'À la prise, briefing technique 30 min obligatoire (sécurité + véhicule).'},
            {num:'4', title:'Sortie', desc:'Conduite sur circuit ou événement, accompagnement à la demande.'},
            {num:'5', title:'Debriefing & restitution', desc:'Vérification véhicule, debriefing optionnel, libération caution.'}
          ],
          targetTitle: "Pour qui la location voiture rallye ?",
          targetIntro: "La location de voiture de compétition s'adresse aux passionnés et professionnels :",
          targetList: [
            "<strong>Particuliers passionnés</strong> souhaitant rouler sur circuit (Paul Ricard, Lédenon, etc.)",
            "<strong>Anniversaires pilotage</strong> entre amis ou en couple",
            "<strong>Stages pilotage</strong> avec coaching instructeur",
            "<strong>Sociétés de production</strong> pour tournages publicitaires ou films",
            "<strong>Entreprises</strong> pour événements ou incentives clients",
            "<strong>Pilotes amateurs</strong> en compétition régionale (rallye, slalom)",
            "<strong>Tests avant achat</strong> de voiture de compétition"
          ],
          whyP: "Garage Boost connaît la mécanique de compétition depuis 10 ans. Voici pourquoi confier votre track day à notre atelier marseillais.",
          whyList: [
            "<strong>Préparation atelier interne</strong>, vous savez précisément qui a touché au véhicule",
            "<strong>Sécurité prioritaire</strong> : arceaux homologués, baquets Sparco, harnais 4 pts",
            "<strong>Assurance compétition incluse</strong>, couverture circuit dédiée",
            "<strong>Briefing technique professionnel</strong> avant chaque sortie",
            "<strong>Logistique camion possible</strong> (acheminement véhicule au circuit)",
            "<strong>Coaching instructeur en option</strong> pour progresser",
            "<strong>Communauté track day</strong> sur Marseille : conseils, contacts, infos circuit"
          ],
          content: [
            {h:"Logistique acheminement circuit", p:"Pour les circuits éloignés (Paul Ricard à 1h30 de Marseille, Lédenon à 1h45, Magny-Cours à 5h), nous proposons en option l'<strong>acheminement camion plateau</strong> : transport sécurisé du véhicule, arrivée pré-set-up, installation paddock. Tarif : 200-500€ selon distance. Cette option permet de garantir l'arrivée du véhicule en parfait état, sans usure pneus ni essence sur la route."},
            {h:"Conditions spécifiques rallye", p:"Caution majorée : 2 500 à 5 000€ selon véhicule (couvre franchise compétition). <strong>Permis B suffit</strong> pour circuit, mais 25 ans minimum exigé par notre assurance. Casque obligatoire (peut être loué : 25€). Combinaison FIA conseillée mais non obligatoire selon circuit. Briefing technique 30 minutes <strong>non négociable</strong> avant toute sortie."}
          ],
          faq: [
            {q:"Faut-il un permis spécial ?", a:"Non, le permis B suffit pour rouler sur circuit en 'roulage libre'. Pour la compétition officielle (rallye, course), une licence FFSA est nécessaire. Nous pouvons vous orienter vers les démarches."},
            {q:"Combien coûte un track day ?", a:"Variable selon véhicule et circuit. Comptez 800-2500€ pour une journée complète sur circuit local (Paul Ricard ou Lédenon), assurance et briefing inclus. Devis ferme sur demande."},
            {q:"Vous proposez du coaching pilotage ?", a:"Oui, en option. Notre instructeur partenaire propose 4 sessions de 20 minutes en passager pour vous coacher (technique, ligne idéale, freinage). Tarif : 250-400€ la journée."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['utilitaires', 'citadines', 'vehicules-occasion'],
          ctaTitle: 'Track day, tournage, événement ?',
          ctaTitleAccent: 'On prépare votre voiture.',
          ctaText: 'Préparation pro, assurance compétition, briefing inclus. Devis sous 24h.'
        },

        'vehicules-occasion': {
          name: 'Véhicules d\'occasion',
          title: 'Vente véhicules occasion Marseille | Certifiés Garage Boost',
          metaDesc: "Vente de véhicules d'occasion certifiés à Plan-de-Cuques (Marseille). Contrôle 100 points, garantie 3-12 mois, carnet à jour. Reprise possible. Financement disponible.",
          keywords: 'voiture occasion Marseille, achat occasion certifiée Plan-de-Cuques, vente auto occasion 13380, occasion garantie Marseille, reprise véhicule',
          h1Pre: 'Véhicules', h1Accent: 'd\'occasion certifiés.',
          lead: "Sélection de véhicules d'occasion certifiés, tous contrôlés 100 points et révisés dans nos ateliers. Garantie 3 à 12 mois selon véhicule. Reprise possible.",
          image1: IMG.garage, imageAlt1: 'Vente véhicules occasion Marseille',
          image2: IMG.body, imageAlt2: 'Véhicules occasion certifiés Garage Boost',
          price: 'Variable', priceMin: '5000',
          pricingDesc: "Tarif selon véhicule, généralement 5 000€ à 25 000€. Tous nos véhicules sont contrôlés 100 points, révisés, et vendus avec garantie 3 à 12 mois selon âge/km.",
          introTitle: "L'occasion, en confiance.",
          introP1: "Acheter une voiture d'occasion, c'est souvent stressant : risque caché, kilométrage trafiqué, vices cachés. Notre <strong>sélection de véhicules certifiés</strong> élimine ces risques : tous nos véhicules subissent un <strong>contrôle 100 points</strong> avant mise en vente, le carnet d'entretien est à jour, et l'historique mécanique est disponible.",
          introP2: "Notre stock évolue régulièrement : véhicules issus de notre flotte de location en fin de cycle, reprises clients, recherches sur mesure pour clients fidèles. Tous sont préparés dans nos ateliers (révision complète, plaquettes neuves si nécessaire, pré-contrôle technique). Garantie 3 à 12 mois selon kilométrage et âge.",
          symptoms: ['Recherche véhicule occasion fiable', 'Méfiance face aux particuliers', 'Besoin de garantie écrite', 'Souhait de financement intégré', 'Reprise véhicule actuel souhaitée', 'Premier achat automobile', 'Mobilité familiale changement', 'Budget serré nécessitant occasion'],
          benefitsTitle: 'Achat sécurisé, sans surprise.',
          stats: [{value:'100', label:'Points contrôlés'}, {value:'3-12', label:'Mois garantie'}, {value:'5k-25k €', label:'Gamme prix'}],
          benefits: [
            {icon:'clipboard-check', title:'Contrôle 100 points', desc:"Vérification complète moteur, transmission, freinage, suspension, carrosserie."},
            {icon:'shield', title:'Garantie 3-12 mois', desc:"Garantie pièces et main-d'œuvre selon âge et kilométrage. Prolongation possible."},
            {icon:'rotate-left', title:'Reprise possible', desc:"Reprise de votre véhicule actuel évaluée gratuitement, déduite du nouveau."}
          ],
          whatIsTitle: "Notre processus de certification",
          whatIsP1: "Avant mise en vente, chaque véhicule passe par un <strong>contrôle 100 points exhaustif</strong> : moteur (compression, fuite, démarrage), transmission (boîte, embrayage, cardans), freinage (plaquettes, disques, étriers, frein parking), suspension (amortisseurs, rotules, biellettes), direction (crémaillère, pompe assistée), électrique (batterie, alternateur, faisceaux), climatisation (efficacité, étanchéité), pneumatiques, carrosserie, intérieur, accessoires.",
          whatIsP2: "Si nécessaire, nous procédons aux <strong>réparations préventives</strong> : changement plaquettes si à 50%+, vidange complète, remplacement filtres, révision climatisation, polish carrosserie, correction défauts cosmétiques. Le tout intégré au prix de vente, pas en supplément à l'acheteur.",
          whatIsP3: "Le véhicule est ensuite <strong>vendu avec garantie</strong> : 3 mois pour véhicules >150 000 km ou >10 ans, 6 mois pour véhicules 80-150 000 km ou 5-10 ans, 12 mois pour véhicules <80 000 km et <5 ans. Garantie pièces et main-d'œuvre, prolongation possible jusqu'à 24 mois moyennant supplément.",
          processIntro: "Notre processus d'achat occasion en 5 étapes pour une transaction simple et sécurisée.",
          processSteps: [
            {num:'1', title:'Découverte', desc:'Consultez notre stock en ligne ou venez à l\'atelier voir les véhicules.'},
            {num:'2', title:'Essai', desc:'Essai routier accompagné, 30-60 min selon véhicule. Posez toutes vos questions.'},
            {num:'3', title:'Inspection', desc:'Présentation du carnet, historique mécanique, contrôle technique, certification 100 pts.'},
            {num:'4', title:'Négociation & financement', desc:'Discussion prix, reprise éventuelle, financement bancaire ou crédit auto.'},
            {num:'5', title:'Livraison', desc:'Carte grise, transfert, garantie écrite, livraison du véhicule prêt à rouler.'}
          ],
          targetTitle: "Pour qui notre offre occasion ?",
          targetIntro: "Notre offre de véhicules d'occasion certifiés s'adresse à plusieurs profils d'acheteurs :",
          targetList: [
            "<strong>Premiers acheteurs</strong> souhaitant un cadre rassurant",
            "<strong>Familles changeant de véhicule</strong> avec budget maîtrisé",
            "<strong>Particuliers méfiants</strong> face aux ventes entre particuliers",
            "Acheteurs souhaitant <strong>garantie écrite</strong> et historique vérifié",
            "<strong>Pros (artisans, livreurs)</strong> ayant besoin d'un utilitaire fiable",
            "Clients fidèles voulant <strong>renouveler leur véhicule</strong> avec reprise",
            "Conducteurs souhaitant <strong>combiner achat + financement + entretien</strong>"
          ],
          whyP: "Garage Boost vend des véhicules d'occasion certifiés à Plan-de-Cuques avec une approche orientée transparence et accompagnement long terme.",
          whyList: [
            "<strong>Sélection rigoureuse</strong> : seulement 1 véhicule sur 5 examinés est retenu",
            "<strong>Contrôle 100 points</strong> par notre équipe technique",
            "<strong>Garantie 3-12 mois</strong> incluse selon âge/km",
            "<strong>Reprise possible</strong> avec offre transparente sous 24h",
            "<strong>Financement intégré</strong> via partenaires bancaires (taux compétitifs)",
            "<strong>Carnet d'entretien à jour</strong> et historique fourni",
            "<strong>Suivi post-vente</strong> par notre atelier (révisions, dépannage, conseil)"
          ],
          content: [
            {h:"Pourquoi notre occasion plutôt qu'un mandataire ?", p:"Les mandataires (Aramis, La Centrale Pro, Reezocar) proposent souvent des prix attractifs mais avec un service limité au transactionnel : pas de contrôle approfondi, garantie minimale, pas de relation après-vente. Chez Garage Boost, vous achetez un véhicule <strong>contrôlé par notre atelier</strong>, vous repartez avec un interlocuteur identifié pour les futures interventions, et la garantie est tenue par les gens qui ont préparé votre véhicule. Cette continuité fait toute la différence sur le long terme."},
            {h:"Reprise de votre véhicule actuel", p:"Lors d'un achat chez nous, nous proposons une <strong>reprise transparente</strong> de votre véhicule actuel : évaluation gratuite par notre atelier (état mécanique, carrosserie, équipement, valeur marché), offre ferme sous 24h, déduction directe du prix d'achat de votre nouveau véhicule. Cette mécanique évite les complications de la vente entre particuliers (annonces, visites, négociations, paiements) et accélère votre transition."}
          ],
          faq: [
            {q:"Comment voir le stock disponible ?", a:"Stock présenté à l'atelier (1 Av. des Pères Blancs, Plan-de-Cuques) et progressivement en ligne. Appelez-nous pour connaître les arrivages : nous mettons les nouveaux véhicules en stock chaque semaine."},
            {q:"Proposez-vous le financement ?", a:"Oui, via nos partenaires bancaires (BNP Paribas Personal Finance, Cofinoga). Crédit auto classique ou LLD/LOA selon vos besoins. Réponse en 48h, taux compétitifs."},
            {q:"Quelle est la garantie incluse ?", a:"3 mois minimum pour véhicules anciens (>10 ans ou >150k km), 6 mois standard, 12 mois pour véhicules récents (<5 ans, <80k km). Pièces et main-d'œuvre. Extension possible jusqu'à 24 mois."},
            COMMON_FAQ_GUARANTEE,
            COMMON_FAQ_PAYMENT
          ],
          related: ['citadines', 'utilitaires', 'mecanique-generale'],
          ctaTitle: 'À la recherche d\'une occasion fiable ?',
          ctaTitleAccent: 'On a la voiture qu\'il vous faut.',
          ctaText: 'Stock à découvrir à Plan-de-Cuques. Reprise et financement possibles.'
        }

      }
    }

  }
};
