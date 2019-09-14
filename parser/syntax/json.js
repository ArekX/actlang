const {matchString, matchRegex} = require('../matchers');
const [preprocessor] = require('./preprocessor');

module.exports = [
    {
        type: "json",
        begin: matchString('@{'),
        end: matchString('}'),
        levelIncrease: matchString('{'),
        escape: matchString("\\"),
        addBegin: true,
        addEnd: true,
        ignoreSyntax: [preprocessor],
        subsyntax: () => [
            {
                type: "jsonpart",
                match: matchRegex(/[^\$]/),
                escape: matchString("\\")
            },
            preprocessor
        ]
    }
];