const {fail, success} = require('../util');

module.exports = (state) => ({
    name: 'colon',
    value: (results, i) => {
        let {paramCount} = state;
        
        if (paramCount === 1 && isType(results, i - 1, 'param') && !isType(results, i + 1, 'param')) {
            return fail('Colon can only be at the end of a statement or between context and action.', results[i]);
        }

        if (paramCount === 1 && isType(results, i - 1, 'param') && isType(results, i + 1, 'param')) {
            return success(['param']);
        }

        return success(['eol', 'space']);
    }
});