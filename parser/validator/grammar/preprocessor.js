const {success} = require('../util');

module.exports = (state) => ({
    name: 'preprocessor',
    value: (results, i) => {
        const result = state.validateSubGrammar(results[i].value);

        if (!result.success) {
            return result;
        }

        return success(['space', 'colon', 'eol', 'stringpart', 'jsonpart']);
    }
});