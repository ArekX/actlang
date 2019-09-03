const matcher = /[ \t]/;
const match = char => matcher.exec(char) !== null;

module.exports = {
    match,
    get: () => {
        let level = 0;

        return {
            name: 'indent',
            consume: char => {
                if (matcher.exec(char)) {
                    level++;
                    return true;
                }

                return false;
            },
            end: () => level
        };
    }
};