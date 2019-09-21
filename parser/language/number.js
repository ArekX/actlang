const {isRegex} = require('../matchers');
const {nextMustBe} = require('../validators');

module.exports = () => [
    {
        type: "number",
        syntax: {
            matchers: [
                {match: isRegex(/[0-9\.]/), consume: true},
            ]
        },
        grammar: nextMustBe(['space'])
    },
];