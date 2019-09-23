const parseAt = (results, i) => {
    let params = {};
    i++;

    let param = null;
    let paramValue = null;

    while(true) {
        let {type, value} = results[i] || {};

        if (param !== null && paramValue !== null) {
            params[param] = paramValue;
            param = null;
            paramValue = null;

            if (type !== 'comma') {
                i--;
                break;
            }

            i++;
        } else if (type === 'colon') {
            i++;
        } else if (param === null) {
            param = value;
            i++;
        } else if (paramValue === null) {
            paramValue = type === "number" ? parseFloat(value) : value;
            i++;
        }
    }

    return [params, i];
};

const parse = ({results}) => {
    results = results.filter(r => r.type !== 'space');

    let matchers = [];
    let matchType = null;
    let matchValue = null;
    let matchParams = null;
    let valueStack = [];

    for(let i = 0; i < results.length; i++) {
        let {type, value} = results[i];
        let newValue = null;
        let newType = null;
        
        if (type === 'group') {
            newType = 'group';
            newValue = parse(value);
        } else if (type === 'param') {
            newType = 'type';
            newValue = value;
        } else if (type === 'string') {
            newType = 'literal';
            newValue = value;
        } else if (type === 'number') {
            newValue = parseFloat(value);
            newType = 'literal';
        } else if (type === 'pipe') {
            valueStack.push({type: matchType, value: matchValue, modifiers: matchParams});
            matchParams = null;
            matchValue = null;
            matchType = null;
        } else if (type === 'at') {
            let [params, newI] = parseAt(results, i);
            matchParams = params;
            i = newI;
            continue;
        }

        if (matchValue) {

            if (valueStack.length > 0) {
                valueStack.push({type: matchType, value: matchValue, modifiers: matchParams});
                matchValue = valueStack;
                matchType = 'oneOf';
                matchParams = null;
            }

            matchers.push({
                type: matchType,
                value: valueStack.length > 0 ? valueStack : matchValue,
                modifiers: matchParams
            });

            matchType = null;
            matchValue = null;
            matchParams = null;
            valueStack = [];
        } 
     
        matchValue = newValue;
        matchType = newType;
    }

    
    if (matchValue) {
        
        if (valueStack.length > 0) {
            valueStack.push({type: matchType, value: matchValue, modifiers: matchParams});
            matchValue = valueStack;
            matchType = 'oneOf';
            matchParams = null;
        }

        matchers.push({
            type: matchType,
            value: matchValue,
            modifiers: matchParams
        });
    }

    return matchers;
};


module.exports = parse;