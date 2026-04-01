# Technical Details
Architecture and engineering details for the GKTK project.

---

## Technology stack

| Layer | Technology | Why chosen |
|-------|-----------|------------|
| Framework | Next.js 16.2.1 (App Router) | Server-side rendering, file-based routing, optimized font loading |
| UI Library | React 19 | Component model and server component support |
| Language | TypeScript 5 | Type safety across components and animation code |
| Animation | GSAP with ScrollTrigger | Production-grade scroll-linked animations, timeline orchestration |
| Smooth Scroll | Lenis | Buttery scroll with GSAP ticker integration, disabled on mobile |
| Styling | Hand-written CSS with custom properties | Full control over responsive breakpoints and design tokens |
| CSS Processing | PostCSS with @tailwindcss/postcss | Build pipeline (Tailwind configured but utilities not used in production) |
| Fonts | REM + Noto Sans JP via next/font | REM for headings, Noto Sans JP for body/labels, zero layout shift |
| Optimization | React Compiler (babel-plugin-react-compiler) | Automatic memoization |
| Linting | ESLint 9 with eslint-config-next | Code quality |

## Architecture

The project uses a single-page architecture with a clear separation between static markup (server-rendered) and client-side interaction (GSAP orchestrator).

```
gktk/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with REM + Noto Sans JP fonts
│   │   ├── page.tsx            # Full page: nav, hero, cards, footer, menu overlay
│   │   └── globals.css         # Design tokens, all component styles, 3 breakpoints
│   └── components/
│       ├── Orchestrator.tsx     # Client component: noise, Lenis, wipe transition, hero entrance,
│       │                        #   hamburger menu, image cycling, card scroll entrance, footer entrance,
│       │                        #   active menu link tracking
│       ├── Cards.tsx            # CardA (unused), CardB, CardC + CyclingLayers
│       └── QALoader.tsx        # Development QA utility
├── public/
│   └── logobase.svg            # Brand logo source (+ other static assets)
├── showcase/                   # Portfolio documentation (not part of app)
├── next.config.ts              # React Compiler enabled
├── tsconfig.json               # Path aliases (@/*)
└── package.json
```

### Key architectural decisions

- **Single client component for all interaction**: Orchestrator.tsx is the sole client component handling all runtime behavior — noise texture, Lenis smooth scroll, anchor wipe transition, hero entrance, hamburger menu, image layer cycling, card scroll-entrance fade-ups, footer entrance, and active menu link tracking. There is no dedicated gallery component.
- **Server-rendered markup, client-side motion**: page.tsx is a server component that renders all HTML including all 7 cards in their static layout. Orchestrator is the only client component, attaching animations after hydration.
- **Static card layout**: Cards are positioned by CSS in a standard vertical document flow. GSAP ScrollTrigger in Orchestrator.tsx adds fade-up entrance animations as each card scrolls into view — no scroll-driven positioning, no 3D transforms, no stacked deck.
- **CSS-only responsive layout**: No JavaScript-based responsive logic for layout. Media queries handle all breakpoint changes. Only Lenis initialization/destruction responds to breakpoint changes via `matchMedia`.
- **Strict color palette with aliases**: All colors consolidated into four categories (Brand, Interaction, Base, Neutral). Semantic aliases (`--bg`, `--fg`, `--accent`, etc.) point to palette tokens rather than hardcoded hex values, ensuring no off-palette colors exist in the stylesheet.
- **CSS organized by page sections**: Stylesheet structured into top-level sections (Navigation, Hero, Cards, Footer) matching the page structure, with card sub-layouts (product grid, data rows, risk items) nested under the Cards section.

## Codebase metrics

| Metric | Value |
|--------|-------|
| Source files in src/ | 6 |
| Runtime dependencies | 5 (next, react, react-dom, gsap, lenis) |
| Dev dependencies | 9 |

## Key technical challenges

### mix-blend-mode on fixed elements
The navigation originally used `mix-blend-mode: difference` for automatic contrast against any background. This is a known rendering failure on mobile Safari with `position: fixed`. Initially replaced with a dark gradient scrim, then further refined to a solid neutral-50 (#FFFFFF) background on mobile with a neutral-400 bottom border for a cleaner, more reliable presentation.

### Scroll coordination across Lenis and GSAP
Lenis owns the scroll on desktop and must pipe updates to ScrollTrigger. On mobile, Lenis is destroyed and ScrollTrigger uses native scroll. The wipe transition must coordinate instant scroll jumps (Lenis `immediate: true` or native `scrollIntoView`) with the animation timeline.

### Responsive type scale without fluid typography
Rather than `clamp()`, the project uses discrete font sizes per breakpoint following a 1.25 ratio major-third scale. CSS custom properties define sizes for each heading level (h1–h4) and body text at each of three iOS HIG-aligned breakpoints (mobile ≤744px, tablet 745–1024px, desktop ≥1025px). This gives precise control over text rendering at each device class.
