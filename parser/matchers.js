module.exports = {
    isString: string => scanner => scanner.matchesRight(string) ? [true, string] : [false, ""],
    isRegex: regex => scanner => regex.exec(scanner.char) !== null ? [true, scanner.char] : [false, ""],
    isNotString: string => scanner => scanner.matchesRight(string) ? [false, ""] : [true, scanner.char],
    isNotRegex: regex => scanner => regex.exec(scanner.char) !== null ? [false, ""] : [true, scanner.char],
    alwaysFalse: () => () => [false, ""],
    isNotEndOfText: () => scanner => [!scanner.endOfText, ""],
    isAllTrue: (...matchers) => scanner => {
        let lastMatch = "";

        for(let matcher of matchers) {
            let [result, match] = matcher(scanner);

            if (!result) {
                return [false, ""];
            }

            lastMatch = match;
        }

        return [true, lastMatch];
    },
    isBetween: (beginMatch, betweenMatch, endMatch) => {
        let level = 0;
        return scanner => {
            let [result] = beginMatch(scanner);
    
            if (result) {
                level++;
                return  [true, scanner.char];
            }
    
            [result] = endMatch(scanner);
    
            if (result) {
                level--;
                if (level >= 0) {
                    return [true, scanner.char];
                }
            }
    
            return betweenMatch(scanner);
        };
    },
    isEscaped: (escapeChar, match, returnEscaped = null) => scanner => {
        let [result, matched] = match(scanner);
    
        if (!result && scanner.matchesLeft(escapeChar)) {
            return [true, returnEscaped ? returnEscaped : scanner.char];
        }
    
        return [result, matched];
    }
};