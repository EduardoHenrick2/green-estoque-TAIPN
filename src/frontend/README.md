# Green Estoque - Interface (Front-end)

Este é o front-end da aplicação **Green Estoque**, desenvolvida para a empresa **Green Volt** com o objetivo de oferecer um painel de gerenciamento intuitivo, responsivo e moderno para o controle de produtos e insumos fotovoltaicos. 

A aplicação foi construída em formato Single Page Application (SPA) usando **React** e empacotada com o **Vite** para máxima performance em desenvolvimento e produção.

---

## Recursos do Front-end

A interface contém as seguintes telas e funcionalidades:
1. **Login (`/login`)**: Controle de acesso por e-mail e senha com autenticação JWT.
2. **Dashboard (`/`)**: Visão geral de métricas, valor total do estoque, total de produtos, gráfico de movimentações recentes e painel rápido de notificações de estoque baixo.
3. **Produtos (`/produtos`)**: Cadastro completo de produtos fotovoltaicos (SKU, marca, potência, dimensões, preços de compra/venda, imagem e quantidade mínima) e consulta de saldos em tempo real.
4. **Categorias (`/categorias`)**: Cadastro e listagem de categorias para melhor organização do estoque.
5. **Fornecedores (`/fornecedores`)**: Gerenciamento de fornecedores com dados de contato, e-mail, telefone e CNPJ.
6. **Movimentações (`/movimentacoes`)**: Registro e acompanhamento de entradas de compras, saídas de materiais para instalações, devoluções/retornos e ajustes manuais de estoque.
7. **Usuários (`/usuarios`)**: Controle de usuários da equipe e seus respectivos perfis de acesso (exclusivo para Administrador).
8. **Configurações e Perfil (`/configuracoes` / `/perfil`)**: Consulta de dados do usuário ativo e preferências da aplicação.

---

## Tecnologias Utilizadas

* **Biblioteca Core:** React (v19)
* **Ferramenta de Build:** Vite
* **Roteamento:** React Router DOM (v7)
* **Requisições HTTP:** Axios
* **Gráficos:** Recharts
* **Ícones:** Lucide React
* **Feedback Visual:** React Toastify
* **Estilização:** CSS Customizado (Vanilla CSS) com design moderno, responsivo e paleta de cores voltada à identidade sustentável (verdes, cinzas e dark-mode).

---

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:
1. **Node.js** (versão 18 ou superior)
2. **npm** (incluso com o Node.js)
3. O **Back-end** do Green Estoque configurado e rodando (por padrão na porta `3000`).

---

## Instruções de Instalação e Configuração

### 1. Instalar as dependências
Navegue até a pasta do front-end e instale os pacotes necessários:
```bash
cd src/frontend
npm install
```

### 2. Configurar a Conexão com a API
A aplicação já vem com um arquivo `.env` configurado por padrão para apontar para a API local:
```env
VITE_API_URL=http://localhost:3000/api
```
*(Caso seu back-end esteja rodando em outra porta ou host, altere este valor no arquivo `.env` na raiz da pasta `src/frontend`)*

---

## Como Executar a Aplicação

Para iniciar o servidor de desenvolvimento do Vite:

```bash
npm run dev
```

O console exibirá o endereço local onde a interface estará disponível para acesso no navegador (geralmente `http://localhost:5173`):
```text
  VITE v8.0.12  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Abra o endereço indicado no seu navegador e faça o login com uma das credenciais de demonstração (por exemplo, `admin@greenestoque.com` / `123456`).

---

## Geração de Build de Produção

Se desejar gerar a versão compilada e otimizada para implantação em servidores de produção:

```bash
npm run build
```
*(Este comando gerará os arquivos otimizados estáticos na pasta `dist/`)*

Para testar o build localmente antes de implantá-lo:
```bash
npm run preview
```
