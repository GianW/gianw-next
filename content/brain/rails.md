---
title: rails
type: brain
tags: []
seo: ['rails']
---

## Table of Contents

- [Formatar e manipular datas](#formatar-manipular-data)
- [Bundler](#bundler)
- [Tally](#tally)

<hr>
<a name="formatar-manipular-data"></a>

### Lista de métodos com datas

https://www.shortcutfoo.com/app/dojos/ruby-dates/cheatsheet

<hr>
<a name="bundler"></a>

### Bundler

`bundle outdated` -> Verifica quais pacotes tem atualizações disponíveis

`bundle doctor` -> Verifica erros no gemfile e no ambiente

`bundle gem <gem_name>` -> Cria uma nova gem com um scaffold 

<hr>
<a name="tally"></a>

### Tally

Contar quantas vezes um item se repete em uma lsita

```ruby
[1, 2, 2, 3].tally
# => { 1 => 1, 2 => 2, 3 => 1 }
```

Sem nenhuma condição de filtro o Tally vai contar todos os elementos em um `Enumerable` 

```ruby
%w(foo foo bar foo baz foo).tally
=> {"foo"=>4, "bar"=>1, "baz"=>1}
```

Enquanto o tally_by não entrar para o core, deve usar o map antes
```ruby
%w(foo foo bar foo baz foo).map { |s| s[0] }.tally
=> {“f” => 4, “b” => 2}
```

usando com o active record
```ruby
ComponenteDashboard.all.map(&:nome).tally
```

