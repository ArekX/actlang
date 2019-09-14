const {matchString} = require('../matchers');

module.exports = [
    {
        type: "eol",
        match: matchString('\n')
    },
];