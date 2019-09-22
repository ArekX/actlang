const {fail, success} = require('./helpers');

const parse = (items, grammar, prevState = null) => {
    const state = {};

    for(let [_, {preGrammar: preValidate}] of Object.entries(grammar)) {
        const result = preValidate(state, items);
        if (!result.success) {
            return result;
        }
    }

    for(let i = 0; i < items.length; i++) {
        const {type, at, value} = items[i];
        let {grammar: validate} = grammar[type];

        if (!validate) {
            return fail(`No grammar validation defined for ${type}`, at);
        }

        const result = validate(state, i, items, prevState);

        if (!result.success) {
            return result;
        }

        if (result.subGrammar) {
            const subResult = parse(value.results, result.subGrammar, state);

            if (!subResult.success) {
                return subResult;
            }
        }
    }

    for(let [_, {postGrammar: postValidate}] of Object.entries(grammar)) {
        const result = postValidate(state, items);
        if (!result.success) {
            return result;
        }
    }

    return success();
};

module.exports = parse;