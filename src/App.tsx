import { useEffect, useMemo, useState } from "react";
import { perfumes, familias, ocasiones } from "./data/perfumes";
import type { Occasion, OlfactoryFamily, Perfume } from "./data/perfumes";
import { whatsappUrl } from "./config/store";
import { fetchCatalogPerfumes } from "./lib/catalog";

type SectionId = "inicio" | "catalogo" | "contacto";

const normalizeText = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

function GoldMark() {
  return <span className="brand-mark" aria-hidden="true">EL</span>;
}

function Header({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  return (
    <header className="site-header">
      <button className="brand-lockup" onClick={() => onNavigate("inicio")} aria-label="Ir al inicio">
        <GoldMark /><span>Essence Luxe</span>
      </button>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <button onClick={() => onNavigate("inicio")}>Inicio</button>
        <button onClick={() => onNavigate("catalogo")}>Catálogo</button>
        <button onClick={() => onNavigate("contacto")}>Asesoría</button>
      </nav>
      <button className="header-cta" onClick={() => onNavigate("catalogo")}>Explorar</button>
    </header>
  );
}

function HeroSection({ onExplore, onContact }: { onExplore: () => void; onContact: () => void }) {
  return (
    <section id="inicio" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-reveal delay-1">Curaduría privada · Costa Rica</p>
        <h1 id="hero-title" className="hero-title hero-reveal delay-2">
          Tu presencia,<br /><em>convertida en esencia.</em>
        </h1>
        <p className="hero-subtitle hero-reveal delay-3">
          Fragancias icónicas y de autor, seleccionadas para acompañar cada versión de ti.
        </p>
        <div className="hero-actions hero-reveal delay-4">
          <button className="primary-button" onClick={onExplore}>Descubrir colección</button>
          <button className="text-button" onClick={onContact}>Hablar con un asesor <span>↗</span></button>
        </div>
        <div className="trust-row hero-reveal delay-5" aria-label="Beneficios de la tienda">
          <div><strong>100%</strong><span>Originales</span></div>
          <div><strong>24–48h</strong><span>Entrega nacional</span></div>
          <div><strong>1:1</strong><span>Asesoría privada</span></div>
        </div>
      </div>
      <div className="hero-visual hero-reveal delay-3" aria-hidden="true">
        <div className="hero-image-frame">
          <div className="hero-number">01</div>
          <img
            src="https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=900&h=1200&fit=crop&auto=format&q=90"
            alt=""
            fetchPriority="high"
          />
          <div className="hero-image-shade" />
          <div className="featured-caption">
            <span>Selección de la casa</span><strong>Sauvage Elixir</strong><small>Dior · Amaderado especiado</small>
          </div>
        </div>
        <div className="scent-ring ring-a" /><div className="scent-ring ring-b" />
      </div>
      <button className="scroll-cue" onClick={onExplore} aria-label="Bajar al catálogo">
        <span>Explorar</span><i aria-hidden="true" />
      </button>
    </section>
  );
}

function PerfumeCard({ perfume, onOpen }: { perfume: Perfume; onOpen: () => void }) {
  return (
    <article className="perfume-card">
      <button className="card-image-button" onClick={onOpen} aria-label={`Ver detalles de ${perfume.nombre}`}>
        <img src={perfume.imagen} alt={`${perfume.nombre} de ${perfume.marca}`} loading="lazy" />
        <span className="card-index" aria-hidden="true">{perfume.id.slice(0, 2).toUpperCase()}</span>
        <span className="image-hover-label">Descubrir</span>
      </button>
      <div className="card-body">
        <p>{perfume.marca}</p><h3>{perfume.nombre}</h3>
        <div className="card-bottom">
          <strong>{perfume.precio}</strong>
          <button onClick={onOpen}>Ver detalles <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>
  );
}

function RatingStars({ value }: { value: number }) {
  const rounded = Math.round(value);
  return (
    <div className="rating-stars" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, index) => <span key={index} className={index < rounded ? "filled" : ""}>★</span>)}
    </div>
  );
}

function PerformanceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="performance-row">
      <div><span>{label}</span><small>{value}/5</small></div>
      <div className="performance-track"><i style={{ width: `${value * 20}%` }} /></div>
    </div>
  );
}

