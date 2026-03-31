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

## Phase 2: Tilt Card Presentation System (March 30, 2026)

**What happened:** Built the full single-page presentation with hero, six tilt card sections (persona, product, IRR assumptions, IRR returns, risk factors x2, exit strategy), footer, and navigation. Implemented the 3D tilt interaction system for desktop (mouse-driven) and mobile (gyroscope, touch-drag, idle float). Added GSAP animations, ScrollTrigger entrances, Lenis smooth scroll, page transition wipe, and animated menu overlay.

**Key commits:**
- Add tilt-card presentation system with 3D interactions
- Save current work in progress

**Decisions made:**
- Single Orchestrator component for all animation and interaction logic.
- Three tilt card variants (A, B, C) for different content types.
- Lenis disabled on mobile for native scroll reliability.
- Gyroscope as primary mobile interaction with two fallback strategies.

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

**What happened:** Restructured hero section from two paragraphs into a heading/subheading/body hierarchy with a prominent h1 (REM Semibold). Added REM as a second typeface for all headings. Built a full typography token system with CSS custom properties per heading level (h1–h4) per breakpoint. Applied the system across all sections: tilt card titles, group labels, risk labels, product items, and body text. Fixed semantic heading hierarchy (h4→h3, h5→h4). Converted footer to body-only typography (no headings). Set left-aligned text as default. Aligned breakpoints to iOS HIG (744px mobile, 1024px tablet). Cleaned up dead code and stale references.

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

---

| Phase | Dates | Focus | Commits |
|-------|-------|-------|---------|
| 1. Project Setup | Mar 30 | Scaffolding and configuration | 1 |
| 2. Tilt Card System | Mar 30 | Full presentation build | 2 |
| 3. Responsive Polish | Mar 30–31 | Breakpoint tuning | 2 |
| 4. Cleanup | Mar 31 | Remove splash screen | 1 |
| 5. Mobile Nav Fix | Mar 31 | Safari compatibility, real logo | 1 |
| 6. Hero & Nav Redesign | Mar 31 | Mobile nav redesign, QA tool fix | 1 |
| 7. Typography System | Mar 31 | Full type system, hero redesign, iOS breakpoints | 2 |
| 8. Hamburger Menu | Mar 31 | BEM rename, responsive trigger, color consolidation | 1 |
