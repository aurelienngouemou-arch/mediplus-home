import { CONTACT_INFO } from "./constants";

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  age: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ZoneData {
  name: string;
  slug: "overijse" | "hoeilaart" | "tervuren";
  postalCode: string;
  population: string;
  distanceBrussels: string;
  interventionTime: string;
  coordinates: { lat: number; lng: number };
  region: string;
  neighborhoods: string[];
  specificity: string;
  heroAngle: "terroir" | "nature" | "international";
  heroSubtitle: string;
  introTitle: string;
  languages: string[];
  neighborZones: string[];
  shortDescription: string;
  introText: string[];
  testimonials: Testimonial[];
  faq: FaqItem[];
}

export const ZONES_DATA: Record<string, ZoneData> = {
  overijse: {
    name: "Overijse",
    slug: "overijse",
    postalCode: "3090",
    population: "~25 000",
    distanceBrussels: "20 km",
    interventionTime: "~25 min",
    coordinates: { lat: 50.7726, lng: 4.532 },
    region: "Brabant flamand",
    neighborhoods: ["Centre", "Jezus-Eik", "Maleizen", "Tombeek", "Eizer"],
    specificity:
      "Commune néerlandophone à facilités, forte communauté francophone, vignobles renommés.",
    heroAngle: "terroir",
    heroSubtitle:
      "Au cœur du terroir viticole du Brabant flamand, nous prenons soin de vous comme on prend soin de la vigne : avec patience, expertise et respect du rythme de chacun.",
    introTitle: "Une commune à part, des soins sur mesure",
    languages: ["FR", "NL"],
    neighborZones: ["Hoeilaart", "Tervuren", "Rixensart", "Oud-Heverlee"],
    shortDescription:
      "Commune néerlandophone à facilités, forte communauté francophone. Nos soignants bilingues couvrent le centre, Jezus-Eik, Maleizen, Tombeek et Eizer.",
    introText: [
      "Overijse n'est pas une commune comme les autres. Entre ses vignobles historiques, ses hameaux pittoresques de Jezus-Eik et Maleizen, et sa population à la fois néerlandophone et francophone, cette terre demande des soignants qui savent s'adapter.",
      "Notre équipe connaît chaque coin d'Overijse : les rues pavées du centre, les chemins de campagne vers Tombeek, les résidences d'Eizer. Nous parlons votre langue — Nederlands of Frans — et nous adaptons nos visites à votre rythme.",
      "Que vous habitiez près de l'IJse ou dans les hauteurs d'Overijse, notre équipe est là pour vous. Et toujours, c'est le même soignant qui revient.",
    ],
    testimonials: [
      {
        quote:
          "Het is een geruststelling om elke ochtend dezelfde verpleegster te zien. Ze kent mijn gewoonten, mijn medicatie, en ze praat met me. Dat is veel meer dan zorg.",
        name: "Greta V.",
        location: "Maleizen, Overijse",
        age: 82,
      },
      {
        quote:
          "Après mon opération du genou, j'avais besoin de pansements quotidiens. L'équipe a été impeccable, toujours à l'heure, toujours rassurante. Je recommande sans hésiter.",
        name: "François L.",
        location: "Jezus-Eik, Overijse",
        age: 67,
      },
    ],
    faq: [
      {
        question: "Intervenez-vous dans tous les hameaux d'Overijse ?",
        answer:
          "Oui, nous couvrons le centre, Jezus-Eik, Maleizen, Tombeek, Eizer et tous les quartiers résidentiels d'Overijse.",
      },
      {
        question: "Mes soins peuvent-ils se faire en néerlandais ?",
        answer:
          "Bien sûr. Notre équipe est entièrement bilingue FR/NL. Vous choisissez la langue qui vous met le plus à l'aise — c'est important pour le soin et pour la confiance.",
      },
      {
        question: "Travaillez-vous avec les médecins d'Overijse ?",
        answer:
          "Oui, nous collaborons régulièrement avec les cabinets médicaux d'Overijse et les pharmacies locales. Nous coordonnons les soins avec votre médecin traitant à chaque étape.",
      },
      {
        question: "Combien de visites par jour dans ma commune ?",
        answer:
          "Nous adaptons notre planning à vos besoins : une visite quotidienne, plusieurs par jour pour les soins lourds, ou un passage hebdomadaire pour un suivi. Tout est personnalisé.",
      },
      {
        question: "Êtes-vous disponibles le weekend à Overijse ?",
        answer:
          "Oui, 7 jours sur 7, samedi et dimanche inclus, de 8h à 18h. Pour les urgences nocturnes, un service de garde est disponible.",
      },
      {
        question: "Comment se passe la première rencontre ?",
        answer:
          "Nous nous déplaçons gratuitement chez vous pour évaluer vos besoins. Cette visite dure environ 30 minutes et nous permet d'établir un plan de soins personnalisé, sans engagement.",
      },
    ],
  },

  hoeilaart: {
    name: "Hoeilaart",
    slug: "hoeilaart",
    postalCode: "1560",
    population: "~11 000",
    distanceBrussels: "17 km",
    interventionTime: "~20 min",
    coordinates: { lat: 50.77, lng: 4.4736 },
    region: "Brabant flamand",
    neighborhoods: ["Centre", "Groenendaal", "Sloesveld"],
    specificity:
      "Commune au cœur de la forêt de Soignes, population résidentielle avec familles et seniors.",
    heroAngle: "nature",
    heroSubtitle:
      "Aux portes de la forêt de Soignes, dans cette commune où l'on prend le temps de respirer, nos infirmiers viennent chez vous sans précipitation — parce qu'un soin de qualité ne se mesure pas en minutes.",
    introTitle: "Soigner au rythme de Hoeilaart",
    languages: ["FR", "NL"],
    neighborZones: [
      "Overijse",
      "Tervuren",
      "Watermael-Boitsfort",
      "La Hulpe",
    ],
    shortDescription:
      "Au cœur de la forêt de Soignes, notre équipe intervient 7j/7 pour les familles et les seniors de Hoeilaart, Groenendaal et Sloesveld.",
    introText: [
      "Hoeilaart est une commune où l'on choisit de vivre pour la qualité de l'air, le calme et la nature. C'est aussi une commune avec une population âgée importante, qui a besoin d'un suivi médical de proximité, fiable, rassurant.",
      "Notre équipe intervient dans tout Hoeilaart : du centre historique aux quartiers résidentiels de Groenendaal, en passant par les chemins paisibles de Sloesveld. Nous connaissons les familles, les habitudes, les médecins du coin.",
      "Ce qui nous distingue ? Nous prenons le temps. Une visite chez vous n'est pas une formalité. C'est un moment d'écoute, d'attention, et bien sûr de soin médical rigoureux.",
    ],
    testimonials: [
      {
        quote:
          "Mijn man heeft Parkinson en wij hadden een betrouwbare verpleegster nodig. Sinds een jaar komt dezelfde dame elke dag. Ze is een deel van onze familie geworden.",
        name: "Marleen D.",
        location: "Groenendaal, Hoeilaart",
        age: 75,
      },
      {
        quote:
          "Quand mon mari est rentré de l'hôpital, on était perdus. L'équipe a tout organisé : les pansements, le suivi, la coordination avec le médecin. Un vrai soulagement.",
        name: "Anne-Marie B.",
        location: "Centre, Hoeilaart",
        age: 71,
      },
    ],
    faq: [
      {
        question: "Couvrez-vous toute la commune de Hoeilaart ?",
        answer:
          "Oui, du centre jusqu'à Groenendaal et Sloesveld, nous intervenons sur l'ensemble du territoire communal.",
      },
      {
        question: "Êtes-vous habitués aux soins pour personnes âgées ?",
        answer:
          "Absolument. Hoeilaart compte une population senior importante et c'est notre cœur de métier : soins gériatriques, prévention des chutes, suivi des maladies chroniques, accompagnement quotidien.",
      },
      {
        question:
          "Comment gérez-vous les chemins isolés près de la forêt ?",
        answer:
          "Notre équipe est habituée aux accès parfois compliqués des maisons en lisière de forêt. Nous venons en voiture équipée et nous trouvons toujours le chemin, même par temps difficile.",
      },
      {
        question: "Acceptez-vous les patients en soins palliatifs ?",
        answer:
          "Oui, l'accompagnement de fin de vie à domicile est l'une de nos missions essentielles. Nous travaillons en lien avec les équipes mobiles de soins palliatifs et le médecin de famille.",
      },
      {
        question: "Faut-il une ordonnance pour vous appeler ?",
        answer:
          "Pour les soins remboursés par la mutuelle, une prescription médicale est nécessaire. Pour un premier contact ou une évaluation, vous pouvez nous appeler directement, sans ordonnance.",
      },
      {
        question: "Travaillez-vous le dimanche à Hoeilaart ?",
        answer:
          "Oui, dimanches et jours fériés inclus. Les soins infirmiers ne connaissent pas de jours de repos, et nous non plus.",
      },
    ],
  },

  tervuren: {
    name: "Tervuren",
    slug: "tervuren",
    postalCode: "3080",
    population: "~22 000",
    distanceBrussels: "14 km",
    interventionTime: "~18 min",
    coordinates: { lat: 50.824, lng: 4.5125 },
    region: "Brabant flamand",
    neighborhoods: [
      "Centre",
      "Vossem",
      "Duisburg",
      "Moorsel",
      "Sint-Joris-Weert",
    ],
    specificity:
      "Commune internationale, proximité écoles européennes, population multiculturelle FR/NL/EN.",
    heroAngle: "international",
    heroSubtitle:
      "Familles belges, expatriés européens, diplomates : à Tervuren, nos infirmiers parlent votre langue. Soins professionnels en français, néerlandais ou anglais, partout dans la commune.",
    introTitle: "Tervuren : la diversité au cœur des soins",
    languages: ["FR", "NL", "EN"],
    neighborZones: [
      "Overijse",
      "Hoeilaart",
      "Wezembeek-Oppem",
      "Bertem",
    ],
    shortDescription:
      "Commune internationale aux portes de Bruxelles. Notre équipe trilingue FR/NL/EN accompagne familles belges et expatriés dans tous les quartiers de Tervuren.",
    introText: [
      "Tervuren ne ressemble à aucune autre commune du Brabant flamand. Avec ses écoles européennes, sa proximité immédiate de Bruxelles et son AfricaMuseum emblématique, c'est une terre de rencontres entre familles belges installées depuis des générations et nouveaux arrivants du monde entier.",
      "Cette diversité, nous l'avons faite nôtre. Notre équipe trilingue FR/NL/EN comprend les besoins spécifiques de chacun : les habitudes culturelles différentes, les exigences des assurances internationales, les attentes en matière de communication médicale claire et précise.",
      "De Vossem à Duisburg, en passant par Moorsel et Sint-Joris-Weert, nous couvrons l'ensemble du territoire de Tervuren.",
    ],
    testimonials: [
      {
        quote:
          "As an expat family, finding reliable healthcare in our own language was a real worry. This nursing team has been outstanding — professional, kind, and they speak perfect English with my elderly father.",
        name: "Karen H.",
        location: "European School area, Tervuren",
        age: 42,
      },
      {
        quote:
          "Je vis à Vossem depuis 50 ans. Quand j'ai eu besoin de soins quotidiens, je voulais quelqu'un qui comprenne la région. C'est exactement ce que j'ai trouvé ici.",
        name: "Jean-Claude D.",
        location: "Vossem, Tervuren",
        age: 78,
      },
    ],
    faq: [
      {
        question: "Do you provide home care in English in Tervuren?",
        answer:
          "Yes, our nursing team is fluent in English. We regularly care for international families, EU officials and expatriates living in Tervuren. Full medical communication in your preferred language.",
      },
      {
        question: "Acceptez-vous les assurances santé internationales ?",
        answer:
          "Oui, nous travaillons avec les assurances belges (toutes mutuelles) mais aussi avec les assurances santé internationales courantes chez les expatriés. N'hésitez pas à nous contacter pour vérifier votre couverture.",
      },
      {
        question: "Quels quartiers de Tervuren desservez-vous ?",
        answer:
          "L'ensemble du territoire communal : centre de Tervuren, Vossem, Duisburg, Moorsel et Sint-Joris-Weert.",
      },
      {
        question: "Pouvez-vous coordonner avec un médecin étranger ?",
        answer:
          "Oui, nous avons l'habitude de coordonner les soins avec des médecins traitants situés à l'étranger ou des spécialistes consultés en dehors de la Belgique. Les rapports peuvent être rédigés en anglais sur demande.",
      },
      {
        question: "Êtes-vous joignables en soirée à Tervuren ?",
        answer:
          "Oui, notre équipe est disponible jusqu'à 20h en semaine et 18h le weekend. Pour les besoins urgents en dehors de ces heures, un service de garde téléphonique est accessible.",
      },
      {
        question: "Faites-vous des soins post-natals à Tervuren ?",
        answer:
          "Oui, nous proposons un suivi à domicile pour les jeunes mamans et leurs bébés : surveillance, conseils, soins infirmiers spécialisés. Très demandé par les familles internationales de Tervuren.",
      },
    ],
  },
};

export function getZoneData(slug: string): ZoneData | undefined {
  return ZONES_DATA[slug];
}

export const ALL_ZONES = Object.values(ZONES_DATA);
