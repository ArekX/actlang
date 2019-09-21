const {isString, isNotString, isBetween} = require('../matchers');
const {nextMustBe} = require('../validators');
const {toSyntax} = require('../helpers');

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
        grammar: nextMustBe(['space'])
    },
];