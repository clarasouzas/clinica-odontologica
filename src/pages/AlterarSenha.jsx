
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, mensagemDeErro } from '../api/client';

export function AlterarSenha() {
  const navigate = useNavigate();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');

    if (novaSenha !== confirmarSenha) {
      setErro('A nova senha e a confirmação precisam ser iguais.');
      return;
    }

    if (novaSenha.length < 8) {
      setErro('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      await api('/auth/alterar-senha/', {
        method: 'POST',
        body: {
          senha_atual: senhaAtual,
          nova_senha: novaSenha,
        },
      });

      setSucesso('Senha alterada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');

      setTimeout(() => navigate('/perfil'), 1500);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="senha-page">
      <Link to="/perfil" className="senha-voltar">
        ← Voltar ao perfil
      </Link>

      <section className="senha-card">
        <span className="landing-eyebrow">SEGURANÇA DA CONTA</span>

        <h1>Uma nova senha, <em>mais segurança.</em></h1>

        <p>
          Escolha uma senha segura para proteger seus dados e sua conta.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="senha-atual">Senha atual</label>
          <input
            id="senha-atual"
            type="password"
            autoComplete="current-password"
            value={senhaAtual}
            onChange={(event) => setSenhaAtual(event.target.value)}
            required
          />

          <label htmlFor="nova-senha">Nova senha</label>
          <input
            id="nova-senha"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={novaSenha}
            onChange={(event) => setNovaSenha(event.target.value)}
            required
          />

          <label htmlFor="confirmar-senha">Confirmar nova senha</label>
          <input
            id="confirmar-senha"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
            required
          />

          {erro && <p className="senha-erro" role="alert">{erro}</p>}
          {sucesso && <p className="senha-sucesso" role="status">{sucesso}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? 'Alterando senha...' : 'Alterar senha ↗'}
          </button>
        </form>
      </section>
    </main>
  );
}
