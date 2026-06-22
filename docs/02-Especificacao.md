# Especificação do projeto

Esta seção apresenta a definição do problema e da proposta de solução do Green Estoque sob a perspectiva do usuário. O objetivo é detalhar as necessidades do negócio, as funcionalidades esperadas do sistema e as restrições envolvidas no projeto, garantindo que todos os integrantes da equipe compartilhem a mesma visão sobre o escopo e as prioridades da solução.

O Green Estoque foi idealizado para atender à empresa Green Volt, que enfrenta dificuldades no controle manual de estoque de produtos e insumos do setor fotovoltaico. A solução proposta consiste em uma aplicação web voltada para organização, consulta e movimentação de produtos, com foco na redução de retrabalho, erros humanos e perda de tempo na rotina operacional.

---

## Modelo de negócio (Business Model Canvas)

### 1. Parceiros-chave
* Green Volt, como empresa parceira e cliente externo.
* Colaboradores e gestores da empresa, que atuam como usuários e validadores do sistema.
* Equipe de desenvolvimento do projeto.
* PUC Minas e docentes orientadores.
* Provedores de hospedagem e banco de dados, quando aplicável.

### 2. Atividades-chave
* Levantamento de requisitos com a empresa.
* Modelagem dos processos de estoque.
* Desenvolvimento da interface e das funcionalidades.
* Cadastro, consulta e atualização de produtos.
* Registro de movimentações de entrada e saída.
* Testes e validação com usuários.

### 3. Proposta de valor
* Centralizar o controle de estoque em um sistema digital.
* Reduzir retrabalho e contagens manuais.
* Facilitar a localização e consulta de produtos.
* Melhorar a confiabilidade das informações.
* Apoiar decisões com dados mais organizados.
* Reduzir erros operacionais no controle de inventário.

### 4. Relacionamento com clientes
* Contato direto com o stakeholder externo.
* Validação iterativa da solução com a Green Volt.
* Coleta de feedback durante o desenvolvimento.
* Melhoria contínua a partir das necessidades identificadas.

### 5. Segmentos de clientes
* Colaboradores operacionais da Green Volt.
* Responsáveis pelo estoque.
* Gestores da empresa.
* Direção da empresa.

### 6. Recursos-chave
* Equipe de desenvolvimento.
* Conhecimento em desenvolvimento web e banco de dados.
* Infraestrutura computacional.
* Banco de dados relacional.
* Protótipos de interface.
* Repositório de código e ferramentas de gestão.

### 7. Canais
* Sistema web acessado via navegador.
* Reuniões com a empresa parceira.
* Protótipo interativo.
* Apresentação acadêmica e demonstração da solução.

### 8. Estrutura de custos
* Tempo de desenvolvimento.
* Esforço de levantamento de requisitos.
* Eventuais custos de hospedagem.
* Ferramentas de prototipação e organização.
* Manutenção e evolução futura da solução.

### 9. Fontes de valor
Embora o projeto tenha natureza acadêmica, seu valor está na:
* Melhoria dos processos internos da empresa.
* Redução de desperdícios operacionais.
* Aumento da produtividade.
* Apoio à transformação digital do cliente.
* Ganho de experiência prática pela equipe desenvolvedora.

---

## Personas

Para representar melhor os perfis de usuários do Green Estoque, foram definidas as seguintes personas:

![Persona 1](images/Persona%201.png)

### Persona 1 — Carlos Henrique, diretor / decisor
* **Idade:** 42 anos.
* **Cargo:** Diretor / gestor estratégico.
* **Nível de afinidade com tecnologia:** Intermediário.
* **Objetivo:** Garantir que a empresa trabalhe com mais eficiência e menos desperdício.
* **Dores:** Impactos da desorganização no atendimento, no tempo de resposta e na confiabilidade das informações.
* **Necessidades:** Visão executiva do sistema, dados resumidos e apoio à tomada de decisão.



![Persona 2](images/Persona%202.png)

### Persona 2 — Mariana Souza, gestora operacional
* **Idade:** 35 anos.
* **Cargo:** Gestora operacional / responsável pelo estoque.
* **Nível de afinidade com tecnologia:** Intermediário a alto.
* **Objetivo:** Acompanhar a situação do estoque, identificar produtos em baixa e tomar decisões de reposição.
* **Dores:** Falta de informações atualizadas, dificuldade para ter visão geral e baixa confiabilidade dos registros manuais.
* **Necessidades:** Dashboard com indicadores, alertas de estoque baixo, histórico de movimentações e informações confiáveis.

![Persona 3](images/Persona%203.png)

### Persona 3 — Lucas Ferreira, auxiliar de estoque
* **Idade:** 24 anos.
* **Cargo:** Auxiliar de estoque.
* **Nível de afinidade com tecnologia:** Intermediário.
* **Objetivo:** Localizar rapidamente produtos e registrar movimentações sem depender de anotações manuais.
* **Dores:** Perde tempo procurando materiais, precisa fazer contagens repetidas e às vezes encontra divergências entre o item físico e o registro informal.
* **Necessidades:** Sistema simples, rápido, com busca eficiente e interface objetiva.

