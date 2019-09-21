const {fail, success} = require('./helpers');

const getType = (i, results)  => results[i] ? results[i].type : '';

const isType = (i, type, results) => {
    if (typeof type === "string") {
        return getType(i, results) === type;
    }
        
    return type.includes(getType(i, results));
};

const {curry} = require('./fp');

const nextMustBe = curry((next, _, i, results) => {
    const nextType = getType(i + 1, results);

    if (!next.includes(nextType)) {
        return fail(`Allowed next after "${getType(i, results)}" is "${next.join('", "')}", but got: "${nextType}".`, results[i].at);
    }

    return success();
});

const nextCannotBe = curry((except, state, i, results) => {
    const nextType = getType(i + 1, results);
    
    if (except.includes(nextType)) {
        return fail(`Everything except "${except.join('", "')}" is allowed, but got: "${nextType}".`);
    }

    return success();
});

const alwaysPass = () => () => success();

module.exports = {
    alwaysPass,
    nextMustBe,
    nextCannotBe
};