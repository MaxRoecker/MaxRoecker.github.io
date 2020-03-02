---
title: 'JavaScript Intermediário #4: Closure'
description: 'Dessa vez voltaremos nossa atenção para um importante, esquecido e quase mitológico aspecto da linguagem JavaScript: o Closure.'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3274431349/in/album-72157613498998540/'
featured: false
date: 2016-02-16 18:42:06
tags:
  - javascript
---
> **fe.cho**: 1. Acabamento, conclusão, fim, remate; 2. tudo que serve para fechar ou encerrar.

A série [JavaScript Intermediário](http://maxroecker.com/tag/intermediate/) busca passar, de maneira sólida e gradual, o funcionamento de escopos dentro da linguagem. Neste capítulo, vamos voltar nossa atenção para um importante, esquecido e quase mitológico aspecto da linguagem: o ***Closure***, também conhecido como **fecho léxico** ou **fecho de função**.

Se você já acompanha a série de textos e compreende as características de escopos em JavaScript, o funcionamento de *closures* será bastante óbvio. Mas caso tenha dúvidas, essa é uma boa hora de voltar e ler os textos #1, #2 e #3.

Mesmo que você programe há muito tempo em JavaScript e nunca tenha ouvido nunca falar em *closure*, aqui vai uma revelação: **ele está presente em todo lugar**. *Closure* não é um tipo de opção especial da linguagem nem um conjunto de declarações ou de padrões de desenvolvimento. Devido a isso, *closures* são criados e usados em todo o seu código escrito em JavaScript. Você nem precisa tentar criá-los intencionalmente, eles já estarão lá. Mas é preciso entendê-lo para que se possa compreender todas as consequências da sua presença.

---
## Definição ##

Quando uma função é definida dentro do escopo de outra função, ela possui acesso a todas as variáveis locais que a função encapsulante possui, como vimos anteriormente na definição do escopos em JavaScript. Porém, quando juntamos o conceito de escopo léxico em uma linguagem que suporta funções de alta ordem e as trata como objetos de primeira classe, um poderoso conceito é definido: o *Closure*. Vamos começar com um exemplo simples. Observe o código abaixo.

{% simplecode js %}
``` js
function counter (start) {
  var value = start || 0

  function increment () {
    return ++value
  }

  return increment
}

var count = counter(0)

console.log(count())  // → 1
console.log(count())  // → 2
console.log(count())  // → 3
```
{% endsimplecode %}

Criamos uma função {%c "counter"%}, que recebe como parâmetro um valor inicial. A função {%c "counter"%} define a função {%c "increment"%} e a retorna, onde atribuímos à ela a variável {%c "count"%}. Quando executamos a função de {%c "count"%} — que é a função {%c "increment"%} — ela retorna o valor de {%c "value"%} anterior incrementado em uma unidade.

Como a função {%c "increment"%} foi criada dentro do escopo de {%c "counter"%}, ela possui acesso a todas as variáveis do escopo de {%c "counter"%}. Mas perceba, a função {%c "counter"%} já foi executada, seu *frame* já foi empilhado e desempilhado, ou seja, se a variável {%c "value"%} estava dentro do *frame* então ela já deve ter sido destruída quando executamos a função {%c "count"%} posteriormente, não é mesmo? Mas não é isso o que acontece quando você executa o código acima. A função {%c "increment"%} ainda consegue acessar a variável {%c "value"%} mesmo que o escopo no qual ela foi declarada tenha sido destruído. Porque isso acontece? Bem, estamos diante de um clássico efeito do *closure* em JavaScript. De forma geral, podemos dizer que:

> Em uma linguagem que implementa *closure*, funções são capazes de lembrar o escopo léxico de onde foram declaradas mesmo quando executadas fora dele.

Formalmente, *Closure* é uma técnica de implementação para realizar a ligação entre escopos em uma linguagem com que possui [funções de alta ordem](http://c2.com/cgi/wiki?HigherOrderFunction) e como [objetos de primeira classe](http://c2.com/cgi/wiki?FirstClass) — que é o caso do JavaScript. Em baixo nível, as *Closure* das funções são na verdade partes da memória dos *frames* de escopos léxicos que não são alocados na pilha, mas sim na área de memória dinâmica, o [*heap*](http://c2.com/cgi/wiki?TheHeap). E dessa forma continuam existindo mesmo que o *frame* seja destruído enquanto existirem funções que “apontem” para ele.

É importante observar que o *closure* é completamente imune a interferências externas que não sejam as próprias funções anteriormente declaradas dentro do escopo. Nada consegue acessá-lo se não através das funções que foram declaradas nele.

{% figure alt:"Analogia ilustrativa do Closure" width:1024 height:510 %}
{% asset_path "closure.svg" %}
{% endfigure %}

O JavaScript utiliza uma coleta de lixo de memória automática. A especificação ECMAScript não define detalhes de implementação e do funcionamento dessa coleta de lixo, deixando a responsabilidade para os implementadores. De forma geral, se um objeto torna irreferenciável, por não haver mais nenhuma referência à ele ativa no código, este se torna disponível para que o coletor de lixo o destrua em algum ponto no futuro; deixando seu espaço e recurso disponível para o sistema reutilizar.

Como resultado, é preciso de cuidado ao utilizar *closures*. Por exemplo, ao anexar a um objeto um *closure* que possua o próprio objeto como variável, temos uma referência circular que nos leva a um vazamento de memória (*memory leak*). Veja no código abaixo:

{% simplecode js %}
``` js
var foo = function (obj, a, b) {
  obj.bar = function () {
    return a + b
  }
  return obj
}
```
{% endsimplecode %}

A função {%c "bar"%} mantém uma referência para {%c "obj"%}, {%c "a"%} e {%c "b"%} mesmo que não utilize {%c "obj"%}. Uma vez que o próprio {%c "obj"%} também mantém uma referência para o *closure*, temos um ciclo de referências que impede o coletor de lixo de destruir esses objetos mesmo que não sejam mais acessíveis no código.

Para que isso não ocorra, é necessário primeiro destruir a referência para o *closure* na propriedade {%c "bar"%} do objeto — atribuindo {%c "null"%}, por exemplo —, quebrando referência circular possibilitando que o coletor de lixo possa se desfazer de ambos os objetos.

---
## Conclusão

Para que você utilize o potencial da linguagem ao máximo, é fundamental compreender *Closure*. É com ele que você consegue criar encapsulamento dos dados ou implementar um paradigma de programação baseada em eventos de forma simples e declarativa. Como já mencionado no início do texto: ele está presente em todo o JavaScript.

*Closure* é um daqueles conceitos curiosos que são paradoxalmente difíceis de compreender porque são simples demais. Mas uma vez que o programador se torne apto a utilizar ele a seu favor, soluções simples e mais diretas surgirão.

{% quote author:"Guy L. Steele" url:"https://www.dreamsongs.com/ObjectsHaveNotFailedNarr.html" %}
Uma das conclusões que nós chegamos foi que um objeto não precisa ser um primitivo conceito em uma linguagem de programação; um objeto e seu comportamento pode ser construído por meio de um pouco de valores e algumas boas e velhas expressões lambdas.
{% endquote %}