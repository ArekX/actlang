const {isString, isNotString, isBetween: matchBetween} = require('../matchers');
const {nextMustBe, allowNextEnd, mustParseSubGrammar} = require('../validators');
const {toSyntax, toGrammar} = require('../../helpers');

const arraySyntax = () => [
    {
        type: "array",
        syntax: {
            matchers: [
                {match: isString('['), consume: false, removeOnMatch: true},
                {match: matchBetween(isString('['), isNotString(']'), isString(']')), consume: true},
                {match: isString(']'), consume: false, removeOnMatch: true}
            ],
            subSyntax: () => toSyntax([
                arraySyntax,
                require('./comment'),
                require('./number'),
                require('./preprocessor'),
                require('./string'),
                require('./space'),
                require('./comma')
            ]) 
        },
        grammar: mustParseSubGrammar(() => 
            toGrammar([
                arraySyntax,
                require('./comment'),
                require('./number'),
                require('./preprocessor'),
                require('./string'),
                require('./space'),
                require('./comma')
            ]),
            allowNextEnd(nextMustBe(['space', 'colon', 'eol']))
        )
    },
];

module.exports = arraySyntax;