---

## Histórias de usuários

Com base nas personas definidas, foram elaboradas as seguintes histórias de usuário.

### Contexto 1 — Acesso ao sistema

| EU COMO... | QUERO/PRECISO... | PARA... |
| :--- | :--- | :--- |
| Colaborador autorizado | fazer login com e-mail e senha | acessar o sistema com segurança |
| Colaborador autorizado | recuperar minha senha | voltar a acessar o sistema caso eu esqueça minhas credenciais |
| Gestora operacional | autorizar o acesso de colaboradores ao sistema | garantir que apenas pessoas liberadas pela empresa possam usar a aplicação |
| Diretor / gestor | definir quais colaboradores podem acessar o sistema | manter o controle sobre o uso da ferramenta dentro da empresa |

### Contexto 2 — Consulta e controle de produtos

| EU COMO... | QUERO/PRECISO... | PARA... |
| :--- | :--- | :--- |
| Auxiliar de estoque | pesquisar produtos por nome, categoria, marca ou código | localizar rapidamente um item no estoque |
| Auxiliar de estoque | visualizar quantidade disponível e status do produto | saber se o item está disponível antes de movimentá-lo |
| Gestora operacional | cadastrar novos produtos | manter o catálogo de estoque atualizado |
| Gestora operacional | editar informações dos produtos | corrigir ou atualizar dados quando necessário |
| Gestora operacional | visualizar produtos com estoque baixo | agir antes da falta de materiais |

### Contexto 3 — Movimentações de estoque

| EU COMO... | QUERO/PRECISO... | PARA... |
| :--- | :--- | :--- |
| Auxiliar de estoque | registrar entrada de produtos | manter o estoque atualizado quando novos itens chegarem |
| Auxiliar de estoque | registrar saída de produtos | dar baixa nos itens retirados do estoque |
| Gestora operacional | consultar o histórico de movimentações | acompanhar o fluxo de entrada e saída |
| Gestora operacional | saber quem registrou uma movimentação | ter mais controle e rastreabilidade das operações |

### Contexto 4 — Gestão e acompanhamento

| EU COMO... | QUERO/PRECISO... | PARA... |
| :--- | :--- | :--- |
| Gestora operacional | visualizar um resumo do estoque no dashboard | acompanhar rapidamente a situação geral |
| Diretor / gestor | visualizar indicadores principais | apoiar decisões com base em dados |
| Gestora operacional | receber alertas de estoque baixo | agir de forma preventiva |
| Diretor / gestor | acompanhar dados resumidos do estoque | avaliar eficiência, perdas e necessidade de reposição |

---

## Requisitos

Para priorização dos requisitos, foi adotada uma adaptação da técnica **MoSCoW**, classificando os requisitos em:
* **Alta:** essencial para o funcionamento mínimo da solução.
* **Média:** importante, mas não indispensável na primeira versão.
* **Baixa:** desejável, podendo ser implementado em versões futuras.

### Requisitos funcionais

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| **RF-001** | O sistema deve permitir que usuários autorizados realizem login com e-mail e senha. | ALTA |
| **RF-002** | O sistema deve permitir que apenas usuários previamente autorizados pela empresa tenham acesso à aplicação. | ALTA |
| **RF-003** | O sistema deve permitir a separação de permissões entre colaborador operacional, gestor operacional e direção. | ALTA |
| **RF-004** | O sistema deve permitir a recuperação de senha. | MÉDIA |
| **RF-005** | O sistema deve exibir um dashboard com resumo de informações do estoque. | ALTA |
| **RF-006** | O sistema deve apresentar indicadores básicos, como quantidade de produtos cadastrados, itens em estoque baixo e total de movimentações. | ALTA |
| **RF-007** | O sistema deve permitir o cadastro de produtos com dados como nome, categoria, marca, código/SKU, quantidade e valor mínimo de estoque. | ALTA |
| **RF-008** | O sistema deve permitir editar informações de produtos já cadastrados. | ALTA |
| **RF-009** | O sistema deve permitir listar os produtos cadastrados. | ALTA |
| **RF-010** | O sistema deve permitir pesquisar e filtrar produtos por nome, categoria, marca ou código. | ALTA |
| **RF-011** | O sistema deve indicar o status do produto, como “Em estoque”, “Estoque baixo” ou “Sem estoque”. | ALTA |
| **RF-012** | O sistema deve permitir cadastrar fornecedores. | MÉDIA |
| **RF-013** | O sistema deve permitir registrar movimentações de entrada de produtos. | ALTA |
| **RF-014** | O sistema deve permitir registrar movimentações de saída de produtos. | ALTA |
| **RF-015** | O sistema deve manter um histórico de movimentações com data, tipo, produto, quantidade e usuário responsável. | ALTA |
| **RF-016** | O sistema deve permitir consultar a listagem de movimentações. | ALTA |
| **RF-017** | O sistema deve emitir alertas para produtos abaixo do estoque mínimo. | ALTA |
| **RF-018** | O sistema deve disponibilizar uma barra de busca para acesso rápido às informações do sistema. | MÉDIA |
| **RF-019** | O sistema deve apresentar menu de navegação lateral para acesso aos módulos principais. | ALTA |
| **RF-020** | O sistema deve permitir logout do usuário. | ALTA |
| **RF-021** | O sistema deve restringir funções críticas conforme o nível de permissão do usuário. | ALTA |
| **RF-022** | O sistema deve registrar o usuário responsável por alterações e movimentações relevantes. | ALTA |
| **RF-023** | O sistema deve permitir exportar listagens de produtos e movimentações. | MÉDIA |
| **RF-024** | O sistema deve permitir upload de imagem do produto. | BAIXA |
| **RF-025** | O sistema deve apresentar notificações no cabeçalho ou em área visível da interface. | MÉDIA |

