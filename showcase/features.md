# Features
Major features described for portfolio presentation.

---

## 3D Tilt Card System

Three card variants (Type A, B, C) rendered as full-viewport interactive elements. Each card responds to mouse movement on desktop with up to 10 degrees of subtle tilt and 1.02x scale on hover. Cards use `transformPerspective: 800` for depth. On mobile, a three-priority interaction system activates: gyroscope tilt via DeviceOrientation (with iOS permission request), touch-drag tilt as fallback, and ambient idle float animation when not touching.

## Mobile Gyroscope Interaction

On iOS, the system requests DeviceOrientation permission on first touch, then maps phone tilt to card rotation. On Android, it silently tests for gyroscope events. If neither is available, touch-drag provides equivalent tilt control. Each strategy seamlessly hands off to the next.

## Scroll-Triggered Card Entrances

Each tilt card section fades up from 60px below when scrolling into the 75% viewport threshold, using GSAP ScrollTrigger with `once: true` for a single cinematic reveal.

## Page Transition Wipe

Anchor navigation triggers a full-screen wipe animation — a dark overlay slides up to cover the viewport, the scroll position jumps to the target, then the overlay slides away to reveal the destination. Built as a GSAP timeline coordinating with Lenis scroll.

## Animated Navigation Menu

A full-screen overlay menu with backdrop blur. Menu items animate in with staggered slide-up reveals. Opening the menu stops Lenis scroll; closing restores it. The hamburger button toggles between a hamburger icon (closed) and an X icon (open) via CSS using the `aria-expanded` attribute, with both icons at 24x24 on mobile. The toggle drives a reversible GSAP timeline.

## Image Layer Cycling

Product and risk cards contain `[data-cycling]` image stacks that cycle through layers on hover (desktop) or touch (mobile). Layers toggle visibility with GSAP `autoAlpha` in a yoyo repeat pattern, creating a sprite-sheet-like animation.

## Smooth Scroll (Desktop Only)

Lenis smooth scroll is active on viewports above 744px, with `touchMultiplier: 0.2` for controlled momentum. On mobile, Lenis is destroyed and native scroll takes over. A media query listener handles transitions between breakpoints.

## Responsive Design

Three iOS HIG-aligned breakpoints — mobile (≤744px), tablet (745–1024px), and desktop (≥1025px) — with tuned typography, spacing, padding, and card layouts at each. The type scale uses a 1.25 ratio (major third) with CSS custom property tokens per heading level per breakpoint rather than fluid scaling. A four-level heading hierarchy (h1→h2→h3→h4) uses REM Semibold for headings and Noto Sans JP for body text.

## Runtime Noise Texture

A 300x300 canvas generates a grayscale noise pattern at load time, applied as a fixed overlay at 3.5% opacity with a stepped animation. No external image assets needed.

## GKTK Brand Logo

Custom SVG logo with amber-to-orange linear gradient (#FBB931 to #FF8660), referenced via an `<img>` element pointing to `/logobase.svg`. Used in the fixed navigation header and footer.

## QA Breakpoint Tool

Development-only utility for testing responsive layouts. Renders the site in an iframe at exact device pixel dimensions with `overflow: auto` for a scrollable viewport, providing true 1:1 pixel device representation without scaling. The iframe URL includes a cache-busting timestamp to ensure fresh content on each load.
