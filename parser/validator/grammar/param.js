const {isType, fail, success} = require('../util');

module.exports = state => ({
    name: 'param',
    value: (results, i) => {
        if (state.paramCount === 1 && !isType(results, i - 1, ['space', 'colon'])) {
            return fail('Action can only be preceeded by a space or a colon.', state.contextResult);
        }

        if (state.paramCount === 0) {
            state.contextResult = results[i];
        }

        state.paramCount++;

        return success(['space', 'colon', 'eol', 'dot', 'comma']);
    }
});