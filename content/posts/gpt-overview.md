---
title: O que e GPT
date: '2024-03-13T00:10:03.284Z'
description: GPT um breve, muito breve, overview
tags: ['GPT']
seo: ['gpt']
lang: 'pt'
---

# GPT - Generative Pre-trained Transformer

Um breve resumo para minha autorreferência sobre o que é o GPT.

## Por dentro

Um modelo de deep learning para produzir texto natural a partir de uma entrada específica. Os GPTs analisam o conteúdo fornecido e preveem a saída mais adequada, de acordo com sua base de conhecimento. 

Essa é a parte do Generative + Pre-Trained, que permite ao modelo identificar padrões nos dados e aplicar, aos novos inputs, o que é chamado de treinamento sem supervisão (unsupervised learning). Nesse tipo de treinamento, o modelo recebe um conjunto de dados sem rótulos ou categorias definidos, e cabe a ele identificar os padrões e agrupamentos no input. Isso permite que ele gere saídas semelhantes para novos imputs que entrem na mesma categoria. 

A terceira parte dessa sigla é o T, de Transformer, que é uma espécie de rede neural especializada em processamento de linguagem natural (humana). Ele não entende linguagens da mesma maneira que os humanos. Em vez disso, processa as palavras em unidades discretas chamadas de <b>tokens</b>. Esses pedaços de palavras + caracteres são as unidades que os modelos conseguem interpretar.

Os Transformers processam os dados com dois módulos chamados encoders e decoders, que utilizam algo chamado “self attention mechanism” para identificar dependências e estabelecer relações entre os elementos do texto.

<b>Self-Attention:</b> Esse é um dos pedaços que tornam este modelo tão especial. Diferentemente de modelos anteriores, como as redes neurais recorrentes (Recurrent Neural Networks) ou as redes neurais convolucionais (Convolutional Neural Networks), que acessam os dados de forma sequencial e hierárquica, o "self-attention" consegue direcionar sua <s>atenção</s> para os tokens mais importantes do input, independentemente de onde estejam no texto. Isso permite ao modelo avaliar a importância de cada palavra no contexto geral do input e identificar as conexões e dependências entre elas.

<b>Encoder:</b> É o módulo responsável por mapear os tokens em um vetor 3D, em um processo chamado "embedding". Os tokens que são mapeados próximos nesse vetor indicam ter significados semelhantes. Cada bloco no embedding possui um peso que determina sua importância e posição na semântica. Isso permite ao modelo diferenciar o significado de um mesmo conjunto de palavras quando apresentado em ordens diferentes.
Por exemplo:
 - O ovo veio antes da galinha.
 - A galinha veio antes do ovo.
 - 
Embora usem praticamente o mesmo conjunto de palavras, as frases têm significados distintos, e o Encoder é capaz de capturar essa diferença.

<b>Decoder:</b> O Decoder projeta, de forma estatística, a resposta mais provável com base nos embeddings preparados pelo Encoder. Ele identifica as partes mais importantes do input utilizando a sequência do mecanismo de self-attention e, a partir disso, determina o output que parece mais adequado.

_____________________________________________________________________________________________________
<hr>

A arquitetura de Transformers foi introduzida em 2017 em um artigo publicado pelo Google, intitulado “Attention Is All You Need”. Agora, no início de 2024, já existem diversas IAs desenvolvidas com base nessa arquitetura. A mais famosa é o ChatGPT, que não é um modelo GPT específico, mas sim uma interface de chat que permite aos usuários interagir com diferentes modelos de GPT, como o GPT-3, GPT-4, entre outros.


Ref: https://www.ibm.com/account/reg/us-en/signup



 
