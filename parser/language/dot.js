const {isString} = require('../matchers');
const {nextMustBe} = require('../validators');

module.exports = () => [
    {
        type: 'dot',
        syntax: {
            matchers: [
                {match: isString('.'), consume: true, removeOnMatch: true},
            ]
        },
        grammar: nextMustBe(['param', "string", "preprocessor"])
    }
];