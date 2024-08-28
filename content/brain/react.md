---
title: react
type: brain
tags: []
seo: ['react', 'reactjs']
---

## Table of Contents

- [Hooks](#hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)

<a name="hooks"></a>

<hr>

## Hooks

<a name="usestate"></a>

### useState

Hook nativo do React que permite manter um state e disparar o render toda vez que este state sofre alguma alteracao, a definicao de uma variavel de forma direta no corpo do JS fara com que ela seja lida apenas no primeiro render, mesmo que dinamicamente o valor dela seja modificado. O hook de useState dispara uma nova renderizacao do componente quando o valor for modificado


```javascript
  /* Nao e manipulavel */
  const name = ''
  /* Monitorado pelo processo do react */
  const [name, setName] = React.useState('')
```

- Lazy state initialization

Em casos bem especificos onde o state inicial vem de um processo que requer mais processamento, pode-se ussar uma funcao como state inicial, isso fara com que o React nao repita o processo em cada re-render do componente (que pode acontecer diversas vezes) 

```javascript
   const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName)
   /* Alterado para */
   const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName)
```


<a name="useeffect"></a>

### useEfect

Permite executar uma funcao depois que o React executou o render (e re-render) no DOM, ou quando uma determinada variavel for alterada (apos render) comportamento descrito abaixo.
  

```javascript
    useEffect(() => {
        //função / comportamento
    },[ //vars que são gatilho para executar comportamento ])
```

- quando não são adicionadas variaveis de gatilho funciona igual ao `didMount`

- quando são adicionadas funciona igual ao `didupdate`

- quando tem algum retorno (função) funciona como o `didunMount` será executado quando o componente for desmontado

- React usa comparacao rasa 'shallow', entao objetos precisar ser desestruturados para comparacao  

<p class="contentDottedDivider"></p>

<a name="usecontext"></a>

### useContext

<p class="contentDottedDivider"></p>

<a name="usereducer"></a>

### useReducer

<p class="contentDottedDivider"></p>

<a name="usecallback"></a>

### useCallback

Memoriza a declaração de uma função

```javascript
const minhaFuncao = useCallback((name, ref) => {
  exec()
}, [])
```

Recebe os argumentos de entrada para execução da função e uma lista (array) com as variáveis que fazem o componente ser recriado

<p class="contentDottedDivider"></p>

<a name="usememo"></a>

### useMemo

<p class="contentDottedDivider"></p>

<a name="useref"></a>

### useRef
