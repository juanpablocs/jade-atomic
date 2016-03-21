# Jade Atomic Design
jade-atomic es una extension para jade que nos permite incluir de manera dinamica componentes bajo el concepto de diseño atomico.

## install
````
npm install --save-dev jade-atomic
```

##usage for jade
```
html
	+molecule all/head
	body
		+organism header
		p hello world
```

##usage
```js
var jade = require('jade');
var jadeAtomic = require('jade-atomic');

//setting for jadeAtomic
jadeAtomic({
	jade:jade,
	basePath:__dirname,
	fileStructure:'/[module]/[atomic]s/jade/[file].jade'
});

//little example
var compiled = jade.compileFile(__dirname + '/home/index.jade');

console.log("it works!", compiled());
```
