# Registro de testes de software

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>, <a href="08-Plano-testes-software.md"> Plano de testes de software</a>

O registro de testes do **Green Estoque** apresenta as evidências dos testes realizados nas principais funcionalidades do sistema. Os testes foram baseados no plano de testes definido anteriormente, com foco em autenticação, produtos, movimentações e controle de estoque.

As evidências devem ser inseridas por meio de capturas de tela ou vídeos demonstrando a execução de cada caso de teste.

---

## CT-001 — Realizar login

| Item                          | Descrição                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| **Requisito associado**       | RF-001 — O sistema deve permitir que usuários autorizados realizem login com e-mail e senha. |
| **Resultado esperado**        | O usuário deve ser redirecionado para o dashboard após informar credenciais válidas.         |
| **Resultado obtido**          | Inserir resultado do teste.                                                                  |
| **Status**                    | Aprovado / Reprovado                                                                         |
| **Responsável pelo registro** | Nome do integrante da equipe                                                                 |

**Evidência:**

![Vídeo ou print do teste](images/testLogin.mp4)


---

## CT-002 — Consultar produto

| Item                          | Descrição                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| **Requisito associado**       | RF-009, RF-010 e RF-011 — O sistema deve listar, pesquisar e indicar o status dos produtos.    |
| **Resultado esperado**        | O sistema deve exibir o produto pesquisado, sua quantidade disponível e seu status de estoque. |
| **Resultado obtido**          | Inserir resultado do teste.                                                                    |
| **Status**                    | Aprovado / Reprovado                                                                           |
| **Responsável pelo registro** | Nome do integrante da equipe                                                                   |

**Evidência:**

![Vídeo ou print do teste](images/consulta.mp4)

---

## CT-003 — Cadastrar produto

| Item                          | Descrição                                                   |
| ----------------------------- | ----------------------------------------------------------- |
| **Requisito associado**       | RF-007 — O sistema deve permitir o cadastro de produtos.    |
| **Resultado esperado**        | O produto deve ser salvo e exibido na listagem de produtos. |
| **Resultado obtido**          | Inserir resultado do teste.                                 |
| **Status**                    | Aprovado / Reprovado                                        |
| **Responsável pelo registro** | Nome do integrante da equipe                                |

**Evidência:**

![Vídeo ou print do teste](images/Cadastro.mp4)

---

## CT-004 — Editar produto

| Item                          | Descrição                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------- |
| **Requisito associado**       | RF-008 — O sistema deve permitir editar informações de produtos cadastrados. |
| **Resultado esperado**        | O sistema deve atualizar corretamente os dados do produto.                   |
| **Resultado obtido**          | Inserir resultado do teste.                                                  |
| **Status**                    | Aprovado / Reprovado                                                         |
| **Responsável pelo registro** | Nome do integrante da equipe                                                 |

**Evidência:**

![Vídeo ou print do teste](images/editar.mp4)

---

## CT-005 — Registrar entrada de estoque

| Item                          | Descrição                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| **Requisito associado**       | RF-013 e RF-015 — O sistema deve registrar entradas e manter histórico de movimentações. |
| **Resultado esperado**        | A quantidade do produto deve aumentar e a movimentação deve aparecer no histórico.       |
| **Resultado obtido**          | Inserir resultado do teste.                                                              |
| **Status**                    | Aprovado / Reprovado                                                                     |
| **Responsável pelo registro** | Nome do integrante da equipe                                                             |

**Evidência:**

![Vídeo ou print do teste](images/entrada.mp4)

---

## CT-006 — Registrar saída de estoque

| Item                          | Descrição                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| **Requisito associado**       | RF-014 e RF-015 — O sistema deve registrar saídas e manter histórico de movimentações. |
| **Resultado esperado**        | A quantidade do produto deve diminuir e a movimentação deve aparecer no histórico.     |
| **Resultado obtido**          | Inserir resultado do teste.                                                            |
| **Status**                    | Aprovado / Reprovado                                                                   |
| **Responsável pelo registro** | Nome do integrante da equipe                                                           |

**Evidência:**

![Vídeo ou print do teste](images/saida.mp4)

---

## CT-007 — Validar estoque insuficiente

| Item                          | Descrição                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| **Requisito associado**       | RF-014 e RNF-010 — O sistema deve evitar inconsistências, como estoque negativo.           |
| **Resultado esperado**        | O sistema deve bloquear saída maior que a quantidade disponível e exibir mensagem de erro. |
| **Resultado obtido**          | Inserir resultado do teste.                                                                |
| **Status**                    | Aprovado / Reprovado                                                                       |
| **Responsável pelo registro** | Nome do integrante da equipe                                                               |

**Evidência:**

![Vídeo ou print do teste](images/estoqueBaixo.mp4)

---


---

## Resumo dos testes

| Caso de teste | Funcionalidade                    |        Status        |
| ------------- | --------------------------------- | :------------------: |
| CT-001        | Login no sistema                  | Aprovado / Reprovado |
| CT-002        | Consulta de produtos              | Aprovado / Reprovado |
| CT-003        | Cadastro de produto               | Aprovado / Reprovado |
| CT-004        | Edição de produto                 | Aprovado / Reprovado |
| CT-005        | Entrada de estoque                | Aprovado / Reprovado |
| CT-006        | Saída de estoque                  | Aprovado / Reprovado |
| CT-007        | Validação de estoque insuficiente | Aprovado / Reprovado |


---

## Avaliação dos resultados

A execução dos testes permitiu verificar se as funcionalidades principais do Green Estoque atendem aos requisitos definidos no projeto. Os testes relacionados a login, cadastro de produtos, consulta de estoque e movimentações são essenciais para validar o funcionamento básico da aplicação.

### Pontos fortes identificados

* Interface simples e objetiva;
* Fluxo de navegação direto;
* Organização das informações de produtos;
* Registro de movimentações de estoque;
* Possibilidade de controle mais confiável das quantidades.

### Pontos de melhoria identificados

* Inserir aqui falhas encontradas durante os testes;
* Ajustar mensagens de erro, caso necessário;
* Melhorar validações de campos obrigatórios;
* Refinar a exibição de alertas de estoque baixo;
* Corrigir eventuais inconsistências entre interface e banco de dados.

### Melhorias previstas

Com base nos resultados dos testes, a equipe poderá realizar ajustes na interface, nas validações e nas regras de negócio. Também poderão ser adicionadas melhorias futuras, como relatórios, filtros avançados, exportação de dados e controle mais detalhado de permissões.

---

## Considerações finais

O registro de testes evidencia o processo de validação do Green Estoque e demonstra se os requisitos essenciais foram atendidos. As evidências inseridas nesta seção devem comprovar o funcionamento das principais funcionalidades e apoiar a avaliação final da solução desenvolvida para a Green Volt.
