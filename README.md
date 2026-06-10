# 🌊 Thalassor

> **Global Solution 2026** — Solução inovadora para monitoramento e preservação dos oceanos.

---

## 📖 Descrição

O **Thalassor** é uma aplicação web interativa que visa conscientizar e fornecer ferramentas para o monitoramento das zonas oceânicas. Por meio de uma experiência imersiva de **scroll de profundidade** e **dashboards de dados em tempo real**, conectamos usuários, pesquisadores e ativistas na luta pela preservação marinha.

---

## 🚀 Como Usar e Links Importantes

Para acessar, testar e conhecer mais sobre a solução, utilize:

- **🌐 Deploy (Back-end) — Render:** https://thalassor.onrender.com/
- **🌐 Deploy (Front-end) — Vercel:** https://thalassor.vercel.app
- **🎥 Pitch/Vídeo de Apresentação (YouTube):** https://www.youtube.com/watch?v=LjIb9EUdXhs
- **💻 Repositório Front-end (GitHub):** https://github.com/Sprint1-Front/GS-FRONT.git
- **💻 Repositório Back-end (GitHub):** https://github.com/If-Kaliel/thalassor.git

---

## ▶️ Rodando Localmente

### Pré-requisitos

- **Node.js** (versão compatível com o projeto)
- **npm**

### Passo a passo

```bash
# Clone o repositório
git clone <https://github.com/Sprint1-Front/GS-FRONT.git>

# Entre no diretório do front-end
cd gs-front

# Instale as dependências
npm install

# (Opcional) Correções recomendadas de segurança
npm audit fix # ou npm audit fix --force

# Inicie o servidor de desenvolvimento
npm run dev

# (Opcional) Build para produção
npm run build
```

### Deploy na Vercel

```bash
# Para realizar o DEPLOY na Vercel precisa estar logado
vercel --prod
```

> Durante o processo pode ser necessário autenticar via GitHub. Se o deploy falhar, execute novamente o comando acima.

---

## 🛠 Tecnologias Utilizadas

- **React + Vite** — Framework e bundler
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização
- **React Router DOM** — Roteamento (Login, Cadastro, Dashboard, etc.)

---

## 📁 Estrutura de Pastas

```text
GS-FRONT-END/

└── gs-front/
  ├── src/
  │   ├── assets/              # Imagens e ícones (GitHub, LinkedIn, etc.)
  │   ├── components/         # Componentes reutilizáveis (Header, Footer, UI)
  │   │   └── Ocean/          # Componentes específicos das Zonas do Oceano
  │   ├── layouts/            # Layouts base da aplicação
  │   ├── routes/             # Páginas da aplicação (Home, Login, Dashboard, etc.)
  │   ├── styles/             # Estilos globais (ex.: global.css)
  │   └── types/              # Definições de tipos do TypeScript
  ├── package.json            # Dependências e scripts
  └── vite.config.ts         # Configurações do Vite
```

---

## 📸 Telas (para adicionar prints)

A seguir estão seções prontas para você colar prints das páginas e incluir descrições resumidas.

### 1) Tela Inicial (Home)

**Print Home:**

<img width="1912" height="984" alt="image" src="https://github.com/user-attachments/assets/de1b2ca2-bda0-433b-9289-604b45371712" />


**Descrição resumida:**

- Objetivo da página
- Principais elementos e interações

---

### 2) Login

**Print Login:**

<img width="1910" height="983" alt="image" src="https://github.com/user-attachments/assets/8f875ac5-3d82-49fb-a963-9209652b7195" />

**Descrição resumida:**

- Como o usuário acessa
- Campos e comportamento

---

### 3) Cadastro

**Print Cadastro:**

<img width="1912" height="989" alt="image" src="https://github.com/user-attachments/assets/6721b8a2-66d0-4322-98d7-9d4d956487a6" />

**Descrição resumida:**

- Fluxo de criação de conta
- Validações relevantes

---

### 4) Dashboard

**Print Dashboard:**

<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/ac3eebc9-1547-43a1-838e-c933593c336a" />

**Descrição resumida:**

- Visão geral do painel
- Cards/estatísticas e componentes principais

---

### 5) Zonas do Oceano (Scroll/Profundidade)

**Print:**

<img width="1912" height="920" alt="image" src="https://github.com/user-attachments/assets/36fd5f8b-165f-4bf0-9ed4-46349ed32749" />

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/b526641c-246a-46e3-84e2-7ebd65990eec" />

<img width="1917" height="992" alt="image" src="https://github.com/user-attachments/assets/b55859bf-ff57-4d00-8192-893e45743de0" />

<img width="1917" height="987" alt="image" src="https://github.com/user-attachments/assets/6d2e1104-2cf3-44d1-9807-166d41bfbc17" />

**Descrição resumida:**

- Como funciona o scroll de profundidade
- O que aparece em cada faixa de profundidade

---

### 6) Foco/Detalhes (ex.: Poluição / Ordem de Coleta)

**Print:**

<img width="1914" height="991" alt="image" src="https://github.com/user-attachments/assets/e6920b81-600b-4134-8f72-d10dfef89585" />

**Descrição resumida:**

- Conteúdo do detalhe
- Ações disponíveis ao usuário

---

### 7) Contato

**Print:**

<img width="1911" height="985" alt="image" src="https://github.com/user-attachments/assets/031ef196-dcc6-45ad-9272-f1955b009fc0" />

**Descrição resumida:**

- Informações exibidas
- Como entrar em contato

---

### 8) FAQ / Sobre / Integrantes

**Print:**

<img width="1911" height="990" alt="image" src="https://github.com/user-attachments/assets/312a2ddd-6fa6-40fb-b471-2c81eb9f22d1" />

<img width="1919" height="989" alt="image" src="https://github.com/user-attachments/assets/77b664a8-6e80-4d9e-ad34-b6bb69828cd1" />

**Descrição resumida:**

- O que cada seção explica
- Diferenciais do projeto

---

## 👥 Autores e Créditos

Projeto desenvolvido com dedicação por:

- **Andre Sousa Matuda** — RM: 566733 — TURMA: 1TDSPB

  - GitHub: https://github.com/Andre-Matuda
  - LinkedIn: https://www.linkedin.com/in/andrematuda

- **Paulo Henrique Muniz Diedrich** — RM: 567618 — TURMA: 1TDSPB

  - GitHub: https://github.com/paulodiedrich
  - LinkedIn: https://www.linkedin.com/in/paulo-henrique-muniz-diedrich-496aba389

- **Kaliel Conceição de Aquino** — RM: 567587 — TURMA: 1TDSPB

  - GitHub: https://github.com/if-kaliel
  - LinkedIn: https://www.linkedin.com/in/kaliel-aquino-a034332b6

- **Guilherme Oliveira Feitosa** — RM: 566842 — TURMA: 1TDSPB

  - GitHub: https://github.com/GuilherOliverFeitosa
  - LinkedIn: https://www.linkedin.com/in/guilherme-oliveira-feitosa-762b56389

---

## 📞 Contato

- **Email:** ThalassorOcean@proton.me
- **Telefone:** (11) 99999-9999

---

## Feito com amor 💕


