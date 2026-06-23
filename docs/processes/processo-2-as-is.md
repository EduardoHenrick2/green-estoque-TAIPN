### Processo 2 AS IS – Registro manual de entrada e saída de produtos

O processo atual de registro de entrada e saída de produtos na Green Volt ocorre de forma manual, por meio de conferência física, planilhas, cadernos ou registros informais. Quando um produto chega à empresa ou é retirado do estoque para uso, venda, instalação ou manutenção, o colaborador precisa anotar a movimentação e atualizar a quantidade disponível manualmente.

Esse processo apresenta riscos de erro humano, atraso na atualização das informações, ausência de histórico confiável e dificuldade para identificar quem realizou determinada movimentação. Quando o registro não é feito no momento correto, podem surgir divergências entre o estoque físico e os registros utilizados pela empresa.

**Fluxo do Processo:**
O fluxo atual ocorre da seguinte forma: o colaborador identifica a entrada ou saída de um produto, confere o item fisicamente, registra manualmente a movimentação, atualiza a quantidade em planilha ou anotação e, caso seja identificada alguma divergência, realiza nova conferência.

**Características do Processo:**
* **Tipo de processo:** Manual
* **Principal responsável:** Colaborador operacional
* **Participantes:** Colaborador operacional e gestor/responsável pelo estoque
* **Ferramentas utilizadas:** Planilhas, cadernos, anotações, conferência física e comunicação interna
* **Principal problema:** Atualização manual e risco de divergência entre estoque físico e registros
* **Riscos:** Erro humano, atraso na atualização, perda de histórico e falta de rastreabilidade
* **Resultado esperado:** Registrar entrada ou saída de produto e atualizar a quantidade disponível
* **Impacto no negócio:** Pode causar retrabalho, inconsistência nas informações e atrasos no atendimento

![Modelo BPMN do Processo 2](images/processo2.png)

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 2. Devem estar relacionadas com o modelo de processo apresentado anteriormente._

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

**Atividade 1 — Identificar entrada ou saída de produto**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| tipo_movimentacao | Seleção única | Opções: entrada, saída, retorno ou ajuste | Não informado |
| nome_produto | Caixa de texto | Campo recomendado | Não informado |
| codigo_sku | Caixa de texto | Opcional | Não informado |
| quantidade_movimentada | Número | Deve ser maior que zero | 1 |
| motivo_movimentacao | Área de texto | Opcional | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| iniciar conferência | Conferir produto fisicamente | default |
| cancelar | Fim do processo | cancel |


**Atividade 2 — Conferir produto fisicamente**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| produto_encontrado | Seleção única | Opções: sim, não | Não informado |
| quantidade_conferida | Número | Deve ser igual ou maior que zero | 0 |
| estado_produto | Seleção única | Opções: novo, usado, danificado, não conferido | Não conferido |
| local_armazenamento | Caixa de texto | Opcional | Não informado |
| responsavel_conferencia | Caixa de texto | Obrigatório | Não informado |
| data_conferencia | Data e Hora | Obrigatório | Data e hora atual |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| produto conferido | Registrar movimentação manualmente | default |
| produto não encontrado | Informar divergência | |
| cancelar | Fim do processo | cancel |


**Atividade 3 — Registrar movimentação manualmente**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| registro_manual | Área de texto | Obrigatório | Não informado |
| planilha_estoque | Arquivo | Opcional | Não informado |
| data_movimentacao | Data e Hora | Obrigatório | Data e hora atual |
| responsavel_registro | Caixa de texto | Obrigatório | Não informado |
| observacao | Área de texto | Opcional | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| registrar | Atualizar quantidade em registro informal | default |
| corrigir informações | Identificar entrada ou saída de produto | |
| cancelar | Fim do processo | cancel |


**Atividade 4 — Atualizar quantidade em registro informal**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| quantidade_anterior | Número | Deve ser igual ou maior que zero | 0 |
| quantidade_movimentada | Número | Deve ser maior que zero | 1 |
| quantidade_atualizada | Número | Deve ser igual ou maior que zero | 0 |
| tipo_registro | Seleção única | Opções: planilha, caderno, anotação, outro | Planilha |
| data_atualizacao | Data e Hora | Obrigatório | Data e hora atual |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| quantidade atualizada | Verificar existência de divergência | default |
| revisar registro | Registrar movimentação manualmente | |
| cancelar | Fim do processo | cancel |


**Atividade 5 — Verificar existência de divergência**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| divergencia_identificada | Seleção única | Opções: sim, não | Não informado |
| quantidade_fisica | Número | Deve ser igual ou maior que zero | 0 |
| quantidade_registrada | Número | Deve ser igual ou maior que zero | 0 |
| descricao_divergencia | Área de texto | Obrigatório se houver divergência | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| sem divergência | Finalizar registro da movimentação | default |
| com divergência | Realizar nova conferência manual | |
| cancelar | Fim do processo | cancel |


**Atividade 6 — Realizar nova conferência manual**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| quantidade_recontada | Número | Deve ser igual ou maior que zero | 0 |
| data_recontagem | Data e Hora | Obrigatório | Data e hora atual |
| responsavel_recontagem | Caixa de texto | Obrigatório | Não informado |
| motivo_recontagem | Área de texto | Obrigatório | Divergência identificada |
| observacao_recontagem | Área de texto | Opcional | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| confirmar recontagem | Corrigir registro manual | default |
| cancelar | Fim do processo | cancel |


**Atividade 7 — Corrigir registro manual**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| quantidade_corrigida | Número | Deve ser igual ou maior que zero | 0 |
| motivo_correcao | Área de texto | Obrigatório | Divergência entre registro e estoque físico |
| data_correcao | Data e Hora | Obrigatório | Data e hora atual |
| responsavel_correcao | Caixa de texto | Obrigatório | Não informado |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| salvar correção | Finalizar registro da movimentação | default |
| revisar novamente | Realizar nova conferência manual | |
| cancelar | Fim do processo | cancel |


**Atividade 8 — Finalizar registro da movimentação**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| status_registro | Seleção única | Opções: finalizado, pendente, corrigido | Finalizado |
| mensagem_final | Área de texto | Opcional | Movimentação registrada manualmente |
| responsavel_finalizacao | Caixa de texto | Obrigatório | Não informado |
| data_finalizacao | Data e Hora | Obrigatório | Data e hora atual |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| finalizar processo | Fim do processo | default |
| nova movimentação | Identificar entrada ou saída de produto | |


**Atividade 9 — Informar divergência**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| produto_pesquisado | Caixa de texto | Obrigatório | Não informado |
| tipo_divergencia | Seleção única | Opções: produto não localizado, quantidade incorreta, registro inexistente | Produto não localizado |
| descricao_divergencia | Área de texto | Obrigatório | Não informado |
| responsavel_informacao | Caixa de texto | Obrigatório | Não informado |
| data_informacao | Data e Hora | Obrigatório | Data e hora atual |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| realizar nova conferência | Realizar nova conferência manual | default |
| finalizar processo | Fim do processo | cancel |