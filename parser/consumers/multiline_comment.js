module.exports = {
    match: (char, index, text) => char === '#' && text[index + 1] === '#',
    get: (_, startIndex) => {
        let endedComment = 0;
        let txt = "";

        return {
            name: 'comment',
            consume: (char, index, text) => {
                if (endedComment > 1) {
                    return false;
                }

                if (index === startIndex || index + 1 === startIndex) {
                    return true;
                }

                if (char === '#' && text[index + 1] === '#') {
                    endedComment++;
                    return true;
                }

                if (endedComment === 1 && char === '#') {
                    endedComment++;
                    return true;
                }

                txt += char;
  
                return true;
            },
            end: () => ({commentType: 'multiLine', txt})
        };
    }
};