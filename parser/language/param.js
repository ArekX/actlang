const {isRegex, isAllTrue, isNotEndOfText} = require('../matchers');
const {nextCannotBe} = require('../validators');

module.exports = () => [
    {
        type: "param",
        syntax: {
            matchers: [
                {match: isRegex(/[a-z]/), consume: true, removeOnMatch: true},
                {match: isAllTrue(isNotEndOfText(), isRegex(/[a-zA-Z0-9_]/)), consume: true},
            ]
        },
        grammar: nextCannotBe(['param'])
    },
];