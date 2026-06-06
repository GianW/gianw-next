---
title: O que são agentes de IA?
date: '2024-09-03T00:10:03.284Z'
description: Uma introdução sobre agentes de IA
tags: ['Agents']
seo: ['IA', 'Agentes']
lang: 'pt'
---

# O que são agentes de IA

Para entender os agentes, precisamos entender a transição de modelos monolíticos para sistemas de IA compostos.

Os modelos são limitados pelos dados com os quais foram treinados, o que restringe as informações que conseguem acessar e as tarefas que conseguem resolver. Por exemplo, eles funcionam bem para perguntas genéricas, como criar boilerplates, redigir e-mails, etc. No entanto, eles têm dificuldade em responder perguntas específicas de um determinado domínio.

Sistemas compostos envolvem dar aos modelos acesso a um banco de dados para buscar respostas a perguntas específicas do domínio. Essa abordagem também é conhecida como "Retrieval-Augmented Generation (RAG)". Nesse caso, podemos controlar a lógica do LLM (Large Language Model) para seguir um caminho pré-determinado até encontrar a resposta.

Falo sobre isso com mais detalhes !(https://www.gianw.com/posts/what-is-rag).

Essa abordagem permite que os humanos controlem a lógica do modelo de forma programática, definindo um caminho específico.

Outra forma de controle de lógica ocorre quando deixamos o próprio LLM determinar o melhor caminho para encontrar uma resposta. Para explicar isso, vou detalhar os componentes dos agentes LLM:

- Raciocinar
- Agir (via ferramentas)
- Acessar memória

<hr>
--------------------------------------------------------------------------------------------------------------------------

Raciocinar:
Isso coloca o modelo no centro da resolução de problemas. O modelo é instruído a elaborar um plano e raciocinar sobre cada etapa do processo.

Agir (ferramentas):
Isso pode envolver desde ferramentas de busca, acesso a bancos de dados e trechos de código para transformação de dados, até APIs externas ou até mesmo chamadas a outros LLMs para realizar tarefas específicas.

Acessar memória:
Refere-se ao histórico ou logs de execução. Pode incluir as interações do usuário com o prompt, bem como as etapas que o LLM está percorrendo para resolver o problema — semelhante a uma pessoa pensando em voz alta enquanto trabalha num problema.

<hr>
--------------------------------------------------------------------------------------------------------------------------

A abordagem mais comum para agentes LLM é chamada de ReAct, que combina raciocínio e ação.

Como mostrado na imagem abaixo, o usuário envia uma consulta, o agente define as etapas necessárias para respondê-la e, em seguida, usa ferramentas para coletar os dados e verificar se a resposta foi encontrada. Se não, o processo recomeça.

Para contextos restritos — onde o problema deve ser resolvido dentro de um escopo limitado ou não respondido de jeito nenhum — o RAG ainda é a melhor opção. No entanto, veremos cada vez mais abordagens "agênticas", possivelmente em combinação com o RAG.

![Agente]( /static/content/ai-agents.png)
