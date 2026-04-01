"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOKENS = {
  background: "var(--bg)",
};

/* ──────────────────────────────────────────────────────────
   StaticStack — SSR / reduced-motion fallback
   ────────────────────────────────────────────────────────── */

function StaticStack({
  cards,
  className,
  style,
}: {
  cards: { id?: string; content: ReactNode }[];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section className={className} style={{ background: TOKENS.background, ...style }}>
      {cards.map((card, i) => (
        <div key={card.id ?? i} id={card.id}>
          <div className="sticky-card-container">{card.content}</div>
        </div>
      ))}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   StickyCardStack — main export

   3D perspective card stack on ALL viewports (same as
   radiance.family). All cards in one grid cell, pinned
   section, GSAP timeline with scrub.
   ────────────────────────────────────────────────────────── */

interface CardEntry {
  id?: string;
  content: ReactNode;
}

export function StickyCardStack({
  cards,
  className,
  style,
}: {
  cards: CardEntry[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isClient, setIsClient] = useState(false);
  const [rm, setRm] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRm(mq.matches);
    const handler = (e: MediaQueryListEvent) => setRm(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── GSAP scroll-driven 3D card stack ── */
  useEffect(() => {
    if (!isClient || rm) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slidesLayout = wrapper.querySelector<HTMLElement>(".slides-layout");
    const slides = gsap.utils.toArray<HTMLElement>(".stacked-slide", wrapper);
    if (!slidesLayout || slides.length === 0) return;

    const total = slides.length;

    // Initial 3D stacked state
    slides.forEach((slide, i) => {
      gsap.set(slide, {
        transformOrigin: "center top",
        transformStyle: "preserve-3d",
        perspective: 800,
        rotateX: -40,
        scale: 0.875,
        y: i * 12,
      });
    });

    // First card starts at full scale
    gsap.set(slides[0], { scale: 1, y: 0 });

    // Build master timeline
    const tl = gsap.timeline();

    for (let i = 0; i < total - 1; i++) {
      const t = i + 1;

      // Current card shrinks back
      tl.to(
        slides[i],
        { scale: 0.7, y: -6, duration: 0.5, ease: "power1.in" },
        t
      );

      // Next card comes forward
      tl.to(
        slides[i + 1],
        { scale: 1, y: 0, duration: 1.5, ease: "power1.out" },
        t + 0.1
      );
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: slidesLayout,
        pinSpacing: false,
        scrub: 1,
        animation: tl,
      });
    }, wrapper);

    return () => ctx.revert();
  }, [isClient, rm, cards.length]);

  /* ── SSR / reduced motion ── */
  if (!isClient || rm) {
    return <StaticStack cards={cards} className={className} style={style} />;
  }

  /* ── 3D perspective card stack (all viewports) ── */
  return (
    <section className={className} style={{ background: TOKENS.background, ...style }}>
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: "100%",
          height: `${cards.length * 100}vh`,
          overflow: "hidden",
          backgroundColor: TOKENS.background,
        }}
      >
        <div
          className="slides-layout"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            placeItems: "center",
            width: "100%",
            height: "100vh",
            maxHeight: "100vh",
            padding: "2rem 0",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.id ?? i}
              id={card.id}
              className="stacked-slide"
              style={{
                gridArea: "1 / 1 / 2 / 2",
                position: "relative",
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1.5rem",
                overflow: "hidden",
                willChange: "transform",
              }}
            >
              <div className="sticky-card-container">{card.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
