import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import { createPortal } from "react-dom";
import Icon from "../atoms/Icon";
import { whatsappUrl } from "../../config/store";
import type { Perfume } from "../../data/perfumes";
import "../../styles/product-detail.css";

type PerfumeDetailProps = {
  perfume: Perfume;
  onClose: () => void;
  isDemo?: boolean;
};

const clampRating = (value: number) =>
  Number.isFinite(value) ? Math.min(5, Math.max(0, value)) : 0;

function PerformanceMeter({ label, value }: { label: string; value: number }) {
  const rating = clampRating(value);
  return (
    <div className="pd-performance-item">
      <div className="pd-performance-label">
        <span>{label}</span>
        <span>{rating > 0 ? `${rating}/5` : "Por confirmar"}</span>
      </div>
      {rating > 0 && (
        <meter
          min={0}
          max={5}
          value={rating}
          aria-label={`${label}: ${rating} de 5`}
        >
          {rating} de 5
        </meter>
      )}
    </div>
  );
}

function NotesTier({
  number,
  title,
  subtitle,
  notes,
}: {
  number: string;
  title: string;
  subtitle: string;
  notes: string[];
}) {
  return (
    <div className="pd-notes-tier">
      <span className="pd-notes-number" aria-hidden="true">
        {number}
      </span>
      <div>
        <h4>
          {title} <span>{subtitle}</span>
        </h4>
        <p>{notes.length ? notes.join(" · ") : "Por confirmar"}</p>
      </div>
    </div>
  );
}

