---
title: O que e GPT
date: '2024-03-13T00:10:03.284Z'
description: GPT um breve, muito breve, overview
tags: ['GPT']
seo: ['gpt']
lang: 'pt'
---

GPT - Generative Pre-trained Transformer

Mas o que?
Um modelo de deep learning para produzir texto natural dado um determinado input, GPTs trabalham analisando uma determinada entrada e predizendo qual a mais adequada sa[ida, de acordo com sua base de conhecimento. 

Essa e a parte do Generative + Pre-Trained, que permite ao modelo identificar padrões de dados e aplicar aos novos inputs o que e chamada de treinamento sem supervisão (unsupervised learning) onde o modelo recebe um conjunto de dados sem um label ou categoria e ele mesmo que tera de identificar os padrões e conjuntos no input, isso permite que ele gere saídas semelhantes para novos imputs que entrem na mesma categoria. 

A terceira parte dessa sigla ‘e o T, de Transformer, que e uma especie de neural network especializado em processamento de linguagem natural (humana). Ele não entende linguagens da mesma maneira que os humanos, ele processa as palavras em unidades discretas, essas unidades são chamados de TOKENS. Esses pedaços de palavras + caracteres são o que os modelos conseguem entender. 

Os transformers processam os dados com dois m[odulos chamados encoders e decoders que usam algo chamado de “self attention mechanism” para estabelecer dependências e relações.

Self Attention: Esse e um dos pedacos que transformam este modelo mais especial, modelos anteriores, como Recurrent neural networks ou Convolutional neural, acessam os dados de forma sequencial e hierárquica, ja o Transformer atual, consegue direcionar a sua ATENCAO para os tokens mais importantes do input, não importa onde estejam no texto, o que permite ao modelo avaliar a importância de cada palavra no contexto geral do input e os links e dependências entre elas.

Encoder: este [e o modulo que faz o mapeamento dos tokens em um vetor 3d em um processo chamado “embedding”. Os tokens que são mapeados próximos nesse vetor 3d indicam ter um significado parecido. Cada bloco no embedding tem um peso, que determina a importância e a posição na semântica o que permite ao modelo diferenciar o significado do mesmo grupo de palavras em uma ordem diferente. 
Ex: O ovo veio antes da galinha OU A galinha veio antes do ovo. praticamente o mesmo conjunto de palavras mas com significados diferentes.

Decoder: Projeta estatisticamente a resposta mais provável para os embeddings preparados pelo encoder, identificando as partes mais importante do input usando a sequencia do ‘self attention’ e determinando o output que parece mais correto.

——————————————————

A arquitetura de Transformers foi introduzida em 2017 em um papper divulgado pelo Google chamado ”Attention is all you need”, agora, no inicio de 2024 ja existem diversas IAs desenvolvidas em cima desta arquitetura, a mais famosa e o ChatGPT, que não e um modelo GPT em especifico, mas sim uma interface de chat quer permite aos usuários interagir com diversos modelos de GPT, voce pode escolher o modelo que quer interagir (GPT-3, GPT-4 e etc).    



Ref: https://www.ibm.com/account/reg/us-en/signup



 
