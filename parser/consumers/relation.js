const matcher = /[<>!]/;
const match = char => matcher.exec(char) !== null;

module.exports = {
    match,
    get: () => {
        return {
            name: 'relation',
            consume: match,
            end: () => null
        };
    }
};