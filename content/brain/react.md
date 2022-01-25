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

<p class="contentDottedDivider"></p>

<a name="useeffect"></a>

### useEfect

```javascript
    useEffect(() => {
        //função / comportamento
    },[ //vars que são gatilho para executar comportamento ])
```

- quando não são adicionadas variaveis de gatilho funciona igual ao `didMount`

- quando são adicionadas funciona igual ao `didupdate`

- quando tem algum retorno (função) funciona como o `didunMount` será executado quando o componente for desmontado

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
