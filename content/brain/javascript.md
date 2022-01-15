---
title: javascript
type: brain
tags: ['javascript']
seo: ['javascript']
---

## Table of Contents

- [Escopo de variaveis](#escopo-de-variaveis)
  - [Clousures](#clousures)
  - [Let](#let)
  - [Const](#const)
  - [Destructuring](#destructuring)
  - [Object Literal](#object-literal)
  - [Spread ...](#spread)
  - [Rest ...](#rest)
- [Funções](#funcoes)
  - [Function expression](#function-expression)
  - [Funções anonimas](#funcoes-anonimas)
  - [Expressão de função nomeada](#expressao-de-funcao-nomeada)
  - [IIFE - Immediately Invoked Function Expression](#iife)
  - [Callback](#callback)
  - [Bind](#bind)
  - [Call](#call)
  - [Apply](#apply)
  - [Promises](#promises)
- [Arrays](#arrays)
  - [Operações](#operações)
  - [Map](#map)
  - [Reduce](#reduce)
  - [Filter](#filter)
  - [Concat](#concat)
- [String](#string)
  - [Template](#template)

<a name="escopo-de-variaveis"></a>

<hr>

## Escopo de variaveis

Existem dois tipos de escopo para variaveis, Globais ou de Função.

Escopo global:

```javascript
var nome = 'Gian'

function imprime() {
  console.log(nome) /*Gian*/
}
```

Escopo de função

```javascript
function imprime() {
  var nome = 'Gian'
  console.log(nome) /*Gian*/
}
console.log(nome) /*undefined*/
```

Isso acontece pelo Hoisting de variaveis, antes da execução do código as variaveis são processadas e toda declaração de variavel é móvida para o inicio do escopo (Função ou Global) isso acontece também com as variaveis que são utilizadas sem declaração.

Código exemplo:

```javascript
function imprime() {
  nome = 'Gian'
  console.log(nome)
}
imprime()
sobrenome = 'Winckler'
```

Este código será processado da seguinte maneira:

```javascript
/*var sobrenome;*/
function imprime() {
  /*var nome;*/
  nome = 'Gian'
  console.log(nome)
}
imprime()
sobrenome = 'Winckler'
```

<p class="contentDottedDivider"></p>

<a name="clousures"></a>

### Clousures

Uma função que faça referencia a uma variavel que não está no seu escopo e não foi passada como argumento, todas as funções "filhas" da função que possui o escopo da variável, acessam está variável.

```javascript
function imprime() {
  var nome = 'Gian'
  function imprimeMesmo() {
    nome = 'Giiiian'
    console.log('Escopo imprimeMesmo(): ' + nome) /*Giiiian*/
  }
  imprimeMesmo()
  console.log('Escopo imprime(): ' + nome) /*Giiiian*/
}
console.log('Escopo Global: ' + nome) /*undefined*/
```

<p class="contentDottedDivider"></p>

<a style="text-align: center;" name="let"></a>

### Let

Entre as novas funcionalidades acrescidas pela versão 6 do EcmaScript, está o `let` que cria um escopo por bloco, a execução do hoisting é modificada e ele move a declaração da variavel para o inicio do bloco e não do escopo.

```javascript
function imprime() {
  'use strict'
  var nome = 'Gian'
  if (nome != '') {
    let sobrenome = 'Winckler'
    console.log(sobrenome) /*Winckler*/
  }
  console.log(sobrenome) /*sobrenome is not defined*/
}
imprime()
```

O `use strict` foi incluido para usar o `let` da mesma forma que seria nescessario para todas novas funcionalidades do ES06, neste exemplo usamos o `if` mas poderia ser em `for`, `switch`, `case` e assim por diante.

<p class="contentDottedDivider"></p>

<a name="const"></a>

### Const - ES06

Diferente das declarações anteriores e como o nome sugere, `Const` é a declaração de um valor apenas para leitura dentro do seu escopo.

```javascript
;(function constante() {
  'use strict'
  const VALOR = 'ES05'
  VALOR = 'ES06' //TypeError
})()
```

Observações: a constante vale apenas no escopo da função `constante`, a referencia de uma constante não pode ser alterado, mas, o valor poderia ser modificado, se feito dessa maneira:

```javascript
;(function constante() {
  'use strict'
  const VALOR = { atual: 'ES05' }
  VALOR.atual = 'ES06'
})()
```

<p class="contentDottedDivider"></p>

<a name="destructuring"></a>

### Destructuring

Extrair dados de arrays e objetos direto para variaveis.

```javascript
//array
let lista = [0, 1, 2]
let [a, b, c] = lista
console.log(a, b, c)
```

Também é possível pular uma posição

```javascript
let lista = [0, 1, 2]
let [a, , c] = lista
console.log(a, c)
```

Destruturando objetos:

```javascript
let pessoa = { nome: 'Gian', idade: 27, email: 'gianbwinckler' }
let { nome, email } = pessoa
console.log(nome, email)
```

Repare que chave ou conchete é o que identifica o tipo de objeto a ser desestruturado.

<p class="contentDottedDivider"></p>

<a name="object-literal"></a>

### Object Literal

Criar objetos atribuindo variaveis, nome da variaveel vira atributo e permance com o valor:

```javascript
var nome = 'Gian'
var idade = 28

var bejeto = { nome, idade }
console.log(bejeto)
//{nome: "Gian", idade: 28}
```

Abreviação de nome de métodos

```javascript
var bejeto = {
  nome,
  idade,
  exibe: function () {
    console.log(nome, idade)
  },
}
```

pode ser substituido por:

```javascript
var bejeto = {
  nome,
  idade,
  exibe() {
    console.log(nome, idade)
  },
}
```

<p class="contentDottedDivider"></p>

<a name="spread"></a>

### Spread ...

Separa objetos em multiplos elementos, exemplo:

```javascript
function exibe(a, b) {
  console.log(a, b)
}
let lista = [1, 2]
exibe(lista)
//(2) [1, 2]
exibe(...lista)
//1 2
```

Na primeira chamada ele enviou o array inteiro, na segunda "quebrou" as posições do array em valores separados

<p class="contentDottedDivider"></p>

### Rest ...

Reune varios elementos em um array, exemplo:

```javascript
function teste(a, ...itens) {
  console.log(a, itens)
}
teste(1, 2, 3, 4, 5, 6, 7)
//1 [2, 3, 4, 5, 6, 7]
```

<a name="funcoes"></a>

<hr>

## Funções

<a name="function-expression"></a>

### Function expression

Qunado uma função é atribuida a uma variavel

```javascript
var ola = function () {
  console.log('Olá')
}

ola()

function buenas() {
  console.log('Buenas')
}

var hello = buenas

hello()
```

É importante observar o hoisting para este tipo de declaração, observe o exemplo:

```javascript
ola() //Olá
hello() //Uncaught TypeError: hello is not a function

function ola() {
  console.log('Olá')
}

var hello = function () {
  console.log('Hello')
}
```

Isso acontece pois o hoisting sobe a declaração da variavel e não o seu conteudo.

O uso da function expression "protege" o escopo das variaveis internas, como foi dito em [Clousures](#clousures).
Para exemplificar, sempre que chamamos uma função na forma tradicional `somar()` todo escopo de variaveis internas é reiniciado:

```javascript
function alertaErro(tipoErro) {
  var qtdErro = 0
  qtdErro += 1
  alert('Erro: ' + tipoErro + ' Quantidade: ' + qtdErro)
}
alertaErro('Valor inválido!') //Qtd 1
alertaErro('Valor inválido!') //Qtd 1
```

Usando function expression ficaria dessa forma:

```javascript
function alertaErro(tipoErro) {
  var qtdErro = 0
  return function () {
    qtdErro += 1
    alert('Erro: ' + tipoErro + ' Quantidade: ' + qtdErro)
  }
}
let errValorInvalido = alertaErro('Valor inválido!')
let errPreenchaNome = alertaErro('Você deve preencher o campo nome.')

errValorInvalido() // qtd 1
errValorInvalido() // qtd 2

errPreenchaNome() //qtd 1
errPreenchaNome() //qtd 2
```

Mesmo com esse tipo de atribuição é possível passar valores por paramêtro em cada chamada, ex:

```javascript
function alertaErro(tipoErro) {
  var qtdErro = 0
  return function (campo) {
    qtdErro += 1
    alert('Erro: ' + tipoErro + ', Campo: ' + campo + ' Quantidade: ' + qtdErro)
  }
}
let errValorInvalido = alertaErro('Valor inválido!')

errValorInvalido('Total') // qtd 1
errValorInvalido('Frete') // qtd 2
```

<a name="funcoes-anonimas"></a>

### Funções anonimas

Na verdade, muitas pessoas chamam de função anonima o que foi explicado anteriormente como function expression, entenda o motivo:

```javascript
var ola = function () {
  console.log('Olá')
}

function buenas() {
  console.log('Buenas')
}

var hello = buenas

console.log(hello.name)
console.log(ola.name, ola.name == '')
```

"Gian, mas eu nunca uso o atributo name de uma função", Talvez use mas não saiba, por exemplo, a função `setTimeout` recebe como primeiro parametro o nome da função e guarda seu contexto (hoisting), o código abaixo exemplifica:

```javascript
function tic() {
  console.log('Fake')
}
var relogio = function tic() {
  console.log(new Date())
  setTimeout(tic, 1000)
}
relogio()
tic()
```

<p class="contentDottedDivider"></p>

<a name="expressao-nomeada"></a>

### Expressão de função nomeada

```javascript
var math = {
  diminui: function diminui(a, b) {
    console.log(a - b)
  },
  soma: function soma(a, b) {
    console.log(a + b)
  },
}

math.diminui(2, 1)
math.soma(1, 1)
```

<p class="contentDottedDivider"></p>

<a name="arrow-functions"></a>

### Arrow Functions

<p class="contentDottedDivider"></p>

<a name="iife"></a>

### IIFE - Immediately Invoked Function Expression

São funções atribuidas em expreções `()` e exceturadas logo após sua definição

```javascript
;(function () {
  console.log('Oi')
})()
```

Existem diversos usos para este tipo de função, exemplo:

```javascript
var produtos = (function () {
  var lista = []
  return {
    add: function (a) {
      lista.push(a)
    },
    show: function () {
      console.log(lista)
    },
  }
})()

produtos.add('camisa')
produtos.add('calça')
produtos.show()
```

Dessa forma a lista fica acessivel apenas dentro de produtos, "encapisulados" pelo escopo são acessiveis apenas pelos metodos expostos. Obs. Isso também é conhecido como module pattern

Também é possivel usar uma IIFE para identificar o contexto de uso de uma função de modo que se possa usar tanto no browser como no servidor.

```javascript
;(function (context) {
  function hello(name) {
    console.log('hello', name)
  }
  context.hello = hello
})(this.module && this.module.exports ? module.exports : this)
```

Essa função pode ser usada:

```javascript
var hello = require('./hello').hello

hello('Gian')
```

e também no navegador

```html
<script src="hello.js"></script>
<script>
  hello('Gian')
</script>
```

<p class="contentDottedDivider"></p>

<a name="callback"></a>

### Callback

<p class="contentDottedDivider"></p>

<a name="bind"></a>

### Bind

<p class="contentDottedDivider"></p>

<a name="call"></a>

### Call

<p class="contentDottedDivider"></p>

<a name="apply"></a>

### Apply

<p class="contentDottedDivider"></p>

### Promises

<a name="promises"></a>

<hr>

<a name="arrays"></a>

## Arays

### Operações

```javascript
var produtos = ['camisa', 'calça']

console.log(produtos.length) //2
console.log(produtos[0]) //camisa
console.log(produtos[produtos.length]) // undefined
console.log(produtos[produtos.length - 1]) // calça

// percorre todos registros do array.
produtos.forEach(function (item, index, array) {
  console.log(item, index, array)
})

//Inclui item no fim da lista (retorna int da ultima posição do array)
produtos.push('meia') // 3

//Remove item do fim da lista (retorna item removido)
produtos.pop() // meia

// Remove item do inicio da lista (retorna item removido)
produtos.shift() //"camisa"

//Incluir item no inicio da lista (retorna tamanho da lista)
produtos.unshift('camisa') //2

// Procura a posição de um item dentro do array
produtos.indexOf('calça') // 1

// Remove itens por posição ==revisar==
produtos.splice(1, 1)

// Cria uma cópia do array
var produtosDois = produtos.slice()
// Observe que é diferente de var produtosDois = produtos; que apenas aponta para o mesmo array

//Ordernar elementos do array
produtos.sort()
```

<p class="contentDottedDivider"></p>

### Map

<a name="map"></a>
Atua/percorre uma lista e executa uma function em cada unidade dessa lista, exemplo:

```javascript
function exibeRegistro(reg){
    console.log(reg);
}

produtos.map(function(obj){
    exibeRegistro(obj);
);

//também é possivel atribuir os valores modificados a um novo array
var novaLista = produtos.map(function(obj){
    return obj + "_1";
});
```

<p class="contentDottedDivider"></p>

### Reduce

<a name="reduce"></a>

Reduz um array para um valor único, executa uma função para cada valor do array e adiciona o retorno da função em um acumulador.

```javascript
let teste = [1, 2, 3].reduce(function (acum, valor) {
  return acum + valor
})

console.log(teste) //6
```

parâmetros

```
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

<p class="contentDottedDivider"></p>

### Filter

<a name="filter"></a>

Atua/percorre um array e retorna os valores que passarem pelo filtro/função atribuida

```javascript
let teste = [1, 2, 11, 20, 5].filter(function (valor) {
  return valor > 10
})

console.log(teste) //[11,20]
```

parâmetros

```
array.filter(function(currentValue, index, arr), thisValue)
```

<p class="contentDottedDivider"></p>

### Concat

<a name="concat"></a>

<hr>

## String

<a name="string"></a>

### Template

<a name="template"></a>

```javascript
let nome = 'Gian'
let cidade = 'Porto Alegre'
let mensagem = `Este texto está sendo editado por ${nome} na cidade de ${cidade}`
console.log(mensagem)
//Este texto está sendo editado por Gian na cidade de Porto Alegre
```

Quebras de linha também são reconhecidas:

```javascript
let nome = 'Gian'
let cidade = 'Porto Alegre'
let mensagem = `Este texto está sendo editado por ${nome}
na cidade de ${cidade}`
console.log(mensagem)
//Este texto está sendo editado por Gian
//na cidade de Porto Alegre
```

<hr>
