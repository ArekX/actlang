const {isString, isNotString, isBetween: matchBetween} = require('../matchers');
const {nextMustBe} = require('../validators');
const {toSyntax} = require('../helpers');

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
        grammar: () => nextMustBe(['space', 'colon', 'eol'])
    },
];

module.exports = arraySyntax;