export default function PerfumeDetail({
  perfume,
  onClose,
  isDemo = false,
}: PerfumeDetailProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const backdropPressRef = useRef(false);
  const [imageFailed, setImageFailed] = useState(false);
  const rating = clampRating(perfume.valoracion);
  const availability =
    perfume.disponibilidad ??
    (perfume.disponible ? "disponible" : "bajo_pedido");
  const availabilityLabel = isDemo
    ? "Perfume de ejemplo"
    : {
        disponible: "Disponible",
        bajo_pedido: "Bajo pedido",
        agotado: "Agotado",
      }[availability];

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const previousRootOverflow = root.style.overflow;
    const previousScrollBehavior = root.style.scrollBehavior;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const bodyPadding =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    // A fixed body also prevents the underlying page from moving on iOS Safari.
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: "100%",
      overflow: "hidden",
      paddingRight: `${bodyPadding + scrollbarWidth}px`,
    });
    root.style.overflow = "hidden";

    // The native top layer cannot be trapped beneath an animated page or header.
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      Object.assign(body.style, previousBody);
      root.style.overflow = previousRootOverflow;
      root.style.scrollBehavior = "auto";
      window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = previousScrollBehavior;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  const isBackdrop = (
    event: PointerEvent<HTMLDialogElement> | MouseEvent<HTMLDialogElement>,
  ) => {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  };

  const presentation = [
    perfume.concentracion,
    perfume.tamanoMl ? `${perfume.tamanoMl} ml` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const message = `Hola, estoy interesado en el perfume ${perfume.nombre} de ${perfume.marca}${presentation ? ` (${presentation})` : ""}. Me gustaría conocer precio y disponibilidad.`;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="perfume-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onCloseRef.current();
      }}
      onPointerDown={(event) => {
        backdropPressRef.current = isBackdrop(event);
      }}
      onClick={(event) => {
        if (backdropPressRef.current && isBackdrop(event)) onCloseRef.current();
        backdropPressRef.current = false;
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="pd-close"
        onClick={onClose}
        aria-label="Cerrar detalles del perfume"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m6 6 12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <div className="pd-body">
        <div className="pd-visual">
          {!imageFailed ? (
            <img
              className="pd-product-image"
              src={perfume.imagen}
              alt={`${perfume.nombre}, ${perfume.marca}`}
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="pd-image-placeholder">
              <svg viewBox="0 0 120 160" fill="none" aria-hidden="true">
                <path
                  d="M43 15h34v28H43zM34 56h52a8 8 0 0 1 8 8v77a8 8 0 0 1-8 8H34a8 8 0 0 1-8-8V64a8 8 0 0 1 8-8ZM46 43h28v13H46z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M38 88h44v32H38z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              <span>Imagen próximamente</span>
            </div>
          )}
          <div className="pd-image-shade" />
          <span className="pd-visual-caption">
            El arte de dejar una impresión.
          </span>
          <span
            className={`pd-availability${
              !isDemo && availability === "disponible" ? "" : " pd-on-order"
            }`}
          >
            <i aria-hidden="true" />
            {availabilityLabel}
          </span>
        </div>

        <div
          className="pd-content"
          tabIndex={0}
          role="region"
          aria-label={`Información de ${perfume.nombre}`}
        >
          <header className="pd-identity">
            <p className="pd-eyebrow">{perfume.marca}</p>
            <h2 id={titleId}>{perfume.nombre}</h2>
            {presentation && <p className="pd-small-print">{presentation}</p>}
            <div className="pd-price-line">
              <strong>{perfume.precio}</strong>
              <span>
                {perfume.genero} · {perfume.familia}
              </span>
            </div>
            <p className="pd-description" id={descriptionId}>
              {perfume.descripcion}
            </p>
            {isDemo && (
              <p className="pd-demo-note">
                Colección de ejemplo: las imágenes, los precios, las notas y las
                valoraciones son ilustrativos.
              </p>
            )}
          </header>

          <section
            className="pd-section"
            aria-labelledby={`${titleId}-profile`}
          >
            <div className="pd-section-heading">
              <h3 id={`${titleId}-profile`}>Su carácter</h3>
              <span className="pd-section-kicker">Perfil olfativo</span>
            </div>
            <div className="pd-accords" aria-label="Acordes principales">
              {perfume.acordes.length > 0 ? (
                perfume.acordes.map((accord, index) => (
                  <span
                    className={`pd-accord pd-accord-${index % 4}`}
                    key={accord.nombre}
                  >
                    <i aria-hidden="true" />
                    {accord.nombre}
                  </span>
                ))
              ) : (
                <p className="pd-small-print">Acordes por confirmar.</p>
              )}
            </div>
          </section>

          <section className="pd-section" aria-labelledby={`${titleId}-notes`}>
            <div className="pd-section-heading">
              <h3 id={`${titleId}-notes`}>Una esencia, tres momentos</h3>
            </div>
            <div className="pd-notes">
              <NotesTier
                number="01"
                title="Salida"
                subtitle="La primera impresión"
                notes={perfume.notasSalida}
              />
              <NotesTier
                number="02"
                title="Corazón"
                subtitle="Su personalidad"
                notes={perfume.notasCorazon}
              />
              <NotesTier
                number="03"
                title="Fondo"
                subtitle="Lo que permanece"
                notes={perfume.notasFondo}
              />
            </div>
          </section>

          <section
            className="pd-section"
            aria-labelledby={`${titleId}-performance`}
          >
            <div className="pd-section-heading">
              <h3 id={`${titleId}-performance`}>Presencia que perdura</h3>
            </div>
            <div className="pd-performance">
              <PerformanceMeter label="Duración" value={perfume.duracion} />
              <PerformanceMeter label="Proyección" value={perfume.proyeccion} />
              <PerformanceMeter label="Estela" value={perfume.estela} />
            </div>
            <p className="pd-small-print">
              Referencias orientativas. La percepción varía según la piel, el
              clima y la aplicación.
            </p>
          </section>

          {perfume.ocasiones.length > 0 && (
            <section
              className="pd-section"
              aria-labelledby={`${titleId}-occasions`}
            >
              <div className="pd-section-heading">
                <h3 id={`${titleId}-occasions`}>Para tus momentos</h3>
              </div>
              <div className="pd-occasions">
                {perfume.ocasiones.map((occasion) => (
                  <span key={occasion}>{occasion}</span>
                ))}
              </div>
              <p className="pd-small-print">
                Sugerencias editoriales según su perfil olfativo.
              </p>
            </section>
          )}

          {!!perfume.fuentes?.length && (
            <section className="pd-section" aria-label="Fuentes de la ficha">
              <h3>Sobre esta fragancia</h3>
              <p className="pd-small-print">
                Notas contrastadas con el fabricante. La disponibilidad se
                confirma al consultar.
              </p>
              {perfume.fuentes.map((source) => (
                <p key={source.url} className="pd-small-print">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.titulo} <Icon name="arrow-up-right" />
                  </a>
                </p>
              ))}
            </section>
          )}
          {rating > 0 && (
            <div className="pd-editorial-rating">
              <strong>
                {new Intl.NumberFormat("es-CR", {
                  maximumFractionDigits: 1,
                }).format(rating)}
                <span> / 5</span>
              </strong>
              <div>
                <p>
                  {isDemo ? "Valoración de ejemplo" : "Valoración editorial"}
                </p>
                <span>
                  {isDemo
                    ? "Dato ilustrativo de esta colección de ejemplo."
                    : "Referencia de la ficha, no reseñas verificadas."}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="pd-footer">
        <div className="pd-footer-copy">
          <span>Una elección muy personal.</span>
          <small>Te acompañamos a encontrar tu esencia.</small>
        </div>
        <a
          className="pd-contact"
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 8.2c.5 2.8 2 4.3 4.8 4.8l1.2-1.1 1.4 1.4c-.2 1.3-1.2 1.9-2.5 1.6-3.5-.7-5.8-3-6.5-6.5C7.1 7.1 7.7 6.1 9 5.9l1.4 1.4L9 8.2Z"
              fill="currentColor"
              transform="translate(.5 1) scale(.9)"
            />
          </svg>
          <span>Consultar disponibilidad</span>
          <Icon name="arrow-up-right" className="pd-contact-arrow" />
        </a>
      </footer>
    </dialog>,
    document.body,
  );
}
