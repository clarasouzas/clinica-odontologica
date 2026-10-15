
const API = import.meta.env.VITE_API_URL;
export const ORGANIZACAO = import.meta.env.VITE_ORGANIZACAO;

// Faz uma requisição para a API.
async function enviar(caminho, { method = 'GET', body } = {}) {
  const url = caminho.startsWith('http') ? caminho : API + caminho;
  const headers = {};

  const access = localStorage.getItem('access');

  if (access) {
    headers.Authorization = `Bearer ${access}`;
  }

  // Envia objetos como JSON e imagens como FormData.
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const resposta = await fetch(url, { method, headers, body });
  return resposta;
}

// Renova o token de acesso quando ele expira.
async function renovarToken() {
  const resposta = await fetch(`${API}/auth/renovar/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refresh: localStorage.getItem('refresh'),
    }),
  });

  if (!resposta.ok) return false;

  const dados = await resposta.json();

  localStorage.setItem('access', dados.access);

  if (dados.refresh) {
    localStorage.setItem('refresh', dados.refresh);
  }

  return true;
}

// Faz a requisição e trata os erros.
export async function api(caminho, opcoes = {}, repetir = true) {
  let resposta;

  try {
    resposta = await enviar(caminho, opcoes);
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }

  if (
    resposta.status === 401 &&
    repetir &&
    localStorage.getItem('refresh')
  ) {
    let renovou = false;

    try {
      renovou = await renovarToken();
    } catch {
      renovou = false;
    }

    if (renovou) {
      return api(caminho, opcoes, false);
    }

    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }

    throw new Error('Sessão expirada. Entre novamente.');
  }

  const texto =
    resposta.status === 204 ? '' : await resposta.text();

  let dados = null;

  if (texto) {
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = texto;
    }
  }

  if (!resposta.ok) {
    const erro = new Error(
      dados?.detail || dados?.mensagem || 'Ocorreu um erro na requisição.'
    );

    erro.status = resposta.status;
    erro.dados = dados;

    throw erro;
  }

  return dados;
}

// Junta os resultados de todas as páginas.
export async function buscarTodas(caminho) {
  let itens = [];
  let proxima = caminho;

  while (proxima) {
    const dados = await api(proxima);

    if (Array.isArray(dados)) {
      return [...itens, ...dados];
    }

    itens = [...itens, ...dados.results];
    proxima = dados.next;
  }

  return itens;
}

// Faz login.
export function login(email, senha) {
  return api('/auth/login/', {
    method: 'POST',
    body: {
      organizacao: ORGANIZACAO,
      email,
      senha,
    },
  });
}

// Cria uma conta.
export function cadastrar(nome, email, senha) {
  return api('/auth/cadastro/', {
    method: 'POST',
    body: {
      organizacao: ORGANIZACAO,
      nome,
      email,
      senha,
    },
  });
}

// Solicita redefinição de senha.
export function redefinirSenha(email) {
  return api('/auth/redefinir-senha/', {
    method: 'POST',
    body: {
      organizacao: ORGANIZACAO,
      email,
    },
  });
}

// Transforma erros da API em mensagens para o usuário.
export function mensagemDeErro(erro) {
  const dados = erro?.dados;

  if (erro?.status === 400) {
    if (dados?.detail) return dados.detail;
    if (dados?.non_field_errors) {
      return dados.non_field_errors.join(' ');
    }

    return 'Verifique os dados informados.';
  }

  if (erro?.status === 401) {
    return 'E-mail, senha ou sessão inválidos.';
  }

  if (erro?.status === 403) {
    return 'Você não tem permissão para esta ação.';
  }

  if (erro?.status === 404) {
    return 'O recurso não foi encontrado.';
  }

  if (erro?.status === 429) {
    return 'Muitas tentativas. Aguarde um minuto.';
  }

  return erro?.message || 'Ocorreu um erro inesperado.';
}
