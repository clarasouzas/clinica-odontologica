```markdown
# Lúmen Odontologia

Sistema web de gestão e agendamento odontológico desenvolvido para a clínica Lúmen Odontologia. A plataforma tem como objetivo facilitar o agendamento de consultas, o acompanhamento dos atendimentos e a administração dos serviços da clínica, proporcionando uma experiência simples, intuitiva e acolhedora.

## Sobre o projeto

A Lúmen Odontologia é uma aplicação web que conecta pacientes e administradores em um único ambiente digital.

Os pacientes podem criar uma conta, acessar a plataforma, consultar os profissionais disponíveis, agendar atendimentos e acompanhar suas consultas. Já os administradores contam com funcionalidades para organizar a agenda, gerenciar profissionais, serviços e disponibilidades, além de acompanhar avaliações.

A interface utiliza uma identidade visual minimalista e elegante, com tons de verde, cores neutras e tipografia que transmite cuidado, confiança e profissionalismo.

## Objetivos

- Facilitar o agendamento de consultas odontológicas.
- Centralizar informações sobre pacientes e atendimentos.
- Permitir o gerenciamento da agenda da clínica.
- Organizar profissionais, serviços e horários disponíveis.
- Melhorar a experiência dos pacientes no acompanhamento das consultas.
- Oferecer uma interface intuitiva e responsiva.

## Funcionalidades

### Área pública
- Página inicial institucional.
- Apresentação da clínica.
- Visualização dos profissionais.
- Página de detalhes dos profissionais.
- Cadastro de pacientes.
- Login e autenticação.
- Recuperação de senha.

### Área do paciente
- Página inicial personalizada.
- Consulta aos serviços disponíveis.
- Seleção de profissional, data e horário.
- Agendamento de consultas.
- Visualização das consultas agendadas.
- Acompanhamento dos detalhes de cada consulta.
- Cancelamento de consultas, conforme as permissões da API.
- Avaliação de atendimentos.
- Visualização e atualização de informações do perfil, conforme os recursos disponíveis.
- Alteração de senha.

### Área administrativa
- Visualização da agenda.
- Acompanhamento de consultas pendentes de confirmação.
- Confirmação de agendamentos.
- Gerenciamento das informações da clínica.
- Cadastro e gerenciamento de profissionais.
- Cadastro e gerenciamento de serviços.
- Gerenciamento de disponibilidades.
- Visualização das avaliações dos pacientes.

> Observação: a disponibilidade efetiva de cada funcionalidade depende da implementação das páginas e dos contratos e permissões oferecidos pela API.

## Tecnologias utilizadas

### Front-end
- **React** — construção da interface por componentes.
- **Vite** — ambiente de desenvolvimento e ferramenta de build.
- **JavaScript** — lógica e interatividade.
- **React Router DOM** — navegação entre páginas.
- **CSS** — estilização e responsividade.

### Integração
- **API REST** — comunicação com o serviço de agendamentos.
- **Fetch API** — realização de requisições HTTP.
- **LocalStorage** — armazenamento local dos tokens de autenticação.

## Identidade visual

A interface da Lúmen Odontologia utiliza uma linguagem visual minimalista, com foco em legibilidade, organização e facilidade de navegação.

Principais características:
- Verde profundo para ações e elementos de destaque.
- Tons claros e neutros para os fundos.
- Tipografia elegante nos títulos.
- Componentes com bordas suaves.
- Layout adaptável a diferentes tamanhos de tela.

## Requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js.
- npm, instalado junto com o Node.js.
- Um navegador atualizado.
- Acesso à API utilizada pelo sistema.

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd clinica-odontologica
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```dotenv
VITE_API_URL=https://agendamentos.spaincentral.cloudapp.azure.com/api
VITE_ORGANIZACAO=clinica-odontologica
```

A variável `VITE_API_URL` define o endereço-base da API.

A variável `VITE_ORGANIZACAO` identifica a organização utilizada nas operações de autenticação.

Não coloque senhas, chaves privadas ou outros segredos nesse arquivo. Variáveis com prefixo `VITE_` ficam disponíveis no código do navegador.

### 4. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

http://localhost:5173

### 5. Gerar a versão de produção

```bash
npm run build
```

Para testar localmente a versão gerada:

```bash
npm run preview
```

## Integração com a API

A aplicação utiliza uma API REST para operações relacionadas à autenticação, aos agendamentos e à administração da clínica.

### Autenticação

| Método | Endpoint | Finalidade |
|---|---|---|
| POST | `/auth/cadastro/` | Cadastro de usuário |
| POST | `/auth/login/` | Autenticação |
| GET | `/auth/eu/` | Consulta do usuário autenticado |
| POST | `/auth/renovar/` | Renovação de token |
| POST | `/auth/redefinir-senha/` | Solicitação de redefinição de senha |
| POST | `/auth/alterar-senha/` | Alteração de senha |

### Agendamentos

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/agendamentos/` | Listagem de agendamentos |
| POST | `/agendamentos/` | Criação de agendamento |
| GET | `/agendamentos/{id}/` | Consulta de um agendamento |
| POST | `/agendamentos/{id}/confirmar/` | Confirmação |
| POST | `/agendamentos/{id}/cancelar/` | Cancelamento |
| POST | `/agendamentos/{id}/concluir/` | Conclusão do atendimento |
| POST | `/agendamentos/{id}/avaliar/` | Avaliação do atendimento |