function PerfumeDetail({ perfume, onClose }: { perfume: Perfume; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKeyDown); };
  }, [onClose]);

  const message = `Hola, estoy interesado en el perfume ${perfume.nombre} de ${perfume.marca}. Me gustaría conocer precio y disponibilidad.`;

  return (
    <div className="detail-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <button className="detail-close" onClick={onClose} aria-label="Cerrar detalle">×</button>
        <div className="detail-visual">
          <img src={perfume.imagen} alt={`${perfume.nombre} de ${perfume.marca}`} />
          <div className="detail-visual-overlay" />
          <div className="detail-availability"><i className={perfume.disponible ? "available" : "order"} />{perfume.disponible ? "Disponible" : "Bajo pedido"}</div>
          <div className="detail-identity"><p>{perfume.marca}</p><h2 id="detail-title">{perfume.nombre}</h2><strong>{perfume.precio}</strong></div>
        </div>
        <div className="detail-content">
          <section className="detail-intro"><p className="eyebrow">La fragancia</p><p>{perfume.descripcion}</p></section>
          <section>
            <div className="detail-section-heading">
              <div><p className="eyebrow">Perfil olfativo</p><h3>{perfume.familia}</h3></div>
              <div className="rating-summary"><strong>{perfume.valoracion}</strong><RatingStars value={perfume.valoracion} /></div>
            </div>
            <div className="accord-list">{perfume.acordes.map((acorde) => <span key={acorde.nombre}>{acorde.emoji} {acorde.nombre}</span>)}</div>
          </section>
          <section>
            <p className="eyebrow">Pirámide olfativa</p>
            <div className="pyramid-grid">
              {[["Salida", perfume.notasSalida], ["Corazón", perfume.notasCorazon], ["Fondo", perfume.notasFondo]].map(([title, notes]) => (
                <div key={title as string}><span>{title as string}</span>{(notes as string[]).map((note) => <p key={note}>{note}</p>)}</div>
              ))}
            </div>
          </section>
          <section>
            <p className="eyebrow">Rendimiento</p>
            <div className="performance-list"><PerformanceRow label="Duración" value={perfume.duracion} /><PerformanceRow label="Proyección" value={perfume.proyeccion} /><PerformanceRow label="Estela" value={perfume.estela} /></div>
          </section>
          <section className="occasion-section"><p className="eyebrow">Ideal para</p><div>{perfume.ocasiones.map((item) => <span key={item}>{item}</span>)}</div></section>
          <a className="whatsapp-button" href={whatsappUrl(message)} target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span> Consultar disponibilidad</a>
          <p className="response-note">Atención personalizada · Respuesta en menos de 24 horas</p>
        </div>
      </article>
    </div>
  );
}

function FilterGroup<T extends string>({ label, values, active, onChange }: { label: string; values: readonly T[]; active: T | null; onChange: (value: T | null) => void; }) {
  return (
    <div className="filter-group">
      <span>{label}</span>
      <div className="filter-scroll">
        {values.map((value) => <button key={value} className={active === value ? "active" : ""} onClick={() => onChange(active === value ? null : value)} aria-pressed={active === value}>{value}</button>)}
      </div>
    </div>
  );
}

