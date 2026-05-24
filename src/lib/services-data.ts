import type { ServiceData } from "@/types";
import {
  Stethoscope,
  Brain,
  Zap,
  CalendarHeart,
  HeartPulse,
  UserRound,
  HandHeart,
  Hospital,
  Check,
  Clock,
  Shield,
  Heart,
  Activity,
  Pill,
  Phone,
  FileText,
  Home,
  CalendarCheck,
  Clipboard,
  Users,
  Star,
  Truck,
} from "lucide-react";

export const SERVICES_DATA: Record<string, ServiceData> = {
  "soins-generaux": {
    slug: "soins-generaux",
    name: "Soins infirmiers généraux à domicile",
    shortName: "Soins généraux",
    icon: Stethoscope,
    heroTitle: "Soins infirmiers généraux à domicile en Belgique",
    heroSubtitle:
      "Des soins quotidiens de qualité hospitalière, dans le confort de votre domicile. Pansements, injections, perfusions, surveillance : nous prenons soin de vous chaque jour.",
    heroBadge: "Service · Soins généraux",
    description:
      "Les soins infirmiers généraux à domicile constituent la colonne vertébrale de notre offre de soins. Chaque jour, nos infirmiers se rendent chez vous pour assurer l'ensemble des soins de base dont vous avez besoin, sans que vous ayez à vous déplacer.\n\nQue ce soit pour un pansement quotidien après une blessure, une injection prescrite par votre médecin, la pose d'une perfusion ou simplement la prise de votre tension artérielle, notre équipe est formée pour réaliser ces actes avec le même niveau d'excellence qu'en milieu hospitalier — mais dans votre environnement familier.\n\nLe maintien à domicile favorise une récupération plus rapide et préserve votre autonomie. Nos infirmiers établissent avec vous un planning adapté à votre rythme de vie et à votre situation médicale. Ils travaillent en étroite collaboration avec votre médecin traitant pour garantir la continuité et la cohérence de votre parcours de soins.\n\nChaque visite est l'occasion d'observer votre évolution, de détecter d'éventuelles complications et d'adapter le plan de soins en temps réel. Cette vigilance quotidienne est notre meilleure garantie pour votre sécurité.",
    forWho: {
      title: "Pour qui sont ces soins ?",
      items: [
        "Patients en convalescence après une opération ou une hospitalisation",
        "Personnes âgées nécessitant des soins réguliers à domicile",
        "Patients sous traitement médical nécessitant un suivi infirmier",
        "Personnes à mobilité réduite ne pouvant se déplacer en cabinet",
        "Patients souffrant de plaies chroniques ou de pansements complexes",
        "Toute personne préférant recevoir ses soins dans son environnement",
      ],
    },
    whatIncluded: {
      title: "Que comprennent les soins généraux ?",
      items: [
        {
          title: "Pansements & soins de plaies",
          description:
            "Réfection de pansements simples ou complexes, soins de plaies postopératoires, ulcères, escarres et plaies chroniques.",
        },
        {
          title: "Injections & vaccinations",
          description:
            "Administration d'injections sous-cutanées, intramusculaires ou intraveineuses sur prescription médicale, y compris vaccinations.",
        },
        {
          title: "Perfusions à domicile",
          description:
            "Pose et surveillance de perfusions intraveineuses, administration d'antibiotiques ou de traitements nutritionnels prescrits.",
        },
        {
          title: "Surveillance des constantes",
          description:
            "Mesure régulière de la tension artérielle, du pouls, de la température, de la glycémie et de la saturation en oxygène.",
        },
        {
          title: "Gestion des médicaments",
          description:
            "Préparation des piluliers, administration des traitements oraux ou sous-cutanés, vérification de l'observance thérapeutique.",
        },
        {
          title: "Soins d'hygiène & nursing",
          description:
            "Aide à la toilette, soins bucco-dentaires, prévention des escarres et mobilisation pour les patients alités.",
        },
      ],
    },
    howItWorks: {
      title: "Comment se déroule la prise en charge ?",
      steps: [
        {
          title: "Premier contact & évaluation",
          description:
            "Vous nous appelez ou remplissez le formulaire. Un infirmier vous rappelle dans les 2 heures pour évaluer vos besoins et convenir d'une visite gratuite d'évaluation.",
        },
        {
          title: "Plan de soins personnalisé",
          description:
            "Lors de la visite d'évaluation, nous établissons avec vous et votre médecin un plan de soins détaillé : fréquence des visites, actes à réaliser, objectifs de santé.",
        },
        {
          title: "Démarrage des soins",
          description:
            "Les soins débutent selon le planning convenu. Vous avez toujours le même infirmier référent pour garantir la continuité et créer une relation de confiance.",
        },
        {
          title: "Suivi & adaptation",
          description:
            "Chaque visite fait l'objet d'un compte rendu transmis à votre médecin. Le plan de soins est adapté en fonction de votre évolution.",
        },
      ],
    },
    faq: [
      {
        q: "Faut-il une prescription médicale pour les soins généraux ?",
        a: "La plupart des actes infirmiers (injections, perfusions, pansements complexes) nécessitent une prescription médicale pour être remboursés par votre mutuelle. Pour les soins de confort (hygiène, surveillance), une prescription n'est pas obligatoire mais recommandée pour le remboursement.",
      },
      {
        q: "Puis-je choisir l'heure de passage de l'infirmier ?",
        a: "Absolument. Nous établissons ensemble un planning qui correspond à vos contraintes et préférences. Nous intervenons de 7h à 20h en semaine et de 8h à 18h le weekend, avec une plage horaire convenue à l'avance.",
      },
      {
        q: "Aurai-je toujours le même infirmier ?",
        a: "Nous faisons tout pour assurer la continuité avec un infirmier référent. En cas d'absence ou de congé, un collègue de confiance vous prend en charge en ayant accès à votre dossier pour assurer la même qualité de soins.",
      },
      {
        q: "Que se passe-t-il en cas d'urgence pendant une visite ?",
        a: "Nos infirmiers sont formés aux gestes d'urgence et ont le matériel nécessaire. En cas de situation grave, ils contactent immédiatement le 112 et restent avec vous jusqu'à l'arrivée des secours, tout en prévenant vos proches.",
      },
      {
        q: "Comment se fait la transmission d'informations avec mon médecin ?",
        a: "Nous utilisons un carnet de liaison électronique et communiquons régulièrement avec votre médecin traitant. Pour tout changement notable dans votre état, nous le contactons directement.",
      },
    ],
    reimbursement:
      "Les soins infirmiers généraux à domicile sont remboursés par l'INAMI (Institut national d'assurance maladie-invalidité) et toutes les mutuelles belges agréées. Selon votre situation (pensionné, bénéficiaire de l'intervention majorée, patient en ALD), votre ticket modérateur peut être très faible, voire nul. Nous nous occupons de toutes les formalités administratives : attestation de soins, envoi à votre mutuelle et, si vous êtes en tiers payant, facturation directe à votre organisme assureur.",
    relatedServices: [
      "post-hospitalisation",
      "suivi-long-terme",
      "maladies-chroniques",
    ],
  },

  "troubles-memoire": {
    slug: "troubles-memoire",
    name: "Accompagnement des troubles de la mémoire",
    shortName: "Troubles de la mémoire",
    icon: Brain,
    heroTitle: "Accompagnement infirmier des troubles de la mémoire à domicile",
    heroSubtitle:
      "Une présence douce et experte pour les patients atteints d'Alzheimer ou de troubles cognitifs. Nous accompagnons avec patience, bienveillance et professionnalisme.",
    heroBadge: "Service · Troubles de la mémoire",
    description:
      "Accompagner une personne atteinte de troubles de la mémoire — qu'il s'agisse de la maladie d'Alzheimer, d'une démence vasculaire ou d'un autre trouble cognitif — exige bien plus que des compétences techniques. Cela demande de la patience, une présence calme et une approche adaptée à chaque moment de la journée.\n\nNos infirmiers formés spécifiquement à la prise en charge des troubles cognitifs savent créer un environnement rassurant lors de chaque visite. Ils utilisent des repères temporels, des rituels apaisants et une communication adaptée pour maintenir un lien de confiance avec le patient, même lorsque celui-ci ne les reconnaît pas toujours.\n\nNous travaillons en étroite collaboration avec les familles, qui jouent un rôle essentiel dans cet accompagnement. Nous les orientons, les soutenons et leur donnons des outils concrets pour gérer les situations difficiles du quotidien. L'objectif est de maintenir le patient dans son environnement familier le plus longtemps possible, en préservant ses repères et son autonomie résiduelle.\n\nChaque plan de soins est co-construit avec le neurologue ou le gériatre référent, assurant une cohérence globale du suivi médical et psychosocial.",
    forWho: {
      title: "Pour qui est cet accompagnement ?",
      items: [
        "Patients diagnostiqués avec la maladie d'Alzheimer à un stade précoce ou modéré",
        "Personnes souffrant de démence vasculaire ou d'autres démences",
        "Patients présentant des troubles cognitifs légers (MCI) nécessitant un suivi",
        "Personnes âgées désorientées nécessitant une présence structurante",
        "Familles épuisées par l'aidance au quotidien",
        "Patients en attente de placement ou refusant l'hébergement en institution",
      ],
    },
    whatIncluded: {
      title: "Que comprend cet accompagnement ?",
      items: [
        {
          title: "Évaluation cognitive régulière",
          description:
            "Utilisation d'outils validés (MMS, test de l'horloge) pour suivre l'évolution des capacités cognitives et adapter le plan de soins.",
        },
        {
          title: "Stimulation cognitive douce",
          description:
            "Activités mémorielles adaptées : évocation de souvenirs, lecture, musique, jeux simples pour maintenir les fonctions cognitives résiduelles.",
        },
        {
          title: "Soins d'hygiène adaptés",
          description:
            "Aide à la toilette avec des techniques apaisantes, en respectant le rythme et les résistances du patient, sans brusquerie ni contrainte.",
        },
        {
          title: "Gestion des médicaments",
          description:
            "Administration rigoureuse des traitements, surveillance des effets secondaires, notamment des neuroleptiques et antidépresseurs souvent prescrits.",
        },
        {
          title: "Soutien aux aidants familiaux",
          description:
            "Formation des proches aux techniques de communication non-verbale, conseils pratiques et orientation vers les services de répit disponibles.",
        },
        {
          title: "Coordination avec les spécialistes",
          description:
            "Transmission régulière aux neurologues, gériatres et équipes pluridisciplinaires pour un suivi cohérent et réactif.",
        },
      ],
    },
    howItWorks: {
      title: "Comment s'organise l'accompagnement ?",
      steps: [
        {
          title: "Évaluation de la situation",
          description:
            "Rencontre avec le patient et sa famille pour comprendre le stade de la maladie, les habitudes de vie, les déclencheurs d'angoisse et les ressources disponibles.",
        },
        {
          title: "Plan d'accompagnement personnalisé",
          description:
            "Élaboration d'un planning structuré et rassurant : visites aux mêmes heures, mêmes rituels, avec un infirmier référent stable.",
        },
        {
          title: "Soins et présence régulière",
          description:
            "Interventions quotidiennes ou pluriquotidiennes selon les besoins, dans le respect total du rythme et de la dignité du patient.",
        },
      ],
    },
    faq: [
      {
        q: "Comment les infirmiers sont-ils formés aux troubles cognitifs ?",
        a: "Nos infirmiers ont suivi des formations spécialisées en gériatrie et en démences (formations Alzheimer, approche Gineste-Marescotti Humanitude). Ils sont régulièrement mis à jour sur les nouvelles approches thérapeutiques.",
      },
      {
        q: "Comment gérez-vous les comportements d'agitation ou de refus de soins ?",
        a: "Nous utilisons des techniques douces de réorientation et de distraction. En cas de refus persistant, nous adaptons le moment de la visite et contactons la famille ou le médecin. Nous ne pratiquons jamais la contrainte.",
      },
      {
        q: "Pouvez-vous intervenir plusieurs fois par jour ?",
        a: "Oui. Pour les patients à un stade avancé, des interventions matin, midi et soir sont possibles. Nous évaluons avec vous le rythme optimal pour maintenir la qualité de vie.",
      },
      {
        q: "Comment soutenez-vous les familles épuisées ?",
        a: "Nous les formons, les écoutons et les orientons vers les services adaptés : Service de Répit, centres de jour, associations Alzheimer. Prendre soin des aidants fait partie de notre mission.",
      },
      {
        q: "Y a-t-il un remboursement spécifique pour la démence ?",
        a: "Oui. Certains actes infirmiers bénéficient d'un remboursement majoré pour les patients avec un diagnostic de démence. Nous vous aidons à constituer le dossier auprès de l'INAMI.",
      },
    ],
    reimbursement:
      "L'accompagnement infirmier des troubles de la mémoire est pris en charge par l'INAMI dans le cadre des soins infirmiers à domicile. Pour les patients avec un diagnostic médical de démence, certains forfaits spécifiques permettent un remboursement majoré. Les actes de stimulation cognitive réalisés par un infirmier dans le cadre d'un programme thérapeutique sont également remboursables. Votre mutuelle peut également contribuer aux coûts via des assurances complémentaires. Nous vous accompagnons dans toutes ces démarches.",
    relatedServices: ["soins-seniors", "suivi-long-terme", "soins-palliatifs"],
  },

  "interventions-rapides": {
    slug: "interventions-rapides",
    name: "Interventions infirmières rapides",
    shortName: "Interventions rapides",
    icon: Zap,
    heroTitle: "Interventions infirmières rapides à domicile",
    heroSubtitle:
      "Disponibilité immédiate pour vos besoins urgents. Nos infirmiers peuvent intervenir en moins d'une heure dans les régions d'Overijse, Hoeilaart et Tervuren.",
    heroBadge: "Service · Interventions rapides",
    description:
      "Certaines situations médicales ne peuvent pas attendre. Une plaie qui s'infecte, une tension qui monte, un pansement à refaire d'urgence, une injection quotidienne impossible à sauter : vous avez besoin d'un infirmier maintenant, pas demain.\n\nNotre service d'interventions rapides est conçu pour répondre à ces situations avec efficacité et sans délai. Grâce à une équipe disponible 7j/7 et à une organisation logistique optimisée, nous pouvons intervenir dans l'heure pour les demandes urgentes dans nos zones d'intervention.\n\nCe n'est pas un service de garde hospitalier de nuit — pour les urgences vitales, le 112 reste la référence absolue. Mais pour tout ce qui est urgent sans être vital — et qui peut quand même gâcher votre journée ou votre nuit si c'est ignoré — notre équipe est là.\n\nRapidité ne signifie pas précipitation : chaque intervention rapide suit le même protocole de qualité que nos soins programmés. Nous documentons, nous communiquons avec votre médecin et nous assurons le suivi.",
    forWho: {
      title: "Pour qui sont ces interventions ?",
      items: [
        "Patients nécessitant un soin urgent non vital à domicile",
        "Personnes dont le pansement s'est décollé ou la plaie s'est rouverte",
        "Patients sous perfusion ou traitement IV nécessitant une surveillance urgente",
        "Diabétiques avec une glycémie préoccupante nécessitant un ajustement",
        "Personnes âgées ayant chuté sans blessure grave mais nécessitant un bilan",
        "Aidants dépassés par une situation médicale imprévue",
      ],
    },
    whatIncluded: {
      title: "Que couvre une intervention rapide ?",
      items: [
        {
          title: "Pansements d'urgence",
          description:
            "Refection immédiate d'un pansement décollé, traitement d'une plaie infectée ou d'une blessure récente nécessitant des soins sans délai.",
        },
        {
          title: "Soins sur prescription urgente",
          description:
            "Administration d'une injection, d'un traitement IV ou d'un médicament prescrit en urgence par votre médecin le jour même.",
        },
        {
          title: "Bilan des constantes urgent",
          description:
            "Évaluation rapide : tension, pouls, glycémie, saturation, avec transmission immédiate des résultats à votre médecin.",
        },
        {
          title: "Gestion d'une chute sans blessure grave",
          description:
            "Bilan infirmier post-chute, soins des écorchures, évaluation du risque et recommandations pour prévenir les récidives.",
        },
        {
          title: "Soutien aux aidants en crise",
          description:
            "Intervention pour relayer un aidant épuisé face à une situation imprévue : refus de soins, agitation, détresse soudaine.",
        },
        {
          title: "Liaison médicale urgente",
          description:
            "Contact direct avec votre médecin pour décider ensemble si une hospitalisation est nécessaire ou si la situation peut être gérée à domicile.",
        },
      ],
    },
    howItWorks: {
      title: "Comment demander une intervention rapide ?",
      steps: [
        {
          title: "Appelez ou envoyez un WhatsApp",
          description:
            "Décrivez brièvement votre situation. Notre équipe évalue le degré d'urgence en moins de 5 minutes et vous confirme le délai d'intervention.",
        },
        {
          title: "L'infirmier arrive",
          description:
            "Un infirmier disponible est dépêché immédiatement avec le matériel adapté. Le délai cible est inférieur à 60 minutes dans nos zones d'intervention.",
        },
        {
          title: "Soins et évaluation",
          description:
            "L'infirmier réalise les soins, évalue la situation dans son ensemble et contacte votre médecin si nécessaire pour adapter le traitement.",
        },
      ],
    },
    faq: [
      {
        q: "Quelle est la différence entre une intervention rapide et le 112 ?",
        a: "Le 112 est pour les urgences vitales (infarctus, AVC, perte de conscience, hémorragie grave). Notre service couvre les urgences médicales non vitales qui nécessitent quand même un infirmier rapidement. En cas de doute, appelez le 112 en premier.",
      },
      {
        q: "Intervenez-vous la nuit ?",
        a: "Nos horaires d'intervention rapide sont de 7h à 20h en semaine et 8h à 18h le weekend. Pour les urgences nocturnes, orientez-vous vers la garde médicale ou le 112 selon la gravité.",
      },
      {
        q: "Une intervention rapide coûte-t-elle plus cher ?",
        a: "Les actes infirmiers urgents réalisés sur prescription sont remboursés aux mêmes tarifs INAMI que les soins programmés. Un forfait de déplacement peut s'appliquer selon les conditions.",
      },
      {
        q: "Puis-je demander une intervention rapide même si je n'ai pas de dossier chez vous ?",
        a: "Oui. Nous accueillons les nouveaux patients en urgence. Nous collectons les informations essentielles par téléphone avant d'intervenir pour assurer votre sécurité.",
      },
    ],
    reimbursement:
      "Les interventions infirmières urgentes réalisées sur prescription médicale sont remboursées par l'INAMI aux tarifs conventionnés habituels. Il n'y a pas de majoration de tarif pour l'urgence dans le cadre des soins à domicile conventionnés. Si l'intervention est demandée sans prescription initiale, votre médecin peut régulariser la prescription après coup pour permettre le remboursement. Nous vous informons systématiquement du cadre tarifaire avant d'intervenir.",
    relatedServices: [
      "soins-generaux",
      "post-hospitalisation",
      "maladies-chroniques",
    ],
  },

  "suivi-long-terme": {
    slug: "suivi-long-terme",
    name: "Suivi infirmier à long terme",
    shortName: "Suivi long terme",
    icon: CalendarHeart,
    heroTitle: "Suivi infirmier à long terme à domicile",
    heroSubtitle:
      "Une relation de confiance qui s'inscrit dans la durée. Le même infirmier référent, une équipe stable, et une coordination médicale sans faille pour votre santé au long cours.",
    heroBadge: "Service · Suivi long terme",
    description:
      "Certains patients ont besoin de soins non pas quelques semaines, mais des mois, voire des années. C'est pour eux que nous avons développé notre service de suivi infirmier à long terme — une offre qui va bien au-delà de la simple exécution d'actes techniques.\n\nLe suivi long terme repose sur une relation humaine durable. Vous connaissez votre infirmier référent, il vous connaît. Il connaît vos habitudes, vos inquiétudes, vos préférences, les petits signes qui précèdent les complications. Cette connaissance intime de votre situation est un atout thérapeutique réel que n'offre aucune consultation aux urgences.\n\nNos équipes sont organisées en binômes ou trinômes pour garantir la continuité même en cas d'absence. Un système de dossier informatisé partagé assure que votre nouveau soignant est aussi bien informé que l'habituel.\n\nNous coordonnons activement votre parcours de soins : transmission régulière au médecin traitant, alertes précoces en cas de dégradation, participation aux réunions de concertation pluridisciplinaires. Votre santé est notre engagement à long terme.",
    forWho: {
      title: "Pour qui est ce suivi ?",
      items: [
        "Patients atteints de maladies chroniques nécessitant un suivi infirmier permanent",
        "Personnes âgées souhaitant maintenir leur autonomie à domicile sur le long terme",
        "Patients sous traitement chronique (anticoagulants, insuline, perfusions) nécessitant un suivi quotidien",
        "Patients en situation de grande dépendance refusant l'entrée en institution",
        "Personnes atteintes de maladies évolutives (sclérose, Parkinson, BPCO avancée)",
        "Familles souhaitant externaliser une partie des soins tout en gardant leur proche à domicile",
      ],
    },
    whatIncluded: {
      title: "Que comprend le suivi long terme ?",
      items: [
        {
          title: "Infirmier référent stable",
          description:
            "Attribution d'un infirmier principal qui assure la majorité des visites, garantissant une relation de confiance et une connaissance approfondie du patient.",
        },
        {
          title: "Planning hebdomadaire personnalisé",
          description:
            "Organisation flexible et adaptable des visites selon les besoins évolutifs : fréquence, durée et horaires adaptés à votre rythme de vie.",
        },
        {
          title: "Coordination médicale active",
          description:
            "Lien permanent avec votre médecin traitant et vos spécialistes : transmission des constantes, alertes précoces, participation aux réunions de concertation.",
        },
        {
          title: "Réévaluation régulière des besoins",
          description:
            "Bilan trimestriel ou semestriel avec le patient et sa famille pour adapter le plan de soins à l'évolution de la situation.",
        },
        {
          title: "Gestion administrative complète",
          description:
            "Renouvellement des prescriptions, envoi des attestations de soins, gestion du tiers payant, coordination avec les autres intervenants.",
        },
        {
          title: "Soutien psychosocial",
          description:
            "Écoute active, détection des signes de dépression ou d'isolement, orientation vers les services d'aide sociale si nécessaire.",
        },
      ],
    },
    howItWorks: {
      title: "Comment se met en place le suivi long terme ?",
      steps: [
        {
          title: "Évaluation initiale complète",
          description:
            "Visite approfondie pour dresser un portrait complet de votre situation médicale, sociale et environnementale. Rencontre avec vos proches si vous le souhaitez.",
        },
        {
          title: "Contrat de soins personnalisé",
          description:
            "Élaboration d'un plan de soins formalisé, validé par votre médecin, avec des objectifs à court, moyen et long terme. Attribution de votre infirmier référent.",
        },
        {
          title: "Soins réguliers & suivi continu",
          description:
            "Visites planifiées avec transmission régulière à votre médecin. Réactivité garantie en cas de changement dans votre état de santé.",
        },
        {
          title: "Révisions périodiques",
          description:
            "Rencontres régulières avec vous et votre entourage pour réévaluer les besoins et ajuster le plan de soins en fonction de votre évolution.",
        },
      ],
    },
    faq: [
      {
        q: "Puis-je changer d'infirmier référent si ça ne se passe pas bien ?",
        a: "Absolument. La relation de confiance est essentielle. Si pour une raison ou une autre vous préférez un autre infirmier, nous faisons notre possible pour satisfaire cette demande dans les meilleurs délais.",
      },
      {
        q: "Que se passe-t-il si mon infirmier référent est en vacances ?",
        a: "Un protocole de continuité est prévu : votre dossier est transmis au remplaçant, qui a été briefé sur votre situation spécifique. La qualité des soins ne doit pas dépendre d'une seule personne.",
      },
      {
        q: "Comment les informations sont-elles transmises à mon médecin ?",
        a: "Via un dossier de soins informatisé partagé et des rapports réguliers (hebdomadaires ou mensuels selon les besoins). Pour tout événement notable, votre médecin est contacté directement.",
      },
      {
        q: "Le suivi long terme est-il plus coûteux ?",
        a: "Non. Les actes infirmiers sont remboursés aux tarifs INAMI habituels, quelle que soit la durée du suivi. Les frais supplémentaires éventuels (coordination, déplacements) sont clarifiés dès le départ.",
      },
      {
        q: "Puis-je suspendre temporairement le suivi en cas d'hospitalisation ?",
        a: "Bien sûr. En cas d'hospitalisation, nous suspendons les visites et nous coordonnons avec l'équipe hospitalière pour préparer votre retour à domicile dans les meilleures conditions.",
      },
    ],
    reimbursement:
      "Le suivi infirmier à long terme bénéficie d'un cadre de remboursement INAMI spécifique pour les patients nécessitant des soins chroniques. Pour les patients en dépendance lourde (dépendance Katz), des forfaits de soins spécifiques permettent une prise en charge plus complète. Les patients bénéficiant de l'ALD (Affection de Longue Durée) ou de l'intervention majorée de la mutuelle ont un ticket modérateur réduit, parfois nul. Nous vous aidons à identifier le statut le plus avantageux pour votre situation.",
    relatedServices: [
      "maladies-chroniques",
      "soins-seniors",
      "soins-generaux",
    ],
  },

  "maladies-chroniques": {
    slug: "maladies-chroniques",
    name: "Suivi des maladies chroniques",
    shortName: "Maladies chroniques",
    icon: HeartPulse,
    heroTitle: "Suivi infirmier des maladies chroniques à domicile",
    heroSubtitle:
      "Diabète, hypertension, BPCO, insuffisance cardiaque : une gestion experte à domicile. Éducation thérapeutique, surveillance continue et ajustements en temps réel.",
    heroBadge: "Service · Maladies chroniques",
    description:
      "Vivre avec une maladie chronique exige une vigilance quotidienne, une maîtrise des traitements et une capacité à détecter les signes d'alerte avant qu'ils ne deviennent des urgences. C'est précisément ce que nos infirmiers spécialisés vous apportent, directement chez vous.\n\nNous intervenons pour un large spectre de pathologies chroniques : diabète de type 1 et 2, hypertension artérielle, insuffisance cardiaque, broncho-pneumopathie obstructive chronique (BPCO), insuffisance rénale chronique, pathologies auto-immunes et bien d'autres. Pour chacune, nous avons développé des protocoles de suivi adaptés aux recommandations médicales les plus récentes.\n\nL'éducation thérapeutique fait partie intégrante de notre approche. Nous ne voulons pas que vous dépendiez de nous pour toujours — nous voulons vous donner les outils pour gérer votre maladie en toute autonomie, avec nous en filet de sécurité. Cette approche réduit les hospitalisations, améliore la qualité de vie et augmente l'espérance de vie.\n\nNous collaborons étroitement avec vos médecins spécialistes pour une approche vraiment intégrée de votre parcours de santé.",
    forWho: {
      title: "Pour qui est ce service ?",
      items: [
        "Patients diabétiques (type 1 ou 2) nécessitant un suivi de leur glycémie et de leur insulinothérapie",
        "Personnes souffrant d'hypertension artérielle mal contrôlée ou nécessitant un ajustement thérapeutique",
        "Patients atteints d'insuffisance cardiaque nécessitant une surveillance du poids et des œdèmes",
        "Patients BPCO nécessitant un suivi de la saturation et de la fonction respiratoire",
        "Personnes sous anticoagulants nécessitant des INR réguliers et un suivi des saignements",
        "Tout patient atteint d'une pathologie chronique souhaitant un suivi infirmier à domicile",
      ],
    },
    whatIncluded: {
      title: "Que comprend le suivi des maladies chroniques ?",
      items: [
        {
          title: "Surveillance des paramètres clés",
          description:
            "Mesure régulière des indicateurs spécifiques à votre pathologie : glycémie, tension, saturation, poids, INR, selon un protocole validé par votre médecin.",
        },
        {
          title: "Administration des traitements",
          description:
            "Injections d'insuline, administration d'anticoagulants sous-cutanés, gestion des pompes à perfusion et autres traitements complexes à domicile.",
        },
        {
          title: "Éducation thérapeutique",
          description:
            "Formation progressive à l'autogestion de votre maladie : reconnaissance des signes d'alerte, ajustement des doses, utilisation du matériel médical.",
        },
        {
          title: "Détection précoce des complications",
          description:
            "Surveillance active des signes précurseurs de décompensation pour intervenir avant l'urgence : pieds diabétiques, œdèmes cardiaques, dyspnée BPCO.",
        },
        {
          title: "Coordination avec les spécialistes",
          description:
            "Transmission régulière des données de surveillance à votre diabétologue, cardiologue ou pneumologue, avec alertes immédiates en cas d'anomalie.",
        },
        {
          title: "Soutien à l'observance",
          description:
            "Accompagnement pour maintenir un traitement parfois complexe, lourd ou contraignant, avec des stratégies personnalisées pour éviter les oublis.",
        },
      ],
    },
    howItWorks: {
      title: "Comment s'organise le suivi ?",
      steps: [
        {
          title: "Bilan initial & protocole de soins",
          description:
            "Entretien complet avec vous et votre médecin spécialiste pour définir les paramètres à surveiller, les seuils d'alerte et le rythme des visites.",
        },
        {
          title: "Suivi régulier à domicile",
          description:
            "Visites planifiées selon la fréquence requise par votre pathologie. Chaque visite fait l'objet d'un enregistrement des données dans votre dossier.",
        },
        {
          title: "Réactivité aux variations",
          description:
            "En cas d'anomalie détectée, contact immédiat avec votre médecin et adaptation du protocole, sans attendre le prochain rendez-vous spécialisé.",
        },
      ],
    },
    faq: [
      {
        q: "Mes infirmiers sont-ils formés aux maladies chroniques spécifiques ?",
        a: "Oui. Nos infirmiers suivent des formations continues spécifiques (diabète, cardiopathies, BPCO) et sont régulièrement mis à jour sur les nouvelles recommandations cliniques. Nous disposons du matériel adapté pour chaque pathologie.",
      },
      {
        q: "Pouvez-vous ajuster mon traitement en cas d'anomalie ?",
        a: "Les infirmiers ne prescrivent pas de médicaments, mais nous avons des protocoles d'ajustement validés par votre médecin (ex : protocoles insuline à la demande). En cas d'anomalie, nous contactons votre médecin pour toute modification de traitement.",
      },
      {
        q: "Travaillez-vous avec mon diabétologue/cardiologue ?",
        a: "Absolument. Nous vous demandons les coordonnées de votre spécialiste dès le début et établissons un canal de communication direct. Certains spécialistes apprécient de recevoir nos données de suivi pour optimiser vos consultations.",
      },
      {
        q: "Y a-t-il un suivi nutritionnel dans ce service ?",
        a: "Nous pouvons donner des conseils hygiéno-diététiques de base en lien avec votre pathologie. Pour un suivi nutritionnel spécialisé, nous vous orientons vers un diététicien agréé avec qui nous pouvons collaborer.",
      },
      {
        q: "Que se passe-t-il si mes constantes dépassent un seuil critique ?",
        a: "Des seuils d'alerte sont définis avec votre médecin pour chaque paramètre. En cas de dépassement, nous contactons immédiatement votre médecin ou le 112 si la situation est grave. Un protocole d'urgence clair est établi dès le départ.",
      },
    ],
    reimbursement:
      "Le suivi infirmier des maladies chroniques est largement remboursé par l'INAMI. Selon votre pathologie, des conventions spécifiques existent : le trajet de soins pour le diabète de type 2, la convention insuffisance rénale, etc. Ces conventions peuvent améliorer significativement votre remboursement. Les patients bénéficiaires de l'intervention majorée (BIM) ont un ticket modérateur réduit. Nous vous aidons à identifier et activer les mécanismes de remboursement les plus avantageux pour votre situation.",
    relatedServices: [
      "suivi-long-terme",
      "interventions-rapides",
      "soins-generaux",
    ],
  },

  "soins-seniors": {
    slug: "soins-seniors",
    name: "Soins aux personnes âgées",
    shortName: "Soins seniors",
    icon: UserRound,
    heroTitle: "Soins infirmiers à domicile pour personnes âgées",
    heroSubtitle:
      "Maintien à domicile, préservation de l'autonomie et soins gériatriques de qualité. Parce que chaque personne mérite de vieillir dignement dans son environnement.",
    heroBadge: "Service · Soins seniors",
    description:
      "Vieillir à domicile est un droit, pas un luxe. La grande majorité des personnes âgées souhaitent rester dans leur maison, entourées de leurs souvenirs et de leurs proches, le plus longtemps possible. Notre service de soins aux seniors est conçu pour rendre ce souhait réalisable, en toute sécurité.\n\nLe vieillissement s'accompagne souvent d'une accumulation de besoins : soins d'hygiène plus complexes, gestion de plusieurs médicaments, risques accrus de chutes, pathologies multiples qui se cumulent. Nos infirmiers gériatriques sont formés à appréhender cette complexité avec douceur et respect.\n\nNous croyons que la dignité ne s'arrête pas avec l'âge. Chaque visite est pensée pour préserver l'autonomie résiduelle de la personne, la laisser actrice de ses soins autant que possible, et lui offrir aussi un moment de présence humaine qui compte.\n\nNous travaillons en réseau avec les médecins traitants, gériatres, kinésithérapeutes, ergothérapeutes et services sociaux pour vous offrir une prise en charge véritablement globale.",
    forWho: {
      title: "Pour qui sont ces soins ?",
      items: [
        "Personnes âgées souhaitant rester à domicile malgré une perte d'autonomie",
        "Seniors nécessitant une aide quotidienne pour les soins d'hygiène et la toilette",
        "Personnes âgées polymédiquées nécessitant une gestion rigoureuse de leur traitement",
        "Patients gériatriques sortant d'hospitalisation et rentrant chez eux",
        "Personnes âgées vivant seules et nécessitant une surveillance régulière",
        "Familles aidantes souhaitant un soutien professionnel pour les soins",
      ],
    },
    whatIncluded: {
      title: "Que comprend la prise en charge seniors ?",
      items: [
        {
          title: "Soins d'hygiène complets",
          description:
            "Aide à la toilette complète ou partielle, soins bucco-dentaires, soins des pieds, coiffure — avec une attention constante à la dignité et au respect.",
        },
        {
          title: "Prévention des chutes",
          description:
            "Évaluation du risque de chute, recommandations d'aménagement du domicile, exercices d'équilibre simples et coordination avec le kinésithérapeute.",
        },
        {
          title: "Gestion des médicaments",
          description:
            "Préparation et administration des piluliers, vérification des interactions médicamenteuses, surveillance des effets indésirables souvent atypiques chez les seniors.",
        },
        {
          title: "Surveillance gériatrique",
          description:
            "Dépistage de la dénutrition, de la déshydratation, des troubles cognitifs et de la dépression — problèmes fréquents et souvent négligés chez les personnes âgées.",
        },
        {
          title: "Soins de confort & nursing",
          description:
            "Prévention et traitement des escarres, mobilisation, positionnement, soins de peau pour les patients alités ou à mobilité très réduite.",
        },
        {
          title: "Coordination des intervenants",
          description:
            "Organisation et communication avec les autres professionnels à domicile : aide-soignant, kiné, ergothérapeute, médecin, assistante sociale.",
        },
      ],
    },
    howItWorks: {
      title: "Comment s'organise la prise en charge ?",
      steps: [
        {
          title: "Évaluation globale",
          description:
            "Visite d'évaluation complète incluant l'état de santé, l'autonomie fonctionnelle (grille Katz), l'environnement domiciliaire et les ressources familiales disponibles.",
        },
        {
          title: "Plan de maintien à domicile",
          description:
            "Élaboration d'un plan coordonné avec tous les intervenants. Identification des aides complémentaires possibles (APA, mutuelle, CPAS).",
        },
        {
          title: "Soins réguliers et vigilance",
          description:
            "Visites quotidiennes ou pluriquotidiennes selon les besoins. Chaque passage est l'occasion d'observer et de prévenir les complications.",
        },
      ],
    },
    faq: [
      {
        q: "Comment évaluez-vous le degré de dépendance ?",
        a: "Nous utilisons notamment l'échelle de Katz, qui évalue six activités de la vie quotidienne (toilette, habillage, mobilité, continence, alimentation, utilisation des toilettes). Cette évaluation détermine aussi le niveau de remboursement INAMI.",
      },
      {
        q: "Travaillez-vous avec les aides à domicile et auxiliaires de vie ?",
        a: "Oui. Nous nous coordonnons avec l'ensemble des intervenants à domicile pour éviter les doublons et les oublis. Une communication claire et régulière avec tous les acteurs est essentielle.",
      },
      {
        q: "Pouvez-vous intervenir la nuit pour les personnes âgées ?",
        a: "Nos interventions régulières se font de 7h à 20h. Pour les besoins nocturnes, nous vous orientons vers les services de garde infirmière ou les alarmes de téléassistance adaptées.",
      },
      {
        q: "Comment gérez-vous le refus de soins chez une personne âgée ?",
        a: "Le refus de soins d'un adulte capable doit être respecté. Nous travaillons à créer la confiance progressive et adaptons nos méthodes. Si le refus compromet la sécurité, nous contactons la famille et le médecin.",
      },
      {
        q: "Quelles aides financières existent pour les soins seniors ?",
        a: "Plusieurs dispositifs coexistent : remboursement INAMI des soins infirmiers, allocations d'intégration, APA (Allocation d'aide à la personne âgée), interventions des mutuelles et du CPAS. Nous vous aidons à activer ceux auxquels vous avez droit.",
      },
    ],
    reimbursement:
      "Les soins aux personnes âgées bénéficient d'un remboursement spécifique via les forfaits de soins infirmiers à domicile de l'INAMI, modulés selon le degré de dépendance (évaluation Katz). Plus la dépendance est importante, plus le forfait de remboursement est élevé. Les patients en forte dépendance (Katz B, C ou Cd) peuvent bénéficier d'un forfait journalier couvrant une grande partie des soins. Les personnes bénéficiaires de l'intervention majorée (BIM/VIPO) ont un ticket modérateur réduit. Nous réalisons gratuitement l'évaluation Katz et vous aidons à obtenir le statut le plus favorable.",
    relatedServices: [
      "troubles-memoire",
      "suivi-long-terme",
      "soins-palliatifs",
    ],
  },

  "soins-palliatifs": {
    slug: "soins-palliatifs",
    name: "Soins palliatifs et accompagnement à domicile",
    shortName: "Soins palliatifs",
    icon: HandHeart,
    heroTitle: "Soins palliatifs à domicile en Belgique",
    heroSubtitle:
      "Confort, dignité et présence humaine pour les patients en fin de vie et leurs familles. Accompagner jusqu'au bout, chez soi, entouré des siens.",
    heroBadge: "Service · Soins palliatifs",
    description:
      "Les soins palliatifs à domicile ne sont pas une capitulation — ils sont une affirmation de la valeur de chaque instant de vie. Quand la guérison n'est plus l'objectif, la qualité de vie, le confort et la dignité deviennent les priorités absolues.\n\nNous avons choisi de former notre équipe à l'accompagnement palliatif parce que nous croyons profondément que les personnes en fin de vie méritent de pouvoir rester chez elles si tel est leur souhait, entourées des personnes qu'elles aiment, dans leur environnement familier.\n\nNos infirmiers palliatifs travaillent en étroite collaboration avec les médecins, les équipes de soins palliatifs spécialisées, les psychologues et les assistants sociaux. Ils apportent à la fois des compétences techniques pointues — gestion de la douleur, soins de confort, sédation palliative — et une présence humaine douce et non intrusive.\n\nNous n'oublions pas les familles. Accompagner un proche en fin de vie est une expérience bouleversante qui laisse des traces. Nous soutenons les aidants pendant la maladie et les orientons vers les ressources de deuil après le décès.",
    forWho: {
      title: "Pour qui sont les soins palliatifs à domicile ?",
      items: [
        "Patients atteints d'une maladie incurable en phase avancée souhaitant rester à domicile",
        "Personnes en fin de vie ayant exprimé le souhait de ne pas mourir à l'hôpital",
        "Patients oncologiques dont le traitement curatif est interrompu",
        "Personnes atteintes de maladies dégénératives évoluées (SLA, démences au stade terminal)",
        "Familles souhaitant accompagner leur proche dans la dignité à domicile",
        "Patients dont l'état ne nécessite plus d'hospitalisation mais qui ont besoin de soins de confort",
      ],
    },
    whatIncluded: {
      title: "Que comprennent les soins palliatifs ?",
      items: [
        {
          title: "Gestion de la douleur",
          description:
            "Évaluation régulière de la douleur, administration des antalgiques prescrits (incluant la morphine et ses dérivés), et communication avec le médecin pour ajuster les traitements.",
        },
        {
          title: "Soins de confort & nursing",
          description:
            "Soins de bouche, positionnement antidouleur, prévention et traitement des escarres, soins d'hygiène délicats adaptés à l'état du patient.",
        },
        {
          title: "Soutien aux familles",
          description:
            "Formation aux gestes d'accompagnement, soutien émotionnel, organisation des relèves pour permettre aux aidants de souffler.",
        },
        {
          title: "Coordination palliative",
          description:
            "Lien avec les équipes de soins palliatifs spécialisées, les médecins, l'assistance sociale et les équipes psychologiques pour une approche intégrée.",
        },
        {
          title: "Présence en fin de vie",
          description:
            "Présence infirmière lors des derniers moments si la famille en exprime le besoin, pour que personne ne soit seul et que la dignité soit préservée.",
        },
        {
          title: "Soins après le décès",
          description:
            "Soins mortuaires de base, aide aux démarches pratiques immédiates, et orientation vers les ressources de deuil pour la famille.",
        },
      ],
    },
    howItWorks: {
      title: "Comment s'organise l'accompagnement palliatif ?",
      steps: [
        {
          title: "Rencontre et évaluation des besoins",
          description:
            "Une première rencontre avec le patient et sa famille pour comprendre les souhaits, les peurs, les besoins médicaux et le contexte familial. Aucun jugement, seulement de l'écoute.",
        },
        {
          title: "Mise en place du plan de confort",
          description:
            "Élaboration d'un plan de soins centré sur le confort, validé par le médecin traitant et l'équipe de soins palliatifs si elle est impliquée.",
        },
        {
          title: "Accompagnement continu",
          description:
            "Visites régulières adaptées à l'évolution de l'état, avec une intensification des présences dans les derniers jours si souhaité.",
        },
      ],
    },
    faq: [
      {
        q: "Les soins palliatifs signifient-ils qu'on abandonne tout traitement ?",
        a: "Non. Les soins palliatifs suspendent les traitements curatifs intensifs, mais maintiennent et intensifient tout ce qui soulage : antalgiques, anxiolytiques, soins de confort. L'objectif est de maximiser la qualité de vie, pas d'accélérer la mort.",
      },
      {
        q: "Comment gérez-vous la douleur à domicile ?",
        a: "En collaboration étroite avec le médecin. Nous administrons les antalgiques prescrits, évaluons régulièrement leur efficacité et alertons le médecin pour tout ajustement nécessaire. Des protocoles anticipés peuvent être établis pour les situations d'urgence nocturne.",
      },
      {
        q: "Que faire si la famille est épuisée ou dépassée ?",
        a: "C'est normal et fréquent. Nous organisons des relèves, orientons vers les services de répit (gardes de nuit, accueil de jour palliatif) et soutenons émotionnellement les aidants. Leur bien-être fait partie de notre mission.",
      },
      {
        q: "Peut-on changer d'avis et demander une hospitalisation ?",
        a: "Absolument. Le souhait de rester à domicile peut évoluer. Nous ne créons pas de pression dans un sens ou dans l'autre. Si une hospitalisation s'avère nécessaire ou si la famille change d'avis, nous coordonnons le transfert.",
      },
      {
        q: "Les soins palliatifs à domicile sont-ils remboursés ?",
        a: "Oui. La Belgique dispose d'un excellent cadre de remboursement pour les soins palliatifs à domicile, incluant le congé palliatif pour les aidants proches et des forfaits majorés pour les soins infirmiers. Nous vous guidons dans toutes ces démarches.",
      },
    ],
    reimbursement:
      "La Belgique reconnaît et finance les soins palliatifs à domicile via plusieurs mécanismes spécifiques. L'INAMI prévoit un forfait de soins palliatifs à domicile qui couvre une grande partie des soins infirmiers, médicaux et paramédicaux. Le médecin référent peut activer une fonction palliative permettant d'accéder à des ressources supplémentaires. Les aidants proches peuvent bénéficier du congé palliatif (interruption de carrière avec allocation). Nous vous accompagnons dans toutes ces démarches administratives, souvent complexes mais cruciales pour vous permettre de vous concentrer sur l'essentiel.",
    relatedServices: [
      "soins-seniors",
      "troubles-memoire",
      "suivi-long-terme",
    ],
  },

  "post-hospitalisation": {
    slug: "post-hospitalisation",
    name: "Soins post-hospitalisation à domicile",
    shortName: "Post-hospitalisation",
    icon: Hospital,
    heroTitle: "Soins infirmiers post-hospitalisation à domicile",
    heroSubtitle:
      "Retour à domicile sécurisé après une opération ou une hospitalisation. Coordination médicale, suivi des plaies, surveillance des complications et réadaptation progressive.",
    heroBadge: "Service · Post-hospitalisation",
    description:
      "Le retour à domicile après une hospitalisation est souvent le moment le plus délicat du parcours de soins. L'hôpital, avec ses équipes 24h/24, ses équipements et sa surveillance constante, laisse place à votre maison — confortable et familière, mais sans le filet de sécurité hospitalier.\n\nNotre service post-hospitalisation est conçu pour combler ce vide. Nous prenons le relais de l'équipe hospitalière, assurons la continuité des soins techniques, surveillons activement l'apparition de complications et coordonnons votre suivi médical pour que votre convalescence soit aussi sereine et rapide que possible.\n\nLes premières semaines après une opération sont critiques. Une infection de plaie non détectée, une décompensation cardiaque passée inaperçue, un traitement anticoagulant mal dosé : ces situations se développent souvent à domicile, loin des regards experts. Nos infirmiers sont formés à les détecter tôt, à réagir vite et à vous éviter un retour aux urgences.\n\nNous assurons également la liaison avec vos chirurgiens, anesthésistes et médecin traitant pour une transmission fluide des informations et une adaptation rapide du traitement si nécessaire.",
    forWho: {
      title: "Pour qui est ce service ?",
      items: [
        "Patients sortant d'une chirurgie (orthopédique, cardiaque, digestive, oncologique...)",
        "Personnes sortant d'une hospitalisation médicale longue",
        "Patients sous anticoagulants en post-opératoire nécessitant un suivi des INR",
        "Personnes avec des plaies opératoires ou des drains à surveiller",
        "Patients nécessitant une rééducation post-chirurgicale à domicile",
        "Personnes âgées dont le retour à domicile nécessite une organisation coordonnée",
      ],
    },
    whatIncluded: {
      title: "Que comprend la prise en charge post-hospitalisation ?",
      items: [
        {
          title: "Soins de plaies postopératoires",
          description:
            "Surveillance et réfection quotidienne des pansements opératoires, détection précoce des signes d'infection (rougeur, chaleur, écoulement, fièvre).",
        },
        {
          title: "Gestion des drains & dispositifs",
          description:
            "Surveillance et entretien des drains, sondes urinaires, cathéters veineux centraux ou périphériques laissés en place au retour à domicile.",
        },
        {
          title: "Suivi anticoagulant & INR",
          description:
            "Prélèvements sanguins pour contrôle de l'INR, injection des anticoagulants sous-cutanés et transmission des résultats au médecin pour ajustement.",
        },
        {
          title: "Surveillance des complications",
          description:
            "Surveillance des signes de complications postopératoires : déhiscence de plaie, infection, phlébite, embolie, décompensation cardio-respiratoire.",
        },
        {
          title: "Accompagnement de la réadaptation",
          description:
            "Coordination avec le kinésithérapeute, aide à la reprise de la mobilité, prévention des complications de décubitus pour les patients alités.",
        },
        {
          title: "Coordination médicale",
          description:
            "Communication directe avec le chirurgien, l'anesthésiste et le médecin traitant pour une prise en charge cohérente et réactive.",
        },
      ],
    },
    howItWorks: {
      title: "Comment se déroule la sortie d'hôpital ?",
      steps: [
        {
          title: "Préparation avant la sortie",
          description:
            "Idéalement, nous contactons l'équipe hospitalière avant votre sortie pour récupérer le compte rendu opératoire, les prescriptions et les consignes de soins.",
        },
        {
          title: "Première visite le jour du retour",
          description:
            "Un infirmier vous accueille à votre domicile le jour de votre sortie ou le lendemain pour une évaluation complète et l'installation du matériel nécessaire.",
        },
        {
          title: "Suivi intensif initial",
          description:
            "Les premiers jours sont souvent quotidiens, avec une fréquence qui diminue progressivement selon votre évolution. Chaque visite fait l'objet d'un rapport transmis à votre médecin.",
        },
      ],
    },
    faq: [
      {
        q: "Comment organiser ma prise en charge avant ma sortie d'hôpital ?",
        a: "Idéalement, contactez-nous quelques jours avant votre sortie prévue. Nous travaillons avec l'assistante sociale de l'hôpital si nécessaire pour organiser un retour sécurisé. En cas de sortie rapide, nous pouvons aussi intervenir dans les 24 heures.",
      },
      {
        q: "Quels types d'opérations prenez-vous en charge ?",
        a: "Toutes les chirurgies ambulatoires ou conventionnelles avec un suivi infirmier à domicile : chirurgie orthopédique (prothèse de hanche/genou), cardiaque, digestive, oncologique, urologique, gynécologique et bien d'autres.",
      },
      {
        q: "Pouvez-vous récupérer les résultats d'analyses directement ?",
        a: "Oui. Pour les prélèvements que nous réalisons (INR, bilan sanguin), les résultats sont transmis directement à votre médecin. Nous pouvons aussi vous les communiquer si vous le souhaitez.",
      },
      {
        q: "Que faire si je remarque un signe anormal entre deux visites ?",
        a: "Appelez-nous immédiatement. Nous évaluerons par téléphone si une intervention rapide est nécessaire. En cas de doute sur une urgence vitale, composez le 112.",
      },
      {
        q: "Combien de temps dure généralement le suivi post-hospitalisation ?",
        a: "Cela dépend entièrement de votre intervention et de votre évolution. Pour une chirurgie simple, quelques semaines suffisent. Pour des interventions complexes ou chez les patients âgés, le suivi peut s'étendre sur plusieurs mois.",
      },
    ],
    reimbursement:
      "Les soins post-hospitalisation sont remboursés par l'INAMI dans le cadre des soins infirmiers à domicile. Les actes réalisés (pansements, prélèvements, injections, surveillance) sont tous remboursables sur prescription médicale. Pour les patients sortant d'une hospitalisation longue, le forfait de soins dépendance peut s'appliquer si les critères Katz sont remplis. Les mutuelles proposent souvent des interventions complémentaires pour la convalescence à domicile. Nous nous chargeons de constituer tous les dossiers de remboursement.",
    relatedServices: [
      "soins-generaux",
      "interventions-rapides",
      "suivi-long-terme",
    ],
  },
};

export const ALL_SERVICES = Object.values(SERVICES_DATA);

export function getServiceData(slug: string): ServiceData | undefined {
  return SERVICES_DATA[slug];
}
