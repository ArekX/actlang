const {isRegex} = require('../matchers');

module.exports = () => [
    {
        type: "number",
        syntax: {
            matchers: [
                {match: isRegex(/[0-9\.]/), consume: true},
            ]
        },
        grammar: () => nextMustBe(['space'])
    },
];