### Requisitos não funcionais

| ID | Descrição do Requisito | Prioridade |
| :--- | :--- | :--- |
| **RNF-001** | O sistema deve possuir interface responsiva para uso em desktop e, quando possível, tablets. | ALTA |
| **RNF-002** | O sistema deve seguir uma identidade visual padronizada, com uso consistente das cores do projeto e da empresa. | MÉDIA |
| **RNF-003** | O sistema deve apresentar boa usabilidade, com navegação simples e intuitiva. | ALTA |
| **RNF-004** | O carregamento das principais páginas não deve ultrapassar 3 segundos em condições normais de uso. | MÉDIA |
| **RNF-005** | O sistema deve utilizar autenticação segura para acesso às rotas protegidas. | ALTA |
| **RNF-006** | As senhas dos usuários devem ser armazenadas de forma segura, com hashing apropriado. | ALTA |
| **RNF-007** | O sistema deve garantir que apenas usuários autorizados possam acessar informações sensíveis. | ALTA |
| **RNF-008** | O código-fonte deve ser organizado de forma modular, facilitando manutenção e evolução. | MÉDIA |
| **RNF-009** | O sistema deve permitir crescimento futuro sem comprometer a organização da base do projeto. | MÉDIA |
| **RNF-010** | O sistema deve preservar a consistência dos dados de estoque, evitando quantidades negativas e alterações indevidas. | ALTA |

---

## Restrições

A solução proposta está sujeita às seguintes restrições:

| ID | Restrição |
| :--- | :--- |
| **R-001** | Somente pessoas autorizadas pela empresa poderão acessar o sistema. |
| **R-002** | A liberação de acesso ao sistema deverá depender de autorização do responsável da empresa, gestor operacional ou direção. |
| **R-003** | Colaboradores operacionais não poderão acessar funcionalidades estratégicas ou de configuração da aplicação. |
| **R-004** | Apenas usuários com permissão de gestão poderão cadastrar, editar ou remover informações sensíveis, conforme decisão da empresa. |
| **R-005** | O sistema deverá respeitar a hierarquia de acesso definida pela Green Volt, separando permissões entre colaborador operacional, gestor operacional e direção. |
| **R-006** | O sistema deverá ser compatível com a realidade operacional da Green Volt, evitando funcionalidades complexas demais para a rotina atual da empresa. |
| **R-007** | O sistema deverá ser desenvolvido dentro do prazo acadêmico estabelecido para a disciplina. |
| **R-008** | O escopo implementado deverá considerar o tempo disponível da equipe e a viabilidade técnica do projeto. |
| **R-009** | A solução deverá ser baseada em ambiente web, acessível por navegador, sem dependência inicial de aplicativo mobile. |
| **R-010** | O sistema não deverá permitir exclusão ou alteração irrestrita de dados sem autenticação e autorização adequadas. |
| **R-011** | O acesso ao estoque e às movimentações deverá ser rastreável, sempre que possível, por meio do registro do usuário responsável. |
| **R-012** | Funcionalidades não essenciais para a primeira versão, como integração com nota fiscal, leitor de código de barras, aplicativo mobile ou serviços externos complexos, poderão ser tratadas como melhorias futuras. |
| **R-013** | A primeira versão do sistema deverá priorizar o controle de produtos e movimentações, sem obrigatoriedade de incluir módulos financeiros avançados. |
| **R-014** | A utilização do sistema dependerá de conexão com a internet ou rede interna, conforme ambiente definido para hospedagem. |

---

## Observações finais da especificação

A especificação do Green Estoque foi construída com foco na realidade do cliente e na viabilidade do projeto dentro do contexto acadêmico. Por isso, prioriza-se um conjunto de funcionalidades centrais para resolver o problema principal da empresa: a desorganização e a baixa confiabilidade no controle de estoque.

Assim, a primeira versão da solução concentra-se em:
* Autenticação e controle de acesso;
* Cadastro e consulta de produtos;
* Registro de movimentações;
* Dashboard com visão geral;
* Alertas de estoque baixo;
* Rastreabilidade das operações;
* Restrição de acesso conforme autorização da empresa.

Funcionalidades complementares ou mais avançadas poderão ser tratadas como expansão futura da plataforma.