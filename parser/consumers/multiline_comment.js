const matchers = [
    /#/, /#/, /[^#]/, /#/
];

module.exports = {
    match: char => char === '#',
    get: () => {
        let index = 0;
        let txt = "";

        return {
            name: 'comment',
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
            end: () => {
                if (matchers.length != index) {
                    return null;
                } 

                return {commentType: 'multiLine', txt};
            }
        };
    }
};