const {isRegex} = require('../matchers');
const {nextMustBe, allowNextEnd, getAt} = require('../validators');
const {fail} = require('../helpers');

const numberRegex = /^[0-9]+(\.[0-9]+)?$/;

module.exports = () => [
    {
        type: "number",
        syntax: {
            matchers: [
                {match: isRegex(/[0-9\.]/), consume: true},
            ]
        },
        grammar: (state, i, results) => {
            if (numberRegex.exec(results[i].value) === null) {
                return fail(`Invalid number format: ${results[i].value}`, getAt(i, results));
            }

            return allowNextEnd(nextMustBe(['comma', 'param', 'number', 'pipe', 'string', 'at', 'group']))(state, i, results);
        }
    },
];