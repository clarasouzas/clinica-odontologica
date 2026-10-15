# Lúmen Odontologia

**Plataforma web de agendamento e gerenciamento odontológico.**

A Lúmen Odontologia é uma aplicação desenvolvida em React para conectar pacientes e profissionais em um ambiente digital intuitivo, facilitando o agendamento de consultas e a gestão dos atendimentos.

O projeto integra uma API REST para autenticação e gerenciamento de dados, com interfaces específicas para pacientes e administradores.

## Funcionalidades

- **Autenticação:** cadastro, login e recuperação de senha.
- **Agendamentos:** consulta de horários disponíveis, agendamento e acompanhamento de consultas.
- **Profissionais:** visualização e gerenciamento dos profissionais da clínica.
- **Serviços:** consulta e administração dos serviços odontológicos.
- **Agenda administrativa:** gerenciamento de atendimentos e confirmações.
- **Avaliações:** registro e consulta de avaliações dos pacientes.
- **Controle de acesso:** interface adaptada às permissões de cada usuário.

## Tecnologias

- [React](https://react.dev/) — construção da interface.
- [Vite](https://vite.dev/) — ambiente de desenvolvimento e build.
- [React Router](https://reactrouter.com/) — navegação entre páginas.
- CSS — estilização e responsividade.
- API REST — integração com os serviços de agendamento.

## Executando localmente

**1. Instale as dependências**

```bash
npm install
```

**2. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://agendamentos.spaincentral.cloudapp.azure.com/api
VITE_ORGANIZACAO=clinica-odontologica
```

**3. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite, normalmente em [localhost:5173](http://localhost:5173).

**4. Gere a versão de produção**

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.



## Identidade visual

A interface segue uma proposta minimalista e contemporânea, com tons de verde, cores neutras e elementos visuais que reforçam a identidade da Lúmen Odontologia.

## Publicação

O projeto pode ser publicado em serviços de hospedagem para aplicações front-end, como a [Vercel](https://vercel.com/). Configure as variáveis de ambiente na plataforma e habilite o redirecionamento das rotas para o `index.html`, conforme necessário para o React Router.

---

**Projeto acadêmico desenvolvido para a disciplina de Programação Orientada a Serviços (POS).**
