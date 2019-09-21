const {fail, success} = require('./helpers');

const parse = (items, grammar) => {
    const state = {};

    console.log('grammar', items.map(i => i.type), Object.keys(grammar).length);
    
    for(let i = 0; i < items.length; i++) {
        const {type, at, value} = items[i];
        let validate = grammar[type];

        if (!validate) {
            return fail(`No grammar validation defined for ${type}`, at);
        }

        const result = validate(state, i, items);

        if (!result.success) {
            return result;
        }

        if (result.subGrammar) {
            const subResult = parse(value.results, result.subGrammar);

            if (!subResult.success) {
                return fail(`[Nested parsing fail ${subResult.message}]`, at);
            }
        }
    }

    return success();
};

module.exports = parse;