---
title: postgresql
type: brain
tags: []
seo: ['sql', 'postgresql']
---

## Table of Contents

- [Query datas](#query-datas)
- [Query intervalos data e hora](#query-intervalo-data)

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

<a name="query-intervalo-data"></a>

## Percorrer intervalos entre datas e horas

- Buscar todas as medições exceto entre 19:00 e 22:00 horas

```sql
SELECT     
  medicoes_quinze_minutos.consumo_ativo,
  medicoes_quinze_minutos.periodo
FROM 
  medicoes_quinze_minutos
WHERE
  medicoes_quinze_minutos.ponto_id = 13  AND
  (medicoes_quinze_minutos.periodo BETWEEN '2022-04-01 00:00:00' AND '2022-04-01 23:59:59.999999') AND 
  (medicoes_quinze_minutos.periodo NOT BETWEEN '2022-04-01 19:00:00' AND '2022-04-01 22:00:00')
ORDER BY medicoes_quinze_minutos.consumo_ativo DESC
LIMIT 1   
  
```

