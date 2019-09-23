const {isString} = require('../matchers');
const {nextMustBe} = require('../validators');

module.exports = () => [
    {
        type: 'colon',
        syntax: {
            matchers: [
                {match: isString(':'), consume: true, removeOnMatch: true}
            ]
        },
        grammar: nextMustBe(['string', 'number'])
    }
];