const {isString} = require('../matchers');

module.exports = () => [
    {
        type: 'space',
        syntax: {
            matchers: [
                {match: isString(' '), consume: true}
            ]
        },
        preGrammar: (_, items) => {
            for(let i = 0; i < items.length; i++) {
                if (items[i].type === 'space') {
                    items.splice(i, 1);
                }
            }

            return {success: true};
        }
    }
];