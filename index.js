'use stric';
/**
 * [Lexer include]
 * @type {Function}
 */
var Lexer = require("./libs/lexer.js");

/**
 * [Parser include]
 * @type {Function}
 */
var Parser = require("./libs/parser.js");

/**
 * [export jadeAtomic]
 * @param  {object} jade instance and path
 * @return {jade} instance
 */
module.exports = function(opt){
	
	// jade instance
	var jadeInstance = opt.jade || require('jade');
	
	// lexer logic
	Lexer(jadeInstance.Lexer);
	
	// parser logic
	Parser(jadeInstance.Parser, opt.basePath, opt.fileStructure);
	
	// return jade
	return opt.jade;
}