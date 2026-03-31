# Project Copy
All portfolio copy for the GKTK project.

---

## Project title

GKTK

## Tagline

An investor pitch deck reimagined as an interactive web experience.

## Short summary

GKTK is a single-page investor presentation for a Singapore-based family office real estate fund targeting the semiconductor supply chain in Kumamoto, Japan. Built as an immersive tilt-card experience with 3D interactions, gyroscope control on mobile, and cinematic scroll transitions.

## The problem

Traditional investor pitch decks are static PDFs or slide shows that fail to convey the sophistication and confidence a fund needs to project. For a cross-border real estate fund targeting semiconductor supply chain housing, the presentation itself needs to signal operational excellence and attention to detail.

## The solution

A web-based pitch experience where each section — persona, product, financials, risk factors, exit strategy — is presented on interactive 3D tilt cards. Desktop users explore with mouse-driven parallax; mobile users tilt their phone using the gyroscope. The presentation flows through a full-viewport scroll with animated entrances and page transition wipes, creating a cinematic feel that elevates the content.

## The approach

I chose Next.js 16 with the App Router for server-side rendering and optimized delivery. The entire interaction layer is built with GSAP and ScrollTrigger — 3D card transforms, entrance animations, menu transitions, and page wipes. Lenis provides buttery smooth scroll on desktop while being disabled on mobile for native touch behavior.

The tilt card system supports three variants (Type A for data tables, Type B for text-only narrative, Type C for grids and risk items) with a shared 3D transform pipeline. On mobile, a three-strategy priority system handles interaction: gyroscope first (iOS DeviceOrientation), touch-drag tilt as fallback, and ambient idle float when not touching.

Typography uses two typefaces loaded via next/font: REM Semibold for headings and Noto Sans JP for body text, with a major-third (1.25) type scale from 0.8rem to 5.96rem. CSS custom property tokens define sizes for each heading level (h1–h4) at three iOS HIG-aligned breakpoints (mobile ≤744px, tablet 745–1024px, desktop ≥1025px).

## Key results and metrics

- 1,943 total lines of source code across 7 files
- 649 lines of hand-written CSS (no Tailwind utilities in production)
- 654-line Orchestrator component handling all GSAP animations and interactions
- 3 tilt card variants (Type A, B, C) with shared 3D transform system
- 3 mobile interaction strategies (gyroscope, touch-drag, idle float)
- 6 content sections: hero, persona, product, IRR financials, risk factors, exit strategy
- 11 git commits across 5 merged PRs
- 5 runtime dependencies (Next.js, React, React DOM, GSAP, Lenis)

## My role

Full design and development — from visual concept and interaction design through to production code.

## Tools used

- Next.js 16.2.1 (App Router)
- React 19
- TypeScript 5
- GSAP with ScrollTrigger (3D transforms, scroll animations, page transitions)
- Lenis (smooth scroll on desktop)
- CSS custom properties and hand-written responsive styles
- REM + Noto Sans JP via next/font
- PostCSS with Tailwind (config only, no utility classes in production)

## Duration

March 30–31, 2026 — rapid build over 2 days.

## Status

Active development. Core presentation complete with navigation, all content sections, and full interaction system across desktop and mobile.
