---
title: algoritimos
type: brain
tags: []
seo: ['algoritimos', 'programação']
---

## Table of Contents

- [Notação Big O](#notacao-big-o)
- [Pesquisa Binaria](#pesquisa_binaria)
- [Ordenação por seleção](#ordenacao_selecao)
- [Gloassário](#glassario)
  - [Logaritmo](#logaritimo)


<hr>
<a name="notacao-big-o"></a>

## Notação BIG O

A notação BIG O indica o quão rápido é um algorítimo, a velocidade do algorítimo é medida pela quantidade de operações necessárias em relação ao tananho da lista, e não pelo tempo de execução. 

A notação tem a seguinte descrição:
```javascript
O(n) // n == Número de operações
```
A notação BIG O estabelece a velocidade de execução para o pior cenário.

*Exemplos comuns*

* `O(log n)` - Tempo logaritimico, algoritmos com essa complexidade geralmente são muito eficientes, exemplo: pesquisa binária;
* `O(n)` - Tempo linear, exemplo: Pesquisa simples;
* `O(n * log n)` Comum em algoritmos eficientes de ordenação, como o algoritmo Quicksort e o algoritmo Mergesort;
* `O(n²)` Algotimo lento de ordenação, exemplo ordenação por seleção;
* `O(n!)` Algoritimo bastante lento, exemplo: caixeiro viajante.

Exemplo do `O(n * log n)` usando merge sort: Cada step desse algoritmo você está dividindo o problema em 2 até que cada uma das sub listas se torne unitária. Se você tem uma lista de tamanho 32 e quer dividir ela ao meio em mini-listas até que cada lista se torna unitária você vai precisar de 5 iterações (lembre-se log2(32) = 5). Em cada um desses 5 steps você percorre todos os elementos da lista, ou seja, percorre os elementos: 32 * 5 generalizado como n * log2(n). 


Tabela de referência de complexidades: <a href="https://www.bigocheatsheet.com/">https://www.bigocheatsheet.com/ </a>

<hr>
<a name="pesquisa_binaria"></a>

## Pesquisa binaria

O exemplo de uso mais comum para a pesquisa binária é a lista telefonica, onde temos uma lista ordenada e queremos buscar um valor aleatório. Com este método sempre vamos para a metade da lista e verificamos se o valor é maior ou menor, então, decidimos se iremos para direita ou esquerda e repetimos o procedimento até chegar no valor.

JS: <a href='https://gist.github.com/GianW/4aee2aaa4a7cf8af87026cbe08798aff.js'>https://gist.github.com/GianW/4aee2aaa4a7cf8af87026cbe08798aff.js</a>

<hr>
<a name="ordenacao_selecao"></a>

## Ordenação por seleção - Selection sort

Busca por um item por vez na lista e salva ordenadamente em outro espaço da memória (lista)

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1696038594/brain/ordenacao_selecao_a0v9ni.png" alt="Button text moviment" style="width:50%;"/>

Complexidade O(n²)

JS: <a href="https://gist.github.com/GianW/08d5d307b0dd3615bb19d24d4ca40c2b">https://gist.github.com/GianW/08d5d307b0dd3615bb19d24d4ca40c2b</a>

<hr>
<a name="glassario"></a>

## Glossário

Termos ou expressões que podem ser encontradas no decorrer do texto

<a name="logaritmo"></a>

* Logaritmo

Logaritimos são o oposto de exponenciais, exemplo:

`Log_10 100` -> Quantos 10 conseguimos multiplicar para chegar a 100
```javascript
10² = 100 <--> Log_10 100 = 2

Log_10 100 = 2 -> 10²=100 -> 10x10 = 100
```
