# Process Timeline
Development timeline reconstructed from git history.

---

Reconstructed from git history (11 commits, March 30–31, 2026).

## Phase 1: Project Setup (March 30, 2026)

**What happened:** Scaffolded the project using create-next-app with TypeScript, Tailwind CSS, ESLint, and the App Router with src directory structure.

**Key commits:**
- Initial commit from Create Next App

**Decisions made:**
- Next.js App Router over Pages Router for React Server Components.
- React Compiler enabled for automatic optimization.
- src/ directory to separate app code from config.

## Phase 2: Card Presentation System (March 30, 2026)

**What happened:** Built the full single-page presentation with hero, seven cards across six content sections (persona, product, IRR assumptions, IRR returns, risk factors split into two cards, exit strategy), footer, and navigation. Added GSAP animations, ScrollTrigger scroll-entrance fade-ups, Lenis smooth scroll, page transition wipe, and animated menu overlay. Cards rendered in a static vertical layout.

**Key commits:**
- Add card presentation system with interactions
- Save current work in progress

**Decisions made:**
- Single Orchestrator component for all animation and interaction logic.
- Three card variants (A, B, C) for different content types; CardB and CardC used in production.
- Static card layout — no scroll-driven gallery component.
- Lenis disabled on mobile for native scroll reliability.

## Phase 3: Responsive Polish (March 30–31, 2026)

**What happened:** Tuned layout, typography, and spacing across mobile, tablet, and desktop breakpoints. Established consistent rem-based type scale using major-third ratio. Fixed layout inconsistencies on smaller viewports.

**Key commits:**
- Consistent layout structure across mobile, tablet, and desktop
- Consistent layout and rem-based type scale across all breakpoints

## Phase 4: Cleanup (March 31, 2026)

**What happened:** Removed the preloader/splash screen for a cleaner load experience.

**Key commits:**
- Remove preloader/splash screen

## Phase 5: Mobile Navigation Fix (March 31, 2026)

**What happened:** Fixed invisible navigation on mobile Safari caused by `mix-blend-mode: difference` on a `position: fixed` element. Replaced with gradient scrim approach. Removed GSAP entrance animation that could leave nav off-screen. Added real GKTK logo with gradient fills.

**Key commits:**
- Fix mobile navigation visibility and add real logo

## Phase 6: Hero & Navigation Redesign (March 31, 2026)

