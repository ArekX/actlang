const match = char => char === ':';

module.exports = {
    match,
    get: () => {
        return {
            name: 'multiline',
            consume: match,
            end: () => null
        };
    }
};