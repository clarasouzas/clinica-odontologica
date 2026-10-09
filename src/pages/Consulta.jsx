
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, mensagemDeErro } from '../api/client';

export function Consulta() {
  const { id } = useParams();
  const [consulta, setConsulta] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [cancelando, setCancelando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregarConsulta() {
      try {
        const dados = await api(`/agendamentos/${id}/`);
        if (ativo) setConsulta(dados);
      } catch (error) {
        if (ativo) setErro(mensagemDeErro(error));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarConsulta();

    return () => {
      ativo = false;
    };
  }, [id]);

  function formatarData(valor) {
    if (!valor) return 'Não informada';

    const data = valor.includes('T')
      ? new Date(valor)
      : new Date(`${valor}T12:00:00`);

    return Number.isNaN(data.getTime())
      ? valor
      : data.toLocaleDateString('pt-BR');
  }

  function nomeDoServico() {
    if (typeof consulta?.servico === 'object') {
      return consulta.servico?.nome || 'Consulta odontológica';
    }

    return consulta?.servico_nome || 'Consulta odontológica';
  }

  function nomeDoDentista() {
    if (typeof consulta?.recurso === 'object') {
      return consulta.recurso?.nome || 'Profissional a definir';
    }

    return consulta?.recurso_nome || 'Profissional a definir';
  }

  async function cancelarConsulta() {
    const confirmar = window.confirm(
      'Deseja realmente cancelar esta consulta?'
    );

    if (!confirmar) return;

    setCancelando(true);
    setErro('');
    setMensagem('');

    try {
      const atualizada = await api(`/agendamentos/${id}/cancelar/`, {
        method: 'POST',
      });

      if (atualizada && typeof atualizada === 'object') {
        setConsulta((anterior) => ({ ...anterior, ...atualizada }));
      } else {
        setConsulta((anterior) => ({
          ...anterior,
          status: 'cancelado',
        }));
      }

      setMensagem('Solicitação de cancelamento realizada.');
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCancelando(false);
    }
  }

  if (carregando) {
    return (
      <main className="consulta-detalhe-page">
        Carregando detalhes da consulta...
      </main>
    );
  }

  if (erro && !consulta) {
    return (
      <main className="consulta-detalhe-page">
        <p role="alert">{erro}</p>
        <Link to="/consultas">Voltar para minhas consultas</Link>
      </main>
    );
  }

  const status = String(consulta?.status || '')
    .toLowerCase()
    .replaceAll('_', ' ');

  const cancelada = status.includes('cancel');
  const concluida = status.includes('conclu');

  return (
    <main className="consulta-detalhe-page">
      <Link to="/consultas" className="consulta-detalhe-voltar">
        ← Minhas consultas
      </Link>

      <header className="consulta-detalhe-header">
        <span className="landing-eyebrow">LÚMEN ODONTOLOGIA</span>
        <h1>Detalhes da <em>consulta.</em></h1>
        <p>Acompanhe as informações do seu atendimento.</p>
      </header>

      {erro && <p className="consulta-detalhe-erro" role="alert">{erro}</p>}
      {mensagem && <p className="consulta-detalhe-sucesso" role="status">{mensagem}</p>}

      <section className="consulta-detalhe-card">
        <div className="consulta-detalhe-topo">
          <span>AGENDAMENTO Nº {consulta?.id}</span>
          <span className="consulta-detalhe-status">
            {consulta?.status || 'Status não informado'}
          </span>
        </div>

        <div className="consulta-detalhe-item">
          <span>Tratamento</span>
          <strong>{nomeDoServico()}</strong>
        </div>

        <div className="consulta-detalhe-item">
          <span>Profissional</span>
          <strong>{nomeDoDentista()}</strong>
        </div>

        <div className="consulta-detalhe-item">
          <span>Data</span>
          <strong>
            {formatarData(
              consulta?.data || consulta?.data_hora || consulta?.inicio
            )}
          </strong>
        </div>

        <div className="consulta-detalhe-item">
          <span>Horário</span>
          <strong>
            {consulta?.horario ||
              (consulta?.data_hora
                ? new Date(consulta.data_hora).toLocaleTimeString(
                    'pt-BR',
                    { hour: '2-digit', minute: '2-digit' }
                  )
                : 'Não informado')}
          </strong>
        </div>

        {consulta?.observacoes && (
          <div className="consulta-detalhe-item">
            <span>Observações</span>
            <strong>{consulta.observacoes}</strong>
          </div>
        )}

        {!cancelada && !concluida && (
          <div className="consulta-detalhe-acoes">
            <button
              type="button"
              onClick={cancelarConsulta}
              disabled={cancelando}
              className="consulta-cancelar-button"
            >
              {cancelando ? 'Cancelando...' : 'Cancelar consulta'}
            </button>
          </div>
        )}

        {concluida && (
          <Link
            to={`/consultas/${id}/avaliar`}
            className="landing-button"
          >
            Avaliar atendimento <span>↗</span>
          </Link>
        )}
      </section>
    </main>
  );
}
