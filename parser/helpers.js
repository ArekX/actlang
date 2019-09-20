const success = () => ({success: true});
const successNext = (next, nextIndex = null) => ({success: true, next, nextIndex});
const fail = (message, at) => ({success: false, message, at});
const successResult = results => ({success: true, results});

const getType = (i, results)  => results[i] ? results[i].type : '';

const isType = (i, type, results) => {
    if (typeof type === "string") {
        return getType(i, results) === type;
    }
        
    return type.includes(getType(i, results));
};


module.exports = {
    success,
    successNext,
    fail,
    successResult,
    getType,
    getNext: (i, results) => getType(i + 1, results),
    getPrevious: (i, results) => getType(i - 1, results),
    isType,
    isNextType: (i, type, results) => isType(i + 1, type, results),
    isPreviousType: (i, type, results) => isType(i - 1, type, results),
    toSyntax: (parts, state = null) => parts
        .reduce((result, syntax) => result.concat(syntax(state)), [])
        .reduce((syntax, part) => syntax.push({type: part.type, ...part.syntax}) && syntax, [])
};