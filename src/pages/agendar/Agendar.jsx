
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, mensagemDeErro } from '../../api/client';

export function Agendar() {
  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [dentistas, setDentistas] = useState([]);
  const [dentistaSelecionado, setDentistaSelecionado] = useState('');
  const [data, setData] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [buscandoHorarios, setBuscandoHorarios] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const [dadosServicos, dadosDentistas] = await Promise.all([
          api('/servicos/'),
          api('/recursos/'),
        ]);

        setServicos(Array.isArray(dadosServicos)
          ? dadosServicos
          : dadosServicos?.results || []);

        setDentistas(Array.isArray(dadosDentistas)
          ? dadosDentistas
          : dadosDentistas?.results || []);
      } catch (error) {
        setErro(mensagemDeErro(error));
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  async function buscarHorarios(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');
    setHorarios([]);
    setHorarioSelecionado('');
    setBuscandoHorarios(true);

    try {
      const parametros = new URLSearchParams({
        servico: servicoSelecionado,
        data,
      });

      if (dentistaSelecionado) {
        parametros.set('recurso', dentistaSelecionado);
      }

      const dados = await api(`/horarios-livres/?${parametros}`);
      setHorarios(Array.isArray(dados) ? dados : dados?.results || []);

      if (!((Array.isArray(dados) ? dados : dados?.results) || []).length) {
        setErro('Não encontramos horários disponíveis para essa data.');
      }
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setBuscandoHorarios(false);
    }
  }

  async function confirmarAgendamento(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');

    if (!servicoSelecionado || !data || !horarioSelecionado) {
      setErro('Preencha os campos e selecione um horário.');
      return;
    }

    try {
      const horario = horarios.find(
        (item) =>
          String(item.id) === String(horarioSelecionado) ||
          item.inicio === horarioSelecionado ||
          item.horario === horarioSelecionado
      );

      await api('/agendamentos/', {
        method: 'POST',
        body: {
          servico: Number(servicoSelecionado),
          recurso: dentistaSelecionado
            ? Number(dentistaSelecionado)
            : horario?.recurso ?? null,
          data,
          horario: horarioSelecionado,
        },
      });

      setSucesso('Solicitação de agendamento enviada com sucesso!');
      setHorarioSelecionado('');
    } catch (error) {
      setErro(mensagemDeErro(error));
    }
  }

  if (carregando) {
    return <main className="agendar-page"><p>Carregando informações...</p></main>;
  }

  return (
    <main className="agendar-page">
      <Link to="/inicio" className="agendar-voltar">← Voltar ao início</Link>

      <header className="agendar-header">
        <span className="landing-eyebrow">LÚMEN ODONTOLOGIA</span>
        <h1>Seu próximo sorriso começa <em>aqui.</em></h1>
        <p>Escolha seu tratamento, encontre um horário e solicite sua consulta.</p>
      </header>

      <form className="agendar-form" onSubmit={buscarHorarios}>
        <label htmlFor="servico">Qual tratamento você deseja?</label>
        <select
          id="servico"
          value={servicoSelecionado}
          onChange={(event) => {
            setServicoSelecionado(event.target.value);
            setHorarios([]);
            setHorarioSelecionado('');
          }}
          required
        >
          <option value="">Selecione um tratamento</option>
          {servicos.map((servico) => (
            <option key={servico.id} value={servico.id}>
              {servico.nome}
              {servico.preco != null
                ? ` — R$ ${Number(servico.preco).toFixed(2).replace('.', ',')}`
                : ''}
            </option>
          ))}
        </select>

        <label htmlFor="dentista">Profissional (opcional)</label>
        <select
          id="dentista"
          value={dentistaSelecionado}
          onChange={(event) => {
            setDentistaSelecionado(event.target.value);
            setHorarios([]);
            setHorarioSelecionado('');
          }}
        >
          <option value="">Qualquer profissional disponível</option>
          {dentistas.map((dentista) => (
            <option key={dentista.id} value={dentista.id}>
              {dentista.nome}
            </option>
          ))}
        </select>

        <label htmlFor="data">Data desejada</label>
        <input
          id="data"
          type="date"
          min={new Date().toLocaleDateString('en-CA')}
          value={data}
          onChange={(event) => {
            setData(event.target.value);
            setHorarios([]);
            setHorarioSelecionado('');
          }}
          required
        />

        <button type="submit" disabled={buscandoHorarios}>
          {buscandoHorarios ? 'Buscando horários...' : 'Ver horários disponíveis'}
        </button>
      </form>

      {erro && <p className="agendar-mensagem agendar-erro" role="alert">{erro}</p>}
      {sucesso && <p className="agendar-mensagem agendar-sucesso" role="status">{sucesso}</p>}

      {horarios.length > 0 && (
        <form className="agendar-horarios" onSubmit={confirmarAgendamento}>
          <h2>Escolha seu horário</h2>

          <div className="agendar-horarios-grid">
            {horarios.map((horario, indice) => {
              const valor = String(
                horario.id ?? horario.inicio ?? horario.horario ?? ''
              );

              return (
                <label
                  key={valor || indice}
                  className={
                    horarioSelecionado === valor
                      ? 'agendar-horario selecionado'
                      : 'agendar-horario'
                  }
                >
                  <input
                    type="radio"
                    name="horario"
                    value={valor}
                    checked={horarioSelecionado === valor}
                    onChange={() => setHorarioSelecionado(valor)}
                    required
                  />
                  {horario.horario || horario.inicio || valor}
                </label>
              );
            })}
          </div>

          <button type="submit" disabled={!horarioSelecionado}>
            Solicitar agendamento
          </button>
        </form>
      )}
    </main>
  );
}
