const {matchString, matchRegex} = require('../matchers');
const [preprocessor] = require('./preprocessor');

const getParser = quote => ({
    type: "string",
    begin: matchString(quote),
    end: matchString(quote),
    escape: matchString("\\"),
    ignoreSyntax: [preprocessor],
    subsyntax: () => [
        {
            type: "stringpart",
            match: matchRegex(/[^\$]/),
            escape: matchString("\\")
        },
        preprocessor
    ]
});

module.exports = [
    getParser('"'),
    getParser("'"),
];