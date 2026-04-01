# Features
Major features described for portfolio presentation.

---

## Card System

Three card variants (Type A, B, C) defined in Cards.tsx. CardB and CardC are used in the live layout; CardA is defined but currently unused. All cards use white (neutral-50) backgrounds with neutral-200 borders. Fixed heights of 420px (mobile), 480px (tablet), and 540px (desktop) with inner padding scaling from 24px to 32px across breakpoints. Content flows from the top; overflow is scrollable within the card with a hidden scrollbar.

Seven cards in total: Persona, Product, IRR (assumptions), IRR (returns and waterfall), Risk factors 1–3, Risk factors 4–6, and Exit strategy.

## Sticky Card Stack

On desktop and tablet (>744px), the cards section uses a scroll-driven sticky card stack. Each card pins to the viewport via `position: sticky`. As the user scrolls, the current card scales down (1 → 0.96), dims (opacity 1 → 0.4), and gains border-radius (0 → 16px), while the next card slides up naturally from below. GSAP ScrollTrigger with `scrub: 0.3` drives the exit animation. Each card slot has `min-height: 150vh` for scroll room; the last card has no sticky behavior. The StickyCardStack component (`StickyCardStack.tsx`) handles all scroll animation independently from the Orchestrator.

On mobile (≤744px), cards stack vertically with scroll-triggered fade-up reveals (`opacity: 0, y: 40` → `opacity: 1, y: 0`) at 85% viewport entry, duration 0.6s, `power3.out` ease, triggering once.

With reduced motion preferences, cards render in a simple vertical stack with no animation and no sticky positioning.

Navigation anchor IDs (persona, product, irr, risk, exit) are placed on the `.sticky-card-slot` wrapper divs, so menu links and direct URLs jump to the correct card.

## Page Transition Wipe

Anchor navigation triggers a full-screen wipe animation — a dark overlay slides up to cover the viewport, the scroll position jumps to the target, then the overlay slides away to reveal the destination. Built as a GSAP timeline coordinating with Lenis scroll.

## Hamburger Menu

A full-screen overlay menu (`.hamburger-menu`) with backdrop blur. Five numbered menu links (01 Persona through 05 Exit strategy) animate in with staggered slide-up reveals. Opening the menu stops Lenis scroll; closing restores it.

The menu button is responsive: on mobile, it shows SVG hamburger/close icons (24x24) toggled via CSS and `aria-expanded`; on tablet and above, the icons are hidden and a text label (`navigation__menu-label`) displays "Menu" or "Close", toggled via JS in Orchestrator.tsx. The label uses REM Semibold at 1.25rem and turns amber on hover.

Menu links use BEM class `hamburger-menu__menu-link` and are styled in REM Regular (weight 400) neutral-700 by default. Each link has a 1px neutral-200 divider line below it. Clicking a link sets an `.active` class via JS, which applies REM Semibold (weight 600) neutral-900. Hovering underlines the link text. Font size scales using `--component-heading` design tokens across breakpoints. Spacing (padding-top, gap) scales with `--nav-height` CSS custom properties per breakpoint.

## Card Scroll Entrance

On desktop/tablet, the sticky card stack handles card transitions (scale-down, dim, border-radius reveal). On mobile, each card fades up into view as it enters the viewport, driven by StickyCardStack.tsx. The Orchestrator's original `.cards-section__card` entrance animation is now inert (those elements no longer exist) — StickyCardStack handles its own scroll animations.

## Image Layer Cycling

Product and risk cards contain `[data-cycling]` image stacks that cycle through layers on hover (desktop) or touch (mobile). Layers toggle visibility with GSAP `autoAlpha` in a yoyo repeat pattern, creating a sprite-sheet-like animation.

## Smooth Scroll (Desktop Only)

Lenis smooth scroll is active on viewports above 744px, with `touchMultiplier: 0.2` for controlled momentum. On mobile, Lenis is destroyed and native scroll takes over. A media query listener handles transitions between breakpoints.

## Responsive Design

Three iOS HIG-aligned breakpoints — mobile (≤744px), tablet (745–1024px), and desktop (≥1025px) — with tuned typography, spacing, padding, and card layouts at each. All values scale per breakpoint: hero gap and max-width, card container max-width and border-radius, section gaps (32/36/42px), highlight box radius, split layout gaps, and footer height (48/56/64px). The type scale uses a 1.25 ratio (major third) with CSS custom property tokens per heading level per breakpoint rather than fluid scaling, with all adjacent breakpoints having distinct values. A four-level heading hierarchy (h1→h2→h3→h4) uses REM Semibold for headings and Noto Sans JP for body text.

## Runtime Noise Texture

A 300x300 canvas generates a grayscale noise pattern at load time, applied as a fixed overlay at 3.5% opacity with a stepped animation. No external image assets needed.

## GKTK Brand Logo

Custom SVG logo with amber-to-orange linear gradient (#FBB931 to #FF8660), referenced via an `<img>` element pointing to `/logobase.svg`. Used in the fixed navigation header.

## QA Breakpoint Tool

Development-only utility for testing responsive layouts. Renders the site in an iframe at exact device pixel dimensions with `overflow: auto` for a scrollable viewport, providing true 1:1 pixel device representation without scaling. The iframe URL includes a cache-busting timestamp to ensure fresh content on each load.
