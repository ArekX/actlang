const {fail, success} = require('./helpers');

const getType = (i, results)  => results[i] ? results[i].type : '';

const getAt = (i, results) => results[i] ? results[i].at : {line: "unknown", column: "unknown"};

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

const nextCannotBe = curry((except, _, i, results) => {
    const nextType = getType(i + 1, results);
    
    if (except.includes(nextType)) {
        return fail(`Everything except "${except.join('", "')}" is allowed, but got: "${nextType}".`, results[i].at);
    }

    return success();
});

const matchNext = (startIndex, matches, i, results) => {
    const startItem = results[startIndex];
    const expected = [];
    for(let match of matches) {
        let start = i;
        let allFound = true;
        for(let type of match) {
            if (!isType(start, type, results)) {
                allFound = false;
                expected.push(`"${match.join('","')}"`)
                break;
            }
            start++;
        }

        if (allFound) {
            return success();
        }
    }

    return fail(`Expected one of (${expected.join(" or ")}) after "${startItem.type}", but nothing matched.`, startItem.at);
};

const allowNextEnd = (matcher) => (state, i, results) => i + 1 < results.length ? matcher(state, i, results) : success();

const nextCannotBeEnd = matcher => 
        (state, i, results) => 
            i + 1 < results.length ? matcher(state, results, i) : fail(`Unexpected end of text after "${getType(i, results)}".`, getAt(i, results));

const alwaysPass = () => () => success();

const mustParseSubGrammar = (subgrammar, matcher) => (state, i, results) => {
    const result = matcher(state, i, results);
    result.subGrammar = subgrammar();
    return result;
};

module.exports = {
    alwaysPass,
    nextMustBe,
    matchNext,
    allowNextEnd,
    nextCannotBeEnd,
    mustParseSubGrammar,
    isType,
    getType,
    getAt,
    nextCannotBe
};