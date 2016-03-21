'use strict';

/**
  * @name lexerAtomic
  * @author juanpablocs
  * @description instance Lexer from jade
  * @param jade.Lexer
  * @return {void}
  */
var lexerAtomic =  function(lexerInstance){

  /**
    * [lexerInstance] inheritance
    * @return {tok} send capture regex to jade.Parser
    */
  lexerInstance.prototype.atomicInclude = function(){
    var regexSyntaxCode = /^\+(atom|molecule|organism) ([a-z_]+)\/([a-z_]+)/;
    var captures = regexSyntaxCode.exec(this.input);

    if ( captures !== null) {
      this.consume(captures[0].length);
      var tok = this.tok('atomicInclude', captures);
      this.pipeless = false;
      this.buffer = true;
      return tok;
    }
  };

  /**
   * @description call supernext from jade 
   */
  var _superNext = lexerInstance.prototype.next;

  /**
   * @description if atomicInclude is null send next method
   * @return {Function}
   */
  lexerInstance.prototype.next = function(){
    return this.atomicInclude() || _superNext.call(this);
  };

};

module.exports = lexerAtomic;