const {isString, isNotString, isBetween, isAllTrue, isNotEndOfText, isEscaped} = require('../matchers');
const {nextMustBe, allowNextEnd} = require('../validators');
const {toSyntax} = require('../helpers');

module.exports = () => [
    {
        type: "json",
        syntax: {
            matchers: [
                {match: isString('@{'), consume: false, removeOnMatch: true},
                {match: isBetween(isString('{'), isNotString('}'), isString('}')), consume: true},
                {match: isString('}'), consume: false, removeOnMatch: true}
            ],
            subSyntax: () => toSyntax([
                require('./preprocessor'),
                () => ({
                    type: "jsonpart",
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
            ])
        },
        grammar: allowNextEnd(nextMustBe(['space']))
    },
];