
const API = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const ORGANIZACAO =
  import.meta.env.VITE_ORGANIZACAO || 'clinica-odontologica';

// ==================================================
// REQUISIÇÕES HTTP
// ==================================================

async function enviar(caminho, opcoes = {}) {
  if (!API) {
    throw new Error(
      'URL da API não configurada. Confira o arquivo .env.'
    );
  }

  const {
    method = 'GET',
    body,
    headers: headersOriginais = {},
    ...outrasOpcoes
  } = opcoes;

  const url = /^https?:\/\//i.test(caminho)
    ? caminho
    : `${API}${caminho.startsWith('/') ? caminho : `/${caminho}`}`;

  const headers = new Headers(headersOriginais);
  const access = localStorage.getItem('access');

  if (access) {
    headers.set('Authorization', `Bearer ${access}`);
  }

  let corpo = body;

  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      // O navegador define o Content-Type e o boundary automaticamente.
      headers.delete('Content-Type');
    } else if (
      typeof body === 'object' &&
      !(body instanceof Blob)
    ) {
      headers.set('Content-Type', 'application/json');
      corpo = JSON.stringify(body);
    }
  }

  let resposta;

  try {
    resposta = await fetch(url, {
      ...outrasOpcoes,
      method,
      headers,
      ...(corpo !== undefined ? { body: corpo } : {}),
    });
  } catch {
    throw new Error(
      'Não foi possível conectar ao servidor. Verifique sua conexão.'
    );
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
      obterMensagemServidor(dados) ||
      `Erro na requisição (${resposta.status}).`
    );

    erro.status = resposta.status;
    erro.dados = dados;

    throw erro;
  }

  return dados;
}

function obterMensagemServidor(dados) {
  if (typeof dados === 'string') return dados;

  if (dados?.detail) return dados.detail;
  if (dados?.mensagem) return dados.mensagem;
  if (dados?.message) return dados.message;

  if (dados?.non_field_errors) {
    return dados.non_field_errors.join(' ');
  }

  return null;
}

// ==================================================
// RENOVAÇÃO DO TOKEN
// ==================================================

let renovacaoEmAndamento = null;

async function renovarToken() {
  const refresh = localStorage.getItem('refresh');

  if (!refresh) {
    throw new Error('Sessão expirada. Entre novamente.');
  }

  if (!renovacaoEmAndamento) {
    renovacaoEmAndamento = enviar('/auth/renovar/', {
      method: 'POST',
      body: { refresh },
    })
      .then((dados) => {
        if (!dados?.access) {
          throw new Error('Não foi possível renovar a sessão.');
        }

        localStorage.setItem('access', dados.access);

        if (dados.refresh) {
          localStorage.setItem('refresh', dados.refresh);
        }

        return dados.access;
      })
      .finally(() => {
        renovacaoEmAndamento = null;
      });
  }

  return renovacaoEmAndamento;
}

// ==================================================
// FUNÇÃO PRINCIPAL DA API
// ==================================================

export async function api(caminho, opcoes = {}, repetir = true) {
  try {
    return await enviar(caminho, opcoes);
  } catch (erro) {
    if (erro.status !== 401 || !repetir) {
      throw erro;
    }

    // Não tenta renovar uma sessão inexistente.
    if (!localStorage.getItem('refresh')) {
      localStorage.removeItem('access');
      throw erro;
    }

    try {
      await renovarToken();

      // Repete a requisição apenas uma vez.
      return await api(caminho, opcoes, false);
    } catch (erroRenovacao) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      throw erroRenovacao;
    }
  }
}

// ==================================================
// PAGINAÇÃO
// ==================================================

export async function buscarTodas(caminho) {
  const itens = [];
  let proxima = caminho;
  const urlsVisitadas = new Set();

  while (proxima) {
    if (urlsVisitadas.has(proxima)) {
      throw new Error('A paginação da API retornou um ciclo.');
    }

    urlsVisitadas.add(proxima);

    const dados = await api(proxima);

    // Algumas APIs retornam uma lista diretamente.
    if (Array.isArray(dados)) {
      return [...itens, ...dados];
    }

    if (!dados || !Array.isArray(dados.results)) {
      throw new Error('Formato de paginação inesperado na API.');
    }

    itens.push(...dados.results);
    proxima = dados.next;
  }

  return itens;
}

// ==================================================
// AUTENTICAÇÃO
// ==================================================

export function login(email, senha) {
  return enviar('/auth/login/', {
    method: 'POST',
    body: {
      organizacao: ORGANIZACAO,
      email,
      senha,
    },
  });
}

export function cadastrar(nome, email, senha) {
  return enviar('/auth/cadastro/', {
    method: 'POST',
    body: {
      organizacao: ORGANIZACAO,
      nome,
      email,
      senha,
    },
  });
}

export function redefinirSenha(email) {
  return enviar('/auth/redefinir-senha/', {
    method: 'POST',
    body: {
      organizacao: ORGANIZACAO,
      email,
    },
  });
}

// ==================================================
// MENSAGENS DE ERRO PARA A INTERFACE
// ==================================================

export function mensagemDeErro(erro) {
  const dados = erro?.dados;

  if (!erro?.status) {
    return erro?.message || 'Não foi possível falar com o servidor.';
  }

  if (erro.status === 400) {
    if (dados?.detail) return dados.detail;
    if (dados?.non_field_errors) {
      return dados.non_field_errors.join(' ');
    }

    if (dados && typeof dados === 'object') {
      const mensagens = Object.entries(dados).flatMap(
        ([campo, valor]) => {
          const erros = Array.isArray(valor) ? valor : [valor];

          return erros.map((mensagem) =>
            `${campo}: ${
              typeof mensagem === 'string'
                ? mensagem
                : JSON.stringify(mensagem)
            }`
          );
        }
      );

      if (mensagens.length) return mensagens.join(' ');
    }

    return 'Verifique os campos e tente novamente.';
  }

  if (erro.status === 401) {
    return 'Sua sessão expirou ou suas credenciais são inválidas.';
  }

  if (erro.status === 403) {
    return 'Você não tem permissão para realizar esta ação.';
  }

  if (erro.status === 404) {
    return 'O recurso solicitado não foi encontrado.';
  }

  if (erro.status === 429) {
    return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
  }

  if (erro.status >= 500) {
    return 'O servidor apresentou um problema. Tente novamente mais tarde.';
  }

  return erro.message || 'Ocorreu um erro inesperado.';
}
