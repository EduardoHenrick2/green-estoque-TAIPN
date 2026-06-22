# Introdução

O presente projeto tem como objetivo apresentar o desenvolvimento do Green Estoque, um sistema digital de controle de estoque criado para apoiar os processos internos da empresa Green Volt, atuante no setor de energia solar. A proposta surgiu a partir da identificação de uma demanda real observada durante o contato da equipe com gestores e colaboradores da organização, em que foi constatada a necessidade de melhorar a organização, o registro e o acompanhamento dos produtos armazenados.

Atualmente, o controle de estoque da empresa ocorre de forma predominantemente manual, com registros em planilhas, anotações informais e contagens físicas recorrentes. Esse processo exige tempo dos colaboradores, gera retrabalho e aumenta a possibilidade de falhas humanas, principalmente porque os produtos relacionados à energia fotovoltaica podem ser volumosos, pesados e possuir características técnicas específicas, como potência, tensão, dimensões, marca e modelo.

Diante desse cenário, o Green Estoque propõe uma solução web integrada a um banco de dados relacional, permitindo o cadastro, a categorização, a consulta e a atualização das informações dos produtos de forma mais ágil, organizada e confiável. A aplicação busca contribuir para a modernização dos processos internos da Green Volt, reduzindo falhas operacionais, facilitando a localização de materiais e apoiando a tomada de decisão dos gestores.

Além de atender a uma necessidade prática da empresa parceira, o projeto possui caráter extensionista, pois aplica conhecimentos acadêmicos de análise de sistemas, banco de dados, desenvolvimento web e processos de negócio em um contexto real. Dessa forma, a solução aproxima a universidade da comunidade empresarial, contribuindo para a melhoria de processos em uma empresa do setor de energia renovável.

## Cliente

A empresa parceira do projeto é a Green Volt, uma organização do setor de energia solar que atua com a comercialização, distribuição e/ou utilização de equipamentos fotovoltaicos. Seu contexto operacional envolve o manuseio de produtos como placas solares, inversores, cabos, conectores, estruturas, peças e ferramentas utilizadas em instalações e serviços relacionados à energia solar.

Por atuar em um segmento que depende de materiais técnicos e de alto valor agregado, a Green Volt necessita de um controle de estoque confiável, atualizado e de fácil acesso. A falta de organização nesse processo pode dificultar a localização de produtos, comprometer o atendimento ao cliente, gerar atrasos e causar divergências entre o estoque físico e os registros utilizados pela empresa.

Entre os principais desafios identificados no cliente, destacam-se:
* Ausência de catalogação centralizada dos produtos;
* Necessidade de contagens manuais frequentes;
* Dificuldade de localização rápida de itens no estoque;
* Risco de erros nos registros de quantidade;
* Retrabalho por parte dos colaboradores;
* Esforço físico desnecessário no manuseio e conferência de equipamentos;
* Falta de dados consolidados para tomada de decisão.

Nesse contexto, o Green Estoque busca oferecer uma solução alinhada às necessidades reais da empresa, permitindo maior organização, rastreabilidade e eficiência no controle dos insumos e produtos fotovoltaicos.

## Problema

O principal problema identificado na Green Volt está relacionado à ausência de um controle de estoque centralizado, digital e atualizado. Atualmente, os produtos não são devidamente catalogados em um sistema único, o que obriga os colaboradores a realizarem verificações manuais para confirmar a disponibilidade de itens.

Esse processo manual gera diversos impactos negativos. Primeiramente, há retrabalho, pois os mesmos materiais precisam ser conferidos repetidas vezes. Além disso, a conferência física pode exigir movimentação de produtos grandes ou pesados, aumentando o desgaste dos colaboradores e tornando a rotina operacional menos eficiente.

Outro ponto crítico é a baixa confiabilidade das informações. Quando o estoque depende de planilhas, anotações ou conferências informais, erros de contagem e divergências entre o estoque real e o estoque registrado tornam-se mais comuns. Como consequência, a empresa pode enfrentar atrasos no atendimento, perda de vendas, dificuldade de reposição e insatisfação dos clientes.

Dessa forma, o problema central pode ser definido pela seguinte questão:
> *Como um software pode auxiliar a Green Volt no controle de estoque, reduzindo retrabalho, erros operacionais, esforço físico dos colaboradores e inconsistências nas informações dos produtos?*

O problema não se limita apenas à organização dos itens armazenados. Ele também possui impacto estratégico, pois afeta a eficiência da empresa, a agilidade no atendimento, a confiabilidade dos dados e a capacidade de tomar decisões com base em informações atualizadas.

## Objetivos

### Objetivo geral
Desenvolver um sistema digital integrado a um banco de dados para o gerenciamento e controle de estoque da empresa Green Volt, visando otimizar a localização de produtos, reduzir o desgaste físico dos colaboradores, diminuir falhas operacionais e tornar as informações do inventário mais confiáveis.

