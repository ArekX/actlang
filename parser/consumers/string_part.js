module.exports = {
    match: () => true,
    get: () => {
        let stringPart = "";
        let escape = false;
        return {
            name: 'string_part',
            consume: (char, index, text) => {
                if (char === '\\') {
                    escape = true;
                    return true;
                }

                if (char === '$' && text[index + 1] === '{' && !escape) {
                    return false;
                }

                escape = false;
                stringPart += char;
                return true;
            },
            end: () => stringPart
        };
    }
};