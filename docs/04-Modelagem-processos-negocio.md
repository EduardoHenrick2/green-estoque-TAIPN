# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A modelagem dos processos de negócio do **Green Estoque** tem como objetivo representar a situação atual da Green Volt e demonstrar como a solução proposta pode melhorar o controle de estoque da empresa.

Foram selecionados dois processos principais:

1. **Consulta e localização de produtos no estoque**;
2. **Registro de entrada e saída de produtos**.

Esses processos foram escolhidos por estarem diretamente relacionados aos principais problemas identificados: retrabalho, contagens manuais, dificuldade de localização de materiais, falta de centralização das informações e possibilidade de erros humanos.

---

## Modelagem da situação atual (AS-IS)

Atualmente, o controle de estoque da Green Volt é realizado de forma manual, por meio de conferências físicas, planilhas, cadernos ou registros informais. Quando um colaborador precisa consultar um produto ou registrar uma movimentação, muitas vezes é necessário verificar fisicamente o estoque.

Esse modelo gera retrabalho, demora no atendimento, risco de divergência entre estoque físico e registros, além de baixa rastreabilidade das movimentações.

### Principais problemas do processo atual

* Produtos sem catalogação padronizada;
* Contagens manuais frequentes;
* Registros descentralizados;
* Risco de erro humano;
* Dificuldade para localizar produtos;
* Falta de histórico confiável de movimentações;
* Dificuldade para identificar estoque baixo.

---

## Descrição geral da proposta (TO-BE)

Com o Green Estoque, o controle passa a ser realizado por uma aplicação web integrada a um banco de dados. Os produtos são cadastrados, categorizados e consultados digitalmente, permitindo maior agilidade e confiabilidade nas informações.

O sistema permite consultar produtos, registrar entradas e saídas, atualizar quantidades automaticamente, exibir alertas de estoque baixo e manter histórico das movimentações realizadas.

### Melhorias esperadas

* Centralização das informações;
* Redução de retrabalho;
* Consulta rápida de produtos;
* Menor chance de erro operacional;
* Atualização automática do estoque;
* Histórico de movimentações;
* Apoio à tomada de decisão.

---

## Processos modelados

### Processo 1 — Consulta e localização de produtos

#### AS-IS — Consulta manual de produtos

No processo atual, o colaborador consulta planilhas, registros informais ou verifica fisicamente o estoque para saber se determinado produto está disponível.

```text
Solicitação de produto
        ↓
Consultar planilha ou registro manual
        ↓
Informação está clara?
      ┌─────────────┐
      │             │
     Sim           Não
      │             ↓
      │       Procurar produto fisicamente
      │             ↓
      │       Realizar contagem manual
      ↓             ↓
Informar disponibilidade
        ↓
Fim
```

#### Gargalos

| Gargalo                    | Impacto                                  |
| -------------------------- | ---------------------------------------- |
| Consulta manual            | Aumenta o tempo de resposta              |
| Registros descentralizados | Gera divergências                        |
| Contagem física frequente  | Causa retrabalho                         |
| Falta de filtros           | Dificulta localizar produtos específicos |

---

#### TO-BE — Consulta digital de produtos

Com o Green Estoque, o colaborador acessa o sistema, pesquisa o produto por nome, categoria, marca ou código e visualiza rapidamente a quantidade disponível e o status do estoque.

```text
Solicitação de produto
        ↓
Acessar Green Estoque
        ↓
Pesquisar produto
        ↓
Sistema exibe resultado
        ↓
Visualizar quantidade e status
        ↓
Informar disponibilidade
        ↓
Fim
```

#### Melhorias

| Melhoria            | Benefício                         |
| ------------------- | --------------------------------- |
| Busca digital       | Reduz tempo de consulta           |
| Filtros por produto | Facilita localização              |
| Status visual       | Identifica estoque baixo ou falta |
| Dados centralizados | Reduz inconsistências             |

---

