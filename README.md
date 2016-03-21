# Jade Atomic Design
jade-atomic es una extension para jade que nos permite incluir de manera dinamica componentes bajo el concepto de diseño atomico.

## install
````
npm install --save-dev jade-atomic
```

##usage
```js
var jade = require('jade');
var jadeAtomic = require('jade-atomic');

//join with jade
jadeAtomic({jade:jade,path:__dirname + '/[module]/[atomic]s/jade/[file].jade'});

//little example
var compiled = jade.compileFile(__dirname + '/home/index.jade');

console.log("it works!", compiled());
```
