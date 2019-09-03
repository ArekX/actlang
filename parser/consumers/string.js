module.exports = {
    match: char => char === '"',
    get: (_, startIndex) => {
        const parseString = require('../parse_string');

        let string = "";
        let ended = false;
        let escape = false;
        let countBrackets = false;
        let level = 0;

        return {
            name: 'string',
            consume: (char, index, text) => {

                if (!escape && char === "$" && text[index + 1] === '{') {
                    countBrackets = true;
                }

                if (countBrackets && char === '{') {
                    level++;
                }

                if (countBrackets && char === '}') {
                    level--;

                    if (level == 0) {
                        countBrackets = false;
                    }
                }

                if (index === startIndex) {
                    return true;
                }

                if (ended) {
                    return false;
                }

                if (char === '"' && !escape && !countBrackets) {
                    ended = true;
                }

                if (char === "\\") {
                    escape = true;
                    string += char;
                    return true;
                }
                
                if (char !== '"' || char === '"' && (escape || countBrackets)) {
                    string += char;
                }

                escape = false;
                return true;
            },
            end: () => parseString(string)
        };
    }
};