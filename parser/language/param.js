const {isRegex, isAllTrue, isNotEndOfText} = require('../matchers');
const {nextCannotBe, isType, getAt} = require('../validators');
const {fail} = require('../helpers');

module.exports = () => [
    {
        type: "param",
        syntax: {
            matchers: [
                {match: isRegex(/[a-z]/), consume: true, removeOnMatch: true},
                {match: isAllTrue(isNotEndOfText(), isRegex(/[a-zA-Z0-9_]/)), consume: true},
            ]
        },
        grammar: (state, i, results) => {
            if (!state.context) {
                state.context = results[i];
                let contextLevel = 0;

                if (isType(i - 1, 'space', results)) {
                    contextLevel = results[i - 1].value.length;
                }

                if (state.validateIndent) {
                    if (contextLevel <= state.contextLevel) {
                        return fail(`Child instruction must be more indented than parent.`, getAt(i, results));
                    }
                    state.validateIndent = false;
                }

                state.contextLevel = contextLevel;
            } else if (state.context && !state.action) {
                state.action = results[i];
            }

            return nextCannotBe(['param'], state, i, results);
        }
    },
];