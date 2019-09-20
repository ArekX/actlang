const {nextMustBe} = require('../validators');
const {isString} = require('../matchers');

module.exports = () => [
    {
        type: 'colon',
        syntax: {
            matchers: [
                {match: isString(':'), consume: true, removeOnMatch: true}
            ]
        },
        grammar: () => nextMustBe(['eol'])
    }
];