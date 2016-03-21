'use strict';

/**
  * @name parserAtomic
  * @author juanpablocs
  * @description parser instance from jade
  * @param  {object} jade.Parser
  * @param  {path} base path
  * @return {void}
  */
var parserAtomic =  function( parserInstance, xpath){
  /**
   * [fs include]
   * @type {object}
   */
  var fs = require('fs');

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

  /**
   * [parseIncludeAtomic] create new method for includeAtomic
   * @return {object} ast from jade parser
   */
  parserInstance.prototype.parseincludedAtomic = function(){
    var tok = this.expect('atomicInclude');
    var body = this.peek();
    var chunks = tok.val;
    
    // var path = xpath + '/pages/' + chunks[2] + '/' + chunks[1] + 's/jade/' + chunks[3] + '.jade';
    var path = xpath
                .replace('[module]',chunks[2])
                .replace('[atomic]',chunks[1])
                .replace('[file]', chunks[3]);
    
    var str = fs.readFileSync(path, 'utf8');

    var parser = new this.constructor(str, path, this.options);
    parser.dependencies = this.dependencies;

    parser.blocks = merge({}, this.blocks);
    parser.included = true;

    parser.mixins = this.mixins;

    this.context(parser);
    var ast = parser.parse();
    this.context();
    ast.filename = path;
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