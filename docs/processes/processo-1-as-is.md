### Processo 1 AS IS – Consulta manual e localização de produtos no estoque

O processo atual de consulta e localização de produtos na Green Volt ocorre de forma manual. Quando um colaborador precisa verificar a disponibilidade de um item, ele consulta planilhas, registros informais ou realiza a conferência física no estoque.

Esse processo pode gerar retrabalho, demora na localização dos produtos, risco de erro humano e divergência entre a quantidade real disponível e a informação registrada. Como os produtos fotovoltaicos possuem características técnicas, como marca, modelo, potência, código/SKU e categoria, a ausência de um sistema centralizado dificulta a consulta rápida e confiável.

**Fluxo do Processo:**
O fluxo atual ocorre da seguinte forma: o colaborador recebe a solicitação de um produto, consulta registros existentes, verifica se a informação está clara e, caso não esteja, realiza a procura manual no estoque. Após localizar o item, faz a contagem física e informa a disponibilidade ao responsável.

**Características do Processo:**
* **Tipo de processo:** Manual
* **Principal responsável:** Colaborador operacional
* **Ferramentas utilizadas:** Planilhas, anotações, conferência física e comunicação interna
* **Principal problema:** Dificuldade de localizar produtos e confirmar quantidades
* **Riscos:** Erro humano, retrabalho, divergência de dados e atraso no atendimento
* **Resultado esperado:** Informar se o produto está disponível e em qual quantidade
 
![Modelo BPMN do Processo 1](/images/processo1.png "Modelo BPMN do Processo 1.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_
* **Área de texto** - campo texto de múltiplas linhas
* **Caixa de texto** - campo texto de uma linha
* **Número** - campo numérico
* **Data** - campo do tipo data (dd-mm-aaaa)
* **Hora** - campo do tipo hora (hh:mm:ss)
* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)
* **Imagem** - campo contendo uma imagem
* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)
* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)
* **Arquivo** - campo de upload de documento
* **Link** - campo que armazena uma URL
* **Tabela** - campo formado por uma matriz de valores

**Atividade 1 — Receber solicitação de produto**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| nome_produto | Caixa de texto | Campo recomendado | Não informado |
| categoria | Seleção única | Opcional | Todas |
| marca | Caixa de texto | Opcional | Não informado |
| codigo_sku | Caixa de texto | Opcional | Não informado |
| quantidade_solicitada | Número | Deve ser maior que zero | 1 |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| consultar registro | Consultar planilha ou registro informal | default |
| cancelar | Fim do processo | cancel |


**Atividade 2 — Consultar planilha ou registro informal**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| planilha_estoque | Arquivo | Deve conter dados do estoque, quando disponível | Não informado |
| registro_manual | Área de texto | Pode conter anotações de estoque | Não informado |
| data_ultima_atualizacao | Data | Opcional | Data atual |
| responsavel_registro | Caixa de texto | Opcional | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| informação encontrada | Informar disponibilidade do produto | default |
| informação incompleta | Procurar produto fisicamente no estoque | |
| cancelar | Fim do processo | cancel |


**Atividade 3 — Procurar produto fisicamente no estoque**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| local_estoque | Caixa de texto | Opcional | Não informado |
| descricao_produto | Área de texto | Opcional | Não informado |
| categoria_produto | Seleção única | Opcional | Não informado |
| observacoes_busca | Área de texto | Opcional | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| produto localizado | Realizar contagem manual | default |
| produto não localizado | Informar produto não encontrado | |
| cancelar | Fim do processo | cancel |


**Atividade 4 — Realizar contagem manual**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| quantidade_encontrada | Número | Deve ser igual ou maior que zero | 0 |
| unidade_medida | Seleção única | Opções: unidade, metro, par, caixa | unidade |
| data_conferencia | Data e Hora | Obrigatório | Data e hora atual |
| responsavel_conferencia | Caixa de texto | Obrigatório | Não informado |
| observacao_conferencia | Área de texto | Opcional | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| confirmar quantidade | Informar disponibilidade do produto | default |
| divergência encontrada | Corrigir registro manual | |
| cancelar | Fim do processo | cancel |


**Atividade 5 — Corrigir registro manual**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| quantidade_corrigida | Número | Deve ser igual ou maior que zero | 0 |
| motivo_correcao | Área de texto | Obrigatório | Divergência entre estoque físico e registro |
| data_correcao | Data e Hora | Obrigatório | Data e hora atual |
| responsavel_correcao | Caixa de texto | Obrigatório | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| salvar correção manual | Informar disponibilidade do produto | default |
| cancelar | Fim do processo | cancel |


**Atividade 6 — Informar disponibilidade do produto**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| produto_disponivel | Seleção única | Opções: sim, não, parcialmente | Não informado |
| quantidade_disponivel | Número | Deve ser igual ou maior que zero | 0 |
| mensagem_resposta | Área de texto | Opcional | Produto consultado |
| destinatario | Caixa de texto | Opcional | Responsável pela solicitação |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| finalizar consulta | Fim do processo | default |
| nova consulta | Receber solicitação de produto | |


**Atividade 7 — Informar produto não encontrado**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| produto_pesquisado | Caixa de texto | Obrigatório | Não informado |
| motivo_nao_encontrado | Área de texto | Opcional | Produto não localizado no estoque |
| data_busca | Data e Hora | Obrigatório | Data e hora atual |
| responsavel_busca | Caixa de texto | Obrigatório | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| finalizar processo | Fim do processo | default |
| tentar novamente | Procurar produto fisicamente no estoque | 