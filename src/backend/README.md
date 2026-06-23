# Green Estoque - API (Back-end)

Este é o back-end da aplicação **Green Estoque**, desenvolvida para a empresa **Green Volt** com o objetivo de gerenciar e controlar o estoque de produtos e insumos fotovoltaicos. A API REST foi construída usando Node.js, Express, TypeScript (executado via `tsx`) e Prisma ORM para comunicação com o banco de dados PostgreSQL.

## Recursos do Sistema

A API fornece endpoints para gerenciar:
* **Autenticação (`/api/auth`)**: Controle de login e geração de tokens JWT.
* **Usuários (`/api/users`)**: Cadastro e listagem de colaboradores e atribuição de perfis de acesso.
* **Produtos (`/api/produtos` / `/api/products`)**: Cadastro de módulos, inversores, cabos, proteções elétricas, etc.
* **Categorias (`/api/categorias` / `/api/categories`)**: Organização lógica de insumos.
* **Fornecedores (`/api/suppliers`)**: Cadastro dos distribuidores e parceiros comerciais.
* **Movimentações (`/api/movimentacoes` / `/api/movements`)**: Registro e controle de Entradas, Saídas, Retornos e Ajustes no estoque.
* **Notificações (`/api/notifications`)**: Alertas automáticos de estoque baixo ou zerado.
* **Dashboard (`/api/dashboard`)**: Consolidação de métricas e estatísticas para análise gerencial.

---

## Tecnologias Utilizadas

* **Runtime:** Node.js (v18+)
* **Framework Web:** Express
* **Linguagem:** TypeScript / JavaScript (ES6+)
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma ORM
* **Autenticação:** JSON Web Tokens (JWT) e bcryptjs para hashing de senhas

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
1. **Node.js** (versão 18 ou superior)
2. **PostgreSQL** ativo e com permissão para criação de banco de dados
3. Gerenciador de pacotes **npm** (incluso com o Node.js)

---

## Instruções de Instalação e Configuração

Siga os passos abaixo para preparar o ambiente:

### 1. Instalar as dependências
Navegue até a pasta do back-end e instale os pacotes necessários:
```bash
cd src/backend
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo chamado `.env` na raiz da pasta `src/backend` copiando o conteúdo do arquivo `.env.example`:
```bash
cp .env.example .env
```
Abra o arquivo `.env` e configure as credenciais do seu PostgreSQL e a chave secreta do JWT:
```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_BANCO?schema=public"
JWT_SECRET="sua-chave-secreta-segura"
PORT=3000
```

### 3. Rodar as Migrações do Banco de Dados
Para criar as tabelas e relações necessárias no banco de dados através do Prisma, execute:
```bash
npx prisma migrate dev
```
*(Esse comando aplicará as migrações existentes e gerará o Prisma Client localmente)*

### 4. Alimentar o Banco de Dados (Seed de demonstração)
Para preencher o banco com dados fictícios prontos para teste (incluindo perfis, usuários, categorias, fornecedores, produtos e movimentações), execute o script de semente:
```bash
npm run seed
```

---

## Credenciais de Demonstração (Geradas no Seed)

Após rodar o script de seed, você pode utilizar os seguintes e-mails para fazer login (a senha para **todos** eles é `123456`):

| E-mail | Nome | Perfil / Permissões |
| :--- | :--- | :--- |
| `admin@greenestoque.com` | Administrador Green Estoque | **ADMINISTRADOR** (Acesso total + Gerenciamento de usuários) |
| `supervisor@greenestoque.com` | Supervisor Operacional | **GESTOR** (Acesso a relatórios, dashboard e cadastros) |
| `funcionario@greenestoque.com` | Funcionário Estoque | **OPERACIONAL** (Cadastro e movimentações diárias) |
| `tecnico@greenestoque.com` | Técnico Solar | **OPERACIONAL** (Registro de saídas e retornos) |

---

## Como Executar a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático no salvamento de arquivos):

```bash
npm run dev
```

O console exibirá uma mensagem indicando o sucesso da inicialização:
```text
Servidor rodando em http://localhost:3000
```
