
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  buscarTodas,
  mensagemDeErro,
} from '../../api/client';

export function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarAvaliacoes() {
    setCarregando(true);
    setErro('');

    try {
      const dados = await buscarTodas('/avaliacoes/');
      setAvaliacoes(dados);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  function notaDaAvaliacao(item) {
    return item.nota ?? item.avaliacao ?? null;
  }

  function nomePaciente(item) {
    return (
      item.paciente_nome ||
      item.paciente?.nome ||
      item.usuario?.nome ||
      item.nome_paciente ||
      'Paciente'
    );
  }

  function nomeServico(item) {
    return (
      item.servico_nome ||
      item.servico?.nome ||
      item.agendamento?.servico?.nome ||
      ''
    );
  }

  function comentario(item) {
    return (
      item.comentario ||
      item.descricao ||
      item.mensagem ||
      'Nenhum comentário informado.'
    );
  }

  function dataAvaliacao(item) {
    const valor = item.criado_em || item.data || item.created_at;

    if (!valor) return 'Data não informada';

    const data = new Date(valor);

    if (Number.isNaN(data.getTime())) return String(valor);

    return data.toLocaleDateString('pt-BR');
  }

  const notas = avaliacoes
    .map(notaDaAvaliacao)
    .filter((nota) => nota !== null && nota !== '')
    .map(Number)
    .filter(Number.isFinite);

  const media =
    notas.length > 0
      ? notas.reduce((total, nota) => total + nota, 0) / notas.length
      : null;

  return (
    <main className="avaliacoes-admin">
      <header className="avaliacoes-admin-cabecalho">
        <div>
          <span className="avaliacoes-admin-eyebrow">
            PAINEL ADMINISTRATIVO
          </span>
          <h1>Avaliações</h1>
          <p>
            Acompanhe as opiniões dos pacientes sobre os atendimentos.
          </p>
        </div>

        <Link to="/admin/agenda" className="avaliacoes-admin-voltar">
          ← Voltar à agenda
        </Link>
      </header>

      {erro && (
        <div className="avaliacoes-admin-erro" role="alert">
          <p>{erro}</p>
          <button onClick={carregarAvaliacoes}>
            Tentar novamente
          </button>
        </div>
      )}

      <section className="avaliacoes-admin-resumo">
        <article>
          <span>Total de avaliações</span>
          <strong>{carregando ? '—' : avaliacoes.length}</strong>
        </article>

        <article>
          <span>Média das notas</span>
          <strong>
            {carregando
              ? '—'
              : media === null
                ? '—'
                : `${media.toLocaleString('pt-BR', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })} / 5`}
          </strong>
        </article>
      </section>

      <section className="avaliacoes-admin-lista-secao">
        <div className="avaliacoes-admin-titulo">
          <h2>Opiniões dos pacientes</h2>
          <p>Feedbacks registrados na plataforma.</p>
        </div>

        {carregando && (
          <p className="avaliacoes-admin-vazio">
            Carregando avaliações...
          </p>
        )}

        {!carregando && !erro && avaliacoes.length === 0 && (
          <div className="avaliacoes-admin-vazio">
            <span>☆</span>
            <h3>Ainda não há avaliações</h3>
            <p>
              As opiniões dos pacientes aparecerão aqui quando forem
              registradas.
            </p>
          </div>
        )}

        {!carregando && avaliacoes.length > 0 && (
          <div className="avaliacoes-admin-lista">
            {avaliacoes.map((item) => {
              const nota = notaDaAvaliacao(item);

              return (
                <article
                  className="avaliacoes-admin-card"
                  key={item.id}
                >
                  <div className="avaliacoes-admin-card-topo">
                    <div className="avaliacoes-admin-avatar">
                      {nomePaciente(item).charAt(0).toUpperCase()}
                    </div>

                    <div className="avaliacoes-admin-paciente">
                      <h3>{nomePaciente(item)}</h3>
                      <span>{dataAvaliacao(item)}</span>
                    </div>

                    {nota !== null && nota !== '' && (
                      <div
                        className="avaliacoes-admin-nota"
                        aria-label={`Nota ${nota}`}
                      >
                        <span>★</span> {nota}
                      </div>
                    )}
                  </div>

                  {nomeServico(item) && (
                    <p className="avaliacoes-admin-servico">
                      {nomeServico(item)}
                    </p>
                  )}

                  <p className="avaliacoes-admin-comentario">
                    {comentario(item)}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
