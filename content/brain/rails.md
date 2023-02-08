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
- [Routes](#routes)
- [Metodos](#metodos)
- - [Chamada](#chamada)
- [Credentials](#credentials)
- [Random code](#random)

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
{"pld" => 1,"resumo" => 1,"resumo cotacoes linhas" => 1}
```

<hr>
<a name="routes"></a>

### Routes

Diferença entre collection e member:

```
member          /photos/1/preview   preview_photo_path(photo)   Acts on a specific resource so required id (preview specific photo)
collection      /photos/search      search_photos_path          Acts on collection of resources(display all photos)
```

<hr>
<a name="metodos"></a>

## Metodos

<a name="chamada"></a>

### Chamada

É possível definir um alias para a chamada de um método e eventualmente defiinir direfentes comportamentos conforme a chamada executada

```ruby
class Metodo
  def ola
    p 'Executando Ola'
    return __method__, __callee__
  end
  alias_method :oi, :ola
end

teste = Metodo.new

teste.ola
# "Executando Ola"
=> [[0] :ola, [1] :ola]

teste.oi
#"Executando Ola"
=> [[0] :ola,[1] :oi]

```

<a name="credentials"></a>

## Credentials

```
EDITOR=nano rails credentials:edit
```

<a name="random"></a>

## Random code

```ruby
("A".."Z").to_a.sample(6).join
```

