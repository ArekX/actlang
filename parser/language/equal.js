const {isString} = require('../matchers');
const {nextCannotBe, nextCannotBeEnd} = require('../validators');

module.exports = () => [
    {
        type: 'equal',
        syntax: {
            matchers: [
                {match: isString('='), consume: true, removeOnMatch: true},
            ]
        },
        grammar: nextCannotBeEnd(nextCannotBe(['equal']))
    }
];