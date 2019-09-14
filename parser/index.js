module.exports = {
    parse: parse
};

function parse(syntax, text) {
    const results = [];
    let index = 0;
    let lineIndex = 1;
    let charIndex = 1;

    const updateIndex = newIndex => {
        while(index < newIndex) {
            if (text[index] === '\n') {
                lineIndex++;
                charIndex = 0;
            };
            charIndex++;
            index++;
        }
    };

    let consumers = [];
    while(index < text.length) {
        let matchedValue = findConsumers(syntax);

        if (matchedValue) {
            continue;
        }
        
        if (consumers.length === 0) {
            return {
                success: false,
                message: `Invalid or unexpected character: "${text[index]}" at ${lineIndex}:${charIndex} in "${text.substring(index, index + 50)}"`
            };
        }

        let ignored = [];
        while(consumers.length > 0) {
            const consumer = consumers[consumers.length - 1];
            let matched = "";

            if (index >= text.length) {

                if (consumer.allowEof) {
                    // TODO: Need full check here
                    saveResult(consumer, consumer.value, {line: consumer.line, char: conumser.char});
                    break;
                }

                return {
                    success: false,
                    message: "Reached end of file"
                };
            }

            if (consumer.escape && consumer.escape(text, index).length > 0) {
                consumer.value += text.substring(index, index + 2)
                updateIndex(index + 2);
                continue;
            }

            if (consumer.levelIncrease && consumer.levelIncrease(text, index).length > 0) {
                consumer.level++;
            }

            if (consumer.ignoreSyntax && findConsumers(consumer.ignoreSyntax, false)) {
                ignored.push(consumer);
                continue;
            }

            if ((matched = consumer.begin(text, index)).length > 0) {
                if (consumer.end(text, index).length === 0) {
                    consumer.level++;
                    consumer.value += matched;
                    updateIndex(index + matched.length);
                }
            }

            if ((matched = consumer.end(text, index)).length > 0) {
                updateIndex(index + matched.length);

                if (consumer.level > 0) {
                    consumer.level--;

                    if (consumer.level > 0) {
                        consumer.value += matched;
                        continue;
                    }
                }
                
                consumer.endValue = matched;
            
                if (ignored.length > 0) {
                    let item = ignored.pop();
                    item.value += consumer.startValue + consumer.value + consumer.endValue;
                } else {
                    let value = (consumer.addBegin ? consumer.startValue : '') + consumer.value + (consumer.addEnd ? consumer.endValue : '');

                    if (consumer.subsyntax) {
                        consumer.stringValue = consumer.value;
                        value = parse(consumer.subsyntax(consumer, text, index), value);
                    }

                    saveResult(consumer, value, {line: consumer.line, char: consumer.char});
                }

                consumers.pop();
                continue;
            }

            consumer.value += text[index];
            updateIndex(index + 1);
        }
    }

    return {
        success: true,
        results
    };

    function saveResult(consumer, value, {line, char}) {
        results.push({type: consumer.type, value, line, char});
    }
    
    function findConsumers(syntax, pushResult = true) {
        for(let item of syntax) {
            if (item.begin) {
                let match = item.begin(text, index);
    
                if (match.length > 0) {
                    consumers.push({
                        ...item, 
                        startValue: match, 
                        value: '', 
                        endValue: '', 
                        level: 1,
                        line: lineIndex,
                        char: charIndex
                    });
                    updateIndex(index + match.length);
                    return !pushResult;
                }
            }
    
            if (item.match) {
                let match = "";
                let result = "";
                let line = lineIndex;
                let char = charIndex;

                if (item.startMatch && item.startMatch(text, index).length === 0) {
                    continue;
                }

                while((match = item.match(text, index)).length > 0) {

                    if (item.matchLength && result.length === item.matchLength) {
                        break;
                    }

                    if (item.escape && item.escape(text, index).length > 0) {
                        result += text.substring(index, index + 2);
                        updateIndex(index + 2);
                        continue;
                    }

                    result += match;
                    updateIndex(index + match.length);

                    if (index >= text.length) {
                        break;
                    }
                }
                
                if (result.length > 0) {
                    if (pushResult) {
                        saveResult(item, result, {line, char});
                    }
                    return true;
                }

                if (index >= text.length) {
                    return false;
                }
            }
        }

        return false;
    }
}