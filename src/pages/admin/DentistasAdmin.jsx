import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  api,
  buscarTodas,
  mensagemDeErro,
} from '../../api/client';

export function DentistasAdmin() {
  const [dentistas, setDentistas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: '',
    especialidade: '',
    descricao: '',
  });

  async function carregarDentistas() {
    setCarregando(true);
    setErro('');

    try {
      const dados = await buscarTodas('/recursos/');
      setDentistas(dados);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDentistas();
  }, []);

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  async function cadastrar(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await api('/recursos/', {
        method: 'POST',
        body: formulario,
      });

      setFormulario({
        nome: '',
        especialidade: '',
        descricao: '',
      });

      await carregarDentistas();
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="dentistas-admin">
      <header className="dentistas-admin-cabecalho">
        <div>
          <span className="dentistas-admin-eyebrow">
            PAINEL ADMINISTRATIVO
          </span>
          <h1>Equipe profissional</h1>
          <p>Gerencie os profissionais cadastrados na clínica.</p>
        </div>

        <Link to="/admin/agenda" className="dentistas-admin-voltar">
          ← Voltar à agenda
        </Link>
      </header>

      {erro && (
        <div className="dentistas-admin-erro" role="alert">
          {erro}
        </div>
      )}

      <section className="dentistas-admin-form-card">
        <div className="dentistas-admin-titulo">
          <h2>Cadastrar profissional</h2>
          <p>Preencha os dados para adicionar um profissional.</p>
        </div>

        <form onSubmit={cadastrar}>
          <div className="dentistas-admin-campos">
            <div className="dentistas-admin-campo">
              <label htmlFor="nome-profissional">Nome completo</label>
              <input
                id="nome-profissional"
                name="nome"
                value={formulario.nome}
                onChange={atualizarCampo}
                placeholder="Nome do profissional"
                required
              />
            </div>

            <div className="dentistas-admin-campo">
              <label htmlFor="especialidade-profissional">
                Especialidade
              </label>
              <input
                id="especialidade-profissional"
                name="especialidade"
                value={formulario.especialidade}
                onChange={atualizarCampo}
                placeholder="Ex.: Ortodontia"
              />
            </div>

            <div className="dentistas-admin-campo dentistas-admin-campo-largo">
              <label htmlFor="descricao-profissional">Descrição</label>
              <textarea
                id="descricao-profissional"
                name="descricao"
                value={formulario.descricao}
                onChange={atualizarCampo}
                placeholder="Apresentação do profissional"
                rows={3}
              />
            </div>
          </div>

          <div className="dentistas-admin-acoes">
            <button type="submit" disabled={salvando}>
              {salvando ? 'Cadastrando...' : 'Cadastrar profissional'}
            </button>
          </div>
        </form>
      </section>

      <section className="dentistas-admin-lista-secao">
        <div className="dentistas-admin-titulo">
          <h2>Profissionais cadastrados</h2>
          <p>
            {carregando
              ? 'Carregando equipe...'
              : `${dentistas.length} profissional(is) cadastrado(s)`}
          </p>
        </div>

        {!carregando && !erro && dentistas.length === 0 && (
          <div className="dentistas-admin-vazio">
            Nenhum profissional cadastrado ainda.
          </div>
        )}

        {!carregando && dentistas.length > 0 && (
          <div className="dentistas-admin-lista">
            {dentistas.map((dentista) => (
              <article
                className="dentistas-admin-item"
                key={dentista.id}
              >
                <div className="dentistas-admin-avatar">
                  {dentista.imagem ? (
                    <img src={dentista.imagem} alt="" />
                  ) : (
                    dentista.nome?.charAt(0)?.toUpperCase() || 'D'
                  )}
                </div>

                <div className="dentistas-admin-info">
                  <h3>{dentista.nome || 'Profissional'}</h3>
                  <p>
                    {dentista.especialidade || 'Especialidade não informada'}
                  </p>
                </div>

                <Link
                  className="dentistas-admin-ver"
                  to={`/dentistas/${dentista.id}`}
                >
                  Ver perfil ↗
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
