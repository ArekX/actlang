const {isString} = require('../matchers');
const {matchNext, getAt} = require('../validators');
const {success, fail} = require('../../helpers');

module.exports = () => [
    {
        type: 'comma',
        syntax: {
            matchers: [
                {match: isString(','), consume: true, removeOnMatch: true}
            ]
        },
        grammar: (_, i, results) => {
            const result = matchNext(1, [
                    ['comma'],
                    ['space', 'comma'],
                ],
                i + 1,
                results
            );

            if (result.success) {
                return fail(`Comma cannot be set after a comma.`, getAt(i, results));
            }

            return success();
        }
    }
];