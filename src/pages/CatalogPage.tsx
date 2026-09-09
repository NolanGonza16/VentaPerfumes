import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { familias } from "../data/perfumes";
import type { Occasion, OlfactoryFamily, Perfume } from "../data/perfumes";
import useCatalog from "../hooks/useCatalog";
import { filterPerfumes, formatColones, getPriceBounds } from "../lib/prices";
import type { CatalogSort } from "../lib/prices";
import PerfumeCard from "../components/molecules/PerfumeCard";
import PerfumeDetail from "../components/organisms/PerfumeDetail";
import CatalogFilters from "../components/organisms/CatalogFilters";
import Icon from "../components/atoms/Icon";

export default function CatalogPage() {
  const catalog = useCatalog();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [family, setFamily] = useState<OlfactoryFamily | null>(() => {
    const value = new URLSearchParams(window.location.search).get("familia");
    return familias.find((item) => item === value) ?? null;
  });
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [gender, setGender] = useState<Perfume["genero"] | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [sort, setSort] = useState<CatalogSort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<Perfume | null>(null);
  const closeDetails = useCallback(() => setSelected(null), []);
  const bounds = useMemo(
    () => getPriceBounds(catalog.perfumes),
    [catalog.perfumes],
  );
  const results = useMemo(
    () =>
      filterPerfumes(catalog.perfumes, {
        query: deferredSearch,
        family,
        occasion,
        gender,
        maximumPrice: budget,
        sort,
      }),
    [catalog.perfumes, deferredSearch, family, occasion, gender, budget, sort],
  );
  const hasFilters = !!(
    search ||
    family ||
    occasion ||
    gender ||
    budget !== null
  );
  function clearFilters() {
    setSearch("");
    setFamily(null);
    setOccasion(null);
    setGender(null);
    setBudget(null);
  }

  return (
    <section
      className="catalog-page container page-enter"
      aria-labelledby="catalog-title"
    >
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">LA COLECCIÓN</p>
          <h1 id="catalog-title">
            Una esencia.<em> Muy tuya.</em>
          </h1>
        </div>
        <p>Descubre el aroma de tu próxima historia.</p>
      </div>
      <CatalogFilters
        search={search}
        family={family}
        occasion={occasion}
        gender={gender}
        budget={budget}
        maximum={bounds.maximum}
        open={filtersOpen}
        onSearch={setSearch}
        onFamily={setFamily}
        onOccasion={setOccasion}
        onGender={setGender}
        onBudget={setBudget}
        onToggle={() => setFiltersOpen((value) => !value)}
      />
      {catalog.mode === "offline" && (
        <div className="connection-notice" role="status">
          <p>
            No pudimos actualizar el catálogo.{" "}
            {catalog.source === "cache"
              ? "Estás viendo la última versión cargada."
              : "Intenta conectarte nuevamente."}
          </p>
          <button onClick={catalog.retry}>
            Reintentar <Icon name="arrow" />
          </button>
        </div>
      )}
      <div className="results-bar">
        <p role="status" aria-live="polite">
          {catalog.loading
            ? "Cargando colección…"
            : `${results.length} ${results.length === 1 ? "fragancia" : "fragancias"}`}
        </p>
        <label>
          Ordenar por
          <select
            aria-label="Ordenar perfumes"
            value={sort}
            onChange={(event) => setSort(event.target.value as CatalogSort)}
          >
            <option value="featured">Selección de la casa</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre: A–Z</option>
          </select>
        </label>
      </div>
      {hasFilters && (
        <div className="active-filters">
          {family && (
            <button onClick={() => setFamily(null)}>
              {family}
              <Icon name="close" />
            </button>
          )}
          {occasion && (
            <button onClick={() => setOccasion(null)}>
              {occasion}
              <Icon name="close" />
            </button>
          )}
          {budget !== null && (
            <button onClick={() => setBudget(null)}>
              Hasta {formatColones(budget)}
              <Icon name="close" />
            </button>
          )}
          <button className="clear-filters" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
      )}
      {catalog.loading && !catalog.perfumes.length ? (
        <div className="catalog-grid" aria-hidden="true">
          {[1, 2, 3, 4].map((value) => (
            <div className="skeleton-card" key={value} />
          ))}
        </div>
      ) : results.length ? (
        <div className="catalog-grid" aria-busy={search !== deferredSearch}>
          {results.map((perfume, index) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              index={index}
              onOpen={() => setSelected(perfume)}
            />
          ))}
        </div>
      ) : !catalog.perfumes.length ? (
        <div className="empty-state">
          <p className="eyebrow">LA NUEVA COLECCIÓN</p>
          <h2>Estamos preparando cada detalle.</h2>
          <p>
            Pronto podrás explorar nuestro catálogo. Mientras tanto, consulta
            por tu fragancia favorita.
          </p>
          <a className="button button-gold" href="/contacto">
            Consultar una fragancia <Icon name="arrow" />
          </a>
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" />
          <p className="eyebrow">SIN COINCIDENCIAS</p>
          <h2>Otra nota. Otra posibilidad.</h2>
          <p>Prueba con otra marca, aroma o un presupuesto diferente.</p>
          <button className="button button-gold" onClick={clearFilters}>
            Ver toda la colección <Icon name="arrow" />
          </button>
        </div>
      )}
      <div className="catalog-assistance">
        <span>¿Todavía no encuentras tu esencia?</span>
        <a className="text-link" href="/contacto">
          Te ayudamos a elegir <Icon name="arrow" />
        </a>
      </div>
      {selected && (
        <PerfumeDetail
          perfume={selected}
          onClose={closeDetails}
          isDemo={catalog.isDemo}
        />
      )}
    </section>
  );
}
