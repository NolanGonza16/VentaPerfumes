import type { Perfume } from "../../data/perfumes";
import Icon from "../atoms/Icon";
export default function PerfumeCard({
  perfume,
  onOpen,
  index,
}: {
  perfume: Perfume;
  onOpen: () => void;
  index: number;
}) {
  return (
    <article className="perfume-card">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver detalles de ${perfume.nombre} de ${perfume.marca}`}
      >
        <span className="card-image">
          <img
            src={perfume.imagen}
            alt={`${perfume.nombre} de ${perfume.marca}`}
            width="600"
            height="750"
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            onError={(event) => {
              if (!event.currentTarget.src.endsWith("perfume-placeholder.svg"))
                event.currentTarget.src = "/images/perfume-placeholder.svg";
            }}
          />
          <span className="card-image-arrow">
            <Icon name="arrow" />
          </span>
          {perfume.tipoProducto && perfume.tipoProducto !== "Perfume" && (
            <span className="card-product-type">{perfume.tipoProducto}</span>
          )}
        </span>
        <span className="card-copy">
          <span className="card-brand">{perfume.marca}</span>
          <span className="card-title">{perfume.nombre}</span>
          <span className="card-price">{perfume.precio}</span>
          {(perfume.concentracion || perfume.tamanoMl) && (
            <span className="card-presentation">
              {[
                perfume.concentracion,
                perfume.tamanoMl && `${perfume.tamanoMl} ml`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          )}
          <span className="card-action">
            Ver detalles <Icon name="arrow" />
          </span>
        </span>
      </button>
    </article>
  );
}
