const {matchString} = require('../matchers');

module.exports = [
    {
        type: "preprocessor",
        begin: matchString('${'),
        end: matchString('}'),
        levelIncrease: matchString('{'),
        subsyntax: () => require('./index')
    }
];