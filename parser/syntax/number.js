const {matchRegex} = require('../matchers');

module.exports = [
    {
        type: "number",
        startMatch: matchRegex(/[0-9]/),
        match: matchRegex(/[0-9\.]/)
    },
];