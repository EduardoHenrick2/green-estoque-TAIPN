# Nome do projeto

`CURSO: Análise e Desenvolvimento de Sistemas`

`DISCIPLINA: Trabalho Interdisciplinar Aplicações para Processos de Negócios`

`2º semestre/2026`

O objetivo do projeto Green Estoque é desenvolver uma aplicação web para auxiliar a empresa Green Volt no controle e gerenciamento de seu estoque de produtos e insumos fotovoltaicos. A solução busca substituir processos manuais, como anotações informais, planilhas e contagens físicas frequentes, por um sistema digital integrado a um banco de dados, permitindo o cadastro, consulta e atualização das informações de forma mais rápida, organizada, confiável e com menos burocracia.

Com o sistema, espera-se reduzir retrabalho, minimizar erros humanos, facilitar a localização de produtos e melhorar o acompanhamento das movimentações de entrada e saída do estoque. Além disso, o Green Estoque contribui para a modernização dos processos internos da empresa, oferecendo maior segurança nas informações e apoio à tomada de decisão por parte dos colaboradores e gestores.

## Integrantes

* Benedito Medeiros
* Eduardo Henrick
* Caique de Lima
* Fabio Henrique
* Gustavo Ferreira
* João Gabriel dos Santos
* Matheus Aurélio
* Raphael Henrique
* Victor Hugo Ribeiro
* Wesley Andre Melo

## Professor

Paulo Augusto Isnard

## Instruções de utilização

Esta seção apresenta as instruções para instalação, configuração e execução da aplicação **Green Estoque**. O sistema foi desenvolvido como uma aplicação web, composta por um **front-end em React + Vite**, um **back-end em Node.js + Express**, integração com **Prisma ORM** e banco de dados **PostgreSQL**.

---

### Usuário de teste

Para fins de demonstração e validação do sistema, poderá ser utilizado o seguinte usuário de teste:

```text
Usuário: admin@greenestoque.com
Senha: admin123
Perfil: Administrador
```

> Observação: os dados acima podem ser alterados conforme a configuração final do ambiente de testes.

---

### Pré-requisitos

Antes de executar o projeto localmente, é necessário ter instalado:

* Node.js;
* npm;
* PostgreSQL;
* Git;
* Prisma.

Também é recomendado utilizar um editor de código, como Visual Studio Code ou ferramenta equivalente.

---

### Clonar o repositório

Para obter o projeto, execute o comando abaixo:

```bash
git https://github.com/EduardoHenrick2/green-estoque-TAIPN
```

Em seguida, acesse a pasta do projeto:

```bash
cd /src
```

---

## Execução do back-end

Acesse a pasta do back-end:

```bash
cd src/backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no arquivo `.env.example`:

```bash
cp .env.example .env
```

Configure a variável de conexão com o banco PostgreSQL no arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/green_estoque"
```

Execute as migrações ou configure o banco de dados com o Prisma:

```bash
npx prisma migrate dev
```

Caso o projeto utilize o arquivo `database.sql`, execute o script no PostgreSQL para criar ou popular as tabelas necessárias.

Para iniciar o servidor back-end, execute:

```bash
npm run dev
```

O back-end será executado, normalmente, em:

```text
http://localhost:3000
```

---

## Execução do front-end

Em outro terminal, acesse a pasta do front-end:

```bash
cd src/frontend
```

Instale as dependências:

```bash
npm install
```

Crie ou configure o arquivo `.env`, se necessário, informando o endereço da API:

```env
VITE_API_URL="http://localhost:3000"
```

Execute a aplicação front-end:

```bash
npm run dev
```

O front-end será executado, normalmente, em:

```text
http://localhost:5173
```

---

## Fluxo básico de uso do sistema

Após acessar a aplicação, o usuário deverá realizar login com uma conta autorizada. Em seguida, será direcionado ao painel principal do sistema.

As principais funcionalidades disponíveis são:

* visualizar o dashboard com informações gerais do estoque;
* consultar produtos cadastrados;
* pesquisar produtos por nome, categoria, marca ou código/SKU;
* cadastrar novos produtos;
* editar informações de produtos existentes;
* registrar movimentações de entrada e saída;
* consultar histórico de movimentações;
* visualizar produtos com estoque baixo;
* gerenciar fornecedores, caso a funcionalidade esteja disponível na versão final.

---

## Observações importantes

A aplicação depende da correta configuração do banco de dados PostgreSQL e das variáveis de ambiente do back-end e do front-end.

Caso ocorra erro de conexão com o banco, verifique:

* se o PostgreSQL está em execução;
* se o banco de dados foi criado;
* se a variável `DATABASE_URL` está correta;
* se as migrações do Prisma foram executadas;
* se as dependências foram instaladas corretamente.

Em ambiente de produção, os links da aplicação, da API e do banco de dados devem ser configurados conforme a plataforma de hospedagem utilizada.


# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Modelagem-processos-negocio.md"> Modelagem dos processos de negócios</a></li>
<li><a href="docs/05-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/06-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/07-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/08-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/09-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/10-Conclusao.md"> Conclusão</a></li>
<li><a href="docs/11-Referencias.md"> Referências</a></li>
</ol>

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>
