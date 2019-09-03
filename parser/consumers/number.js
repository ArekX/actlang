const numberMatch = /[0-9]/;

module.exports = {
    match: char => numberMatch.exec(char) !== null,
    get: () => {
        let number = "";
        let dot = false;
        return {
            name: 'number',
            consume: char => {
                if (!dot && char === '.') {
                    dot = true;
                } else if (!numberMatch.exec(char)) {
                    return false;
                }

                number += char;
                return true;
            },
            end: () => parseFloat(number)
        };
    }
};