### Processo 2 — Registro de entrada e saída de produtos

#### AS-IS — Registro manual de movimentações

No processo atual, entradas e saídas de produtos são registradas manualmente. Quando o registro não ocorre no momento correct, podem surgir divergências entre a quantidade física e a informação anotada.

```text
Entrada ou saída de produto
        ↓
Conferir item fisicamente
        ↓
Anotar movimentação manualmente
        ↓
Atualizar quantidade em registro informal
        ↓
Existe divergência?
      ┌─────────────┐
      │             │
     Não           Sim
      │             ↓
      │       Realizar nova conferência
      ↓             ↓
Fim
```

#### Gargalos

| Gargalo                            | Impacto                       |
| ---------------------------------- | ----------------------------- |
| Registro manual                    | Aumenta chance de erro        |
| Atualização atrasada               | Deixa o estoque desatualizado |
| Falta de histórico                 | Dificulta controle            |
| Ausência de responsável registrado | Reduz rastreabilidade         |

---

#### TO-BE — Registro digital de movimentações

Com o Green Estoque, o colaborador registra entradas e saídas diretamente no sistema. A aplicação valida os dados, atualiza automaticamente o estoque e mantém o histórico da movimentação.

```text
Entrada ou saída de produto
        ↓
Acessar Green Estoque
        ↓
Selecionar produto
        ↓
Informar tipo e quantidade
        ↓
Sistema valida os dados
        ↓
Registrar movimentação
        ↓
Atualizar estoque automaticamente
        ↓
Fim
```

#### Melhorias

| Melhoria                   | Benefício               |
| -------------------------- | ----------------------- |
| Registro digital           | Reduz erros             |
| Validação de quantidade    | Evita estoque negativo  |
| Atualização automática     | Mantém dados confiáveis |
| Histórico de movimentações | Melhora rastreabilidade |

---

## Modelagem dos processos

Os diagramas BPMN dos processos poderão ser elaborados em ferramentas como **Bizagi Modeler**, **Draw.io** ou **Lucidchart**, representando os fluxos AS-IS e TO-BE.

### Processo 1 — Consulta e localização de produtos

[PROCESSO 1 AS IS - Consulta manual de produtos](./processes/processo-1-as-is.md)

[PROCESSO 1 TO BE - Consulta digital de produtos](./processes/processo-1-to-be.md)

### Processo 2 — Registro de entrada e saída de produtos

[PROCESSO 2 AS IS - Registro manual de movimentações](./processes/processo-2-as-is.md)

[PROCESSO 2 TO BE - Registro digital de movimentações](./processes/processo-2-to-be.md)

---

## Indicadores de desempenho

| Indicador                                | Objetivo                               | Fonte de dados               | Fórmula de cálculo                                      |
| ---------------------------------------- | -------------------------------------- | ---------------------------- | ------------------------------------------------------- |
| Tempo médio de localização de produto    | Medir a agilidade na consulta de itens | Produtos / logs de consulta  | Soma dos tempos de consulta / total de consultas        |
| Taxa de divergência de estoque           | Avaliar a confiabilidade dos registros | Produtos / inventário físico | Itens com divergência / total de itens conferidos * 100 |
| Percentual de produtos com estoque baixo | Identificar itens críticos             | Produtos                     | Produtos com estoque baixo / total de produtos * 100    |
| Quantidade de movimentações registradas  | Acompanhar entradas e saídas           | Movimentações                | Total de movimentações no período                       |
| Taxa de movimentações com erro           | Medir falhas operacionais              | Movimentações / correções    | Movimentações com erro / total de movimentações * 100   |

---

## Considerações finais

A modelagem evidencia que o Green Estoque pode reduzir atividades manuais, centralizar informações e melhorar a confiabilidade dos dados. Comparando os processos AS-IS e TO-BE, percebe-se que a solução proposta contribui para maior organização, rastreabilidade e eficiência no controle de estoque da Green Volt.

