const {isString} = require('../matchers');
const {nextMustBe} = require('../validators');

module.exports = () => [
    {
        type: 'pipe',
        syntax: {
            matchers: [
                {match: isString('|'), consume: true}
            ]
        },
        grammar: nextMustBe(["param", "string", "number", "group"])
    }
];