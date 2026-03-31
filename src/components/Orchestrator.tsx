"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Mobile & Tablet Tilt Module
   3 strategies in priority order:
   1. Gyroscope (DeviceOrientation) — iOS primary
   2. Touch-drag tilt — fallback
   3. Idle float — ambient motion when not touching
   ============================================================ */
function initMobileTilt(containerEls: HTMLElement[]) {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) return null;

  const MAX_TILT = 25;
  const TILT_DURATION = 0.5;
  const TILT_EASE = "power2.out";
  const SCALE_ACTIVE = 1.08;
  const RESET_DURATION = 0.6;

  let gyroPermission: "granted" | "denied" | "unknown" | "unavailable" =
    "unknown";
  let activeCard: HTMLElement | null = null;

  // --- STRATEGY 1: GYROSCOPE ---
  let gyroBaseBeta: number | null = null;
  let gyroBaseGamma: number | null = null;
  let gyroActive = false;

  function handleOrientation(event: DeviceOrientationEvent) {
    if (!gyroActive || !activeCard) return;

    const beta = event.beta;
    const gamma = event.gamma;
    if (beta === null || gamma === null) return;

    if (gyroBaseBeta === null) {
      gyroBaseBeta = beta;
      gyroBaseGamma = gamma;
    }

    const deltaBeta = Math.max(
      -MAX_TILT,
      Math.min(MAX_TILT, beta - gyroBaseBeta)
    );
    const deltaGamma = Math.max(
      -MAX_TILT,
      Math.min(MAX_TILT, gamma - (gyroBaseGamma ?? 0))
    );

    gsap.to(activeCard, {
      rotationX: -deltaBeta,
      rotationY: deltaGamma,
      duration: TILT_DURATION,
      ease: TILT_EASE,
      overwrite: "auto",
    });
  }

  async function requestGyroPermission(): Promise<boolean> {
    if (
      typeof DeviceOrientationEvent === "undefined" ||
      DeviceOrientationEvent === null
    ) {
      gyroPermission = "unavailable";
      return false;
    }

    // iOS 13+: explicit permission required
    const DOE = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DOE.requestPermission === "function") {
      try {
        const result = await DOE.requestPermission();
        gyroPermission = result;
        if (result === "granted") {
          window.addEventListener("deviceorientation", handleOrientation, true);
          return true;
        }
        return false;
      } catch {
        gyroPermission = "denied";
        return false;
      }
    }

    // Android / older iOS: test if events fire
    return new Promise((resolve) => {
      let fired = false;
      function testHandler(e: DeviceOrientationEvent) {
        if (e.beta !== null) {
          fired = true;
          gyroPermission = "granted";
          window.removeEventListener("deviceorientation", testHandler, true);
          window.addEventListener("deviceorientation", handleOrientation, true);
          resolve(true);
        }
      }
      window.addEventListener("deviceorientation", testHandler, true);
      setTimeout(() => {
        if (!fired) {
          window.removeEventListener("deviceorientation", testHandler, true);
          gyroPermission = "unavailable";
          resolve(false);
        }
      }, 1000);
    });
  }

  // --- STRATEGY 2: TOUCH-DRAG TILT ---
  function handleTouchTilt(card: HTMLElement, touchX: number, touchY: number) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (touchX - centerX) / (rect.width / 2);
    const offsetY = (touchY - centerY) / (rect.height / 2);

    gsap.to(card, {
      rotationX: -offsetY * MAX_TILT,
      rotationY: offsetX * MAX_TILT,
      duration: TILT_DURATION,
      ease: TILT_EASE,
      overwrite: "auto",
    });
  }

  // --- STRATEGY 3: IDLE FLOAT ---
  const floatTimelines = new Map<HTMLElement, gsap.core.Timeline>();

  function startFloat(card: HTMLElement) {
    if (floatTimelines.has(card)) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(card, {
      rotationX: gsap.utils.random(-3, 3),
      rotationY: gsap.utils.random(-4, 4),
      duration: gsap.utils.random(2.5, 4),
      ease: "sine.inOut",
    });
    tl.to(card, {
      rotationX: gsap.utils.random(-3, 3),
      rotationY: gsap.utils.random(-4, 4),
      duration: gsap.utils.random(2.5, 4),
      ease: "sine.inOut",
    });

    floatTimelines.set(card, tl);
  }

  function stopFloat(card: HTMLElement) {
    const tl = floatTimelines.get(card);
    if (tl) {
      tl.kill();
      floatTimelines.delete(card);
    }
  }

  // --- LAYER CYCLING ON TOUCH ---
  const spriteTimelines = new Map<HTMLElement, gsap.core.Timeline>();

  function initLayerCycling(card: HTMLElement) {
    if (spriteTimelines.has(card)) return spriteTimelines.get(card)!;

    const layerStacks = card.querySelectorAll("[data-cycling]");
    if (layerStacks.length === 0) return null;

    const tl = gsap.timeline({ paused: true });

    layerStacks.forEach((stack) => {
      const layers = stack.querySelectorAll(".tilt-card__layer");
      if (layers.length < 2) return;

      tl.to(
        layers,
        {
          autoAlpha: 1,
          repeat: -1,
          duration: 0,
          repeatDelay: 0.6,
          stagger: { amount: 2 },
          yoyo: true,
        },
        0
      );
    });

    spriteTimelines.set(card, tl);
    return tl;
  }

  // --- BIND TOUCH EVENTS ---
  let gyroRequested = false;

  containerEls.forEach((container) => {
    const card = container.querySelector<HTMLElement>(".tilt-card");
    if (!card) return;

    // Start idle float
    startFloat(card);

    // TOUCHSTART
    container.addEventListener(
      "touchstart",
      async (e) => {
        const touch = e.touches[0];
        activeCard = card;

        stopFloat(card);

        gsap.to(card, {
          scale: SCALE_ACTIVE,
          duration: 0.3,
          ease: "back.out(1.7)",
          overwrite: true,
        });

        const layerTL = initLayerCycling(card);
        if (layerTL) layerTL.play();

        if (!gyroRequested) {
          gyroRequested = true;
          const granted = await requestGyroPermission();
          if (granted) {
            gyroActive = true;
            gyroBaseBeta = null;
            gyroBaseGamma = null;
          }
        } else if (gyroPermission === "granted") {
          gyroActive = true;
          gyroBaseBeta = null;
          gyroBaseGamma = null;
        }

        if (gyroPermission !== "granted") {
          handleTouchTilt(card, touch.clientX, touch.clientY);
        }
      },
      { passive: true }
    );

    // TOUCHMOVE
    container.addEventListener(
      "touchmove",
      (e) => {
        if (activeCard !== card) return;
        const touch = e.touches[0];

        if (gyroPermission !== "granted") {
          handleTouchTilt(card, touch.clientX, touch.clientY);
        }
      },
      { passive: true }
    );

    // TOUCHEND
    function handleTouchEnd() {
      if (activeCard !== card || !card) return;

      gyroActive = false;
      activeCard = null;

      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: RESET_DURATION,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
      });

      const layerTL = spriteTimelines.get(card!);
      if (layerTL) layerTL.pause();

      const cardRef = card;
      gsap.delayedCall(RESET_DURATION + 0.1, () => {
        if (activeCard !== cardRef) startFloat(cardRef);
      });
    }

    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);
  });

  // --- RETURN API ---
  return {
    destroy() {
      gyroActive = false;
      window.removeEventListener("deviceorientation", handleOrientation, true);
      floatTimelines.forEach((tl) => tl.kill());
      floatTimelines.clear();
      spriteTimelines.forEach((tl) => tl.kill());
      spriteTimelines.clear();
    },
  };
}

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
    const mql = window.matchMedia("(max-width: 767px)");

    function initLenis() {
      if (lenis) return;
      lenis = new Lenis({ touchMultiplier: 0.2 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis!.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    function destroyLenis() {
      if (!lenis) return;
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
      '.menu-overlay__link[href^="#"]'
    );
    anchorLinks.forEach((link) =>
      link.addEventListener("click", handleAnchorClick)
    );

/* ============================================================
       Preloader
       ============================================================ */
    const welcomeTL = gsap.timeline({ paused: true });

    const preloaderTL = gsap.timeline({
      onComplete: () => {
        const el = document.querySelector<HTMLElement>(".preloader");
        if (el) el.style.display = "none";
        welcomeTL.play();
      },
    });

    const digitCols = document.querySelectorAll(".preloader__digit-col");
    if (digitCols.length >= 3) {
      preloaderTL.to(
        digitCols[2],
        { yPercent: -90, duration: 0.3, ease: "power4.inOut" },
        0
      );
      preloaderTL.to(
        digitCols[1],
        { yPercent: -90, duration: 0.5, ease: "power3.inOut" },
        0
      );
      preloaderTL.to(
        digitCols[0],
        { yPercent: -90, duration: 0.3, ease: "power2.inOut" },
        0.4
      );
    }

    preloaderTL.to(
      ".preloader",
      { yPercent: -100, duration: 1.4, ease: "power3.inOut" },
      "+=0.2"
    );

    /* ============================================================
       Hero entrance — welcome timeline
       ============================================================ */
    welcomeTL.from(
      ".navigation",
      { yPercent: -100, duration: 0.4, ease: "expo.out" },
      0
    );
    welcomeTL.from(
      ".hero__text",
      { y: 30, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.15 },
      0.2
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
    menuTL.set(".menu-overlay", { visibility: "visible" }, 0);
    menuTL.to(
      ".menu-overlay",
      { autoAlpha: 1, duration: 0.5, ease: "power3.inOut" },
      0
    );
    menuTL.from(
      ".menu-overlay__link",
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
    function toggleMenu() {
      if (menuTL.reversed()) {
        menuTL.play();
        menuBtn?.setAttribute("aria-expanded", "true");
        lenis?.stop();
      } else {
        menuTL.reverse();
        menuBtn?.setAttribute("aria-expanded", "false");
        lenis?.start();
      }
    }
    menuBtn?.addEventListener("click", toggleMenu);

    document.querySelectorAll(".menu-overlay__link").forEach((link) => {
      link.addEventListener("click", () => {
        if (!menuTL.reversed()) {
          menuTL.reverse();
          menuBtn?.setAttribute("aria-expanded", "false");
          lenis?.start();
        }
      });
    });

    /* ============================================================
       3D Tilt Interaction — DESKTOP
       perspective(800px), max ±40°, scale 1.05 on hover
       ============================================================ */
    const MAX_TILT = 40;
    const containers = Array.from(
      document.querySelectorAll<HTMLElement>(".tilt-card-container")
    );

    containers.forEach((container) => {
      const card = container.querySelector<HTMLElement>(".tilt-card");
      if (!card) return;

      gsap.set(card, {
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      });

      container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        const rotationY = MAX_TILT * ((mouseX - cardWidth / 2) / cardWidth);
        const rotationX =
          -MAX_TILT * ((mouseY - cardHeight / 2) / cardHeight);

        gsap.to(card, {
          rotationX,
          rotationY,
          duration: 0.4,
        });
        gsap.to(card, { scale: 1.05, duration: 0.4 });
      });

      container.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.4,
        });
      });

      container.addEventListener("mousedown", () => {
        gsap.to(card, {
          scale: 0.97,
          duration: 0.2,
          overwrite: true,
        });
      });

      container.addEventListener("mouseup", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.2,
          overwrite: true,
        });
      });
    });

    /* ============================================================
       3D Tilt Interaction — MOBILE & TABLET
       Gyroscope → touch-drag → idle float (priority order)
       ============================================================ */
    const mobileTilt = initMobileTilt(containers);

    /* ============================================================
       Image Layer Cycling — DESKTOP hover-triggered on [data-cycling]
       Cycles through 5 layers with autoAlpha, yoyo repeat
       ============================================================ */
    const layerTimelines: gsap.core.Timeline[] = [];

    document
      .querySelectorAll<HTMLElement>("[data-cycling]")
      .forEach((layerStack) => {
        const layers = layerStack.querySelectorAll(".tilt-card__layer");
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
          layerStack.closest(".tilt-card-container") || layerStack;

        hoverTarget.addEventListener("mouseenter", () => tl.play());
        hoverTarget.addEventListener("mouseleave", () => tl.pause());
      });

    /* ============================================================
       Card entrance — fade up on scroll
       ============================================================ */
    document.querySelectorAll(".tilt-cards-section__card").forEach((slide) => {
      gsap.from(slide.querySelector(".tilt-card-container"), {
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
        gsap.from(".footer__email-label", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
        });
        gsap.from(".footer__email-heading", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          delay: 0.15,
        });
        gsap.from(".footer__bottom", {
          y: 10,
          opacity: 0,
          duration: 0.6,
          ease: "expo.out",
          delay: 0.4,
        });
      },
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
      mobileTilt?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      destroyLenis();
    };
  }, []);

  return null;
}
