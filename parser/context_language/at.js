const {isString} = require('../matchers');
const {nextMustBe} = require('../validators');

module.exports = () => [
    {
        type: 'at',
        syntax: {
            matchers: [
                {match: isString('@'), consume: true}
            ]
        },
        grammar: nextMustBe(['param'])
    }
];