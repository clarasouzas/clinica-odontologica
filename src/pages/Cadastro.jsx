import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrar, mensagemDeErro } from '../api/client';

export function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');

    if (senha.length < 8) {
      setErro('Sua senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      await cadastrar(nome.trim(), email.trim(), senha);

      navigate('/login', {
        state: {
          mensagem: 'Conta criada com sucesso! Faça login para continuar.',
        },
      });
    } catch (error) {
      setErro(
        mensagemDeErro(error) ||
          'Não foi possível criar sua conta. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="cadastro-page">
      <Link to="/" className="cadastro-logo">
        <span className="cadastro-simbolo">L.</span>

        <span className="cadastro-logo-texto">
          <strong>LÚMEN</strong>
          <small>ODONTOLOGIA</small>
        </span>
      </Link>

      <section className="cadastro-card">
        <div className="cadastro-intro">
          <span className="cadastro-etiqueta">
            SEU SORRISO, NOSSO CUIDADO
          </span>

          <h1>Vamos começar?</h1>

          <p>
            Crie sua conta e tenha seus cuidados odontológicos sempre por
            perto.
          </p>
        </div>

        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="cadastro-campo">
            <label htmlFor="nome">Nome completo</label>

            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              placeholder="Como podemos chamar você?"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </div>

          <div className="cadastro-campo">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="cadastro-campo">
            <label htmlFor="senha">Senha</label>

            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              minLength={8}
              required
            />

            <span className="cadastro-ajuda">
              Utilize pelo menos 8 caracteres.
            </span>
          </div>

          <div className="cadastro-campo">
            <label htmlFor="confirmarSenha">Confirmar senha</label>

            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              autoComplete="new-password"
              placeholder="Digite sua senha novamente"
              value={confirmarSenha}
              onChange={(event) => setConfirmarSenha(event.target.value)}
              required
            />
          </div>

          {erro && (
            <div className="cadastro-erro" role="alert">
              {erro}
            </div>
          )}

          <button
            className="cadastro-botao"
            type="submit"
            disabled={carregando}
          >
            <span>
              {carregando ? 'Criando sua conta...' : 'Criar minha conta'}
            </span>

            {!carregando && <span aria-hidden="true">↗</span>}
          </button>
        </form>

        <p className="cadastro-login">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>

        <p className="cadastro-privacidade">
          Seus dados são utilizados para gerenciar seu acesso à clínica.
        </p>
      </section>

      <footer className="cadastro-footer">
        LÚMEN ODONTOLOGIA · CUIDADO EM CADA DETALHE
      </footer>
    </main>
  );
}
