const {always, success} = require('../util');

module.exports = (state) => ({
    name: 'string',
    value: (results, i) => {
        const validate = require('../index');
        const value = results[i].value;

        if (!value.success) {
            return value;
        }

        const result = validate(value.results, {
            start: () => ({
                type: 'start of string',
                state: success(['stringpart', 'preprocessor'])
            }),
            end: () => (success([])),
            grammar: {
                stringpart: always(['stringpart', 'preprocessor']),
                preprocessor: state.preprocessor
            }
        });

        if (!result.success) {
            return result;
        }

        return success(['space', 'colon', 'eol']);
    }
});