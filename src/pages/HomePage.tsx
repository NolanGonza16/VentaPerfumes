import Icon from "../components/atoms/Icon";
const families = [
  {
    name: "Amaderado",
    title: "Profundidad que cautiva.",
    notes: "Sándalo · Cedro · Vetiver",
    number: "01",
  },
  {
    name: "Floral",
    title: "Delicadeza con carácter.",
    notes: "Rosa · Jazmín · Iris",
    number: "02",
  },
  {
    name: "Fresco",
    title: "Una nueva perspectiva.",
    notes: "Bergamota · Brisa · Neroli",
    number: "03",
  },
];
export default function HomePage() {
  return (
    <div className="home-page page-enter">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> COSTA RICA · PERFUMERÍA SELECTA
          </p>
          <h1 id="hero-title">
            El arte de
            <br />
            <em>dejar huella.</em>
          </h1>
          <p className="hero-description">
            Hay aromas que se llevan.
            <br />Y otros que se convierten en parte de ti.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="/catalogo">
              Explorar la colección <Icon name="arrow" />
            </a>
            <a className="text-link" href="/contacto">
              Encuentra tu esencia <Icon name="arrow-up-right" />
            </a>
          </div>
          <div className="hero-footnote">
            <span className="tiny-seal">EL</span>
            <p>
              Una elección personal.
              <br />
              <span>Una experiencia extraordinaria.</span>
            </p>
          </div>
        </div>
        <figure className="hero-visual">
          <img
            src="/images/essence-campaign.webp"
            srcSet="/images/essence-campaign-640.webp 640w, /images/essence-campaign.webp 1122w"
            sizes="(max-width: 767px) 100vw, 52vw"
            width="1122"
            height="1402"
            alt="Frasco ámbar Essence Luxe sobre piedra travertino, iluminado por luz dorada"
            fetchPriority="high"
          />
          <div className="hero-image-top">
            <span>ESSENCE LUXE</span>
            <span>THE ART OF SCENT</span>
          </div>
          <figcaption>
            <span>Más que una fragancia.</span>
            <small>Una forma de ser.</small>
          </figcaption>
          <span className="image-editorial">
            IMAGEN DE CAMPAÑA · CONCEPTO VISUAL
          </span>
        </figure>
      </section>
      <div className="brand-values">
        <span>
          <Icon name="check" />
          Exploración a tu medida
        </span>
        <span>
          <Icon name="message" />
          Asesoría personal
        </span>
        <span>
          <Icon name="grid" />
          Notas, carácter y detalles
        </span>
      </div>
      <section
        className="scent-worlds container"
        aria-labelledby="worlds-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">EL LENGUAJE DE LOS AROMAS</p>
            <h2 id="worlds-title">
              Cada esencia,
              <br />
              <em>un universo.</em>
            </h2>
          </div>
          <p>
            Tu personalidad tiene muchos matices.
            <br />
            Tu fragancia también.
          </p>
        </div>
        <div className="world-grid">
          {families.map((family) => (
            <a
              key={family.name}
              className={`world-card world-${family.number}`}
              href={`/catalogo?familia=${encodeURIComponent(family.name)}`}
            >
              <div className="world-top">
                <span>{family.number} / FAMILIA OLFATIVA</span>
                <Icon name="arrow" />
              </div>
              <div>
                <p>{family.name}</p>
                <h3>{family.title}</h3>
                <small>{family.notes}</small>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="home-invitation container">
        <p className="eyebrow">EL TOQUE FINAL ERES TÚ</p>
        <h2>
          No busques un perfume.
          <br />
          <em>Encuentra el tuyo.</em>
        </h2>
        <a className="text-link" href="/contacto">
          Hablemos de tu próxima esencia <Icon name="arrow" />
        </a>
      </section>
    </div>
  );
}
