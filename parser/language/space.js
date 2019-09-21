const {isString} = require('../matchers');
const {alwaysPass} = require('../validators');

module.exports = () => [
    {
        type: 'space',
        syntax: {
            matchers: [
                {match: isString(' '), consume: true}
            ]
        },
        grammar: alwaysPass()
    }
];