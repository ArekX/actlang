const {matchString} = require('../matchers');

module.exports = [
    {
        type: "array",
        begin: matchString('['),
        end: matchString(']'),
        levelIncrease: matchString('['),
        subsyntax: () => require('./index')
    },
];