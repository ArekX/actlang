

module.exports = {
    match: (char, index, text) => char === '$' && text[index + 1] === '{',
    get: (_, startIndex) => {
        const parseContext = require('../parse_context');
        let preprocess = "";
        let ended = false;
        let level = 0;

        return {
            name: 'preprocess',
            consume: (char, index) => {
                if (startIndex === index) {
                    return true;
                }

                if (ended) {
                    return false;
                }

                if (char === '{') {
                    level++;

                    if (level === 1) {
                        return true;
                    }
                }

                if (char === '}') {
                    level--;
                    ended = level === 0;

                    if (level === 0) {
                        return true;
                    }
                }

                preprocess += char;
                return true;
            },
            end: () => parseContext(preprocess)
        };
    }
};