const {isString, isNotString, isEscaped} = require('../matchers');
const {allowNextEnd, nextMustBe} = require('../validators');

module.exports = () => [
    {
        type: "string",
        syntax: {
            matchers: [
                {match: isString('"'), consume: false, levelUp: true},
                {match: isEscaped("\\", isNotString('"')), consume: true},
                {match: isString('"'), consume: false},
            ]
        },
        grammar: allowNextEnd(nextMustBe(['at', 'param', 'string', 'number', 'pipe', 'comma', 'group']))
    },
];