const {fail, success} = require('../util');

module.exports = (state) => ({
    name: 'eol',
    value: (results, i) => {
        if (state.paramCount === 1) {
            return fail("Action must always be defined after a context.", results[i]);
        }
        
        state.paramCount = 0;

        if (isType(results, i - 1, 'colon')) {
            if (!isType(results, i + 1, 'space')) {
                return fail("Statement must be indented after a colon.", results[i]);
            }
   
            let newLevel = results[i + 1].value.length;

            if (newLevel <= state.currentLevel) {
                return fail('First statement must be more indented than parent.', results[i]);
            }

            state.currentLevel = newLevel;
            return success(['param'], i + 2);
        }

        return success(['param', 'space', 'comment']);
    }
});