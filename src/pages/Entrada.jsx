
import { Link } from 'react-router-dom';

export function Entrada() {
  return (
    <div className="landing-page" id="inicio">
      <header className="landing-header">
        <Link to="/" className="landing-logo">
          <span className="landing-logo-icon">L.</span>
          <span>
            LÚMEN
            <small>ODONTOLOGIA</small>
          </span>
        </Link>

        <nav className="landing-nav">
          <a href="#servicos">Tratamentos</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contato">Contato</a>
        </nav>

        <Link to="/login" className="landing-login">
          Entrar
        </Link>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-content">
            <span className="landing-eyebrow">
              CUIDADO QUE TRANSFORMA
            </span>

            <h1>
              Seu sorriso merece
              <br />
              um novo <em>brilho.</em>
            </h1>

            <p>
              Cuidamos do seu sorriso com delicadeza, tecnologia e
              atenção a cada detalhe. Sua saúde bucal merece esse cuidado.
            </p>

            <div className="landing-actions">
              <Link to="/cadastro" className="landing-button">
                Agendar consulta <span>↗</span>
              </Link>

              <a href="#servicos" className="landing-secondary">
                Conheça nossos tratamentos
              </a>
            </div>

            <div className="landing-note">
              <span className="landing-note-line" />
              Um novo jeito de cuidar de você.
            </div>
          </div>

          <div className="landing-hero-image">
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=85"
              alt="Ambiente de atendimento odontológico"
            />

            <div className="landing-image-caption">
              <span>01 —</span>
              Seu bem-estar em primeiro lugar
            </div>

            <div className="landing-image-decoration">L.</div>
          </div>
        </section>

        <section className="landing-services" id="servicos">
          <div>
            <span className="landing-eyebrow">NOSSO COMPROMISSO</span>
            <h2>
              Cuidado completo,
              <br />
              sorriso <em>confiante.</em>
            </h2>
          </div>

          <p>
            Cada sorriso é único. Por isso, oferecemos atendimento
            personalizado para acompanhar você em todas as etapas do cuidado.
          </p>
        </section>

        <section className="landing-service-grid">
          <article className="landing-service-card">
            <span>01</span>
            <h3>Avaliação odontológica</h3>
            <p>
              Um olhar atento para entender suas necessidades e planejar
              seu tratamento.
            </p>
            <Link to="/login">Saiba mais ↗</Link>
          </article>

          <article className="landing-service-card">
            <span>02</span>
            <h3>Limpeza e prevenção</h3>
            <p>
              Cuidados essenciais para manter a saúde bucal e prevenir
              problemas futuros.
            </p>
            <Link to="/login">Saiba mais ↗</Link>
          </article>

          <article className="landing-service-card">
            <span>03</span>
            <h3>Restauração</h3>
            <p>
              Recuperação da estrutura dentária com atenção à função
              e à estética do sorriso.
            </p>
            <Link to="/login">Saiba mais ↗</Link>
          </article>
        </section>

        <section className="landing-about" id="sobre">
          <span className="landing-eyebrow">LÚMEN ODONTOLOGIA</span>
          <h2>
            Mais do que cuidar de sorrisos,
            <br />
            <em>cuidamos de pessoas.</em>
          </h2>
          <p>
            Acreditamos que uma boa experiência começa com acolhimento,
            escuta e confiança. Queremos que você se sinta à vontade
            em cada visita.
          </p>
          <Link to="/cadastro" className="landing-button">
            Venha nos conhecer <span>↗</span>
          </Link>
        </section>
      </main>

      <footer className="landing-footer" id="contato">
        <Link to="/" className="landing-logo">
          <span className="landing-logo-icon">L.</span>
          <span>
            LÚMEN
            <small>ODONTOLOGIA</small>
          </span>
        </Link>

        <p>Seu sorriso, nosso cuidado.</p>
        <span>© {new Date().getFullYear()} Lúmen Odontologia</span>
      </footer>
    </div>
  );
}
