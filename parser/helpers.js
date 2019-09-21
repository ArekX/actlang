const success = () => ({success: true});
const successNext = (next, nextIndex = null) => ({success: true, next, nextIndex});
const fail = (message, at) => ({success: false, message, at});
const successResult = results => ({success: true, results});

module.exports = {
    success,
    successNext,
    fail,
    successResult,
    toSyntax: (parts, state = null) => parts
        .reduce((result, syntax) => result.concat(syntax(state)), [])
        .reduce((syntax, part) => syntax.push({type: part.type, ...part.syntax}) && syntax, []),
    toGrammar: (parts, state = null) => parts
        .reduce((result, grammar) => result.concat(grammar(state)), [])
        .reduce((grammar, part) => {
            grammar[part.type] = part.grammar || (() => success);
            return grammar;
        }, {})
};