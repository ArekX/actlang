const languageParts = require('./language');
const parts = languageParts.reduce((result, syntax) => result.concat(syntax), []);

const {alwaysPass} = require('./validators');

const grammar = [];

for(let part of parts) {
    grammar.push({type: part.type, grammar: part.grammar || (() => alwaysPass())});
}

module.exports = grammar;