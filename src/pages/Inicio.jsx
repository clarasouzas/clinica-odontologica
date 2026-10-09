
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export function Inicio() {
  const { usuario } = useAuth();

  const nome = usuario?.nome?.split(' ')[0] || 'Paciente';

  return (
    <main className="inicio-page">
      <section className="inicio-welcome">
        <span className="landing-eyebrow">ÁREA DO PACIENTE</span>

        <h1>
          Olá, {nome}.
          <br />
          Como está seu <em>sorriso?</em>
        </h1>

        <p>
          Que bom ter você aqui! Acompanhe suas consultas e cuide
          da sua saúde bucal com praticidade.
        </p>

        <Link to="/agendar" className="landing-button">
          Agendar consulta <span>↗</span>
        </Link>
      </section>

      <section className="inicio-actions">
        <Link to="/agendar" className="inicio-card">
          <span className="inicio-card-number">01</span>
          <h2>Agendar consulta</h2>
          <p>Escolha o tratamento, o dentista e o melhor horário.</p>
          <span className="inicio-card-link">Fazer agendamento ↗</span>
        </Link>

        <Link to="/consultas" className="inicio-card">
          <span className="inicio-card-number">02</span>
          <h2>Minhas consultas</h2>
          <p>Consulte seus agendamentos e acompanhe seus atendimentos.</p>
          <span className="inicio-card-link">Ver consultas ↗</span>
        </Link>

        <Link to="/dentistas" className="inicio-card">
          <span className="inicio-card-number">03</span>
          <h2>Nossos dentistas</h2>
          <p>Conheça os profissionais e suas especialidades.</p>
          <span className="inicio-card-link">Conhecer equipe ↗</span>
        </Link>

        <Link to="/perfil" className="inicio-card">
          <span className="inicio-card-number">04</span>
          <h2>Meu perfil</h2>
          <p>Confira seus dados e gerencie sua conta.</p>
          <span className="inicio-card-link">Acessar perfil ↗</span>
        </Link>
      </section>
    </main>
  );
}
