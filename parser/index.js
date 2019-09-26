const parseSyntax = require('./parse_syntax');
const parseGrammar = require('./parse_grammar');
const languageParts = require('./language');
const contextLanguageParts = require('./context_language');
const {toSyntax, toGrammar} = require('../helpers');


const parse = (text, syntax, grammar) => {
    const syntaxResult = parseSyntax(text, syntax);

    if (!syntaxResult.success) {
        return syntaxResult;
    }

    const grammarResult = parseGrammar(syntaxResult.results, grammar);

    if (!grammarResult.success) {
        return grammarResult;
    }

    return syntaxResult;    
};

module.exports = {
    parse: text => parse(text, toSyntax(languageParts), toGrammar(languageParts)),
    parseContextSyntax: text => parse(text, toSyntax(contextLanguageParts), toGrammar(contextLanguageParts))
};