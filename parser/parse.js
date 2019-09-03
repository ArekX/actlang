module.exports = (consumers, text) => {
    const instructions = [];

    let line = 1;
    let charCounter = 1;
    let i = 0;
    let char = text[i];
    let consumerLine = 1;
    let consumer = null;

    const increasePosition = () => {
        i++;
        charCounter++;

        if (consumer !== null && !consumer.eofAllowed && i > text.length) {
            throw new Error('Consuming reached end of text. Invalid syntax for consumer: ' + consumer.name);
        }

        char = text[i];

        if (char === '\n' || char === '\r') {
            line++;
            charCounter = 1;
        }
    };

    while(i < text.length) {
        consumer = null;
        let consumed = false;

        for(let {match, get} of consumers) {
            if (match(char, i, text)) {
                consumer = get(char, i, text);
                consumerLine = line;
                break;
            }
        }

        if (consumer) {
            const {name, consume, end} = consumer;

            while(i < text.length && consume(char, i, text)) {
                increasePosition();
            }

            instructions.push({
                type: name,
                line: consumerLine,
                value: end()
            });
            consumed = true;
            consumer = null;
        }

        if (!consumed) {
            throw new Error(`Syntax error. Cannot match character: "${char}" at ${line}:${charCounter}`);
        }
    }

    return instructions;
};