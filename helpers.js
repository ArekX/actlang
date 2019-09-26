const success = () => ({success: true});
const successNext = (next, nextIndex = null) => ({success: true, next, nextIndex});
const fail = (message, at) => ({success: false, message, at: {line: at.line + 1, column: at.column + 1}});
const successResult = results => ({success: true, results});

module.exports = {
    success,
    successNext,
    fail,
    successResult,
    toSyntax: (parts, state = null) => parts
        .reduce((result, part) => result.concat(part(state)), [])
        .reduce((syntax, part) => syntax.push({type: part.type, ...part.syntax}) && syntax, []),
    toGrammar: (parts, state = null) => parts
        .reduce((result, part) => result.concat(part(state)), [])
        .reduce((grammar, part) => {
            grammar[part.type] = {
                grammar: part.grammar || success,
                preGrammar: part.preGrammar || success,
                postGrammar: part.postGrammar || success
            };
            return grammar;
        }, {})
};