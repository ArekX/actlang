const {matchRegex} = require('../matchers');

module.exports = [
    {
        type: "param",
        startMatch: matchRegex(/[a-z]/),
        match: matchRegex(/[a-zA-Z0-9_]/)
    },
];