### Objetivos específicos
* Criar um sistema de categorização de produtos que permita organizar placas solares, peças, ferramentas e demais materiais de acordo com características como categoria, potência, tamanho, marca e quantidade disponível.
* Substituir o controle manual e os registros informais por uma aplicação digital capaz de centralizar as informações do estoque.
* Reduzir o tempo necessário para localizar produtos e verificar sua disponibilidade.
* Diminuir o retrabalho gerado por contagens manuais repetitivas.
* Melhorar a confiabilidade dos dados relacionados ao estoque, reduzindo divergências entre os registros e a quantidade física de produtos.
* Facilitar o acompanhamento de entradas, saídas e movimentações de produtos.
* Apoiar gestores e colaboradores na tomada de decisão por meio de informações mais claras, acessíveis e atualizadas.

## Justificativa

A criação do Green Estoque se justifica pela necessidade de modernizar o processo de controle de estoque da Green Volt. O método manual utilizado atualmente apresenta limitações significativas, como retrabalho, inconsistências nas informações, lentidão na localização de produtos e esforço físico desnecessário por parte dos colaboradores.

A adoção de um sistema digital permite que a empresa tenha maior controle sobre seus produtos, reduzindo falhas humanas e melhorando a organização dos dados. Com informações centralizadas, a equipe consegue consultar a disponibilidade dos itens de forma mais rápida, registrar movimentações com maior precisão e acompanhar o estoque com mais segurança.

Além dos benefícios operacionais, o projeto contribui para a melhoria da experiência dos colaboradores e clientes. Para os funcionários, a solução reduz tarefas repetitivas e facilita a rotina de trabalho. Para os clientes, a empresa passa a ter maior agilidade no atendimento e maior previsibilidade sobre a disponibilidade dos produtos.

O projeto também se justifica pelo crescimento do setor de energia solar, que exige cada vez mais eficiência na comercialização, organização e entrega de equipamentos fotovoltaicos. Ao melhorar seus processos internos, a Green Volt fortalece sua capacidade de atendimento e contribui indiretamente para a disseminação de soluções baseadas em energia renovável.

Por fim, o desenvolvimento do sistema representa uma oportunidade de aplicar, em um cenário real, conhecimentos acadêmicos relacionados a processos de negócio, banco de dados, desenvolvimento web, levantamento de requisitos, modelagem e experiência do usuário. Assim, o projeto une aprendizado acadêmico, inovação e impacto prático para a empresa parceira.

## Público-alvo

O público-alvo do Green Estoque é composto principalmente pelos colaboradores e gestores da Green Volt que participam direta ou indiretamente do controle de estoque, da organização de materiais e do atendimento aos clientes. 

Os principais perfis de usuários são:

| Perfil | Descrição | Necessidade principal |
| :--- | :--- | :--- |
| **Colaborador operacional** | Usuário responsável por consultar produtos, verificar disponibilidade e registrar movimentações no estoque. | Encontrar informações rapidamente e reduzir conferências manuais. |
| **Gestor ou responsável pelo estoque** | Usuário que acompanha indicadores, controla produtos, analisa movimentações e toma decisões sobre reposição. | Ter visão geral do estoque e dados confiáveis para decisão. |
| **Administrador do sistema** | Usuário com maior nível de permissão, responsável por gerenciar acessos, cadastros e configurações. | Garantir segurança, organização e controle das informações. |
| **Cliente final da Green Volt** | Pessoa atendida pela empresa, interessada na disponibilidade de produtos e agilidade no atendimento. | Receber atendimento mais rápido e confiável. |
| **Equipe acadêmica** | Discentes e docentes responsáveis pelo desenvolvimento, documentação e validação do projeto. | Aplicar conhecimentos acadêmicos em um problema real. |

### Mapa de stakeholders

| Stakeholder | Papel no projeto | Interesse no sistema | Impacto esperado |
| :--- | :--- | :--- | :--- |
| **Green Volt** | Cliente/parceiro externo | Melhorar o controle de estoque e reduzir falhas operacionais. | Maior eficiência e organização interna. |
| **Colaboradores da empresa** | Usuários diretos | Consultar e movimentar produtos com facilidade. | Menos retrabalho e menor esforço físico. |
| **Gestores da empresa** | Usuários estratégicos | Acompanhar dados do estoque e apoiar decisões. | Melhor controle e planejamento. |
| **Clientes da Green Volt** | Beneficiários indiretos | Receber atendimento mais ágil e preciso. | Melhor experiência de compra e atendimento. |
| **Alunos desenvolvedores** | Equipe do projeto | Desenvolver uma solução real aplicando conhecimentos acadêmicos. | Aprendizado prático e entrega extensionista. |
| **Professores orientadores** | Acompanhamento acadêmico | Orientar o desenvolvimento e avaliar a solução. | Garantia de qualidade acadêmica e metodológica. |
| **PUC Minas** | Instituição de ensino | Promover prática extensionista e integração com a comunidade. | Fortalecimento da relação universidade-sociedade. |