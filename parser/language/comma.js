const {isString} = require('../matchers');
const {nextCannotBe} = require('../validators');

module.exports = () => [
    {
        type: 'comma',
        syntax: {
            matchers: [
                {match: isString(','), consume: true, removeOnMatch: true}
            ]
        },
        grammar: nextCannotBe(['comma'])
    }
];