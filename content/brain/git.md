---
title: git
type: brain
tags: []
seo: ['git']
---

Reverter um arquivo para o mesmo estado de outra branch
```
git checkout branch path_file
```

Fiz um commit e agora percebi que estava na main, como reverter o commit sem perder as alterações?
```shell
git reset --soft HEAD~1
```
isso vai desfazer o commit mas manter as alterações em staged
