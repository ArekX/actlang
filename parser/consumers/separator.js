const match = char => char === ',';

module.exports = {
    match,
    get: () => {
        return {
            name: 'separator',
            consume: match,
            end: () => null
        };
    }
};