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
        grammar: (state, i, results) => {
            state.context = null;
            state.action = null;

            return nextMustBe(['space', 'param', 'eol'], state, i, results);
        }
    }
];