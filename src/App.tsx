import { lazy, Suspense, useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Icon from "./components/atoms/Icon";
import ErrorBoundary from "./components/organisms/ErrorBoundary";

const HomePage = lazy(() => import("./pages/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const navigation = [
  { path: "/", label: "Inicio", icon: "home" },
  { path: "/catalogo", label: "Catálogo", icon: "grid" },
  { path: "/contacto", label: "Contacto", icon: "message" },
] as const;

function Brand() {
  return (
    <span className="brand">
      <img src="/images/brand-mark.webp" alt="" width="48" height="48" />
      <span>
        ESSENCE LUXE<small>PERFUMERÍA SELECTA</small>
      </span>
    </span>
  );
}

export default function App() {
  const [location, setLocation] = useState(
    () => window.location.pathname + window.location.search,
  );
  const pathname = location.split("?")[0].replace(/\/+$/, "") || "/";
  const knownPage = navigation.find((item) => item.path === pathname);
  useEffect(() => {
    const onPopState = () =>
      setLocation(window.location.pathname + window.location.search);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    document.title = `${knownPage?.label ?? "Página no encontrada"} | Essence Luxe`;
  }, [knownPage]);

  function handleNavigation(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = (event.target as Element).closest("a");
    if (!link || link.target || link.hasAttribute("download")) return;
    const url = new URL(link.href);
    if (
      url.origin !== window.location.origin ||
      url.hash ||
      !navigation.some((item) => item.path === url.pathname)
    )
      return;
    event.preventDefault();
    const next = url.pathname + url.search;
    if (next === location) return;
    window.history.pushState(null, "", next);
    setLocation(next);
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }

  return (
    <div className="app-shell" onClick={handleNavigation}>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <header className="site-header">
        <a href="/" className="brand-link" aria-label="Essence Luxe, inicio">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a
              key={item.path}
              href={item.path}
              aria-current={pathname === item.path ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-link" href="/catalogo">
          Descubrir <Icon name="arrow" />
        </a>
      </header>
      <main id="main-content" tabIndex={-1}>
        <ErrorBoundary key={location}>
          <Suspense
            fallback={
              <div className="page-loading" role="status">
                <span className="loading-ring" />
                Preparando tu experiencia…
              </div>
            }
          >
            {pathname === "/" ? (
              <HomePage />
            ) : pathname === "/catalogo" ? (
              <CatalogPage key={location} />
            ) : pathname === "/contacto" ? (
              <ContactPage />
            ) : (
              <section className="empty-state">
                <p className="eyebrow">404 · Un camino diferente</p>
                <h1>Volvamos a tu esencia.</h1>
                <a className="button button-gold" href="/">
                  Ir al inicio <Icon name="arrow" />
                </a>
              </section>
            )}
          </Suspense>
        </ErrorBoundary>
      </main>
      <footer className="site-footer">
        <a className="brand-link" href="/" aria-label="Essence Luxe, inicio">
          <Brand />
        </a>
        <p>Una esencia. Tu firma personal.</p>
        <small>© {new Date().getFullYear()} Essence Luxe · Costa Rica</small>
      </footer>
      <nav className="bottom-nav" aria-label="Navegación móvil">
        {navigation.map((item) => (
          <a
            key={item.path}
            href={item.path}
            aria-current={pathname === item.path ? "page" : undefined}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
