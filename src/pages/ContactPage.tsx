import Icon from "../components/atoms/Icon";
import { whatsappUrl } from "../config/store";
const questions = [
  [
    "¿Cómo puedo comprar?",
    "Explora la colección y abre una fragancia. Con “Consultar disponibilidad” nos escribes por WhatsApp con el nombre del perfume. Confirmamos precio, presentación y disponibilidad antes de coordinar tu compra.",
  ],
  [
    "¿Me ayudan a elegir una fragancia?",
    "Sí. Cuéntanos qué aromas te gustan, para qué ocasión lo buscas y tu presupuesto en colones. A partir de eso te orientamos de forma personalizada.",
  ],
  [
    "¿Cómo se coordina la entrega?",
    "La zona de entrega, el costo y el plazo se confirman por WhatsApp antes de realizar la compra. Escríbenos con tu ubicación en Costa Rica.",
  ],
  [
    "¿Los perfumes de muestra están a la venta?",
    "Si ves el aviso “Colección de muestra”, estás explorando ejemplos, no existencias ni precios confirmados. Consulta por WhatsApp el catálogo real disponible.",
  ],
];
export default function ContactPage() {
  return (
    <div className="contact-page container page-enter">
      <section className="contact-intro">
        <div>
          <p className="eyebrow">ATENCIÓN PERSONAL · COSTA RICA</p>
          <h1>
            Tu próxima esencia
            <br />
            <em>empieza aquí.</em>
          </h1>
          <p className="page-description">
            Elegir un perfume es algo personal.
            <br />
            Nos tomamos el tiempo de ayudarte a encontrarlo.
          </p>
        </div>
        <span className="contact-monogram" aria-hidden="true">
          <img src="/images/brand-mark.webp" alt="" width="240" height="240" />
        </span>
      </section>
      <section
        className="contact-grid"
        aria-label="Contactar y recibir asesoría"
      >
        <div className="contact-card">
          <span className="contact-icon">
            <Icon name="message" />
          </span>
          <p className="eyebrow">HABLEMOS POR WHATSAPP</p>
          <h2>
            Una conversación.
            <br />
            Muchas posibilidades.
          </h2>
          <p>
            Disponibilidad, precios, recomendaciones y entrega.
            <br />
            Todo empieza con un hola.
          </p>
          <a
            className="button button-gold"
            href={whatsappUrl(
              "Hola, me gustaría recibir asesoría para encontrar mi próxima fragancia.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Iniciar conversación <Icon name="arrow" />
          </a>
          <a className="contact-phone" href="tel:+50686139525">
            +506 8613 9525
          </a>
        </div>
        <div className="contact-steps">
          <p className="eyebrow">ASÍ DE PERSONAL. ASÍ DE SIMPLE.</p>
          {[
            [
              "01",
              "Cuéntanos qué te inspira",
              "Tus notas favoritas, tu estilo o esa ocasión especial.",
            ],
            [
              "02",
              "Descubramos tu esencia",
              "Te acompañamos a explorar las opciones y resolver tus dudas.",
            ],
            [
              "03",
              "Coordinamos los detalles",
              "Confirmamos disponibilidad, precio y entrega contigo.",
            ],
          ].map(([number, title, description]) => (
            <div key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="contact-faq">
        <div>
          <p className="eyebrow">ANTES DE ESCRIBIRNOS</p>
          <h2>
            Los pequeños
            <br />
            <em>detalles.</em>
          </h2>
        </div>
        <div>
          {questions.map(([title, answer]) => (
            <details key={title}>
              <summary>
                {title}
                <Icon name="plus" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
