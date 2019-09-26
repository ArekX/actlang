const {isRegex, isAllTrue, isNotEndOfText} = require('../matchers');
const {nextCannotBe, getType, isType, getAt} = require('../validators');
const {fail, success} = require('../../helpers');

module.exports = () => [
    {
        type: "param",
        syntax: {
            matchers: [
                {match: isRegex(/[a-z]/), consume: true, removeOnMatch: true},
                {match: isAllTrue(isNotEndOfText(), isRegex(/[a-zA-Z0-9_]/)), consume: true},
            ]
        },
        preGrammar: (_, results) => {
            const skip = ['space', 'eol'];
            const mustMatch = ['param'];

            for(let i = 0; i < results.length; i++) {
                const type = getType(i, results);

                if (skip.includes(type)) {
                    continue;
                }

                if (!mustMatch.includes(type)) {
                    return fail(`Program must start with ${mustMatch.join(',')}, but got: ${type}.`, getAt(i, results));
                }

                return success();
            }
            
            return success();
        },
        postGrammar: (state, results) => {
            if (state.context && !state.action) {
                return fail(
                    `Every context must have a action defined, but reached end without action found.`, 
                    getAt(results.length - 1, results)
                );
            }

            return success();
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