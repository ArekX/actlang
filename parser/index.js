const parseSyntax = require('./parse_syntax');
const languageParts = require('./language');
const {toSyntax} = require('./helpers');


const parse = (text, syntax) => {
    const syntaxResult = parseSyntax(text, syntax);


    return syntaxResult;    
};

module.exports = {
    parse: text => parse(text, toSyntax(languageParts))
};