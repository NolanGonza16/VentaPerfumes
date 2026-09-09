import type { CSSProperties } from "react"
import { familias, ocasiones } from "../../data/perfumes"
import type {
  Occasion,
  OlfactoryFamily,
  Perfume,
  ProductType,
} from "../../data/perfumes"
import { formatColones } from "../../lib/prices"
import Icon from "../atoms/Icon"

interface FilterProps {
  search: string
  family: OlfactoryFamily | null
  occasion: Occasion | null
  gender: Perfume["genero"] | null
  brand: string | null
  brands: string[]
  productType: ProductType
  maximum: number
  budget: number | null
  open: boolean
  onSearch: (value: string) => void
  onFamily: (value: OlfactoryFamily | null) => void
  onOccasion: (value: Occasion | null) => void
  onGender: (value: Perfume["genero"] | null) => void
  onBrand: (value: string | null) => void
  onProductType: (value: ProductType) => void
  onBudget: (value: number | null) => void
  onToggle: () => void
}

export default function CatalogFilters(props: FilterProps) {
  const selected = Math.min(props.budget ?? props.maximum, props.maximum)
  const count =
    Number(!!props.family) +
    Number(!!props.occasion) +
    Number(!!props.brand) +
    Number(props.budget !== null)
  const productTypes: Array<{ value: ProductType; label: string }> = [
    { value: "Perfume", label: "Perfumes" },
    { value: "Tester", label: "Testers" },
    { value: "Decant", label: "Decants" },
    { value: "Miniatura", label: "Minis" },
    { value: "Estuche", label: "Estuches" },
    { value: "Corporal", label: "Cuidado corporal" },
  ]
  return (
    <div className="catalog-tools">
      <div className="search-row">
        <div className="search-box">
          <Icon name="search" />
          <input
            type="search"
            value={props.search}
            onChange={(event) => props.onSearch(event.target.value)}
            placeholder="Nombre, marca o notas…"
            aria-label="Buscar perfumes"
            autoComplete="off"
            spellCheck={false}
          />
          {props.search && (
            <button
              type="button"
              onClick={() => props.onSearch("")}
              aria-label="Limpiar búsqueda"
            >
              <Icon name="close" />
            </button>
          )}
        </div>
        <button
          type="button"
          className={`filter-toggle ${props.open ? "is-open" : ""}`}
          aria-expanded={props.open}
          aria-controls="catalog-filters"
          onClick={props.onToggle}
        >
          <Icon name="filters" />
          Filtros{count > 0 && <span>{count}</span>}
        </button>
      </div>
      <div
        className="product-type-tabs"
        aria-label="Filtrar por tipo de producto"
      >
        {productTypes.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={props.productType === value}
            onClick={() => props.onProductType(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="gender-tabs" aria-label="Filtrar por género">
        {[null, "Hombre", "Mujer", "Unisex"].map((value) => (
          <button
            key={value ?? "todos"}
            type="button"
            aria-pressed={props.gender === value}
            onClick={() => props.onGender(value as Perfume["genero"] | null)}
          >
            {value ?? "Todos"}
          </button>
        ))}
      </div>
      <div
        className="filters-expanded"
        id="catalog-filters"
        hidden={!props.open}
      >
        <div className="filter-selects">
          <label>
            Marca
            <select
              value={props.brand ?? ""}
              onChange={(event) => props.onBrand(event.target.value || null)}
            >
              <option value="">Todas las marcas</option>
              {props.brands.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label>
            Familia olfativa
            <select
              value={props.family ?? ""}
              onChange={(event) =>
                props.onFamily(
                  (event.target.value || null) as OlfactoryFamily | null,
                )
              }
            >
              <option value="">Todas las familias</option>
              {familias.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Ocasión
            <select
              value={props.occasion ?? ""}
              onChange={(event) =>
                props.onOccasion(
                  (event.target.value || null) as Occasion | null,
                )
              }
            >
              <option value="">Todas las ocasiones</option>
              {ocasiones.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="price-filter">
          <div className="price-heading">
            <label htmlFor="budget-range">Tu presupuesto</label>
            <output htmlFor="budget-range">
              Hasta {formatColones(selected)}
            </output>
          </div>
          <input
            id="budget-range"
            type="range"
            min={0}
            max={props.maximum}
            step={1000}
            value={selected}
            onInput={(event) =>
              props.onBudget(Number(event.currentTarget.value))
            }
            onChange={(event) =>
              props.onBudget(Number(event.currentTarget.value))
            }
            aria-label="Precio máximo en colones"
            aria-valuetext={formatColones(selected)}
            style={
              {
                "--range-progress": `${(selected / props.maximum) * 100}%`,
              } as CSSProperties
            }
          />
          <div className="price-limits">
            <span>₡0</span>
            <span>{formatColones(props.maximum)}</span>
          </div>
          <label className="exact-price">
            O ingresa un máximo
            <span>
              ₡
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={props.maximum}
                step={1}
                placeholder="Sin límite"
                value={props.budget ?? ""}
                onChange={(event) =>
                  props.onBudget(
                    event.target.value === ""
                      ? null
                      : Math.max(
                          0,
                          Math.min(props.maximum, Number(event.target.value)),
                        ),
                  )
                }
                aria-label="Presupuesto exacto en colones"
              />
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
