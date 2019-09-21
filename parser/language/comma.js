const {isString} = require('../matchers');
const {nextCannotBe, nextCannotBeEnd} = require('../validators');

module.exports = () => [
    {
        type: 'comma',
        syntax: {
            matchers: [
                {match: isString(','), consume: true, removeOnMatch: true}
            ]
        },
        grammar: nextCannotBeEnd(nextCannotBe(['comma']))
    }
];