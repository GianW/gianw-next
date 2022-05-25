---
title: postgresql
type: brain
tags: []
seo: ['sql', 'postgresql']
---

## Table of Contents

- [Query datas](#query-datas)

<hr>
<a name="query-datas"></a>

## Percorrer intervalos de datas

```sql
SELECT generate_series((SELECT NOW() - INTERVAL '1 YEAR'), NOW(), '1 month'::interval)
```
usando a query com outras tabelas

```sql
SELECT 
  TO_CHAR(generate_series, 'Month'), m.consumo_p AS "Consumo ponta" 
FROM 
  generate_series((SELECT NOW() - INTERVAL '1 YEAR'), NOW(), '1 month'::interval)
JOIN 
  medicoes m
ON 
  m.pedagio_id = 123 AND
  EXTRACT(year from m.periodo_competencia) = extract(year from generate_series) AND
  EXTRACT(month from m.periodo_competencia) = extract(month from generate_series)
```
