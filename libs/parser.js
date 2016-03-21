'use strict';

/**
  * @name parserAtomic
  * @author juanpablocs
  * @description parser instance from jade
  * @param  {object} jade.Parser
  * @param  {path} base path
  * @return {void}
  */
var parserAtomic =  function( parserInstance, basepath, filestructure){
  /**
   * [fs include]
   * @type {object}
   */
  var fs = require('fs');
  var path = require('path');

  /**
   * [_superParseExpr inheritance]
   * @type {object}
   */
  var _superParseExpr = parserInstance.prototype.parseExpr;

  /**
   * [merge function]
   * @param  {a}
   * @param  {b}
   * @return {object}
   */
  var merge = function(a, b) {
    for (var key in b) a[key] = b[key];
    return a;
  };

  var generateNameModule = function(context,arr){
    if(arr.length==2)
      return arr[0];
    
    var m = context.filename.match(/^(?:.*?)\/(.*?)\/(?:.*?)\.jade/);
    if(!m.length)
      throw new Error('not name module find');

    return m[1];
  }
  var generateNameFile = function(arr){
    if(arr.length==2)
      return arr[1];
    return arr[0];
  }

  /**
   * [parseIncludeAtomic] create new method for includeAtomic
   * @return {object} ast from jade parser
   */
  parserInstance.prototype.parseincludedAtomic = function(){
    var tok     = this.expect('atomicInclude');
    var body    = this.peek();
    var chunks  = tok.val;
    var xpath   = basepath + filestructure;
    var atomic  = chunks[1];
    var names   = chunks[2].split('/');
    var file    = xpath
                  .replace('[module]',generateNameModule(this,names))
                  .replace('[atomic]',atomic)
                  .replace('[file]', generateNameFile(names));
    
    var str = fs.readFileSync(file, 'utf8');

    var parser = new this.constructor(str, file, this.options);
    parser.dependencies = this.dependencies;

    parser.blocks = merge({}, this.blocks);
    parser.included = true;

    parser.mixins = this.mixins;

    this.context(parser);
    var ast = parser.parse();
    this.context();
    ast.filename = file;
    return ast;
  };

  parserInstance.prototype.parseExpr = function(){
    if ( this.peek().type == "atomicInclude") {
      return this.parseincludedAtomic();
    } else {
      return _superParseExpr.call(this);
    };
  };
};

module.exports = parserAtomic;