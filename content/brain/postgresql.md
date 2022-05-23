---
title: postgresql
type: brain
tags: []
seo: ['sql', 'postgresql']
---

## Table of Contents


<hr>
## Query com intervalos de datas

```sql
SELECT generate_series((SELECT NOW() - INTERVAL '1 YEAR'), NOW(), '1 month'::interval)
```
