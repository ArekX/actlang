const {matchString} = require('../matchers');

module.exports = [
    {
        type: "dot",
        match: matchString('.'),
        matchLength: 1
    },
];