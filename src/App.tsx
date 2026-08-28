import { useCallback, useEffect, useState } from "react"
import { storeConfig } from "./config/store"
import CatalogPage from "./pages/CatalogPage"
import ContactPage from "./pages/ContactPage"
import HomePage from "./pages/HomePage"

type PageId = "inicio" | "catalogo" | "contacto"

const pagePaths: Record<PageId, string> = {
  inicio: "/",
  catalogo: "/catalogo",
  contacto: "/contacto",
}

const pageTitles: Record<PageId, string> = {
  inicio: "Essence Luxe | Perfumería de lujo",
  catalogo: "Catálogo | Essence Luxe",
  contacto: "Asesoría | Essence Luxe",
}

function pageFromPath(pathname: string): PageId {
  const cleanPath = pathname.replace(/\/+$/, "") || "/"
  if (cleanPath === "/catalogo") return "catalogo"
  if (cleanPath === "/contacto") return "contacto"
  return "inicio"
}

function GoldMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src={storeConfig.brandLogoUrl} alt="" />
    </span>
  )
}

function Header({
  active,
  onNavigate,
}: {
  active: PageId
  onNavigate: (page: PageId) => void
}) {
  const navItems: { id: PageId label: string }[] = [
    { id: "inicio", label: "Inicio" },
    { id: "catalogo", label: "Catálogo" },
    { id: "contacto", label: "Asesoría" },
  ]

  return (
    <header className="site-header">
      <button
        className="brand-lockup"
        onClick={() => onNavigate("inicio")}
        aria-label="Ir al inicio"
      >
        <GoldMark />
        <span>Essence Luxe</span>
      </button>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => onNavigate(item.id)}
            aria-current={active === item.id ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className="header-cta" onClick={() => onNavigate("catalogo")}>
        Explorar
      </button>
    </header>
  )
}

function BottomNav({
  active,
  onNavigate,
}: {
  active: PageId
  onNavigate: (page: PageId) => void
}) {
  const items: { id: PageId label: string icon: string }[] = [
    { id: "inicio", label: "Inicio", icon: "⌂" },
    { id: "catalogo", label: "Catálogo", icon: "◇" },
    { id: "contacto", label: "Asesoría", icon: "◉" },
  ]

  return (
    <nav className="bottom-nav" aria-label="Navegación móvil">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={active === item.id ? "active" : ""}
          aria-current={active === item.id ? "page" : undefined}
        >
          <span aria-hidden="true">{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <button
        className="brand-lockup"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <GoldMark />
        <span>Essence Luxe</span>
      </button>
      <p>Perfumería de lujo · Costa Rica</p>
      <small>© 2026 Essence Luxe. Todos los derechos reservados.</small>
    </footer>
  )
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() =>
    pageFromPath(window.location.pathname),
  )

  const navigateTo = useCallback((page: PageId) => {
    const nextPath = pagePaths[page]
    if (window.location.pathname !== nextPath)
      window.history.pushState({ page }, "", nextPath)
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(pageFromPath(window.location.pathname))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    document.title = pageTitles[activePage]
  }, [activePage])

  return (
    <div className="app-shell">
      <Header active={activePage} onNavigate={navigateTo} />
      <main className="page-view" key={activePage}>
        {activePage === "inicio" && (
          <HomePage
            onExplore={() => navigateTo("catalogo")}
            onContact={() => navigateTo("contacto")}
          />
        )}
        {activePage === "catalogo" && <CatalogPage />}
        {activePage === "contacto" && <ContactPage />}
      </main>
      <Footer />
      <BottomNav active={activePage} onNavigate={navigateTo} />
    </div>
  )
}
