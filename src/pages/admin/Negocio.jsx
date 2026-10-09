import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, mensagemDeErro } from '../../api/client';

export function Negocio() {
  const [formulario, setFormulario] = useState({
    nome: '',
    descricao: '',
    telefone: '',
    email: '',
    endereco: '',
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    async function carregarOrganizacao() {
      try {
        const dados = await api('/organizacao/');

        setFormulario({
          nome: dados.nome || '',
          descricao: dados.descricao || '',
          telefone: dados.telefone || '',
          email: dados.email || '',
          endereco: dados.endereco || '',
        });
      } catch (error) {
        setErro(mensagemDeErro(error));
      } finally {
        setCarregando(false);
      }
    }

    carregarOrganizacao();
  }, []);

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));

    setSucesso('');
  }

  async function salvar(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');
    setSalvando(true);

    try {
      const dados = await api('/organizacao/', {
        method: 'PATCH',
        body: formulario,
      });

      setFormulario((atual) => ({
        ...atual,
        ...dados,
      }));

      setSucesso('As configurações foram salvas com sucesso.');
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <main className="negocio-page">
        <p>Carregando configurações da clínica...</p>
      </main>
    );
  }

  return (
    <main className="negocio-page">
      <header className="negocio-cabecalho">
        <div>
          <span className="negocio-eyebrow">
            PAINEL ADMINISTRATIVO
          </span>
          <h1>Dados da clínica</h1>
          <p>
            Gerencie as informações institucionais da Lúmen Odontologia.
          </p>
        </div>

        <Link className="negocio-voltar" to="/admin/agenda">
          ← Voltar à agenda
        </Link>
      </header>

      {erro && (
        <div className="negocio-alerta negocio-alerta-erro" role="alert">
          {erro}
        </div>
      )}

      {sucesso && (
        <div className="negocio-alerta negocio-alerta-sucesso" role="status">
          {sucesso}
        </div>
      )}

      <form className="negocio-formulario" onSubmit={salvar}>
        <div className="negocio-secao-titulo">
          <h2>Informações institucionais</h2>
          <p>Esses dados identificam sua clínica na plataforma.</p>
        </div>

        <div className="negocio-campo">
          <label htmlFor="nome">Nome da clínica</label>
          <input
            id="nome"
            name="nome"
            value={formulario.nome}
            onChange={atualizarCampo}
            placeholder="Lúmen Odontologia"
            required
          />
        </div>

        <div className="negocio-campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formulario.descricao}
            onChange={atualizarCampo}
            placeholder="Conte um pouco sobre a clínica..."
            rows={4}
          />
        </div>

        <div className="negocio-divisor" />

        <div className="negocio-secao-titulo">
          <h2>Contato</h2>
          <p>Informações para comunicação com os pacientes.</p>
        </div>

        <div className="negocio-campos-grid">
          <div className="negocio-campo">
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              value={formulario.telefone}
              onChange={atualizarCampo}
              placeholder="(84) 00000-0000"
            />
          </div>

          <div className="negocio-campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formulario.email}
              onChange={atualizarCampo}
              placeholder="contato@clinica.com"
            />
          </div>
        </div>

        <div className="negocio-campo">
          <label htmlFor="endereco">Endereço</label>
          <input
            id="endereco"
            name="endereco"
            value={formulario.endereco}
            onChange={atualizarCampo}
            placeholder="Rua, número, bairro e cidade"
          />
        </div>

        <div className="negocio-acoes">
          <button type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </main>
  );
}
