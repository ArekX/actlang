const {nextMustBe, matchNext} = require('../validators');
const {isString} = require('../matchers');

module.exports = () => [
    {
        type: 'colon',
        syntax: {
            matchers: [
                {match: isString(':'), consume: true, removeOnMatch: true}
            ]
        },
        grammar: (state, i, results) => {
            if (state.context && !state.action) {
                return nextMustBe(['param'], state, i, results);
            }

            state.validateIndent = true;

            if (state.context && state.action) {
                return matchNext(i, [
                    ['space', 'eol'],
                    ['eol']
                ], i + 1, results);
            }

            return nextMustBe(['eol'], state, i, results);
        }
    }
];