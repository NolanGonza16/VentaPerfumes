import { useDeferredValue, useEffect, useMemo, useState } from "react"
import type { CSSProperties } from "react"
import { whatsappUrl } from "../config/store"
import { familias, ocasiones, perfumes } from "../data/perfumes"
import type { Occasion, OlfactoryFamily, Perfume } from "../data/perfumes"
import { fetchCatalogPerfumes } from "../lib/catalog"

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()

const PRICE_STEP = 5000
const colonFormatter = new Intl.NumberFormat("es-CR", {
  maximumFractionDigits: 0,
})

const parsePrice = (value: string) => {
  const numericValue = Number(value.replace(/[^0-9]/g, ""))
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null
}

const formatColones = (value: number) => `₡${colonFormatter.format(value)}`

function PerfumeCard({
  perfume,
  onOpen,
}: {
  perfume: Perfume
  onOpen: () => void
}) {
  return (
    <article className="perfume-card">
      <button
        className="card-image-button"
        onClick={onOpen}
        aria-label={`Ver detalles de ${perfume.nombre}`}
      >
        <img
          src={perfume.imagen}
          alt={`${perfume.nombre} de ${perfume.marca}`}
          loading="lazy"
        />
        <span className="card-index" aria-hidden="true">
          {perfume.id.slice(0, 2).toUpperCase()}
        </span>
        <span className="image-hover-label">Descubrir</span>
      </button>
      <div className="card-body">
        <p>{perfume.marca}</p>
        <h2>{perfume.nombre}</h2>
        <div className="card-bottom">
          <strong>{perfume.precio}</strong>
          <button onClick={onOpen}>
            Ver detalles <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  )
}

function RatingStars({ value }: { value: number }) {
  const rounded = Math.round(value)
  return (
    <div className="rating-stars" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rounded ? "filled" : ""}>
          ★
        </span>
      ))}
    </div>
  )
}

function PerformanceRow({ label, value }: { label: string value: number }) {
  return (
    <div className="performance-row">
      <div>
        <span>{label}</span>
        <small>{value}/5</small>
      </div>
      <div className="performance-track">
        <i style={{ width: `${value * 20}%` }} />
      </div>
    </div>
  )
}

