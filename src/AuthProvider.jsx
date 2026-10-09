
import { useEffect, useState } from 'react';
import { api, login } from './api/client';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(
    Boolean(localStorage.getItem('access'))
  );

  useEffect(() => {
    let ativo = true;

    async function carregarUsuario() {
      if (!localStorage.getItem('access')) {
        setCarregando(false);
        return;
      }

      try {
        const dados = await api('/auth/eu/');
        if (ativo) setUsuario(dados);
      } catch {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        if (ativo) setUsuario(null);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarUsuario();

    return () => {
      ativo = false;
    };
  }, []);

  async function entrar(email, senha) {
    const dados = await login(email, senha);

    localStorage.setItem('access', dados.access);
    localStorage.setItem('refresh', dados.refresh);

    try {
      const usuarioAtual = await api('/auth/eu/');
      setUsuario(usuarioAtual);
      return usuarioAtual;
    } catch (erro) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      throw erro;
    }
  }

  function sair() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUsuario(null);
  }

  function pode(permissao) {
    return usuario?.permissoes?.includes(permissao) ?? false;
  }

  const inicio = pode('api.change_organizacao')
    ? '/admin/agenda'
    : '/inicio';

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        carregando,
        entrar,
        sair,
        pode,
        inicio,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
