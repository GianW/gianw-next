---
title: nodejs
type: brain
tags: ['node', 'nodejs']
seo: ['node', 'nodejs']
---

## Table of Contents

<hr>

Informações sobre nucleos da máquina
```javascript
os.cpus()
```

ideal para:
-Criar cluster de processos
-Balancear carga
-Definir número ideal de workers


<hr>

Capturar um erro e evitar que o processo encerro por completo

```javascript
process.on("uncaughtException", (err) => {
   console.error(err)

   //FORCE exit process
   process.exit(1);
});

process.stdin.resume();
```

<hr>
Verificar modulos já carregados

```javascript
require.cache
```
<hr>

Listar pacotes instalados globalmente
```
npm ls -g
```
```
//Show only first level
npm ls -g --depth=0
//More details
npm ll -g --depth=0
```

npm xmas
npm visnu


