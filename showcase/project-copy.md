# Project Copy
All portfolio copy for the GKTK project.

---

## Project title

GKTK

## Tagline

An investor pitch deck reimagined as an interactive web experience.

## Short summary

GKTK is a single-page investor presentation for a Singapore-based family office real estate fund targeting the semiconductor supply chain in Kumamoto, Japan. Built as a scroll-driven card presentation with entrance animations, image layer cycling, and cinematic anchor transitions.

## The problem

Traditional investor pitch decks are static PDFs or slide shows that fail to convey the sophistication and confidence a fund needs to project. For a cross-border real estate fund targeting semiconductor supply chain housing, the presentation itself needs to signal operational excellence and attention to detail.

## The solution

A web-based pitch experience where each section — persona, product, financials, risk factors, exit strategy — is presented on seven cards in a scroll-driven stacked animation. Cards are layered in a pinned viewport and transition between each other using one of five animation proposals (Peel Away, Zoom Through, Horizontal Slide, Flip, Stack & Shrink). An amber background color transition signals entry into the cards section. Page transition wipes and image layer cycling add cinematic feel that elevates the content.

## The approach

I chose Next.js 16 with the App Router for server-side rendering and optimized delivery. The entire interaction layer is built with GSAP and ScrollTrigger — entrance animations, menu transitions, and page wipes. Lenis provides buttery smooth scroll on desktop while being disabled on mobile for native touch behavior.

The card system supports three variants (Type A for data tables, Type B for text-only narrative, Type C for grids and risk items), rendered in a scroll-driven stacked animation with five proposal variants. Card height uses a CSS custom property for flexible sizing. All animation — hero entrance, card stack transitions, amber background shift, footer entrance — is split between two client components: Orchestrator for global behavior and StickyCardStack for card-specific scroll animation. Image layer cycling on hover/touch adds visual depth to product and risk cards.

Typography uses two typefaces loaded via next/font: REM Semibold for headings and Noto Sans JP for body text, with a major-third (1.25) type scale from 0.8rem to 5.96rem. CSS custom property tokens define sizes for each heading level (h1–h4) at three iOS HIG-aligned breakpoints (mobile ≤744px, tablet 745–1024px, desktop ≥1025px).

## Key results and metrics

- 3 card variants (Type A, B, C); CardB and CardC used in production
- 7 cards across 6 content sections: hero, persona, product, IRR financials (2 cards), risk factors (2 cards), exit strategy
- 5 runtime dependencies (Next.js, React, React DOM, GSAP, Lenis)

## My role

Full design and development — from visual concept and interaction design through to production code.

## Tools used

- Next.js 16.2.1 (App Router)
- React 19
- TypeScript 5
- GSAP with ScrollTrigger (scroll animations, page transitions)
- Lenis (smooth scroll on desktop)
- CSS custom properties and hand-written responsive styles
- REM + Noto Sans JP via next/font
- PostCSS with Tailwind (config only, no utility classes in production)

## Duration

March 30 – April 1, 2026 — rapid build over 3 days.

## Status

Active development. Core presentation complete with navigation, all content sections, and responsive design across desktop and mobile.
