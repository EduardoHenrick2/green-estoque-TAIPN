
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A metodologia adotada caracteriza-se como **desenvolvimento aplicado**, visando construir uma solução digital para o controle de estoque da Green Volt. O projeto substitui processos manuais por uma aplicação web integrada a um banco de dados relacional.

O trabalho foi **iterativo e incremental**, organizado nas seguintes etapas: levantamento de requisitos, modelagem de processos, prototipação, definição da arquitetura, desenvolvimento, testes e apresentação final.

---

## Controle de versão

A equipe utilizou o **Git** e o **GitHub** para o versionamento do código, colaboração e documentação.

### Convenção de branches

* `main`: versão estável e revisada;
* `dev`: branch de integração e desenvolvimento;
* `testing`: testes antes da integração na versão estável;
* `feature/nome`: desenvolvimento de novas funcionalidades;
* `fix/nome`: correções de erros.

### Padrões de commits e labels

**Commits:**

* `feat`: nova funcionalidade;
* `fix`: correção;
* `docs`: documentação;
* `style`: layout;
* `refactor`: reorganização;
* `db`: banco de dados.

**Labels:**

* `documentation`;
* `bug`;
* `enhancement`;
* `feature`;
* `test`;
* `database`;
* `frontend`;
* `backend`.

---

## Estrutura do projeto

O Green Estoque possui arquitetura **Client/Server**, separando claramente as responsabilidades entre front-end e back-end.

* **Backend:** API REST desenvolvida com Node.js e Express, responsável pelas regras de negócio, autenticação e integração com o banco de dados por meio do Prisma e PostgreSQL.
* **Frontend:** interface web desenvolvida com React e Vite, responsável pela interação com o usuário e pelo consumo da API.

```text
src/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── database.sql
│   ├── prisma.config.ts
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Planejamento do projeto

O gerenciamento foi dividido em **sprints ágeis**, com papéis rotativos entre a equipe para cobrir análise, design, desenvolvimento e testes.

### Divisão por sprints

#### Sprint 1 — Contexto e problema

Nesta etapa, foram levantadas as necessidades da Green Volt, definida a problemática do projeto e elaborados os objetivos da solução.

#### Sprint 2 — Especificação

Nesta etapa, foram criadas as personas, histórias de usuário, requisitos funcionais, requisitos não funcionais e restrições do sistema. Também foi realizada a prototipação inicial no Figma.

#### Sprint 3 — Arquitetura e banco de dados

Nesta etapa, foram configuradas as tecnologias principais do sistema, incluindo React com Vite no front-end, Node.js com Express no back-end e modelagem relacional no PostgreSQL por meio do Prisma.

#### Sprint 4 — Implementação

Nesta etapa, foram desenvolvidas as principais funcionalidades do sistema, como autenticação, CRUD de produtos, movimentações de estoque e dashboard gerencial.

#### Sprint 5 — Testes e entrega

Nesta etapa, foram executados os casos de teste, corrigidos bugs, revisada a documentação e preparada a apresentação final do projeto.

### Quadro de tarefas

| Responsável               | Tarefa / Requisito                            | Status | Sprint |
| ------------------------- | --------------------------------------------- | :----: | :----: |
| Equipe de análise         | Definir problemática, objetivos e requisitos  |   ✔️   |  1 e 2 |
| Equipe de interface       | Criar protótipo no Figma e identidade visual  |   ✔️   |    2   |
| Equipe de back-end        | Configurar API, Prisma e banco PostgreSQL     |   ✔️   |    3   |
| Equipe de front-end       | Estruturar projeto React e consumo de rotas   |   📝   |  3 e 4 |
| Equipe de desenvolvimento | Implementar telas de produtos e movimentações |   📝   |    4   |
| Equipe de testes          | Executar plano de testes e corrigir falhas    |    ⌛   |    5   |

**Legenda:**

* ✔️ Concluído;
* 📝 Em execução;
* ⌛ Pendente.

### Processo

O fluxo de trabalho baseou-se em ciclos curtos de validação. Durante o desenvolvimento, a arquitetura foi aprimorada com a adoção do **PostgreSQL** e do **Prisma ORM**, substituindo o MySQL planejado inicialmente. Essa mudança foi feita visando maior robustez na modelagem relacional e mais segurança na persistência dos dados.

A adoção do Prisma também facilitou a comunicação entre a API e o banco de dados, tornando a estrutura mais organizada e reduzindo a complexidade das consultas e operações realizadas pelo back-end.

#### Fluxo de execução

1. Identificação das dores da Green Volt;
2. Definição de prioridades e prototipação;
3. Estruturação do repositório com separação entre front-end e back-end;
4. Modelagem e integração do banco de dados com Prisma;
5. Codificação das funcionalidades principais;
6. Testes das rotas, telas e regras de negócio;
7. Ajustes finais e preparação para apresentação.

---

## Ferramentas e tecnologias

| Dimensão             | Ferramenta / Tecnologia   | Finalidade                                      |
| -------------------- | ------------------------- | ----------------------------------------------- |
| Repositório e Kanban | GitHub / GitHub Projects  | Versionamento e gestão ágil de tarefas          |
| Prototipação         | Figma                     | Wireframes e fluxo de navegação                 |
| Front-end            | React, Vite, Tailwind CSS | Interface reativa e estilização responsiva      |
| Back-end             | Node.js, Express, JWT     | Construção da API REST e autenticação           |
| Banco de dados       | PostgreSQL                | Persistência relacional de produtos e histórico |
| ORM                  | Prisma                    | Modelagem e consultas otimizadas ao banco       |
| Testes de API        | Insomnia / Postman        | Validação de rotas e segurança                  |
| Hospedagem           | Vercel / Render           | Publicação em nuvem da aplicação                |

---

## Considerações finais da metodologia

A transição para **PostgreSQL + Prisma** garantiu maior consistência no controle de estoque, prevenindo anomalias operacionais como quantidades negativas e promovendo um ambiente mais organizado e escalável para a Green Volt.

Dessa forma, a metodologia adotada permitiu que o projeto evoluísse de maneira estruturada, desde o entendimento do problema até a implementação da solução, mantendo alinhamento com as necessidades da empresa parceira e com os objetivos acadêmicos da disciplina.
