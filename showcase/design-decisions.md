# Design Decisions
Visual and interaction design philosophy.

---

## Typography

Two typefaces loaded via `next/font`: REM (Semibold 600) for all headings, and Noto Sans JP for subheadings, body text, and labels — critical for Japanese-character support in an investor presentation targeting the Japan semiconductor market. The type scale follows a 1.25 (major third) ratio:

- Base: 1rem (16px)
- Scale: 0.8 · 1 · 1.25 · 1.563 · 1.953 · 2.441 · 3.052 · 3.815 · 4.768 · 5.96rem
- Heading font: REM Semibold (600) — neutral-950 on light, neutral-50 on dark
- Body font: Noto Sans JP — neutral-800/900 on light, neutral-300/400 on dark
- Letter-spacing: -0.025em globally for a tighter, more refined feel

A four-level heading hierarchy (h1→h2→h3→h4) scales down one major-third step per level. Only the hero section uses h1. All text is left-aligned by default. The footer uses body text only — no headings. CSS custom properties (tokens) define sizes per heading level per breakpoint, with iOS HIG-aligned breakpoints at 744px (mobile) and 1024px (tablet).

Each breakpoint uses specific sizes from the scale rather than fluid values, ensuring predictable rendering at every device class.

## Color

A restrained, professional palette appropriate for investor-facing material:

| Token | Value | Usage |
|-------|-------|-------|
| --bg | #F9F9F9 | Hero and light sections |
| --bg-dark | #1A1B1E | Body, dark card backgrounds |
| --fg | #1E1F20 | Primary text |
| --fg-invert | #FEFEFE | Text on dark backgrounds |
| --accent / --amber | #FBB931 | Section labels, highlights, logo gradient start |
| --orange | #FF9424 | Logo gradient end |
| --image-bg | #EDEEF1 | Placeholder image areas (light) |
| --image-bg-dark | #2A2C31 | Placeholder image areas (dark) |

A full neutral scale (50-950) provides fine-grained control for secondary text, borders, and subtle UI elements. On mobile, the navigation bar uses neutral-50 (#FFFFFF) for its background, neutral-400 (#8E95A2) for the bottom border, and neutral-800 (#40444C) for icon colors.

## Interaction philosophy

The presentation is designed to reward exploration without requiring it. Every section is fully readable without interaction — the 3D tilt, gyroscope, and layer cycling add delight on top of functional content.

- **Desktop**: Mouse-driven 3D tilt (up to 10 degrees) with subtle scale-up on hover. Smooth scroll via Lenis. Hover triggers image layer cycling.
- **Mobile**: Gyroscope tilt on capable devices, touch-drag tilt as fallback, ambient idle float as baseline. Touch triggers image cycling. Native scroll for reliability.
- **Transitions**: Full-screen wipe for anchor navigation creates a cinematic section-to-section flow.

## Card system

Three tilt card variants serve different content types:

- **Type A** (TiltCardA): Data-heavy layouts with labeled rows, dot leaders, and value columns. Used for IRR assumptions and waterfall distribution.
- **Type B** (TiltCardB): Text-only narrative blocks. Used for persona and exit strategy. Supports light and dark variants.
- **Type C** (TiltCardC): Grid layouts for product items and risk factors with image placeholders. Always dark variant.

All three share the same 3D transform pipeline (perspective, rotation, scale) and entrance animation behavior.

## Spacing

Consistent padding system across breakpoints:
- Desktop: 1.5rem page padding, 3rem card padding
- Tablet: 1.5rem page padding, 2rem card padding
- Mobile: 0.75rem page padding, 1.5rem card padding

Cards use `min-height: 85vh` on desktop/tablet (removed on mobile for natural content height).

## Navigation

Fixed header with the GKTK gradient logo (loaded as an `<img>` referencing `/logobase.svg`) and hamburger menu. On mobile, the navigation bar uses a solid neutral-50 (#FFFFFF) background with a neutral-400 (#8E95A2) bottom border and neutral-800 (#40444C) icon colors, replacing the earlier gradient scrim approach for cleaner mobile presentation. The hamburger button toggles between a hamburger icon and an X icon via CSS using the `aria-expanded` attribute, both sized 24x24 on mobile. The menu opens a full-screen overlay with staggered link animations and backdrop blur.
