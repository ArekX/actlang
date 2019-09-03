const contexts = require('./contexts');

const processString = instruction => {
    const values = [];
    while(instruction.length > 0) {
        let {type, value} = instruction.shift();

        if (type === 'string_part') {
            values.push(() => ({ result: value }));
        } else if (type === 'preprocess') {
            values.push(processInstruction(value));
        }
    }

    return async options => {
        let string = "";
        for(let value of values) {
            const { result } = await value(options);
            string += result;
        }

        return string;
    };
};

const processInstruction = instruction => {
    let context = null;
    let action = null;
    let params = [];

    while(instruction.length > 0) {
        let {type, value} = instruction.shift();

        if (type === 'whitespace' || type === 'comment') {
            continue;
        }

        if (type === 'param') {
            if (context === null) {
                context = value;
                continue;
            } else if (action === null) {
                action = value;
                continue;
            }
        }

        if (type === 'preprocess') {
            value = processInstruction(value);
        } else if (type === 'string') {
            value = processString(value);
        } else if (typeof value !== "function") {
            let oldValue = value;
            value = () => oldValue;
        }
  
        params.push({type, value});
    }

    const contextHandler = contexts.find(c => c.context === context && c.action === action);

    if (contextHandler === undefined) {
        throw new Error(`Handler for "${context}" and action "${action}" not found.`);
    }

    return contextHandler.getHandler(params);
};

module.exports = processInstruction;