### Outros recursos

| Endpoint | Finalidade |
|---|---|
| `/servicos/` | Consulta e gerenciamento de serviços |
| `/recursos/` | Consulta e gerenciamento de profissionais ou recursos |
| `/disponibilidades/` | Consulta e gerenciamento de disponibilidades |
| `/horarios-livres/` | Consulta de horários disponíveis |
| `/avaliacoes/` | Consulta de avaliações |
| `/organizacao/` | Consulta e gerenciamento da organização |

Os métodos HTTP, parâmetros, campos obrigatórios e permissões devem seguir a documentação oficial da API.

## Estrutura do projeto

```text
clinica-odontologica/
├── public/
├── src/
│   ├── api/
│   │   └── client.js
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── Publica.jsx
│   ├── pages/
│   │   ├── admin/
│   │   ├── agendar/
│   │   ├── AlterarSenha.jsx
│   │   ├── Avaliar.jsx
│   │   ├── Cadastro.jsx
│   │   ├── Consulta.jsx
│   │   ├── Dentista.jsx
│   │   ├── Dentistas.jsx
│   │   ├── Entrada.jsx
│   │   ├── EsqueciSenha.jsx
│   │   ├── Inicio.jsx
│   │   ├── Login.jsx
│   │   ├── MinhasConsultas.jsx
│   │   ├── NaoEncontrado.jsx
│   │   └── Perfil.jsx
│   ├── App.jsx
│   ├── AuthContext.jsx
│   ├── AuthProvider.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
└── README.md
```

A estrutura representa a organização prevista para a aplicação. Os arquivos e diretórios devem ser ajustados conforme a estrutura real do repositório.

## Autenticação e permissões

O sistema utiliza autenticação por tokens e consulta os dados do usuário autenticado por meio da API.

As funcionalidades administrativas devem ser disponibilizadas somente a usuários autorizados. A interface pode utilizar as permissões retornadas pela API para controlar a navegação, mas a autorização efetiva também deve ser validada no servidor.

Os tokens armazenados no navegador devem ser tratados com cuidado, e as requisições autenticadas devem utilizar os mecanismos de segurança previstos pela API.

## Tratamento de erros

A aplicação deve considerar situações como:

- Falha de conexão com a API.
- Credenciais inválidas.
- Sessão expirada.
- Acesso não autorizado.
- Dados inválidos.
- Ausência de horários disponíveis.
- Listas vazias.
- Limite de requisições atingido.

As telas devem informar o usuário sobre o resultado das operações e disponibilizar novas tentativas quando apropriado.

## Responsividade

A interface deve se adaptar a diferentes dispositivos, incluindo:

- Computadores.
- Tablets.
- Smartphones.

O objetivo é manter a navegação acessível, os formulários legíveis e as principais ações fáceis de localizar em qualquer tamanho de tela.

## Segurança

- Não compartilhar tokens de autenticação.
- Não versionar arquivos `.env` com dados sensíveis.
- Validar dados no cliente e no servidor.
- Restringir operações administrativas por permissões.
- Utilizar HTTPS em ambientes de produção.
- Evitar expor informações pessoais desnecessárias.

## Desenvolvimento

O projeto está organizado em componentes e páginas para facilitar a manutenção, a evolução das funcionalidades e a reutilização de elementos da interface.

Antes de publicar uma nova versão, recomenda-se executar:

```bash
npm run build
```

Também é importante verificar a integração com a API e testar os fluxos de cadastro, login, agendamento e administração.

## Autoria

**Projeto:** Lúmen Odontologia  
**Categoria:** Sistema web de gestão e agendamento odontológico  
**Desenvolvimento:** [Adicionar nomes dos integrantes ou equipe]  
**Instituição:** [Adicionar instituição, caso aplicável]

## Licença

A licença de uso e distribuição deve ser definida pelos responsáveis pelo projeto.
```
