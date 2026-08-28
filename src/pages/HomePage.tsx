export default function HomePage({
  onExplore,
  onContact,
}: {
  onExplore: () => void
  onContact: () => void
}) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-reveal delay-1">
          Curaduría privada · Costa Rica
        </p>
        <h1 id="hero-title" className="hero-title hero-reveal delay-2">
          Tu presencia,
          <br />
          <em>convertida en esencia.</em>
        </h1>
        <p className="hero-subtitle hero-reveal delay-3">
          Fragancias icónicas y de autor, seleccionadas para acompañar cada
          versión de ti.
        </p>
        <div className="hero-actions hero-reveal delay-4">
          <button className="primary-button" onClick={onExplore}>
            Descubrir colección
          </button>
          <button className="text-button" onClick={onContact}>
            Hablar con un asesor <span>↗</span>
          </button>
        </div>
        <div
          className="trust-row hero-reveal delay-5"
          aria-label="Beneficios de la tienda"
        >
          <div>
            <strong>100%</strong>
            <span>Originales</span>
          </div>
          <div>
            <strong>24–48h</strong>
            <span>Entrega nacional</span>
          </div>
          <div>
            <strong>1:1</strong>
            <span>Asesoría privada</span>
          </div>
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
            <span>Selección de la casa</span>
            <strong>Sauvage Elixir</strong>
            <small>Dior · Amaderado especiado</small>
          </div>
        </div>
        <div className="scent-ring ring-a" />
        <div className="scent-ring ring-b" />
      </div>
      <button
        className="scroll-cue"
        onClick={onExplore}
        aria-label="Ir al catálogo"
      >
        <span>Explorar</span>
        <i aria-hidden="true" />
      </button>
    </section>
  )
}
