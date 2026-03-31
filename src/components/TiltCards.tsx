import { ReactNode } from "react";

export function CyclingLayers() {
  return (
    <div className="tilt-card__layers" data-cycling="">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="tilt-card__layer" data-layer={n} />
      ))}
    </div>
  );
}

/**
 * Type A: Full-bleed cycling image layers as background,
 * dark gradient overlay, content floats on top.
 * Always dark-themed (light text over imagery).
 */
export function TiltCardA({
  id,
  align = "bottom",
  children,
}: {
  id?: string;
  align?: "top" | "bottom";
  children: ReactNode;
}) {
  return (
    <div className="tilt-card tilt-card--dark" id={id}>
      <CyclingLayers />
      <div className="tilt-card__gradient" />
      <div
        className={
          align === "top"
            ? "tilt-card__inner tilt-card__inner--overlay tilt-card__inner--top"
            : "tilt-card__inner tilt-card__inner--overlay"
        }
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Type B: Split layout — text content left, cycling image stack right.
 */
export function TiltCardB({
  id,
  variant = "dark",
  children,
}: {
  id?: string;
  variant?: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div className={`tilt-card tilt-card--${variant}`} id={id}>
      <div className="tilt-card__inner">
        {children}
      </div>
    </div>
  );
}

/**
 * Type C: Content card with cycling images in individual slots.
 * Use <CyclingLayers /> inside grid items or content areas.
 */
export function TiltCardC({
  id,
  variant = "dark",
  align = "center",
  children,
}: {
  id?: string;
  variant?: "light" | "dark";
  align?: "top" | "center";
  children: ReactNode;
}) {
  return (
    <div className={`tilt-card tilt-card--${variant}`} id={id}>
      <div
        className={
          align === "top"
            ? "tilt-card__inner tilt-card__inner--top"
            : "tilt-card__inner"
        }
      >
        {children}
      </div>
    </div>
  );
}
