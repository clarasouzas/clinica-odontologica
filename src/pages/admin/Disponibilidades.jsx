import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  api,
  buscarTodas,
  mensagemDeErro,
} from '../../api/client';

export function Disponibilidades() {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [dentistas, setDentistas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const [formulario, setFormulario] = useState({
    recurso: '',
    data: '',
    hora_inicio: '',
    hora_fim: '',
  });

  async function carregarDados() {
    setCarregando(true);
    setErro('');

    try {
      const [horarios, profissionais] = await Promise.all([
        buscarTodas('/disponibilidades/'),
        buscarTodas('/recursos/'),
      ]);

      setDisponibilidades(horarios);
      setDentistas(profissionais);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));

    setSucesso('');
  }

  async function cadastrar(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');
    setSalvando(true);

    try {
      await api('/disponibilidades/', {
        method: 'POST',
        body: {
          recurso: Number(formulario.recurso),
          data: formulario.data,
          hora_inicio: formulario.hora_inicio,
          hora_fim: formulario.hora_fim,
        },
      });

      setFormulario({
        recurso: '',
        data: '',
        hora_inicio: '',
        hora_fim: '',
      });

      setSucesso('Disponibilidade cadastrada com sucesso.');
      await carregarDados();
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setSalvando(false);
    }
  }

  function nomeProfissional(id) {
    const profissional = dentistas.find(
      (item) => String(item.id) === String(id)
    );

    return profissional?.nome || `Profissional ${id ?? ''}`;
  }

  function formatarData(valor) {
    if (!valor) return '—';

    const partes = String(valor).slice(0, 10).split('-');

    if (partes.length !== 3) return valor;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function horario(valor) {
    return valor ? String(valor).slice(0, 5) : '—';
  }

  return (
    <main className="disponibilidades-admin">
      <header className="disponibilidades-cabecalho">
        <div>
          <span className="disponibilidades-eyebrow">
            PAINEL ADMINISTRATIVO
          </span>
          <h1>Disponibilidades</h1>
          <p>
            Organize os dias e horários de atendimento dos profissionais.
          </p>
        </div>

        <Link to="/admin/agenda" className="disponibilidades-voltar">
          ← Voltar à agenda
        </Link>
      </header>

      {erro && (
        <div className="disponibilidades-alerta erro" role="alert">
          {erro}
        </div>
      )}

      {sucesso && (
        <div className="disponibilidades-alerta sucesso" role="status">
          {sucesso}
        </div>
      )}

      <section className="disponibilidades-form-card">
        <div className="disponibilidades-titulo">
          <h2>Novo horário disponível</h2>
          <p>Selecione o profissional, a data e o período de atendimento.</p>
        </div>

        <form onSubmit={cadastrar}>
          <div className="disponibilidades-campos">
            <div className="disponibilidades-campo">
              <label htmlFor="recurso">Profissional</label>
              <select
                id="recurso"
                name="recurso"
                value={formulario.recurso}
                onChange={atualizarCampo}
                required
              >
                <option value="">Selecione um profissional</option>
                {dentistas.map((dentista) => (
                  <option key={dentista.id} value={dentista.id}>
                    {dentista.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="disponibilidades-campo">
              <label htmlFor="data-disponibilidade">Data</label>
              <input
                id="data-disponibilidade"
                type="date"
                name="data"
                value={formulario.data}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="disponibilidades-campo">
              <label htmlFor="hora-inicio">Horário inicial</label>
              <input
                id="hora-inicio"
                type="time"
                name="hora_inicio"
                value={formulario.hora_inicio}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="disponibilidades-campo">
              <label htmlFor="hora-fim">Horário final</label>
              <input
                id="hora-fim"
                type="time"
                name="hora_fim"
                value={formulario.hora_fim}
                onChange={atualizarCampo}
                min={formulario.hora_inicio || undefined}
                required
              />
            </div>
          </div>

          <div className="disponibilidades-acoes">
            <button
              type="submit"
              disabled={salvando || dentistas.length === 0}
            >
              {salvando ? 'Salvando...' : 'Cadastrar disponibilidade'}
            </button>
          </div>
        </form>
      </section>

      <section className="disponibilidades-lista-secao">
        <div className="disponibilidades-titulo">
          <h2>Horários cadastrados</h2>
          <p>
            {carregando
              ? 'Carregando horários...'
              : `${disponibilidades.length} disponibilidade(s)`}
          </p>
        </div>

        {!carregando && !erro && disponibilidades.length === 0 && (
          <div className="disponibilidades-vazio">
            Nenhuma disponibilidade cadastrada.
          </div>
        )}

        {!carregando && disponibilidades.length > 0 && (
          <div className="disponibilidades-lista">
            {disponibilidades.map((item) => (
              <article
                className="disponibilidades-item"
                key={item.id}
              >
                <div className="disponibilidades-item-data">
                  <span>DATA</span>
                  <strong>{formatarData(item.data)}</strong>
                </div>

                <div className="disponibilidades-item-info">
                  <h3>
                    {nomeProfissional(item.recurso ?? item.recurso_id)}
                  </h3>
                  <p>
                    {horario(item.hora_inicio)} às {horario(item.hora_fim)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
