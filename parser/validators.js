const {getNext, getType, fail, success} = require('./helpers');
const {curry} = require('../fp');

const nextMustBe = curry((next, i, results) => {
    const nextType = getNext(i, results);

    if (next.includes(nextType)) {
        return fail(`Allowed next after "${getType(i, results)}" is "${next.join('", "')}", but got: "${nextType}".`);
    }

    return success();
});

const nextCannotBe = curry((except, i, results) => {
    const nextType = getNext(i, results);
    
    if (except.includes(nextType)) {
        return fail(`Everything except "${except.join('", "')}" is allowed, but got: "${nextType}".`);
    }

    return success();
});

const alwaysPass = () => success();

module.exports = {
    alwaysPass,
    nextMustBe,
    nextCannotBe
};