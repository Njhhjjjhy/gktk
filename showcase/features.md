# Features
Major features described for portfolio presentation.

---

## Card System

Three card variants (Type A, B, C) defined in Cards.tsx. CardB and CardC are used in the live layout; CardA is defined but currently unused. All cards use white (neutral-50) backgrounds with neutral-200 borders. Card height is controlled by a CSS custom property `--card-height` with a default of 540px (`height: var(--card-height, 540px)`), replacing the previous fixed breakpoint-based height overrides. Inner padding scales from 24px to 32px across breakpoints. Content flows from the top; overflow is scrollable within the card with a hidden scrollbar.

Seven cards in total: Persona, Product, IRR (assumptions), IRR (returns and waterfall), Risk factors 1–3, Risk factors 4–6, and Exit strategy.

## Sticky Card Stack

On desktop and tablet, the cards section uses a full-viewport stacked card animation. All cards are layered in a single grid cell and pinned to the viewport via GSAP ScrollTrigger. The wrapper height is set to `cards.length * 100vh` to provide scroll room, and the `slides-layout` grid is pinned while a scrubbed GSAP timeline drives the transition animation. ScrollTrigger with `scrub: 1` drives the animation.

Five animation proposal variants are available, switchable via a dev-only floating switcher (visible only in `NODE_ENV === "development"`):

1. **Peel Away** — Top card peels off to the left with rotation, revealing the next card underneath.
2. **Zoom Through** — Current card zooms in and fades out while the next card scales up from behind.
3. **Horizontal Slide** — Cards slide left like a horizontal carousel.
4. **Flip** — Cards flip on the Y-axis with a 3D rotation (1200px perspective) to reveal the next.
5. **Stack & Shrink** — Current card shrinks and drops down while the next card rises into place.

The floating switcher is a fixed-position dark panel at the bottom center of the viewport with numbered buttons (1-5). The active proposal is highlighted in amber (#FBB931). Switching proposals kills all ScrollTriggers, bumps a mount key to force a clean DOM remount, and scrolls back to the cards section start.

An amber (#FBB931) background color transition activates when the scroll trigger enters the cards section (`onEnter`), and reverts to the page background (#F9F9F9) when leaving (`onLeaveBack`, `onLeave`). The transition applies to both the wrapper div and its parent section element.

With reduced motion preferences, cards render in a simple vertical stack with no animation and no pinning.

Navigation anchor IDs (persona, product, irr, risk, exit) are placed on the `.stacked-slide` wrapper divs, so menu links and direct URLs jump to the correct card.

## Page Transition Wipe

Anchor navigation triggers a full-screen wipe animation — a dark overlay slides up to cover the viewport, the scroll position jumps to the target, then the overlay slides away to reveal the destination. Built as a GSAP timeline coordinating with Lenis scroll.

## Hamburger Menu

A full-screen overlay menu (`.hamburger-menu`) with backdrop blur. Five numbered menu links (01 Persona through 05 Exit strategy) animate in with staggered slide-up reveals. Opening the menu stops Lenis scroll; closing restores it.

The menu button is responsive: on mobile, it shows SVG hamburger/close icons (24x24) toggled via CSS and `aria-expanded`; on tablet and above, the icons are hidden and a text label (`navigation__menu-label`) displays "Menu" or "Close", toggled via JS in Orchestrator.tsx. The label uses REM Semibold at 1.25rem and turns amber on hover.

Menu links use BEM class `hamburger-menu__menu-link` and are styled in REM Regular (weight 400) neutral-700 by default. Each link has a 1px neutral-200 divider line below it. Clicking a link sets an `.active` class via JS, which applies REM Semibold (weight 600) neutral-900. Hovering underlines the link text. Font size scales using `--component-heading` design tokens across breakpoints. Spacing (padding-top, gap) scales with `--nav-height` CSS custom properties per breakpoint.

## Card Scroll Entrance

All card scroll animation is handled by StickyCardStack.tsx. On desktop/tablet, cards are stacked in a pinned grid with one of five selectable animation proposals driving the transition between cards. The Orchestrator's original `.cards-section__card` entrance animation is now inert (those elements no longer exist) — StickyCardStack handles its own scroll animations.

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
