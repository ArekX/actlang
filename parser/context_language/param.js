const {isRegex, isAllTrue, isNotEndOfText} = require('../matchers');
const {nextMustBe, allowNextEnd} = require('../validators');

module.exports = () => [
    {
        type: "param",
        syntax: {
            matchers: [
                {match: isRegex(/[a-z]/), consume: true, removeOnMatch: true},
                {match: isAllTrue(isNotEndOfText(), isRegex(/[a-zA-Z0-9_]/)), consume: true},
            ]
        },
        grammar: allowNextEnd(nextMustBe(['at', 'param', 'string', 'number', 'colon', 'pipe']))
    },
];