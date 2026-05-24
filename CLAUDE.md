@AGENTS.md

# Infirmier à domicile en Belgique

Site web professionnel pour un cabinet infirmier à domicile desservant Overijse, Hoeilaart et Tervuren (Belgique).

## Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16 |
| Langage | TypeScript strict | 5 |
| Styling | Tailwind CSS | 4 |
| Composants | shadcn/ui (new-york, slate) | latest |
| Animations | Framer Motion | latest |
| Forms | React Hook Form + Zod | latest |
| ORM | Drizzle ORM + PostgreSQL (Neon) | Phase 5 |
| Email | Resend | Phase 3+ |
| Fonts | Fraunces (serif) + Inter (sans) | Google Fonts |

## Conventions de code

- **TypeScript strict** — `strict: true`, pas de `any`, pas de `as` non justifié
- **Server Components par défaut** — `"use client"` uniquement pour interactivité, hooks, ou browser APIs
- **Imports absolus via `@/`** — pointe vers `src/`
- **Nommage** : PascalCase composants, camelCase utilitaires, kebab-case routes/fichiers
- **Pas de commentaires évidents** — uniquement si le "pourquoi" n'est pas clair
- **Composants atomiques** — `"use client"` le plus bas possible dans l'arbre

## Structure des dossiers

```
src/
├── app/                        # Routes Next.js (App Router)
│   ├── layout.tsx              # Root layout (fonts, metadata, Header, Footer)
│   ├── page.tsx                # Page d'accueil (/)
│   ├── globals.css             # Design system + variables CSS + Tailwind
│   └── (routes)/               # Pages spécifiques (Phase 2+)
│       ├── services/
│       ├── zones/
│       ├── a-propos/
│       └── contact/
├── components/
│   ├── ui/                     # Composants shadcn/ui (auto-générés via CLI)
│   ├── layout/                 # Header.tsx, Footer.tsx
│   ├── sections/               # HeroSection, ServicesSection, etc. (Phase 2+)
│   └── animations/             # FadeIn, StaggerContainer, Reveal
├── lib/
│   ├── utils.ts                # cn() — fusion classes Tailwind
│   ├── constants.ts            # ZONES, SERVICES, CONTACT_INFO, SITE_URL
│   └── seo.ts                  # createMetadata() helper
└── types/
    └── index.ts                # Types partagés (Zone, Service, ContactInfo)
```

## Charte graphique

### Couleurs

| Token Tailwind | Hex | HSL | Usage |
|---|---|---|---|
| `primary` | `#0A4D68` | `197 83% 22%` | CTA, liens actifs, titres |
| `secondary` | `#088395` | `188 90% 31%` | Éléments secondaires |
| `accent` | `#05BFDB` | `188 96% 44%` | Icônes, highlights, hover states |
| `background` | `#ffffff` | `0 0% 100%` | Fond général |
| `foreground` | `#0f172a` | `222 47% 11%` | Texte principal |
| `muted` | `#f8fafc` | `210 40% 96%` | Fonds de sections alternées |
| `muted-foreground` | `#64748b` | `215 16% 47%` | Texte secondaire |
| `border` | `#e2e8f0` | `214 32% 91%` | Bordures |

### Typographie

- **Titres** : `font-serif` → Fraunces (variable serif, premium, Google Fonts)
- **Corps** : `font-sans` → Inter (variable sans-serif, Google Fonts)
- Taille base : 16px, line-height : 1.6 pour le corps

### Composants clés

- **Header** : sticky, glassmorphism au scroll (`bg-white/80 backdrop-blur-md`), menu mobile animé
- **Bouton primaire** : `bg-primary text-white rounded-full px-5 py-2.5`
- **Cards** : `rounded-xl border border-border bg-card shadow-sm`

## Phases du projet

| Phase | Description | État |
|---|---|---|
| 1 | Fondations (layout, design system, animations) | ✅ |
| 2 | Pages : accueil, zones, services, à propos | ⏳ |
| 3 | Formulaire de contact + emails Resend | ⏳ |
| 4 | SEO avancé (sitemap.xml, schema.org JSON-LD) | ⏳ |
| 5 | Base de données Drizzle + Neon (leads, RDV) | ⏳ |
| 6 | Dashboard admin (gestion des demandes) | ⏳ |

## shadcn/ui

Configuré avec `components.json` (new-york, slate, CSS variables, src/).
Ajouter un composant : `npx shadcn@latest add <component>`
Les composants sont placés dans `src/components/ui/`.
