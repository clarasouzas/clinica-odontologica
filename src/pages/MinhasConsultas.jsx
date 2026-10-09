
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, mensagemDeErro } from '../api/client';

export function MinhasConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    let ativo = true;

    async function carregarConsultas() {
      setCarregando(true);
      setErro('');

      try {
        const resposta = await api('/agendamentos/');
        const lista = Array.isArray(resposta)
          ? resposta
          : resposta.results || [];

        if (ativo) setConsultas(lista);
      } catch (error) {
        if (ativo) setErro(mensagemDeErro(error));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarConsultas();

    return () => {
      ativo = false;
    };
  }, []);

  function formatarData(valor) {
    if (!valor) return 'Data não informada';

    const data = new Date(`${valor}`.includes('T') ? valor : `${valor}T12:00:00`);

    if (Number.isNaN(data.getTime())) return valor;

    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  function obterStatus(consulta) {
    const status = String(consulta.status || '').toLowerCase();

    if (['concluido', 'concluída', 'concluida', 'concluído'].includes(status)) {
      return { texto: 'Concluída', classe: 'concluida' };
    }

    if (['cancelado', 'cancelada', 'cancelado pelo paciente'].includes(status)) {
      return { texto: 'Cancelada', classe: 'cancelada' };
    }

    if (['confirmado', 'confirmada'].includes(status)) {
      return { texto: 'Confirmada', classe: 'confirmada' };
    }

    return { texto: 'Aguardando confirmação', classe: 'pendente' };
  }

  function nomeServico(consulta) {
    if (typeof consulta.servico === 'object' && consulta.servico !== null) {
      return consulta.servico.nome || 'Consulta odontológica';
    }

    return consulta.servico_nome || 'Consulta odontológica';
  }

  function nomeDentista(consulta) {
    if (typeof consulta.recurso === 'object' && consulta.recurso !== null) {
      return consulta.recurso.nome || 'Profissional da clínica';
    }

    return consulta.recurso_nome || consulta.dentista_nome || 'Profissional da clínica';
  }

  const consultasFiltradas = consultas.filter((consulta) => {
    if (filtro === 'todas') return true;

    const status = obterStatus(consulta);

    if (filtro === 'proximas') {
      return !['concluida', 'cancelada'].includes(status.classe);
    }

    return ['concluida', 'cancelada'].includes(status.classe);
  });

  return (
    <main className="minhas-consultas">
      <header className="minhas-consultas-cabecalho">
        <div>
          <span className="minhas-consultas-etiqueta">SEU CUIDADO, SEMPRE</span>
          <h1>Minhas consultas</h1>
          <p>Acompanhe seus agendamentos e o histórico do seu sorriso.</p>
        </div>

        <Link to="/agendar" className="minhas-consultas-agendar">
          <span>+</span> Agendar consulta
        </Link>
      </header>

      <nav className="minhas-consultas-filtros" aria-label="Filtrar consultas">
        {[
          { valor: 'todas', texto: 'Todas' },
          { valor: 'proximas', texto: 'Próximas' },
          { valor: 'historico', texto: 'Histórico' },
        ].map((opcao) => (
          <button
            key={opcao.valor}
            type="button"
            className={filtro === opcao.valor ? 'ativo' : ''}
            onClick={() => setFiltro(opcao.valor)}
          >
            {opcao.texto}
          </button>
        ))}
      </nav>

      {carregando && (
        <div className="minhas-consultas-mensagem">
          Carregando suas consultas...
        </div>
      )}

      {!carregando && erro && (
        <div className="minhas-consultas-erro" role="alert">
          <p>{erro || 'Não foi possível carregar suas consultas.'}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && consultasFiltradas.length === 0 && (
        <section className="minhas-consultas-vazio">
          <span className="minhas-consultas-icone">✳</span>
          <h2>Nenhuma consulta por aqui</h2>
          <p>
            {filtro === 'historico'
              ? 'Quando suas consultas forem concluídas ou canceladas, elas aparecerão aqui.'
              : 'Que tal marcar sua próxima visita e manter seu sorriso em dia?'}
          </p>

          <Link to="/agendar">Encontrar um horário ↗</Link>
        </section>
      )}

      {!carregando && !erro && consultasFiltradas.length > 0 && (
        <section className="minhas-consultas-lista">
          {consultasFiltradas.map((consulta) => {
            const status = obterStatus(consulta);

            return (
              <article
                className="minhas-consultas-card"
                key={consulta.id}
              >
                <div className="minhas-consultas-data">
                  <span>
                    {consulta.data
                      ? formatarData(consulta.data).split(' de ')[0]
                      : '--'}
                  </span>
                  <small>
                    {consulta.data
                      ? formatarData(consulta.data).split(' de ').slice(1).join(' de ')
                      : 'Data pendente'}
                  </small>
                </div>

                <div className="minhas-consultas-info">
                  <h2>{nomeServico(consulta)}</h2>
                  <p>{nomeDentista(consulta)}</p>

                  <div className="minhas-consultas-detalhes">
                    <span>◷ {consulta.horario || consulta.hora || 'Horário a confirmar'}</span>
                  </div>
                </div>

                <div className="minhas-consultas-acoes">
                  <span className={`minhas-consultas-status ${status.classe}`}>
                    {status.texto}
                  </span>

                  <Link to={`/consultas/${consulta.id}`}>
                    Ver detalhes ↗
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  )
}
