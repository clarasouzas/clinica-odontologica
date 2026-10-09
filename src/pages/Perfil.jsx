
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { api, mensagemDeErro } from '../api/client';

export function Perfil() {
  const { usuario, setUsuario } = useAuth();

  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function salvarPerfil(event) {
    event.preventDefault();
    setMensagem('');
    setErro('');
    setSalvando(true);

    try {
      // Atualiza apenas os dados locais até existir um endpoint
      // de edição de perfil confirmado na API.
      const usuarioAtualizado = { ...usuario, nome, email };

      setUsuario(usuarioAtualizado);
      setMensagem(
        'Os dados foram atualizados nesta sessão. A API ainda precisa oferecer um endpoint de edição para persistir as alterações.'
      );
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="perfil-page">
      <Link to="/inicio" className="perfil-voltar">
        ← Voltar ao início
      </Link>

      <header className="perfil-header">
        <span className="landing-eyebrow">SUA CONTA</span>
        <h1>Meu <em>perfil.</em></h1>
        <p>Confira suas informações pessoais.</p>
      </header>

      <section className="perfil-card">
        <div className="perfil-avatar">
          {(nome || 'P').trim().charAt(0).toUpperCase()}
        </div>

        <h2>{nome || 'Paciente'}</h2>
        <p className="perfil-email">{email || 'E-mail não informado'}</p>

        <form onSubmit={salvarPerfil} className="perfil-form">
          <label htmlFor="perfil-nome">Nome completo</label>
          <input
            id="perfil-nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />

          <label htmlFor="perfil-email">E-mail</label>
          <input
            id="perfil-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          {mensagem && (
            <p className="perfil-sucesso" role="status">{mensagem}</p>
          )}

          {erro && (
            <p className="perfil-erro" role="alert">{erro}</p>
          )}

          <button type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Atualizar dados'}
          </button>
        </form>

        <Link to="/perfil/senha" className="perfil-senha-link">
          Alterar minha senha ↗
        </Link>
      </section>
    </main>
  );
}
