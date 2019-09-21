const {isString, isNotString, isEscaped, isAllTrue, isNotEndOfText} = require('../matchers');
const {nextMustBe} = require('../validators');
const {toSyntax} = require('../helpers');

const subSyntax = () => toSyntax([
    require('./preprocessor'),
    () => ({
        type: "stringpart",
        syntax: {
            matchers: [
                {
                    match: isAllTrue(
                        isNotEndOfText(), 
                        isEscaped("\\", isNotString('$'))
                    ), 
                    consume: true
                },
            ]
        }
    })
]);

const grammar = nextMustBe(['space']);

module.exports = () => [
    {
        type: "string",
        syntax: {
            matchers: [
                {match: isString('"'), consume: false, levelUp: true},
                {match: isEscaped("\\", isNotString('"')), consume: true},
                {match: isString('"'), consume: false},
            ],
            subSyntax
        },
        grammar
    },
    {
        type: "string",
        syntax: {
            matchers: [
                {match: isString("'"), consume: false, levelUp: true},
                {match: isEscaped("\\", isNotString("'")), consume: true},
                {match: isString("'"), consume: false},
            ],
            subSyntax
        },
        grammar
    },
];