const {fail} = require('./util');

const validate = (results, {grammar, start, end}) => {
    let index = 0;
    let {type, state} = start(results);

    while(index < results.length) {
        let result = results[index];

        if (state !== null && !state.next.includes(result.type)) {
            return fail(
                `Syntax error. Expected "${state.next.join('", "')}" after "${type}", but got "${result.type}"`,
                result
            );
        }
        
        state = grammar[result.type](results, index);

        if (!state.success) {
           return state;
        }

        type = index >= 1 ? results[index - 1].type : "";
        index = state !== null && state.nextIndex ? state.nextIndex : index + 1;
    }

    return end(results);
};

module.exports = validate;