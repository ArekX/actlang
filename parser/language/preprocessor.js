const {isString, isNotString, isBetween} = require('../matchers');
const {nextMustBe, allowNextEnd, mustParseSubGrammar}= require('../validators');
const {toSyntax, toGrammar} = require('../../helpers');

module.exports = () => [
    {
        type: "preprocessor",
        syntax: {
            matchers: [
                {match: isString('${'), consume: false, removeOnMatch: true},
                {match: isBetween(isString('{'), isNotString('}'), isString('}')), consume: true},
                {match: isString('}'), consume: false, removeOnMatch: true}
            ],
            subSyntax: () => toSyntax(require('./index'))
        },
        grammar: mustParseSubGrammar(
            () => toGrammar(require('./index')), 
            allowNextEnd(nextMustBe(['space']))
        )
    },
];