function CatalogSection() {
  const [catalogPerfumes, setCatalogPerfumes] = useState<Perfume[]>(perfumes);
  const [catalogMode, setCatalogMode] = useState<"loading" | "demo" | "live">("loading");
  const [search, setSearch] = useState("");
  const [family, setFamily] = useState<OlfactoryFamily | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [gender, setGender] = useState<Perfume["genero"] | null>(null);
  const [selected, setSelected] = useState<Perfume | null>(null);

  useEffect(() => {
    let active = true;

    fetchCatalogPerfumes()
      .then((records) => {
        if (!active) return;
        if (records.length > 0) {
          setCatalogPerfumes(records);
          setCatalogMode("live");
        } else {
          setCatalogMode("demo");
        }
      })
      .catch(() => {
        if (active) setCatalogMode("demo");
      });

    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const query = normalizeText(search);
    return catalogPerfumes.filter((perfume) => {
      const searchable = [perfume.nombre, perfume.marca, perfume.familia, perfume.descripcion, ...perfume.acordes.map((item) => item.nombre), ...perfume.notasSalida, ...perfume.notasCorazon, ...perfume.notasFondo].map(normalizeText);
      return (!query || searchable.some((item) => item.includes(query))) && (!family || perfume.familia === family) && (!occasion || perfume.ocasiones.includes(occasion)) && (!gender || perfume.genero === gender || perfume.genero === "Unisex");
    });
  }, [catalogPerfumes, search, family, occasion, gender]);

  const hasFilters = Boolean(search || family || occasion || gender);
  const clearFilters = () => { setSearch(""); setFamily(null); setOccasion(null); setGender(null); };

  return (
    <section id="catalogo" className="catalog-section" aria-labelledby="catalog-title">
      {selected && <PerfumeDetail perfume={selected} onClose={() => setSelected(null)} />}
      <div className="section-heading">
        <div><p className="eyebrow">{catalogMode === "live" ? "Colección disponible" : "Vista de demostración"}</p><h2 id="catalog-title">Encuentra la fragancia<br /><em>que habla por ti.</em></h2></div>
        <p>Explora por nombre, casa, notas u ocasión. Cada pieza ha sido seleccionada por su carácter, calidad y presencia.</p>
      </div>
      <div className="catalog-tools">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Prueba “vainilla”, “Dior” o “cítrico”" aria-label="Buscar perfumes" />
          {search && <button onClick={() => setSearch("")} aria-label="Limpiar búsqueda">×</button>}
        </label>
        <div className="filters-panel">
          <FilterGroup label="Para" values={["Hombre", "Mujer", "Unisex"] as const} active={gender} onChange={setGender} />
          <FilterGroup label="Familia" values={familias} active={family} onChange={setFamily} />
          <FilterGroup label="Ocasión" values={ocasiones} active={occasion} onChange={setOccasion} />
        </div>
      </div>
      <div className="results-bar" aria-live="polite">
        <span>{String(filtered.length).padStart(2, "0")} fragancias</span>
        <div>
          {catalogMode !== "live" && <small>{catalogMode === "loading" ? "Conectando…" : "Productos de ejemplo"}</small>}
          {hasFilters && <button onClick={clearFilters}>Limpiar filtros</button>}
        </div>
      </div>
      {filtered.length ? (
        <div className="catalog-grid">{filtered.map((perfume) => <PerfumeCard key={perfume.id} perfume={perfume} onOpen={() => setSelected(perfume)} />)}</div>
      ) : (
        <div className="empty-state"><span>Sin coincidencias</span><h3>Tu próxima esencia puede estar a un filtro de distancia.</h3><button className="primary-button" onClick={clearFilters}>Ver colección completa</button></div>
      )}
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="contact-content">
        <p className="eyebrow">Asesoría privada</p>
        <h2 id="contact-title">No elijas solo un perfume.<br /><em>Elige cómo quieres ser recordado.</em></h2>
        <p>Cuéntanos qué aromas disfrutas, cuándo quieres usarlo y qué presencia buscas. Te ayudamos a encontrar la fragancia indicada.</p>
        <a className="primary-button" href={whatsappUrl("Hola, me gustaría recibir asesoría para elegir un perfume de lujo.")} target="_blank" rel="noreferrer">Iniciar asesoría por WhatsApp <span>↗</span></a>
      </div>
      <div className="service-grid">
        <div><span>01</span><strong>Selección personal</strong><p>Recomendaciones según estilo, notas y ocasión.</p></div>
        <div><span>02</span><strong>Autenticidad</strong><p>Fragancias originales y selladas de fábrica.</p></div>
        <div><span>03</span><strong>Entrega nacional</strong><p>Coordinación segura en todo Costa Rica.</p></div>
      </div>
    </section>
  );
}

function BottomNav({ active, onNavigate }: { active: SectionId; onNavigate: (section: SectionId) => void }) {
  const items: { id: SectionId; label: string; icon: string }[] = [{ id: "inicio", label: "Inicio", icon: "⌂" }, { id: "catalogo", label: "Catálogo", icon: "◇" }, { id: "contacto", label: "Asesoría", icon: "◉" }];
  return <nav className="bottom-nav" aria-label="Navegación móvil">{items.map((item) => <button key={item.id} onClick={() => onNavigate(item.id)} className={active === item.id ? "active" : ""}><span aria-hidden="true">{item.icon}</span><small>{item.label}</small></button>)}</nav>;
}

function Footer() {
  return <footer><div className="brand-lockup"><GoldMark /><span>Essence Luxe</span></div><p>Perfumería de lujo · Costa Rica</p><small>© 2026 Essence Luxe. Todos los derechos reservados.</small></footer>;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");
  const navigateTo = (section: SectionId) => { document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" }); setActiveSection(section); };

  useEffect(() => {
    const sections = (["inicio", "catalogo", "contacto"] as SectionId[]).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id as SectionId);
    }, { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <div className="app-shell"><Header onNavigate={navigateTo} /><main><HeroSection onExplore={() => navigateTo("catalogo")} onContact={() => navigateTo("contacto")} /><CatalogSection /><ContactSection /></main><Footer /><BottomNav active={activeSection} onNavigate={navigateTo} /></div>;
}
