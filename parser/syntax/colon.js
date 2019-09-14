const {matchString} = require('../matchers');

module.exports = [
    {
        type: "colon",
        match: matchString(':'),
        matchLength: 1
    }
];