import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  api,
  buscarTodas,
  mensagemDeErro,
} from '../../api/client';

export function AConfirmar() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [processando, setProcessando] = useState(null);

  async function carregarAgendamentos() {
    setCarregando(true);
    setErro('');

    try {
      const dados = await buscarTodas('/agendamentos/');

      const pendentes = dados.filter((item) => {
        const status = String(item.status || '').toLowerCase();

        return [
          'pendente',
          'aguardando_confirmacao',
          'aguardando confirmação',
        ].includes(status);
      });

      setAgendamentos(pendentes);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  async function confirmarAgendamento(id) {
    setProcessando(id);
    setErro('');

    try {
      await api(`/agendamentos/${id}/confirmar/`, {
        method: 'POST',
      });

      setAgendamentos((atuais) =>
        atuais.filter((item) => item.id !== id)
      );
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setProcessando(null);
    }
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
      'Serviço não informado'
    );
  }

  function formatarData(valor) {
    if (!valor) return 'Data não informada';

    const partes = String(valor).slice(0, 10).split('-');

    if (partes.length !== 3) return valor;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function dataAgendamento(item) {
    return item.data || item.data_hora || '';
  }

  function horarioAgendamento(item) {
    if (item.horario) return String(item.horario).slice(0, 5);

    if (item.data_hora) {
      return String(item.data_hora).slice(11, 16) || '—';
    }

    return '—';
  }

  return (
    <main className="admin-confirmar">
      <header className="admin-confirmar-cabecalho">
        <div>
          <span className="admin-confirmar-eyebrow">
            PAINEL ADMINISTRATIVO
          </span>
          <h1>Confirmações</h1>
          <p>
            Revise os pedidos e confirme os próximos atendimentos.
          </p>
        </div>

        <Link className="admin-confirmar-voltar" to="/admin/agenda">
          ← Voltar à agenda
        </Link>
      </header>

      <section className="admin-confirmar-resumo">
        <div>
          <span>Pedidos aguardando</span>
          <strong>
            {carregando ? '—' : agendamentos.length}
          </strong>
        </div>

        <button
          type="button"
          onClick={carregarAgendamentos}
          disabled={carregando}
        >
          Atualizar lista
        </button>
      </section>

      {erro && (
        <div className="admin-confirmar-erro" role="alert">
          <p>{erro}</p>
        </div>
      )}

      {carregando && (
        <p className="admin-confirmar-feedback">
          Carregando solicitações...
        </p>
      )}

      {!carregando && !erro && agendamentos.length === 0 && (
        <div className="admin-confirmar-vazio">
          <span>✓</span>
          <h2>Tudo em dia!</h2>
          <p>Não há agendamentos aguardando confirmação.</p>
        </div>
      )}

      {!carregando && agendamentos.length > 0 && (
        <section className="admin-confirmar-lista">
          {agendamentos.map((item) => (
            <article
              className="admin-confirmar-card"
              key={item.id}
            >
              <div className="admin-confirmar-card-topo">
                <span className="admin-confirmar-status">
                  Aguardando confirmação
                </span>
                <span className="admin-confirmar-id">
                  Atendimento #{item.id}
                </span>
              </div>

              <div className="admin-confirmar-dados">
                <div>
                  <span className="admin-confirmar-label">
                    PACIENTE
                  </span>
                  <h2>{nomePaciente(item)}</h2>
                </div>

                <div>
                  <span className="admin-confirmar-label">
                    SERVIÇO
                  </span>
                  <p>{nomeServico(item)}</p>
                </div>

                <div>
                  <span className="admin-confirmar-label">
                    DATA
                  </span>
                  <p>{formatarData(dataAgendamento(item))}</p>
                </div>

                <div>
                  <span className="admin-confirmar-label">
                    HORÁRIO
                  </span>
                  <p>{horarioAgendamento(item)}</p>
                </div>
              </div>

              <div className="admin-confirmar-acoes">
                <Link
                  to={`/consultas/${item.id}`}
                  className="admin-confirmar-detalhes"
                >
                  Ver detalhes
                </Link>

                <button
                  type="button"
                  className="admin-confirmar-botao"
                  onClick={() => confirmarAgendamento(item.id)}
                  disabled={processando !== null}
                >
                  {processando === item.id
                    ? 'Confirmando...'
                    : 'Confirmar atendimento'}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
