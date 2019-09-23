const parseContextSyntax = syntax => {
    const parts = syntax.replace(/\s{2,}/g, ' ').split(' ');
    const results = [];

    for(let part of parts) {
        let type = 'literal';
        let value = part;
        let min = 1;
        let max = 1;
        let name = '';

        if (part.includes(':')) {
            let [paramName, subPart] = part.split(':');
            part = value = subPart;
            name = paramName;
        }

        if (part.includes('$')) {
            let [left, quantifier] = part.split('$');
            part = value = left;

            [min, max] = quantifier.split(',').map(i => parseInt(i, 10));

            if (max === undefined) {
                max = null;
            }
        }

        if (part[0] === '@') {
            type = 'type',
            value = part.substring(1);
        }

        if (value !== '*') {
            value = value.split('|');
        } else {
            type = 'anytype';
        }

        results.push({type, name, value, min, max});
    }

    return results;
};

console.log(parseContextSyntax(`subname:param paramName:@string|item$0,13 *$5`))

module.exports = parseContextSyntax;