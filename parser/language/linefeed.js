const {isString} = require('../matchers');

module.exports = () => [
    {
        type: 'linefeed',
        remove: true,
        syntax: {
            matchers: [
                {match: isString('\r'), consume: false},
            ]
        }
    }
];