**What happened:** Redesigned the mobile navigation bar with a solid white background (neutral-50 #FFFFFF), neutral-400 (#8E95A2) bottom border, and neutral-800 (#40444C) icon colors. Changed the logo from an inline SVG to an `<img>` element referencing `/logobase.svg`. Updated the hamburger menu button to toggle between hamburger and X icons via CSS using the `aria-expanded` attribute (both 24x24 on mobile). Fixed the QA breakpoint tool: changed viewport area from `overflow: hidden` to `overflow: auto` with a scrollable viewport for true 1:1 pixel device representation without scaling, and added cache-busting timestamps to the iframe URL.

**Key commits:**
- Redesign mobile navigation and fix QA breakpoint tool

**Decisions made:**
- Solid white nav background on mobile for cleaner, more reliable appearance than gradient scrim.
- CSS-driven icon toggle using `aria-expanded` instead of JavaScript DOM manipulation.
- Scrollable QA viewport for accurate device-size testing.

## Phase 7: Typography System & Hero Redesign (March 31, 2026)

**What happened:** Restructured hero section from two paragraphs into a heading/subheading/body hierarchy with a prominent h1 (REM Semibold). Added REM as a second typeface for all headings. Built a full typography token system with CSS custom properties per heading level (h1–h4) per breakpoint. Applied the system across all sections: card titles, group labels, risk labels, product items, and body text. Fixed semantic heading hierarchy (h4→h3, h5→h4). Converted footer to body-only typography (no headings). Set left-aligned text as default. Aligned breakpoints to iOS HIG (744px mobile, 1024px tablet). Cleaned up dead code and stale references.

**Key commits:**
- Restructure hero into heading, subheading, and body
- Apply typography system across entire page

**Decisions made:**
- REM Semibold for headings, Noto Sans JP for body — clear typographic contrast.
- iOS HIG breakpoints (744px, 1024px) for consistent Apple device targeting.
- Mobile-base token naming (hero-heading-mobile/tablet/desktop) for clarity.
- Four-level heading hierarchy: only the hero uses h1, sections use h2, components h3, sub-components h4.
- Footer body-only — no heading semantics for non-content areas.

## Phase 8: Hamburger Menu & Color Consolidation (March 31, 2026)

**What happened:** Renamed the menu overlay to hamburger-menu with BEM naming throughout (`.hamburger-menu`, `.hamburger-menu__menu-link`, `.navigation__icon-hamburger`, `.navigation__icon-close`, `.navigation__menu-label`). Made the menu button responsive: mobile shows SVG hamburger/close icons, tablet+ shows "Menu"/"Close" text label in REM Semibold. Menu links styled with REM Regular neutral-700 (unselected) and REM Semibold neutral-900 (active on click via JS), with underline on hover. Link font sizes use `--component-heading` design tokens; spacing scales with `--nav-height` custom properties. Menu items numbered 01-05, "Concept" removed. Consolidated the color system into a strict palette (Brand, Interaction, Base, Neutral) with all aliases pointing to palette tokens — removed off-palette hardcoded values for `--bg-dark`, `--image-bg-dark`, and `--accent-hover`.

**Key commits:**
- Rename menu-overlay to hamburger-menu, add responsive menu button, consolidate color palette

**Decisions made:**
- Responsive menu trigger: SVG icons on mobile for compact touch target, text label on tablet+ for clarity.
- Active menu link state via JS click handler rather than scroll-based detection, for explicit user intent.
- Strict color palette enforcement: every color in the stylesheet traces to a named palette token via aliases.
- Numbered menu items (01-05) without "Concept" for a cleaner, more focused navigation.

## Phase 9: Layout Audit & Cleanup (March 31, 2026)

**What happened:** Comprehensive layout audit across all breakpoints. Made all spacing, sizing, and typography values scale distinctly per breakpoint (no more identical mobile/tablet values). Nav height set to 48px on mobile. Hero gap and max-width now scale. Cards section background changed to base background color. All card variants unified to white fill (neutral-50) with neutral-200 border — collapsed duplicate dark/light selectors. Card container max-width and border-radius scale per breakpoint. Typography tokens updated: section body desktop bumped to 1.563rem, component body and footer body tablet bumped to 1.25rem, sub-component h4 tablet bumped to 1.25rem. Highlight box radius/padding, split layout gaps, product grid gaps, and footer padding all scale. Risk item borders changed to neutral-200. Hamburger menu links given 1px neutral-200 divider lines. Removed dead code: split layout CSS, content-grid CSS, image-placeholder, text-mask, unused tokens (--image-bg, --image-bg-dark). CSS restructured into 4 top-level sections matching page structure.

**Key commits:**
- Layout: responsive scaling, dead code cleanup, CSS audit

**Decisions made:**
- All cards white with neutral-200 stroke — eliminates dark/light variant complexity.
- CSS organized by page sections (Navigation, Hero, Cards, Footer) rather than by component type.
- Every adjacent breakpoint pair must have distinct values — no same-value mobile/tablet or tablet/desktop pairs in typography tokens.
- Dead CSS removed rather than kept for potential future use.

## Phase 10: Cards Redesign (March 31, 2026)

**What happened:** Renamed tilt components to cards, unified card sizing, and updated card content across the presentation.

**Key commits:**
- Cards redesign: rename tilt to cards, unify sizing, update content

## Phase 11: Sticky Card Stack (April 1, 2026)

**What happened:** Replaced the static vertical card layout with a scroll-driven sticky card stack. Created StickyCardStack.tsx from a generic template, adapted to the project's design tokens. On desktop/tablet (>744px), each card pins to the viewport via `position: sticky` and exits with a scale-down (1→0.96), opacity dim (1→0.4), and border-radius reveal (0→16px) driven by GSAP ScrollTrigger with scrub 0.3. On mobile (≤744px), cards use simple fade-up reveals. Reduced motion users get a plain vertical stack. Card content remains identical — the StickyCardStack only wraps existing CardB/CardC components. The Orchestrator's original card entrance animation becomes inert (targets `.cards-section__card` which no longer exists).

**Key commits:**
- Sticky card stack: scroll-driven card animation

**Decisions made:**
- Separate client component (StickyCardStack.tsx) for card scroll animation rather than adding to Orchestrator.
- Native scroll + `position: sticky` works correctly with Lenis (no wrapper/content override).
- Three rendering modes: desktop sticky stack, mobile fade-up, reduced motion static.
- Last card in the stack has no sticky behavior (just a normal block).

---

| Phase | Dates | Focus | Commits |
|-------|-------|-------|---------|
| 1. Project Setup | Mar 30 | Scaffolding and configuration | 1 |
| 2. Card System | Mar 30 | Full presentation build | 2 |
| 3. Responsive Polish | Mar 30–31 | Breakpoint tuning | 2 |
| 4. Cleanup | Mar 31 | Remove splash screen | 1 |
| 5. Mobile Nav Fix | Mar 31 | Safari compatibility, real logo | 1 |
| 6. Hero & Nav Redesign | Mar 31 | Mobile nav redesign, QA tool fix | 1 |
| 7. Typography System | Mar 31 | Full type system, hero redesign, iOS breakpoints | 2 |
| 8. Hamburger Menu | Mar 31 | BEM rename, responsive trigger, color consolidation | 1 |
| 9. Layout Audit | Mar 31 | Responsive scaling, dead code cleanup, CSS restructure | 1 |
| 10. Cards Redesign | Mar 31 | Rename tilt to cards, unify sizing, update content | 1 |
| 11. Sticky Card Stack | Apr 1 | Scroll-driven sticky card animation | 1 |
