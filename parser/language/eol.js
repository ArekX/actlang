const {isString} = require('../matchers');
const {nextMustBe} = require('../validators');

module.exports = () => [
    {
        type: 'eol',
        syntax: {
            matchers: [
                {match: isString('\n'), consume: true, removeOnMatch: true},
            ]
        },
        grammar: () => nextMustBe(['space', 'param'])
    }
];