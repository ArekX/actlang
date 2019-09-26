const {isString} = require('../matchers');
const {nextMustBe, getAt} = require('../validators');
const {fail} = require('../../helpers');

module.exports = () => [
    {
        type: 'eol',
        syntax: {
            matchers: [
                {match: isString('\n'), consume: true, removeOnMatch: true},
            ]
        },
        grammar: (state, i, results) => {

            if (!state.context) {
                return fail(`Instruction start with a context in a line.`, getAt(results[i]));
            }

            if (!state.action) {
                return fail(`Every context must have a action defined.`, state.context.at);
            }

            state.context = null;
            state.action = null;

            return nextMustBe(['space', 'param', 'eol'], state, i, results);
        }
    }
];