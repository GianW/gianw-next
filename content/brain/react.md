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
  - [useContext](#useContext)
  - [useReducer](#useReducer)
  - [useCallback](#useCallback)
  - [useMemo](#usememo)
  - [useRef](#useref)
  - [React Hook flow](#reacthookflow)

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

Muito similar ao useState, mas idealmente usado quando a troca do estado requer uma funcao mais complexa.

```javascript
function nameReducer(previousName, newName) {
  return newName
}

const [name, setName] = React.useReducer(nameReducer, initialNameValue)
```

Exemplo com uma estrutura parecida com o Redux

```javascript
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Contagem: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Incrementar</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrementar</button>
    </div>
  );
}

export default Counter;

```


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

Usar quando precisar alguma interacao com o DOM. A sintaxe html que usamos no React e apenas um syntatic suggar do `React.createElement` que nao da acesso real ao DOM.

O elemento so ira existir de fato no DOM apos o processo de render do React, e para acessa-lo e preciso interagir com o uso do Ref.

```javascript
function MyDiv() {
  const myDivRef = React.useRef()
  React.useEffect(() => {
    const myDiv = myDivRef.current
    // myDiv is the div DOM node!
    console.log(myDiv)
  }, [])
  return <div ref={myDivRef}>hi</div>
}
```

Após o componente ser renderizado, ele é considerado "montado". É nesse momento que o callback do React.useEffect é chamado, e, por isso, nesse ponto, a referência deve ter sua propriedade current definida para o node do DOM. Portanto, muitas vezes você realizará interações/manipulações diretas no DOM dentro do callback do useEffect.


<a name="customhooks"></a>

### Custom Hooks

Por convencao, sao funcoes que usam hooks, tambem por convencao elas devem iniciar com a palavra `use` 

```javascript
function useLocalStorageState(key, defaultValue = ''){
  const [state, setState] = React.useState(
    () => window.localStorage.getItem('name') || initialName
  )

  React.useEffect(() => {
    windows.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}
```
<a name="reacthookflow"></a>

### React Hook flow

Exemplo de execucao com console.log do fluxo de hooks no react, desde a montagem dos componentes em memoria ate o renderizacao em tela 

https://github.com/kentcdodds/react-hooks/blob/8fd831190005587a38f225e66adf5f8b466d4bf2/src/examples/hook-flow.js

Run lazy initializers -> Quando a pagina esta sendo renderizada pela primeira vez
Render -> Montando o resto da aplicacao (por exemplo, onde o useState e processado)
React update DOM -> React faz o update do state do VDOM
Browser paints screen -> VDom para o DOM

https://github.com/kentcdodds/react-hooks/blob/main/src/examples/hook-flow.png?raw=true![image](https://github.com/user-attachments/assets/a2f9e1eb-4eae-4b7b-afa4-12a9dbf5082b)

