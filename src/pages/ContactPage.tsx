import { whatsappUrl } from "../config/store"

export default function ContactPage() {
  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="contact-content">
        <p className="eyebrow">Asesoría privada</p>
        <h1 id="contact-title">
          No elijas solo un perfume.
          <br />
          <em>Elige cómo quieres ser recordado.</em>
        </h1>
        <p>
          Cuéntanos qué aromas disfrutas, cuándo quieres usarlo y qué presencia
          buscas. Te ayudamos a encontrar la fragancia indicada.
        </p>
        <a
          className="primary-button"
          href={whatsappUrl(
            "Hola, me gustaría recibir asesoría para elegir un perfume de lujo.",
          )}
          target="_blank"
          rel="noreferrer"
        >
          Iniciar asesoría por WhatsApp <span>↗</span>
        </a>
      </div>
      <div className="service-grid">
        <div>
          <span>01</span>
          <strong>Selección personal</strong>
          <p>Recomendaciones según estilo, notas y ocasión.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Autenticidad</strong>
          <p>Fragancias originales y selladas de fábrica.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Entrega nacional</strong>
          <p>Coordinación segura en todo Costa Rica.</p>
        </div>
      </div>
    </section>
  )
}
