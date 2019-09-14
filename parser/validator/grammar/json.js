const {always, success, fail} = require('../util');

module.exports = (state) => ({
    name: 'json',
    value: (results, i) => {
        const validate = require('../index');
        const value = results[i].value;

        if (!value.success) {
            return value;
        }

        const result = validate(value.results, {
            start: () => ({
                type: 'start of json',
                state: success(['jsonpart', 'preprocessor'])
            }),
            end: () => (success([])),
            grammar: {
                jsonpart: always(['jsonpart', 'preprocessor']),
                preprocessor: state.preprocessor
            }
        });

        if (!result.success) {
            return fail(result.message, results[i]);
        }

        return success(['space', 'colon', 'eol']);
    }
});