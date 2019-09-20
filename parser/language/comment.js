const {isString, isNotString, isAllTrue, isNotEndOfText} = require('../matchers');

module.exports = () => [
    {
        type: "multi-comment",
        syntax: {
            remove: true,
            matchers: [
                {match: isString('##'), consume: true},
                {match: isNotString('##'), consume: true},
                {match: isString('##'), consume: true}
            ],
        }
    },
    {
        type: "single-comment",
        syntax: {
            remove: true,
            matchers: [
                {match: isString('#'), consume: true},
                {match: isAllTrue(isNotEndOfText(), isNotString('\n')), consume: true},
            ],
        }
    },
];