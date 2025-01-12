---
title: What are AI agents?
date: '2024-09-03T00:10:03.284Z'
description: A brief about AI agents 
tags: ['Agents']
seo: ['AI', 'Agents']
lang: 'en'
---

# What are AI agents

To understand agents, we need to understand the shift from monolithic models to compound AI systems.

Models are limited by the data they are trained on, which restricts the information they can access and the tasks they can solve. For example, they are effective at addressing generic questions, like creating boilerplates, drafting emails, etc. However, they struggle to answer questions specific to a particular domain.

Compound systems involve giving models access to a database to retrieve answers for domain-specific questions. This approach is also known as "Retrieval-Augmented Generation (RAG)." In this case, we can control the logic of the LLM (Large Language Model) to follow a predetermined path to find the answer.

I discuss this in more detail ![here](https://www.gianw.com/posts/what-is-rag).

This approach allows humans to control the model’s logic programmatically by defining a specific path. 

Another form of logic control occurs when we let the LLM determine the best path to find an answer. To explain this, I will break down the components of LLM agents:


- Reason
- Act (via tools)
- Access memory

<hr>

Reason:
This places the model at the core of problem-solving. The model is prompted to devise a plan and reason through each step of the process.

Act (tools):
This can involve anything from search tools, database access, and code snippets for data transformation to external APIs or even calls to other LLMs to perform specific tasks.

Access memory:
This refers to the history or logs of execution. It can include user interactions with the prompt as well as the steps the LLM is taking to solve the problem—similar to a person thinking aloud while working through a problem.

<hr>

The most common approach for LLM agents is called ReAct, which combines reasoning and acting.

As shown in the attached image, the user submits a query, the agent defines the necessary steps to address the query, and then it uses tools to gather the data and verify if it answers the question. If not, the process restarts.

For narrow contexts where the problem or question should be solved within a limited scope—or not answered at all—RAG remains the best option. However, we will increasingly see more "agentic" approaches, possibly in combination with RAG.


