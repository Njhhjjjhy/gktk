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

The presentation is designed to reward exploration without requiring it. Every section is fully readable without interaction — the 3D tilt, gyroscope, and layer cycling add delight on top of functional content.

- **Desktop**: Mouse-driven 3D tilt (up to 10 degrees) with subtle scale-up on hover. Smooth scroll via Lenis. Hover triggers image layer cycling.
- **Mobile**: Gyroscope tilt on capable devices, touch-drag tilt as fallback, ambient idle float as baseline. Touch triggers image cycling. Native scroll for reliability.
- **Transitions**: Full-screen wipe for anchor navigation creates a cinematic section-to-section flow.

## Card system

Three tilt card variants serve different content types, all using a white (neutral-50) background with a neutral-200 border:

- **Type A** (TiltCardA): Data-heavy layouts with labeled rows, dot leaders, and value columns. Used for IRR assumptions and waterfall distribution. Full-bleed background image with gradient overlay, content floats on top.
- **Type B** (TiltCardB): Text-only narrative blocks. Used for persona and exit strategy.
- **Type C** (TiltCardC): Content card with individual image slots inside grid items. Used for product items and risk factors.

All three share the same 3D transform pipeline (perspective, rotation, scale) and entrance animation behavior.

## Spacing

Consistent padding system across breakpoints:
- Desktop: 1.5rem page padding, 3.5rem card padding, 42px section gaps
- Tablet: 1.25rem page padding, 2.5rem card padding, 36px section gaps
- Mobile: 0.75rem page padding, 1.5rem card padding, 32px section gaps

Section gaps are uniform between all major sections (hero→tilt cards, tilt cards→footer) and between the nav and hero content. First and last tilt cards have zero edge padding to ensure the margin-based gaps are visually accurate.

The hero section sizes to its content (no min-height) with top padding equal to nav height + gap. Cards use `min-height: 100vh` on desktop, `50vh` on tablet, and auto on mobile for natural content height. Card container scales from 85% width (max 56rem) on desktop to 85% (max 48rem) on tablet to 100% on mobile. Border-radius scales from radius-xl (1.5rem) to radius-l (1rem) to radius-m (0.75rem).

The footer is a compact bar (48/56/64px min-height across breakpoints) with the light page background (`--bg`), containing an address line and copyright.

## Navigation

Fixed header with the GKTK gradient logo (loaded as an `<img>` referencing `/logobase.svg`) and a responsive menu button. On mobile, the navigation bar uses a solid neutral-50 background with a neutral-400 bottom border and neutral-800 icon colors, replacing the earlier gradient scrim approach. The menu button adapts by breakpoint:

- **Mobile**: SVG hamburger icon (`.navigation__icon-hamburger`) and close icon (`.navigation__icon-close`), both 24x24, toggled via CSS using `aria-expanded`.
- **Tablet+**: SVG icons hidden; a text label (`.navigation__menu-label`) displays "Menu" or "Close" in REM Semibold 1.25rem, toggled via JS. The label turns amber on hover.

The menu itself (`.hamburger-menu`) opens as a full-screen overlay with backdrop blur. Five numbered links (01-05) use BEM class `hamburger-menu__menu-link`, styled in REM Regular neutral-700 by default and REM Semibold neutral-900 when active (set on click via JS). Each link has a 1px neutral-200 divider below it. Hover underlines the link text. Link font size uses `--component-heading` design tokens; spacing scales with `--nav-height` custom properties across breakpoints. "Concept" was removed as a menu item.
