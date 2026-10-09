import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, buscarTodas, mensagemDeErro } from '../../api/client';

export function Agenda() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [data, setData] = useState(
    new Date().toLocaleDateString('en-CA')
  );

  async function carregarAgenda() {
    setCarregando(true);
    setErro('');

    try {
      const dados = await buscarTodas('/agendamentos/');
      setAgendamentos(dados);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAgenda();
  }, []);

  const agendamentosDoDia = agendamentos.filter((item) => {
    const dataAgendamento = String(
      item.data || item.data_hora || ''
    ).slice(0, 10);

    return dataAgendamento === data;
  });

  function formatarData(valor) {
    if (!valor) return '—';

    const partes = String(valor).slice(0, 10).split('-');

    if (partes.length !== 3) return valor;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function formatarHorario(item) {
    if (item.horario) return String(item.horario).slice(0, 5);

    if (item.data_hora) {
      return String(item.data_hora).slice(11, 16) || '—';
    }

    return '—';
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
      item.servico ||
      'Serviço não informado'
    );
  }

  function statusLegivel(status) {
    const statusMap = {
      pendente: 'Pendente',
      aguardando_confirmacao: 'Aguardando confirmação',
      confirmado: 'Confirmado',
      concluido: 'Concluído',
      cancelado: 'Cancelado',
    };

    return statusMap[status] || status || 'Não informado';
  }

  return (
    <main className="admin-agenda">
      <header className="admin-agenda-cabecalho">
        <div>
          <span className="admin-agenda-eyebrow">
            PAINEL ADMINISTRATIVO
          </span>
          <h1>Agenda</h1>
          <p>Gerencie os atendimentos da clínica.</p>
        </div>

        <Link className="admin-agenda-botao" to="/admin/confirmar">
          Ver confirmações
        </Link>
      </header>

      <section className="admin-agenda-filtros">
        <label htmlFor="data-agenda">Data dos atendimentos</label>
        <input
          id="data-agenda"
          type="date"
          value={data}
          onChange={(event) => setData(event.target.value)}
        />

        <div className="admin-agenda-resumo">
          <span>Atendimentos no dia</span>
          <strong>
            {carregando ? '—' : agendamentosDoDia.length}
          </strong>
        </div>
      </section>

      {carregando && (
        <p className="admin-agenda-feedback">
          Carregando agenda...
        </p>
      )}

      {!carregando && erro && (
        <div className="admin-agenda-erro">
          <p>{erro}</p>
          <button onClick={carregarAgenda}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && agendamentosDoDia.length === 0 && (
        <div className="admin-agenda-vazio">
          <span>○</span>
          <h2>Nenhum atendimento nesta data</h2>
          <p>
            Não encontramos agendamentos para {formatarData(data)}.
          </p>
        </div>
      )}

      {!carregando && !erro && agendamentosDoDia.length > 0 && (
        <section className="admin-agenda-lista">
          {agendamentosDoDia
            .slice()
            .sort((a, b) =>
              formatarHorario(a).localeCompare(formatarHorario(b))
            )
            .map((item) => (
              <article className="admin-agenda-item" key={item.id}>
                <div className="admin-agenda-horario">
                  <strong>{formatarHorario(item)}</strong>
                  <span>{formatarData(data)}</span>
                </div>

                <div className="admin-agenda-dados">
                  <h2>{nomePaciente(item)}</h2>
                  <p>{nomeServico(item)}</p>
                  <span className="admin-agenda-status">
                    {statusLegivel(item.status)}
                  </span>
                </div>

                <Link
                  className="admin-agenda-detalhes"
                  to={`/consultas/${item.id}`}
                >
                  Detalhes ↗
                </Link>
              </article>
            ))}
        </section>
      )}
    </main>
  );
}
