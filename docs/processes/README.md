content = """# Documentação de Processos AS IS – Green Volt

Este repositório contém o mapeamento do estado atual (AS IS) dos principais processos de gestão de estoque da **Green Volt**. O objetivo desta documentação é detalhar o fluxo das atividades, identificar gargalos, riscos e as ferramentas utilizadas nas operações manuais de hoje, servindo como base estrutural para futuras melhorias, modelagens (TO BE) e possíveis automatizações.

---

## 📦 Processos Mapeados

### [Processo 1 AS IS – Consulta manual e localização de produtos no estoque](./processo-1-as-is.md)
Detalha o fluxo de atividades de quando um colaborador precisa verificar a disponibilidade de um item fotovoltaico.
* **Cenário atual:** Consulta a planilhas, registros informais e conferência física.
* **Principais riscos:** Demora na localização, retrabalho, erro humano e divergência de informações.
* **Resultado esperado:** Informar de forma confiável se o produto está disponível e a sua quantidade.

### [Processo 2 AS IS – Registro manual de entrada e saída de produtos](./processo-2-as-is.md)
Descreve a rotina de recebimento de novos produtos ou a retirada de itens do estoque para uso, venda, instalação ou manutenção.
* **Cenário atual:** Uso de cadernos, planilhas e anotações manuais para registrar movimentações após conferência física.
* **Principais riscos:** Atraso na atualização do estoque, perda de histórico rastreável e surgimento de divergências entre o estoque físico e o sistema informal.
* **Resultado esperado:** Atualizar a quantidade disponível no momento exato da entrada ou saída do produto.

---

## 📄 Estrutura dos Documentos

Cada arquivo Markdown de processo neste diretório segue uma estrutura padronizada para facilitar o entendimento técnico e de negócio:

1. **Visão Geral:** Nome, descrição do cenário e principais características (tipo de processo, responsáveis, ferramentas, problemas e riscos).
2. **Fluxo do Processo:** Resumo narrativo do passo a passo.
3. **Modelo BPMN:** Representação visual do fluxo de tarefas (exibida por meio de imagem).
4. **Detalhamento das Atividades:** Especificação técnica de cada etapa do processo contendo:
   * **Tabela de Campos:** Variáveis de dados, tipos (ex: *Caixa de texto, Seleção única, Número*), restrições e valores padrão.
   * **Tabela de Comandos:** Ações disponíveis na atividade, direcionamento (destino) e o tipo de gatilho acionado (ex: *default, cancel*).

---
