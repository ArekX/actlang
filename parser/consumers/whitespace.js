const match = char => char === ' ';

module.exports = {
    match,
    get: () => {
        return {
            name: 'whitespace',
            consume: match,
            end: () => null
        };
    }
};