---
title: What is a RAG?
date: '2024-07-20T00:10:03.284Z'
description: A brief about RAG systens 
tags: ['RAG']
seo: ['AI', 'RAG']
lang: 'en'
---

# RAG - Retrieval - Augmented - Generator

Let's start by talking about the generator, which refers to LLMs (Large Language Models) that generate text in response to a user query, 
or better called a prompt. This generator is limited by the data it is trained on, so the answers can sometimes be outdated or even incorrect.

Let's consider an example: if you are from the same generation as I am, and a son or niece asks you for help with homework, and the first question is,
"In our solar system, which planet has the most moons?" (I would run to Google), but if you answer off the top of your head, it’s likely your answer will 
be "JUPITER." . The problem is that this answer is outdated, and there's no source to back it up. Or, if like me, you went to Google, there’s a chance 
you’ll find a weak/outdated source.

But if we go to the NASA website to check the information, we would see that more moons have been discovered, and now Saturn is the moon champion.
And pay attention, because this answer is correct today, in 2024, but it could change as more moons may be discovered.

This is an example of how a model answers prompts, using only the information it was trained on.

In a RAG framework, the generative model is instructed to first retrieve relevant content, combine it with the user's question, and then generate the response. 
So, we can instruct the model to always look at a specific source, such as a website, database, files, or whatever, and only if the answer is there, bring
it to the user.

This helps prevent the model from generating hallucinations when trying to find an answer, and also provides a way to instruct the model to say, "I don't know."

![RAG]( /static/content/rag-post.svg)
