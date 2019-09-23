const {isString} = require('../matchers');
const {nextMustBe, allowNextEnd} = require('../validators');

module.exports = () => [
    {
        type: 'any',
        syntax: {
            matchers: [
                {match: isString('*'), consume: true}
            ]
        },
        grammar: allowNextEnd(nextMustBe(['colon']))
    }
];