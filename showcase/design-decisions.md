# Design Decisions
Visual and interaction design philosophy.

---

## Typography

Two typefaces loaded via `next/font`: REM (Regular 400 and Semibold 600) for headings and navigation, and Noto Sans JP for subheadings, body text, and labels — critical for Japanese-character support in an investor presentation targeting the Japan semiconductor market. The type scale follows a 1.25 (major third) ratio:

- Base: 1rem (16px)
- Scale: 0.8 · 1 · 1.25 · 1.563 · 1.953 · 2.441 · 3.052 · 3.815 · 4.768 · 5.96rem
- Heading font: REM Semibold (600) — neutral-950
- Body font: Noto Sans JP — neutral-600/800
- Letter-spacing: -0.025em globally for a tighter, more refined feel

A four-level heading hierarchy (h1→h2→h3→h4) scales down one major-third step per level. Only the hero section uses h1. All text is left-aligned by default. The footer uses body text only — no headings. CSS custom properties (tokens) define sizes per heading level per breakpoint, with iOS HIG-aligned breakpoints at 744px (mobile) and 1024px (tablet).

Each breakpoint uses specific sizes from the scale rather than fluid values, ensuring predictable rendering at every device class.

## Color

A restrained, professional palette consolidated into a strict system with four categories. All colors in the stylesheet trace back to this palette — no off-palette hardcoded values.

**Brand**
| Token | Value | Usage |
|-------|-------|-------|
| --amber | #FBB931 | Section labels, highlights, logo gradient start, hover accent |
| --orange | #FF9424 | Logo gradient end |

**Interaction**
| Token | Value | Usage |
|-------|-------|-------|
| --error | #D03131 | Error states |
| --success | #19B64E | Success states |
| --disabled | #8E8F8F | Disabled elements |
| --hyperlink | #1282C0 | Link color |

**Base**
| Token | Value | Usage |
|-------|-------|-------|
| --black | #1E1F20 | Primary text, dark backgrounds |
| --white | #FEFEFE | Text on dark backgrounds |
| --background | #F9F9F9 | Hero and light sections |

**Neutral (50-950)**
Full neutral scale from #FFFFFF to #25272C for secondary text, borders, navigation chrome, and subtle UI elements.

**Aliases** map semantic names to palette tokens: `--bg`, `--fg`, `--bg-dark`, `--fg-invert`, `--accent`, and `--accent-hover` all resolve to palette values rather than containing hardcoded hex. On mobile, the navigation bar uses neutral-50 for its background, neutral-400 for the bottom border, and neutral-800 for icon and label colors.

## Interaction philosophy

The presentation is designed to reward exploration without requiring it. Every section is fully readable without interaction — card entrance animations and layer cycling add delight on top of functional content.

- **Desktop/Tablet**: Smooth scroll via Lenis. Cards fade up on scroll entrance via GSAP ScrollTrigger. Hover triggers image layer cycling.
- **Mobile**: Native scroll for reliability. Cards fade up on scroll entrance. Touch triggers image cycling.
- **Transitions**: Full-screen wipe for anchor navigation creates a cinematic section-to-section flow.

## Card system

Three card variants serve different content types, all using a white (neutral-50) background with a neutral-200 border:

- **Type A** (CardA): Data-heavy layouts with labeled rows, dot leaders, and value columns. Defined but currently unused in the live layout.
- **Type B** (CardB): Text-only narrative blocks. Used for Persona, IRR (assumptions), IRR (returns/waterfall), and Exit strategy.
- **Type C** (CardC): Content card with individual image slots inside grid items. Used for Product and the two Risk factor cards.

Cards are positioned in a static vertical layout. All card positioning and entrance animation is handled by Orchestrator.tsx via GSAP ScrollTrigger fade-up triggers — no dedicated gallery component, no 3D transforms, no stacked deck. Fixed heights (420/480/540px) with overflow-y: auto and hidden scrollbar keep the card frame consistent while allowing content to scroll internally.

## Spacing

Consistent padding system across breakpoints:
- Desktop: 1.5rem page padding, 3.5rem card padding, 42px section gaps
- Tablet: 1.25rem page padding, 2.5rem card padding, 36px section gaps
- Mobile: 0.75rem page padding, 1.5rem card padding, 32px section gaps

Section gaps are uniform between all major sections (hero→cards, cards→footer) and between the nav and hero content. First and last cards have zero edge padding to ensure the margin-based gaps are visually accurate.

The hero section sizes to its content (no min-height) with top padding equal to nav height plus gap (64px desktop / 56px tablet / 48px mobile). Content is centered via `margin: 0 auto` on `.hero__content`. Cards use fixed heights (420px mobile / 480px tablet / 540px desktop). Card inner padding scales from 24px to 32px across breakpoints; outer section padding scales from 48px 24px (mobile) to 64px 40px (desktop). Card container scales from 85% width (max 56rem) on desktop to 85% (max 48rem) on tablet to 100% on mobile. Border-radius scales from radius-xl (1.5rem) to radius-l (1rem) to radius-m (0.75rem).

The footer is a compact bar (48/56/64px min-height across breakpoints) with the light page background (`--bg`), containing an address line and copyright.

## Navigation

Fixed header with the GKTK gradient logo (loaded as an `<img>` referencing `/logobase.svg`) and a responsive menu button. On mobile, the navigation bar uses a solid neutral-50 background with a neutral-400 bottom border and neutral-800 icon colors, replacing the earlier gradient scrim approach. The menu button adapts by breakpoint:

- **Mobile**: SVG hamburger icon (`.navigation__icon-hamburger`) and close icon (`.navigation__icon-close`), both 24x24, toggled via CSS using `aria-expanded`.
- **Tablet+**: SVG icons hidden; a text label (`.navigation__menu-label`) displays "Menu" or "Close" in REM Semibold 1.25rem, toggled via JS. The label turns amber on hover.

The menu itself (`.hamburger-menu`) opens as a full-screen overlay with backdrop blur. Five numbered links (01-05) use BEM class `hamburger-menu__menu-link`, styled in REM Regular neutral-700 by default and REM Semibold neutral-900 when active (set on click via JS). Each link has a 1px neutral-200 divider below it. Hover underlines the link text. Link font size uses `--component-heading` design tokens; spacing scales with `--nav-height` custom properties across breakpoints. "Concept" was removed as a menu item.
