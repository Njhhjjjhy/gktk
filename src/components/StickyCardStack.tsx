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
   5 Proposals — each a self-contained GSAP setup
   ────────────────────────────────────────────────────────── */

type Proposal = "1" | "2" | "3" | "4" | "5";

const PROPOSAL_INFO: Record<Proposal, { label: string; desc: string }> = {
  "1": { label: "Peel Away", desc: "Top card peels off to the side, revealing the next card underneath" },
  "2": { label: "Zoom Through", desc: "Current card zooms in and fades out, next card emerges from behind" },
  "3": { label: "Horizontal Slide", desc: "Cards slide left like a horizontal carousel" },
  "4": { label: "Flip", desc: "Cards flip on the Y-axis with a 3D rotation to reveal the next" },
  "5": { label: "Stack & Shrink", desc: "Current card shrinks and drops down, next card rises into place" },
};

function setupProposal(
  p: Proposal,
  slides: HTMLElement[],
  total: number,
): gsap.core.Timeline {
  const tl = gsap.timeline();

  switch (p) {
    /* ── 1: Peel Away ── */
    case "1": {
      slides.forEach((slide, i) => {
        gsap.set(slide, { zIndex: total - i, opacity: i === 0 ? 1 : 0 });
      });
      for (let i = 0; i < total - 1; i++) {
        const t = i + 1;
        tl.to(slides[i + 1], { opacity: 1, duration: 0.01 }, t);
        tl.to(slides[i], {
          x: "-110%", rotateZ: -8, opacity: 0,
          duration: 1.2, ease: "power3.inOut",
          transformOrigin: "bottom left",
        }, t);
      }
      break;
    }

    /* ── 2: Zoom Through ── */
    case "2": {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          zIndex: total - i,
          scale: i === 0 ? 1 : 0.85,
          opacity: i === 0 ? 1 : 0,
        });
      });
      for (let i = 0; i < total - 1; i++) {
        const t = i + 1;
        tl.to(slides[i], { scale: 1.5, opacity: 0, duration: 1, ease: "power2.in" }, t);
        tl.to(slides[i + 1], { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, t + 0.3);
      }
      break;
    }

    /* ── 3: Horizontal Slide ── */
    case "3": {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          zIndex: total - i,
          x: i === 0 ? 0 : "100%",
          opacity: 1,
        });
      });
      for (let i = 0; i < total - 1; i++) {
        const t = i + 1;
        tl.to(slides[i], { x: "-100%", duration: 1, ease: "power2.inOut" }, t);
        tl.to(slides[i + 1], { x: 0, duration: 1, ease: "power2.inOut" }, t);
      }
      break;
    }

    /* ── 4: Flip ── */
    case "4": {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          zIndex: total - i,
          rotateY: i === 0 ? 0 : 90,
          opacity: i === 0 ? 1 : 0,
          transformOrigin: "center center",
          transformPerspective: 1200,
        });
      });
      for (let i = 0; i < total - 1; i++) {
        const t = i + 1;
        tl.to(slides[i], { rotateY: -90, opacity: 0, duration: 0.8, ease: "power2.in" }, t);
        tl.to(slides[i + 1], { rotateY: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, t + 0.4);
      }
      break;
    }

    /* ── 5: Stack & Shrink ── */
    case "5": {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          zIndex: total - i,
          scale: i === 0 ? 1 : 0.9,
          y: i === 0 ? 0 : 60,
          opacity: i === 0 ? 1 : 0,
        });
      });
      for (let i = 0; i < total - 1; i++) {
        const t = i + 1;
        tl.to(slides[i], { scale: 0.75, y: 120, opacity: 0, duration: 0.8, ease: "power2.in" }, t);
        tl.to(slides[i + 1], { scale: 1, y: 0, opacity: 1, duration: 1, ease: "power2.out" }, t + 0.2);
      }
      break;
    }
  }

  return tl;
}

/* ──────────────────────────────────────────────────────────
   StickyCardStack — main export
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
  const [proposal, setProposal] = useState<Proposal>("1");
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Track a key to force full remount when switching proposals
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRm(mq.matches);
    const handler = (e: MediaQueryListEvent) => setRm(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── GSAP setup ── */
  useEffect(() => {
    if (!isClient || rm) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slidesLayout = wrapper.querySelector<HTMLElement>(".slides-layout");
    const slides = gsap.utils.toArray<HTMLElement>(".stacked-slide", wrapper);
    if (!slidesLayout || slides.length === 0) return;

    const total = slides.length;
    const tl = setupProposal(proposal, slides, total);

    const section = wrapper.closest("section");
    const targets = section ? [wrapper, section] : [wrapper];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: slidesLayout,
        pinSpacing: false,
        scrub: 1,
        animation: tl,
        onEnter: () => gsap.to(targets, { backgroundColor: "#FBB931", duration: 0.4 }),
        onLeaveBack: () => gsap.to(targets, { backgroundColor: "#F9F9F9", duration: 0.4 }),
        onLeave: () => gsap.to(targets, { backgroundColor: "#F9F9F9", duration: 0.4 }),
      });
    }, wrapper);

    return () => ctx.revert();
  }, [isClient, rm, proposal, mountKey, cards.length]);

  function switchProposal(p: Proposal) {
    // Kill everything, bump key to force clean DOM, then set new proposal
    ScrollTrigger.getAll().forEach((st) => st.kill());
    setProposal(p);
    setMountKey((k) => k + 1);
    // Scroll back to the cards section start
    window.scrollTo({ top: wrapperRef.current?.offsetTop ?? 0, behavior: "instant" });
  }

  /* ── SSR / reduced motion ── */
  if (!isClient || rm) {
    return <StaticStack cards={cards} className={className} style={style} />;
  }

  const info = PROPOSAL_INFO[proposal];

  /* ── Render ── */
  return (
    <section className={className} style={{ background: TOKENS.background, ...style }}>
      {/* ── Proposal Switcher (dev only) ── */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            background: "#1E1F20",
            borderRadius: 16,
            padding: "12px 12px 10px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.45)",
          }}
        >
          <span style={{ color: "#666", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Animation Proposals
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {(["1", "2", "3", "4", "5"] as Proposal[]).map((p) => (
              <button
                key={p}
                onClick={() => switchProposal(p)}
                style={{
                  padding: "7px 14px",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  background: proposal === p ? "#FBB931" : "rgba(255,255,255,0.06)",
                  color: proposal === p ? "#1E1F20" : "#888",
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <div style={{ color: "#FBB931", fontSize: 13, fontWeight: 700 }}>{info.label}</div>
          <div style={{ color: "#777", fontSize: 11, textAlign: "center", maxWidth: 300, lineHeight: 1.35 }}>{info.desc}</div>
        </div>
      )}

      <div
        ref={wrapperRef}
        key={mountKey}
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
