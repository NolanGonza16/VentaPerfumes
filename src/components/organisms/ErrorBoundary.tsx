import { Component } from "react";
import type { ReactNode } from "react";
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <section className="empty-state" role="alert">
          <p className="eyebrow">Un pequeño contratiempo</p>
          <h1>No pudimos cargar esta vista.</h1>
          <p>Tu conexión puede haberse interrumpido. Inténtalo de nuevo.</p>
          <button
            className="button button-gold"
            onClick={() => window.location.reload()}
          >
            Volver a cargar
          </button>
        </section>
      );
    return this.props.children;
  }
}
