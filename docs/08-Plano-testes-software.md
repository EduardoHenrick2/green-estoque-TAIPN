# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes do **Green Estoque** tem como objetivo verificar se as principais funcionalidades do sistema atendem aos requisitos definidos para a solução. Os testes foram planejados com foco nos processos mais importantes da aplicação: autenticação, consulta de produtos, cadastro de produtos, registro de movimentações e controle de estoque.

Os cenários selecionados buscam validar se o sistema contribui para reduzir retrabalho, evitar erros humanos e manter as informações do estoque organizadas e confiáveis.

---

## Cenários de teste selecionados

| Caso de teste | Funcionalidade avaliada             | Requisito associado    |
| ------------- | ----------------------------------- | ---------------------- |
| CT-001        | Login no sistema                    | RF-001                 |
| CT-002        | Consulta de produtos                | RF-009, RF-010, RF-011 |
| CT-003        | Cadastro de produto                 | RF-007                 |
| CT-004        | Edição de produto                   | RF-008                 |
| CT-005        | Registro de entrada de estoque      | RF-013, RF-015         |
| CT-006        | Registro de saída de estoque        | RF-014, RF-015         |
| CT-007        | Validação de estoque insuficiente   | RF-014, RNF-010        |
| CT-008        | Exibição de alerta de estoque baixo | RF-017                 |

---

## CT-001 — Realizar login

| Item                    | Descrição                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-001 — O sistema deve permitir que usuários autorizados realizem login com e-mail e senha.                                  |
| **Objetivo do teste**   | Verificar se um usuário autorizado consegue acessar o sistema.                                                                |
| **Passos**              | 1. Acessar a tela de login. <br> 2. Informar e-mail válido. <br> 3. Informar senha válida. <br> 4. Clicar no botão de entrar. |
| **Critério de êxito**   | O usuário deve ser redirecionado para o dashboard do sistema.                                                                 |
| **Responsável**         | Equipe de testes.                                                                                                             |

---

## CT-002 — Consultar produto

| Item                    | Descrição                                                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-009, RF-010 e RF-011 — O sistema deve listar, pesquisar e indicar o status dos produtos.                                                                            |
| **Objetivo do teste**   | Verificar se o usuário consegue localizar produtos cadastrados no estoque.                                                                                             |
| **Passos**              | 1. Realizar login. <br> 2. Acessar o módulo de produtos. <br> 3. Pesquisar um produto por nome, categoria, marca ou código. <br> 4. Verificar as informações exibidas. |
| **Critério de êxito**   | O sistema deve exibir o produto pesquisado, sua quantidade e seu status de estoque.                                                                                    |
| **Responsável**         | Equipe de testes.                                                                                                                                                      |

---

## CT-003 — Cadastrar produto

| Item                    | Descrição                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito associado** | RF-007 — O sistema deve permitir o cadastro de produtos.                                                                                                           |
| **Objetivo do teste**   | Verificar se um novo produto pode ser cadastrado corretamente.                                                                                                     |
| **Passos**              | 1. Realizar login. <br> 2. Acessar o módulo de produtos. <br> 3. Clicar em cadastrar produto. <br> 4. Preencher os campos obrigatórios. <br> 5. Salvar o cadastro. |
| **Critério de êxito**   | O produto deve ser salvo e aparecer na listagem de produtos.                                                                                                       |
| **Responsável**         | Equipe de testes.                                                                                                                                                  |

---

## CT-004 — Editar produto

| Item                    | Descrição                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-008 — O sistema deve permitir editar informações de produtos já cadastrados.                                                                                                                       |
| **Objetivo do teste**   | Verificar se os dados de um produto podem ser alterados.                                                                                                                                              |
| **Passos**              | 1. Realizar login. <br> 2. Acessar a listagem de produtos. <br> 3. Selecionar um produto cadastrado. <br> 4. Alterar uma informação, como quantidade mínima ou categoria. <br> 5. Salvar a alteração. |
| **Critério de êxito**   | O sistema deve atualizar os dados do produto corretamente.                                                                                                                                            |
| **Responsável**         | Equipe de testes.                                                                                                                                                                                     |

---

## CT-005 — Registrar entrada de estoque

