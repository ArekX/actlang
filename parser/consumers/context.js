const contextChar = /[a-z]/;
const endOfContext = /[^\n\r]/;

module.exports = {
    match: char => contextChar.exec(char) !== null,
    get: () => {
        let context = "";
        return {
            name: 'context',
            eofAllowed: true,
            consume: char => {
                if (endOfContext.exec(char) === null) {
                    return false;
                }

                context += char;

                return true;
            },
            end: () => context
        };
    }
};