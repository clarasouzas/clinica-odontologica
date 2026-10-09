import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  api,
  buscarTodas,
  mensagemDeErro,
} from '../../api/client';

export function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const [formulario, setFormulario] = useState({
    nome: '',
    descricao: '',
    duracao: '',
    preco: '',
  });

  async function carregarServicos() {
    setCarregando(true);
    setErro('');

    try {
      const dados = await buscarTodas('/servicos/');
      setServicos(dados);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarServicos();
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
      const dados = {
        nome: formulario.nome.trim(),
        descricao: formulario.descricao.trim(),
      };

      if (formulario.duracao !== '') {
        dados.duracao = Number(formulario.duracao);
      }

      if (formulario.preco !== '') {
        dados.preco = Number(formulario.preco);
      }

      await api('/servicos/', {
        method: 'POST',
        body: dados,
      });

      setFormulario({
        nome: '',
        descricao: '',
        duracao: '',
        preco: '',
      });

      setSucesso('Serviço cadastrado com sucesso.');
      await carregarServicos();
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setSalvando(false);
    }
  }

  function formatarPreco(valor) {
    if (valor === null || valor === undefined || valor === '') {
      return 'Consulte a clínica';
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) return String(valor);

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <main className="servicos-admin">
      <header className="servicos-admin-cabecalho">
        <div>
          <span className="servicos-admin-eyebrow">
            PAINEL ADMINISTRATIVO
          </span>
          <h1>Serviços</h1>
          <p>
            Organize os tratamentos oferecidos pela clínica.
          </p>
        </div>

        <Link
          className="servicos-admin-voltar"
          to="/admin/agenda"
        >
          ← Voltar à agenda
        </Link>
      </header>

      {erro && (
        <div className="servicos-admin-alerta erro" role="alert">
          {erro}
        </div>
      )}

      {sucesso && (
        <div className="servicos-admin-alerta sucesso" role="status">
          {sucesso}
        </div>
      )}

      <section className="servicos-admin-form-card">
        <div className="servicos-admin-titulo">
          <h2>Novo serviço</h2>
          <p>Cadastre um tratamento para disponibilizá-lo na plataforma.</p>
        </div>

        <form onSubmit={cadastrar}>
          <div className="servicos-admin-campos">
            <div className="servicos-admin-campo">
              <label htmlFor="servico-nome">Nome do serviço</label>
              <input
                id="servico-nome"
                name="nome"
                value={formulario.nome}
                onChange={atualizarCampo}
                placeholder="Ex.: Limpeza dental"
                required
              />
            </div>

            <div className="servicos-admin-campo">
              <label htmlFor="servico-duracao">
                Duração em minutos
              </label>
              <input
                id="servico-duracao"
                name="duracao"
                type="number"
                min="1"
                value={formulario.duracao}
                onChange={atualizarCampo}
                placeholder="Ex.: 40"
              />
            </div>

            <div className="servicos-admin-campo">
              <label htmlFor="servico-preco">Preço (R$)</label>
              <input
                id="servico-preco"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={formulario.preco}
                onChange={atualizarCampo}
                placeholder="Ex.: 150,00"
              />
            </div>

            <div className="servicos-admin-campo servicos-admin-campo-largo">
              <label htmlFor="servico-descricao">Descrição</label>
              <textarea
                id="servico-descricao"
                name="descricao"
                rows={3}
                value={formulario.descricao}
                onChange={atualizarCampo}
                placeholder="Descreva o tratamento..."
              />
            </div>
          </div>

          <div className="servicos-admin-acoes">
            <button type="submit" disabled={salvando}>
              {salvando ? 'Cadastrando...' : 'Cadastrar serviço'}
            </button>
          </div>
        </form>
      </section>

      <section className="servicos-admin-lista-secao">
        <div className="servicos-admin-titulo">
          <h2>Serviços cadastrados</h2>
          <p>
            {carregando
              ? 'Carregando serviços...'
              : `${servicos.length} serviço(s) cadastrado(s)`}
          </p>
        </div>

        {!carregando && !erro && servicos.length === 0 && (
          <div className="servicos-admin-vazio">
            Nenhum serviço cadastrado ainda.
          </div>
        )}

        {!carregando && servicos.length > 0 && (
          <div className="servicos-admin-grid">
            {servicos.map((servico) => (
              <article
                className="servicos-admin-card"
                key={servico.id}
              >
                <div className="servicos-admin-card-icone">
                  ✳
                </div>

                <h3>{servico.nome}</h3>

                {servico.descricao && (
                  <p className="servicos-admin-descricao">
                    {servico.descricao}
                  </p>
                )}

                <div className="servicos-admin-card-rodape">
                  <span>
                    {servico.duracao
                      ? `${servico.duracao} min`
                      : 'Duração não informada'}
                  </span>

                  <strong>{formatarPreco(servico.preco)}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
