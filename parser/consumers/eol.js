const matcher = /[\n\r]/;
const match = char => matcher.exec(char) !== null;

module.exports = {
    match,
    get: () => {
        return {
            name: 'eol',
            consume: match,
            end: () => null
        };
    }
};