function PerfumeDetail({
  perfume,
  onClose,
}: {
  perfume: Perfume
  onClose: () => void
}) {
  useEffect(() => {
    const previous = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose()
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  const message = `Hola, estoy interesado en el perfume ${perfume.nombre} de ${perfume.marca}. Me gustaría conocer precio y disponibilidad.`

  return (
    <div
      className="detail-overlay"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <article
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <button
          className="detail-close"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          ×
        </button>
        <div className="detail-visual">
          <img
            src={perfume.imagen}
            alt={`${perfume.nombre} de ${perfume.marca}`}
          />
          <div className="detail-visual-overlay" />
          <div className="detail-availability">
            <i className={perfume.disponible ? "available" : "order"} />
            {perfume.disponible ? "Disponible" : "Bajo pedido"}
          </div>
          <div className="detail-identity">
            <p>{perfume.marca}</p>
            <h2 id="detail-title">{perfume.nombre}</h2>
            <strong>{perfume.precio}</strong>
          </div>
        </div>
        <div className="detail-content">
          <section className="detail-intro">
            <p className="eyebrow">La fragancia</p>
            <p>{perfume.descripcion}</p>
          </section>
          <section>
            <div className="detail-section-heading">
              <div>
                <p className="eyebrow">Perfil olfativo</p>
                <h3>{perfume.familia}</h3>
              </div>
              <div className="rating-summary">
                <strong>{perfume.valoracion}</strong>
                <RatingStars value={perfume.valoracion} />
              </div>
            </div>
            <div className="accord-list">
              {perfume.acordes.map((acorde) => (
                <span key={acorde.nombre}>
                  {acorde.emoji} {acorde.nombre}
                </span>
              ))}
            </div>
          </section>
          <section>
            <p className="eyebrow">Pirámide olfativa</p>
            <div className="pyramid-grid">
              {[
                ["Salida", perfume.notasSalida],
                ["Corazón", perfume.notasCorazon],
                ["Fondo", perfume.notasFondo],
              ].map(([title, notes]) => (
                <div key={title as string}>
                  <span>{title as string}</span>
                  {(notes as string[]).map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section>
            <p className="eyebrow">Rendimiento</p>
            <div className="performance-list">
              <PerformanceRow label="Duración" value={perfume.duracion} />
              <PerformanceRow label="Proyección" value={perfume.proyeccion} />
              <PerformanceRow label="Estela" value={perfume.estela} />
            </div>
          </section>
          <section className="occasion-section">
            <p className="eyebrow">Ideal para</p>
            <div>
              {perfume.ocasiones.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
          <a
            className="whatsapp-button"
            href={whatsappUrl(message)}
            target="_blank"
            rel="noreferrer"
          >
            <span className="whatsapp-button-icon" aria-hidden="true">
              ↗
            </span>
            <span>Consultar disponibilidad</span>
          </a>
          <p className="response-note">
            Atención personalizada · Respuesta en menos de 24 horas
          </p>
        </div>
      </article>
    </div>
  )
}

function FilterGroup<T extends string>({
  label,
  values,
  active,
  onChange,
}: {
  label: string
  values: readonly T[]
  active: T | null
  onChange: (value: T | null) => void
}) {
  return (
    <div className="filter-group">
      <span>{label}</span>
      <div className="filter-scroll">
        {values.map((value) => (
          <button
            key={value}
            className={active === value ? "active" : ""}
            onClick={() => onChange(active === value ? null : value)}
            aria-pressed={active === value}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}

function PriceRangeFilter({
  minimum,
  maximum,
  selectedMaximum,
  onMaximumChange,
}: {
  minimum: number
  maximum: number
  selectedMaximum: number
  onMaximumChange: (value: number) => void
}) {
  const span = Math.max(maximum - minimum, 1)
  const end = ((selectedMaximum - minimum) / span) * 100
  const sliderStyle = {
    "--price-end": `${end}%`,
  } as CSSProperties

  return (
    <div className="price-filter">
      <span>Precio</span>
      <div className="price-filter-content">
        <div className="price-values" aria-live="polite">
          <div>
            <small>Desde {formatColones(minimum)}</small>
          </div>
          <div>
            <small>Presupuesto máximo</small>
            <output htmlFor="maximum-price">
              {formatColones(selectedMaximum)}
            </output>
          </div>
        </div>
        <div className="price-slider" style={sliderStyle}>
          <input
            id="maximum-price"
            type="range"
            min={minimum}
            max={maximum}
            step={PRICE_STEP}
            value={selectedMaximum}
            onChange={(event) => onMaximumChange(Number(event.target.value))}
            aria-label="Precio máximo en colones"
          />
        </div>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  const [catalogPerfumes, setCatalogPerfumes] = useState<Perfume[]>(perfumes)
  const [catalogMode, setCatalogMode] = useState<"loading" | "demo" | "live">(
    "loading",
  )
  const [search, setSearch] = useState("")
  const deferredSearch = useDeferredValue(search)
  const [family, setFamily] = useState<OlfactoryFamily | null>(null)
  const [occasion, setOccasion] = useState<Occasion | null>(null)
  const [gender, setGender] = useState<Perfume["genero"] | null>(null)
  const [maximumPrice, setMaximumPrice] = useState<number | null>(null)
  const [selected, setSelected] = useState<Perfume | null>(null)

  useEffect(() => {
    let active = true
    fetchCatalogPerfumes()
      .then((records) => {
        if (!active) return
        if (records.length > 0) {
          setCatalogPerfumes(records)
          setCatalogMode("live")
        } else {
          setCatalogMode("demo")
        }
      })
      .catch(() => {
        if (active) setCatalogMode("demo")
      })
    return () => {
      active = false
    }
  }, [])

  const priceBounds = useMemo(() => {
    const prices = catalogPerfumes
      .map((perfume) => parsePrice(perfume.precio))
      .filter((price): price is number => price !== null)

    if (!prices.length) return { minimum: 0, maximum: 200000 }

    return {
      minimum: Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP,
      maximum: Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP,
    }
  }, [catalogPerfumes])

  const selectedMaximumPrice = Math.max(
    Math.min(maximumPrice ?? priceBounds.maximum, priceBounds.maximum),
    priceBounds.minimum,
  )
  const hasPriceFilter = maximumPrice !== null

  const filtered = useMemo(() => {
    const query = normalizeText(deferredSearch)
    return catalogPerfumes.filter((perfume) => {
      const perfumePrice = parsePrice(perfume.precio)
      const searchable = [
        perfume.nombre,
        perfume.marca,
        perfume.familia,
        perfume.descripcion,
        ...perfume.acordes.map((item) => item.nombre),
        ...perfume.notasSalida,
        ...perfume.notasCorazon,
        ...perfume.notasFondo,
      ].map(normalizeText)
      const matchesPrice =
        !hasPriceFilter ||
        (perfumePrice !== null && perfumePrice <= selectedMaximumPrice)

      return (
        (!query || searchable.some((item) => item.includes(query))) &&
        (!family || perfume.familia === family) &&
        (!occasion || perfume.ocasiones.includes(occasion)) &&
        (!gender || perfume.genero === gender || perfume.genero === "Unisex") &&
        matchesPrice
      )
    })
  }, [
    catalogPerfumes,
    deferredSearch,
    family,
    occasion,
    gender,
    hasPriceFilter,
    selectedMaximumPrice,
  ])

  const hasFilters = Boolean(
    search || family || occasion || gender || hasPriceFilter,
  )
  const clearFilters = () => {
    setSearch("")
    setFamily(null)
    setOccasion(null)
    setGender(null)
    setMaximumPrice(null)
  }

  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      {selected && (
        <PerfumeDetail perfume={selected} onClose={() => setSelected(null)} />
      )}
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {catalogMode === "live"
              ? "Colección disponible"
              : "Vista de demostración"}
          </p>
          <h1 id="catalog-title">
            Encuentra la fragancia
            <br />
            <em>que habla por ti.</em>
          </h1>
        </div>
        <p>
          Explora por nombre, casa, notas u ocasión. Cada pieza ha sido
          seleccionada por su carácter, calidad y presencia.
        </p>
      </div>
      <div className="catalog-tools">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Prueba “vainilla”, “Dior” o “cítrico”"
            aria-label="Buscar perfumes"
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Limpiar búsqueda">
              ×
            </button>
          )}
        </label>
        <div className="filters-panel">
          <FilterGroup
            label="Para"
            values={["Hombre", "Mujer", "Unisex"] as const}
            active={gender}
            onChange={setGender}
          />
          <FilterGroup
            label="Familia"
            values={familias}
            active={family}
            onChange={setFamily}
          />
          <FilterGroup
            label="Ocasión"
            values={ocasiones}
            active={occasion}
            onChange={setOccasion}
          />
          <PriceRangeFilter
            minimum={priceBounds.minimum}
            maximum={priceBounds.maximum}
            selectedMaximum={selectedMaximumPrice}
            onMaximumChange={setMaximumPrice}
          />
        </div>
      </div>
      <div className="results-bar" aria-live="polite">
        <span>{String(filtered.length).padStart(2, "0")} fragancias</span>
        <div>
          {catalogMode !== "live" && (
            <small>
              {catalogMode === "loading"
                ? "Conectando…"
                : "Productos de ejemplo"}
            </small>
          )}
          {hasFilters && (
            <button onClick={clearFilters}>Limpiar filtros</button>
          )}
        </div>
      </div>
      {filtered.length ? (
        <div className="catalog-grid">
          {filtered.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              onOpen={() => setSelected(perfume)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>Sin coincidencias</span>
          <h2>Tu próxima esencia puede estar a un filtro de distancia.</h2>
          <button className="primary-button" onClick={clearFilters}>
            Ver colección completa
          </button>
        </div>
      )}
    </section>
  )
}
