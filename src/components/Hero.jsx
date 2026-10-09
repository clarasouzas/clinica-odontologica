import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          CUIDADO EM CADA DETALHE
        </span>

        <h1>
          Seu sorriso merece
          <br />
          um novo <em>brilho.</em>
        </h1>

        <p>
          Cuidamos do seu sorriso com delicadeza,
          tecnologia e um olhar especial para você.
        </p>

        <div className="hero-actions">
          <Link to="/login" className="button-primary">
            Agende sua consulta <span>↗</span>
          </Link>

          <a href="#servicos" className="button-secondary">
            Conheça a clínica
          </a>
        </div>

        <div className="hero-note">
          <span>✳</span>
          Um cuidado que vai além do sorriso.
        </div>
      </div>

      <div className="hero-visual">
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=85"
          alt="Ambiente de atendimento odontológico"
        />

        <div className="hero-badge">
          <span className="badge-icon">✳</span>
          <div>
            <strong>Seu bem-estar</strong>
            <small>em primeiro lugar</small>
          </div>
        </div>

        <span className="hero-image-caption">
          CUIDADO • CONFIANÇA • BEM-ESTAR
        </span>
      </div>
    </section>
  );
}