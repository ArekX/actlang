const {matchString} = require('../matchers');

module.exports = [
    {
        type: "linefeed",
        match: matchString('\r')
    },
];