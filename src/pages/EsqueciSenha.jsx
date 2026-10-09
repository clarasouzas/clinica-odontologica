
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { redefinirSenha, mensagemDeErro } from '../api/client';

export function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setCarregando(true);
    setMensagem('');
    setErro('');

    try {
      await redefinirSenha(email);
      setMensagem(
        'Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.'
      );
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-brand">
          LÚMEN<span> ODONTOLOGIA</span>
        </Link>

        <p className="auth-eyebrow">RECUPERAÇÃO DE ACESSO</p>
        <h1>Esqueceu sua senha?</h1>
        <p className="auth-description">
          Informe seu e-mail para receber orientações sobre a recuperação
          do seu acesso.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          {mensagem && <p role="status">{mensagem}</p>}
          {erro && <p role="alert">{erro}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? 'Enviando...' : 'Recuperar senha'}
          </button>
        </form>

        <Link to="/login" className="auth-back">
          Voltar para o login
        </Link>
      </section>
    </main>
  );
}
