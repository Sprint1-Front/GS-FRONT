# 🌊 THALASSOR



> **Global Solution 2026** - Solução inovadora para monitoramento e preservação dos oceanos.



## 📖 Descrição



O **Thalassor** é uma aplicação web interativa que visa conscientizar e fornecer ferramentas para o monitoramento das zonas oceânicas. Através de uma experiência imersiva de *scroll* de profundidade e *dashboards* de dados em tempo real, conectamos usuários, pesquisadores e ativistas na luta pela preservação marinha.

## 🚀 Como Usar e Links Importantes



Para acessar, testar e conhecer mais sobre a nossa solução, utilize os links abaixo:


- **🌐 Deploy do Render:** [Acesse o código do back-end](https://thalassor.onrender.com/)

- **🌐 Deploy na Vercel:** [Acesse a aplicação ao vivo aqui](https://thalassor.vercel.app)

- **🎥 Pitch/Vídeo de Apresentação (YouTube):** [Assista ao nosso vídeo no YouTube](https://youtube.com/link-do-video)

- **💻 Repositório GitHub:** [Link do repositório](https://github.com/Sprint1-Front/GS-FRONT.git)

- **💻 Repositório BACK-END:** [Link do repositório](https://github.com/If-Kaliel/thalassor.git)

---

## Para rodar o projeto localmente em sua máquina:

```bash

# Clone o repositório

git clone <https://github.com/Sprint1-Front/GS-FRONT.git>



# Entre no diretório do front-end

cd gs-front



# Instale as dependências

npm install



## Recomendado: 

npm audit fix ou npm audit fix --force



# Inicie o servidor de desenvolvimento

npm run dev



# Se estiver tudo certo realize este script para verificar as dependências para usar o vercel

npm run build



# Para realizar o DEPLOY na vercel precisa estar logado

vercel --prod


# Ele irá pedir para você logar com o github faça o e depois volte, se não começar o deploy rode de novo o comando acima.


## OPCIONAL: 

# Se quiser rodar a API em seu computador e não por nuvem:

```


## 🛠 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e ferramentas:



React + Vite - Framework e Bundler

TypeScript - Tipagem estática

Tailwind CSS - Estilização

React Router DOM - Roteamento (Login, Cadastro, Dashboard, etc.)	


## 📂 Estrutura de Pastas

A estrutura do nosso projeto foi organizada da seguinte maneira:

```bash

   GS-FRONT-END/

    └── gs-front/
      ├── src/
      │   ├──` assets/        `# Imagens e ícones (Github, Linkedin)
      │   ├──` components/    `# Componentes reutilizáveis (Header, Footer, ui)
      │   │   └──` Ocean/     `# Componentes específicos das Zonas do Oceano
      │   ├──` layouts/       `# Layouts base da aplicação
      │   ├──` routes/        `# Páginas da aplicação (Home, Login, Dashboard, etc.)
      │   ├──` styles/        `# Estilos globais (`global.css`)
      │   └──` types/         `# Definições de tipos do TypeScript
      ├── `package.json`      `# Dependências e scripts
      └── `vite.config.ts`    `# Configurações do Vite



```