| Item                    | Descrição                                                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-013 e RF-015 — O sistema deve registrar entradas e manter histórico de movimentações.                                                                                                                |
| **Objetivo do teste**   | Verificar se a entrada de produtos atualiza corretamente o estoque.                                                                                                                                     |
| **Passos**              | 1. Realizar login. <br> 2. Acessar o módulo de movimentações. <br> 3. Selecionar a opção de entrada. <br> 4. Escolher o produto. <br> 5. Informar a quantidade recebida. <br> 6. Salvar a movimentação. |
| **Critério de êxito**   | A quantidade do produto deve aumentar e a movimentação deve aparecer no histórico.                                                                                                                      |
| **Responsável**         | Equipe de testes.                                                                                                                                                                                       |

---

## CT-006 — Registrar saída de estoque

| Item                    | Descrição                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-014 e RF-015 — O sistema deve registrar saídas e manter histórico de movimentações.                                                                                                                |
| **Objetivo do teste**   | Verificar se a saída de produtos atualiza corretamente o estoque.                                                                                                                                     |
| **Passos**              | 1. Realizar login. <br> 2. Acessar o módulo de movimentações. <br> 3. Selecionar a opção de saída. <br> 4. Escolher o produto. <br> 5. Informar a quantidade retirada. <br> 6. Salvar a movimentação. |
| **Critério de êxito**   | A quantidade do produto deve diminuir e a movimentação deve aparecer no histórico.                                                                                                                    |
| **Responsável**         | Equipe de testes.                                                                                                                                                                                     |

---

## CT-007 — Validar estoque insuficiente

| Item                    | Descrição                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-014 e RNF-010 — O sistema deve evitar inconsistências, como estoque negativo.                                                                                                            |
| **Objetivo do teste**   | Verificar se o sistema impede uma saída maior do que a quantidade disponível.                                                                                                               |
| **Passos**              | 1. Realizar login. <br> 2. Acessar movimentações. <br> 3. Selecionar saída de produto. <br> 4. Informar quantidade maior do que o estoque disponível. <br> 5. Tentar salvar a movimentação. |
| **Critério de êxito**   | O sistema deve bloquear a operation e exibir mensagem de erro.                                                                                                                              |
| **Responsável**         | Equipe de testes.                                                                                                                                                                           |

---

## CT-008 — Verificar alerta de estoque baixo

| Item                    | Descrição                                                                                                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito associado** | RF-017 — O sistema deve emitir alertas para produtos abaixo do estoque mínimo.                                                                                                                                                |
| **Objetivo do teste**   | Verificar se o sistema identifica produtos com estoque baixo.                                                                                                                                                                 |
| **Passos**              | 1. Realizar login. <br> 2. Cadastrar ou editar um produto com estoque mínimo definido. <br> 3. Registrar uma saída que deixe o produto abaixo do limite mínimo. <br> 4. Verificar o status do produto ou alerta no dashboard. |
| **Critério de êxito**   | O sistema deve indicar que o produto está com estoque baixo.                                                                                                                                                                  |
| **Responsável**         | Equipe de testes.                                                                                                                                                                                                             |

---

## Ferramentas de testes

Para a execução dos testes, poderão ser utilizadas as seguintes ferramentas:

| Ferramenta                  | Finalidade                                |
| --------------------------- | ----------------------------------------- |
| Navegador web               | Testar a interface e os fluxos do usuário |
| Insomnia ou Postman         | Testar rotas da API                       |
| Banco PostgreSQL            | Conferir persistência dos dados           |
| Captura de tela ou gravação | Registrar evidências dos testes           |
| GitHub Issues               | Registrar falhas e melhorias encontradas  |

---

## Critérios gerais de aprovação

Os testes serão considerados aprovados quando:

* o usuário conseguir realizar login corretamente;
* os produtos forem cadastrados e listados no sistema;
* a busca de produtos retornar resultados corretos;
* entradas e saídas atualizarem o estoque;
* o sistema impedir movimentações inválidas;
* produtos com estoque baixo forem identificados;
* as informações permanecerem salvas no banco de dados.

---

## Considerações finais

O plano de testes do Green Estoque foi elaborado para validar as funcionalidades essenciais da aplicação. A execução desses testes permitirá verificar se o sistema atende aos requisitos definidos e se contribui para tornar o controle de estoque da Green Volt mais seguro, organizado e confiável.
