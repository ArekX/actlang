const paramChar = /[a-zA-Z_-]/;
const fullParamChar = /[a-zA-Z0-9_\.-]/;

module.exports = {
    match: char => paramChar.exec(char) !== null,
    get: () => {
        let param = "";

        return {
            name: 'param',
            consume: char => {
                if (fullParamChar.exec(char)) {
                    param += char;
                    return true;
                }

                return false;
            },
            end: () => param
        };
    }
};