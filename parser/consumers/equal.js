const match = char => char === '=';

module.exports = {
    match,
    get: () => {
        return {
            name: 'equal',
            consume: match,
            end: () => null
        };
    }
};