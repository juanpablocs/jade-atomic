var jade = require('jade');
var jadeAtomic = require('./../index');

//join with jade
jadeAtomic({jade:jade,path:__dirname + '/[module]/[atomic]s/jade/[file].jade'});

//little example
var compiled = jade.compileFile(__dirname + '/home/index.jade');

console.log("it works!", compiled());
