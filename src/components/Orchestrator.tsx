"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   ORCHESTRATOR — main client component
   ============================================================ */
export default function Orchestrator() {
  useEffect(() => {
    /* ============================================================
       Noise texture — generate at runtime via canvas
       ============================================================ */
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const imageData = ctx.createImageData(300, 300);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 25;
      }
      ctx.putImageData(imageData, 0, 0);
      const noiseEl = document.querySelector<HTMLElement>(".noise-overlay");
      if (noiseEl) {
        noiseEl.style.backgroundImage = `url(${canvas.toDataURL()})`;
      }
    }

    /* ============================================================
       Lenis smooth scroll
       ============================================================ */
    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    const mql = window.matchMedia("(max-width: 744px)");

    function initLenis() {
      if (lenis) return;
      lenis = new Lenis({ touchMultiplier: 0.2 });
      lenis.on("scroll", ScrollTrigger.update);
      tickerCallback = (time: number) => {
        if (lenis) lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    function destroyLenis() {
      if (!lenis) return;
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }
      lenis.destroy();
      lenis = null;
    }

    function handleBreakpoint(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches) {
        destroyLenis();
      } else {
        initLenis();
      }
    }

    handleBreakpoint(mql);
    mql.addEventListener("change", handleBreakpoint);

    /* ============================================================
       Anchor scroll
       ============================================================ */
    const wipeEl =
      document.querySelector<HTMLElement>(".page-transition-wipe");

    function handleAnchorClick(e: Event) {
      e.preventDefault();
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;

      if (!wipeEl) {
        // Fallback: no wipe element, just scroll
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      const wipeTL = gsap.timeline();

      // Wipe in — cover the screen
      wipeTL.to(wipeEl, {
        y: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // At peak coverage, jump to target
      wipeTL.call(() => {
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, { immediate: true });
        } else {
          target.scrollIntoView();
        }
      });

      // Wipe out — reveal destination
      wipeTL.to(wipeEl, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.1,
      });

      // Reset for next use
      wipeTL.set(wipeEl, { y: "100%" });
    }

    const anchorLinks = document.querySelectorAll<HTMLAnchorElement>(
      '.hamburger-menu__menu-link[href^="#"]'
    );
    anchorLinks.forEach((link) =>
      link.addEventListener("click", handleAnchorClick)
    );

/* ============================================================
       Hero entrance — welcome timeline
       ============================================================ */
    const welcomeTL = gsap.timeline();
    welcomeTL.from(
      ".hero__heading, .hero__subheading, .hero__body",
      { y: 30, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.15 },
      0
    );

    /* ============================================================
       Mobile menu
       ============================================================ */
    const menuTL = gsap.timeline({ paused: true, reversed: true });

    menuTL.to(
      ".menu-backdrop",
      { autoAlpha: 1, duration: 0.5, ease: "power3.inOut" },
      0
    );
    menuTL.set(".hamburger-menu", { visibility: "visible" }, 0);
    menuTL.to(
      ".hamburger-menu",
      { autoAlpha: 1, duration: 0.5, ease: "power3.inOut" },
      0
    );
    menuTL.from(
      ".hamburger-menu__menu-link",
      {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.05,
      },
      0.3
    );

    const menuBtn = document.querySelector(".navigation__menu-btn");
    const menuLabel = menuBtn?.querySelector(".navigation__menu-label");
    function toggleMenu() {
      if (menuTL.reversed()) {
        menuTL.play();
        menuBtn?.setAttribute("aria-expanded", "true");
        if (menuLabel) menuLabel.textContent = "Close";
        lenis?.stop();
      } else {
        menuTL.reverse();
        menuBtn?.setAttribute("aria-expanded", "false");
        if (menuLabel) menuLabel.textContent = "Menu";
        lenis?.start();
      }
    }
    menuBtn?.addEventListener("click", toggleMenu);

    document.querySelectorAll(".hamburger-menu__menu-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (!menuTL.reversed()) {
          menuTL.reverse();
          menuBtn?.setAttribute("aria-expanded", "false");
          if (menuLabel) menuLabel.textContent = "Menu";
          lenis?.start();
        }
      });
    });

    /* ============================================================
       Image Layer Cycling — DESKTOP hover-triggered on [data-cycling]
       Cycles through 5 layers with autoAlpha, yoyo repeat
       ============================================================ */
    const layerTimelines: gsap.core.Timeline[] = [];

    document
      .querySelectorAll<HTMLElement>("[data-cycling]")
      .forEach((layerStack) => {
        const layers = layerStack.querySelectorAll(".card__layer");
        if (layers.length < 2) return;

        const tl = gsap.timeline({ paused: true });
        tl.to(layers, {
          autoAlpha: 1,
          repeat: -1,
          duration: 0,
          repeatDelay: 1,
          stagger: { amount: 3 },
          yoyo: true,
        });

        layerTimelines.push(tl);

        const hoverTarget =
          layerStack.closest(".card-container") || layerStack;

        hoverTarget.addEventListener("mouseenter", () => tl.play());
        hoverTarget.addEventListener("mouseleave", () => tl.pause());
      });

    /* ============================================================
       Card entrance — fade up on scroll
       ============================================================ */
    document.querySelectorAll(".cards-section__card").forEach((slide) => {
      gsap.from(slide.querySelector(".card-container"), {
        scrollTrigger: {
          trigger: slide,
          start: "top 75%",
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });
    });

    /* ============================================================
       Footer entrance
       ============================================================ */
    ScrollTrigger.create({
      trigger: ".footer",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".footer__bottom", {
          y: 10,
          opacity: 0,
          duration: 0.6,
          ease: "expo.out",
        });
      },
    });

    /* ============================================================
       Active menu link tracking
       ============================================================ */
    const allMenuLinks = document.querySelectorAll<HTMLAnchorElement>(
      ".hamburger-menu__menu-link"
    );
    allMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        allMenuLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    /* ============================================================
       Cleanup
       ============================================================ */
    return () => {
      mql.removeEventListener("change", handleBreakpoint);
      anchorLinks.forEach((link) =>
        link.removeEventListener("click", handleAnchorClick)
      );
      menuBtn?.removeEventListener("click", toggleMenu);
      layerTimelines.forEach((tl) => tl.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      destroyLenis();
    };
  }, []);

  return null;
}
