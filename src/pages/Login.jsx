
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { mensagemDeErro } from '../api/client';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { entrar, inicio } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const mensagem = location.state?.mensagem;

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await entrar(email.trim(), senha);

      const destino = location.state?.from?.pathname || inicio;
      navigate(destino, { replace: true });
    } catch (error) {
      setErro(
        mensagemDeErro(error) ||
          'Não foi possível entrar. Confira seus dados e tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <Link to="/" className="login-logo" aria-label="Lúmen Odontologia - início">
        <span className="login-simbolo">L.</span>

        <span className="login-logo-texto">
          <strong>LÚMEN</strong>
          <small>ODONTOLOGIA</small>
        </span>
      </Link>

      <section className="login-card">
        <div className="login-intro">
          <span className="login-etiqueta">BEM-VINDA À LÚMEN</span>

          <h1>Seu sorriso começa aqui.</h1>

          <p>
            Entre na sua conta para acompanhar consultas e cuidar do seu
            sorriso com tranquilidade.
          </p>
        </div>

        {mensagem && (
          <div className="login-sucesso" role="status">
            {mensagem}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-campo">
            <label htmlFor="login-email">E-mail</label>

            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-campo">
            <div className="login-label-senha">
              <label htmlFor="login-senha">Senha</label>

              <Link to="/esqueci-senha">Esqueceu a senha?</Link>
            </div>

            <div className="login-input-senha">
              <input
                id="login-senha"
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />

              <button
                type="button"
                className="login-mostrar-senha"
                onClick={() => setMostrarSenha((anterior) => !anterior)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          {erro && (
            <div className="login-erro" role="alert">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="login-botao"
            disabled={carregando}
          >
            <span>{carregando ? 'Entrando...' : 'Entrar na minha conta'}</span>

            {!carregando && <span aria-hidden="true">↗</span>}
          </button>
        </form>

        <div className="login-divisor">
          <span>AINDA NÃO TEM CONTA?</span>
        </div>

        <Link to="/cadastro" className="login-botao-secundario">
          Criar minha conta
        </Link>

        <p className="login-privacidade">
          Seu cuidado começa com uma experiência segura e acolhedora.
        </p>
      </section>

      <footer className="login-footer">
        LÚMEN ODONTOLOGIA · CUIDADO EM CADA DETALHE
      </footer>
    </main>
  );
}
