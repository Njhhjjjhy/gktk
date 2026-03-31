# Technical Details
Architecture and engineering details for the GKTK project.

---

## Technology stack

| Layer | Technology | Why chosen |
|-------|-----------|------------|
| Framework | Next.js 16.2.1 (App Router) | Server-side rendering, file-based routing, optimized font loading |
| UI Library | React 19 | Component model and server component support |
| Language | TypeScript 5 | Type safety across components and animation code |
| Animation | GSAP with ScrollTrigger | Production-grade 3D transforms, scroll-linked animations, timeline orchestration |
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
│   │   ├── page.tsx            # Full page: nav, hero, 7 tilt cards, footer, menu overlay
│   │   └── globals.css         # Design tokens, all component styles, 3 breakpoints
│   └── components/
│       ├── Orchestrator.tsx     # Client component: all GSAP animations, scroll, tilt, menu
│       ├── TiltCards.tsx        # TiltCardA, TiltCardB, TiltCardC + CyclingLayers
│       └── QALoader.tsx        # Development QA utility
├── public/
│   └── logobase.svg            # Brand logo source (+ other static assets)
├── showcase/                   # Portfolio documentation (not part of app)
├── next.config.ts              # React Compiler enabled
├── tsconfig.json               # Path aliases (@/*)
└── package.json
```

### Key architectural decisions

- **Single Orchestrator pattern**: All GSAP timelines, event listeners, scroll triggers, and mobile interaction strategies live in one `useEffect` in Orchestrator.tsx. This keeps animation interdependencies explicit and cleanup reliable.
- **Server-rendered markup, client-side motion**: page.tsx is a server component that renders all HTML. Orchestrator is the only client component, attaching animations after hydration.
- **CSS-only responsive layout**: No JavaScript-based responsive logic for layout. Media queries handle all breakpoint changes. Only Lenis initialization/destruction responds to breakpoint changes via `matchMedia`.
- **Strict color palette with aliases**: All colors consolidated into four categories (Brand, Interaction, Base, Neutral). Semantic aliases (`--bg`, `--fg`, `--accent`, etc.) point to palette tokens rather than hardcoded hex values, ensuring no off-palette colors exist in the stylesheet.
- **CSS organized by page sections**: Stylesheet structured into four top-level sections (Navigation, Hero, Tilt Cards, Footer) matching the page structure, with tilt card sub-layouts (product grid, data rows, risk items) nested under the Tilt Cards section.
- **Three-strategy mobile tilt**: Gyroscope, touch-drag, and idle float in priority order with graceful fallback, handling iOS permission requirements and Android auto-detection.

## Codebase metrics

| Metric | Value |
|--------|-------|
| Lines of TypeScript/TSX | 1,294 |
| Lines of CSS | ~570 |
| Total lines (all source) | ~1,864 |
| Source files in src/ | 7 |
| Total project files | 32 |
| Runtime dependencies | 5 (next, react, react-dom, gsap, lenis) |
| Dev dependencies | 9 |
| Git commits | 11 |
| Merged PRs | 5 |

## Key technical challenges

### 3D tilt with gyroscope fallback chain
Mobile interaction required handling iOS 13+ permission requests for DeviceOrientation, auto-detecting gyroscope support on Android via a timed test event, falling back to touch-drag tilt mapping, and providing ambient idle float. Each strategy hands off cleanly without duplication.

### mix-blend-mode on fixed elements
The navigation originally used `mix-blend-mode: difference` for automatic contrast against any background. This is a known rendering failure on mobile Safari with `position: fixed`. Initially replaced with a dark gradient scrim, then further refined to a solid neutral-50 (#FFFFFF) background on mobile with a neutral-400 bottom border for a cleaner, more reliable presentation.

### Scroll coordination across Lenis and GSAP
Lenis owns the scroll on desktop and must pipe updates to ScrollTrigger. On mobile, Lenis is destroyed and ScrollTrigger uses native scroll. The wipe transition must coordinate instant scroll jumps (Lenis `immediate: true` or native `scrollIntoView`) with the animation timeline.

### Responsive type scale without fluid typography
Rather than `clamp()`, the project uses discrete font sizes per breakpoint following a 1.25 ratio major-third scale. CSS custom properties define sizes for each heading level (h1–h4) and body text at each of three iOS HIG-aligned breakpoints (mobile ≤744px, tablet 745–1024px, desktop ≥1025px). This gives precise control over text rendering at each device class.
