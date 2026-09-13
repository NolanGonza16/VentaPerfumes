import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Perfume } from "../../data/perfumes";
import { getProductVisual } from "../../lib/productVisual";

type ProductArtworkProps = {
  perfume: Perfume;
  priority?: boolean;
  variant: "card" | "detail";
};

const PLACEHOLDER = "/images/perfume-placeholder.svg";

function likelyPackshot(url: string) {
  const normalized = url.toLowerCase();
  return (
    normalized.endsWith(".png") ||
    normalized.includes("_sl1500") ||
    normalized.includes("/products/") ||
    normalized.includes("product-image")
  );
}

export default function ProductArtwork({
  perfume,
  priority = false,
  variant,
}: ProductArtworkProps) {
  const [source, setSource] = useState(perfume.imagen || PLACEHOLDER);
  const visual = useMemo(() => getProductVisual(perfume), [perfume]);

  useEffect(() => {
    setSource(perfume.imagen || PLACEHOLDER);
  }, [perfume.imagen]);

  const style = {
    "--art-accent": visual.accent,
    "--art-accent-soft": visual.accentSoft,
    "--art-surface": visual.surface,
    "--art-glow": visual.glow,
    "--art-object-position": visual.objectPosition,
  } as CSSProperties;
  const packshot = source !== PLACEHOLDER && likelyPackshot(source);

  return (
    <span
      className={`product-artwork product-artwork--${variant} scene-${visual.scene}${packshot ? " product-artwork--packshot" : ""}`}
      style={style}
    >
      <span className="product-artwork__halo" aria-hidden="true" />
      <span className="product-artwork__architecture" aria-hidden="true" />
      <span className="product-artwork__surface" aria-hidden="true" />
      <img
        className="product-artwork__image"
        src={source}
        alt={`${perfume.nombre} de ${perfume.marca}`}
        width="800"
        height="1000"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => {
          if (source !== PLACEHOLDER) setSource(PLACEHOLDER);
        }}
      />
      <span className="product-artwork__wash" aria-hidden="true" />
      <span className="product-artwork__grain" aria-hidden="true" />
    </span>
  );
}
