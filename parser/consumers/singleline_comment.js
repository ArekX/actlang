const matchers = [
    /#/, 
    /[^\n\r]/
];

module.exports = {
    match: (char, index, text) => char === '#' && text[index + 1] !== '#',
    get: () => {
        let index = 0;
        let txt = "";

        return {
            name: 'comment',
            eofAllowed: true,
            consume: (char) => {
                while(index < matchers.length) {
                    const match = matchers[index];

                    if (match.exec(char)) {
                        txt += char;
                        return true;
                    }

                    index++;
                }
  
                return false;
            },
            end: () => ({commentType: 'singleLine', txt})
        };
    }
};