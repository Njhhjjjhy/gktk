import { ReactNode } from "react";

export function CyclingLayers() {
  return (
    <div className="card__layers" data-cycling="">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="card__layer" data-layer={n} />
      ))}
    </div>
  );
}

/**
 * Type A: Full-bleed cycling image layers as background,
 * dark gradient overlay, content floats on top.
 */
export function CardA({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className="card card--dark" id={id}>
      <CyclingLayers />
      <div className="card__gradient" />
      <div className="card__inner card__inner--overlay">
        {children}
      </div>
    </div>
  );
}

/**
 * Type B: Plain text card. No images.
 */
export function CardB({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className="card card--dark" id={id}>
      <div className="card__inner">
        {children}
      </div>
    </div>
  );
}

/**
 * Type C: Content card with image slots.
 * Use <CyclingLayers /> inside grid items or content areas.
 */
export function CardC({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <div className="card card--dark" id={id}>
      <div className="card__inner">
        {children}
      </div>
    </div>
  );
}
