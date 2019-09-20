const {fail, successResult} = require('./helpers');
const Scanner = require('./scanner');

const parse = (text, syntax) => {
    const scanner = new Scanner(text);
    const results = [];
    const state = {
        syntax
    };

    while(!scanner.endOfText) {
        let consumer = null;

        for(let token of syntax) {
            let [{match: firstMatcher}] = token.matchers;
            
            let [result] = firstMatcher(scanner);

            if (result) {
                consumer = [token, [...token.matchers]];
                break;
            }
        }

        if (consumer === null) {
            return fail(`Invalid character "${scanner.char}" found. ${text}`, scanner.at);
        }

        let [token, matchers] = consumer;

        let at = scanner.at;
        let matchedText = "";

        while(matchers.length > 0) {
            const [matcher] = matchers;

            let [result, matched] = matcher.match(scanner);
            
            if (result) {
                if (matcher.consume) {
                    matchedText += matched;
                }

                if (scanner.endOfText) {
                    break;
                }

                scanner.move(matched ? matched.length : 1);
                
                if (matcher.removeOnMatch) {
                    matchers.shift();
                }
                continue;
            }

            matchers.shift();
        }

        if (matchers.length > 0) {
            return fail(`Reached end of text trying to match "${token.type}"`, at);
        }

        if (!token.remove) {
            results.push({
                type: token.type, 
                ...at, 
                value: token.subSyntax ? parse(matchedText, token.subSyntax(state)): matchedText
            });
        }

        consumer = null;
    }    

    return successResult(results);
};

module.exports = parse;