const parser = require('../../parser');
const {successResult} = require('../../helpers');

function convertToGroups(result) {
    if (!result.success) {
        return result;
    }

    const groups = result.results;
    groups = groups.filter(r => r.type !== 'space');

    let matchers = [];
    let match = getNewMatch();

    for(let i = 0; i < groups.length; i++) {
        let {type, value} = groups[i];
        let newValue = null;
        let newType = null;
        
        if (type === 'group') {
            newType = 'group';

            if (!value.results.success) {
                return value.results;
            }

            newValue = convertToGroups(value.results);
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
            match.pipe.push({type: matchType, value: matchValue, modifiers: matchParams});
            match = getNewMatch(match.pipe);
        } else if (type === 'at') {
            i = parseModifiers(groups, i, match);
            continue;
        }

        if (match.value) {
            addMatch(match, matchers);
            match = getNewMatch();
        } 
     
        match.value = newValue;
        match.type = newType;
    }

    
    if (match.value) {
        addMatch(match, matchers);
    }

    return successResult(matchers);
};

function getNewMatch(pipe = []) {
    return { type: null, value: null, modifiers: null, pipe };
}

function addMatch({pipe, type, value, modifiers}, matchers) {
    if (pipe.length > 0) {
        pipe.push({ type, value, modifiers });
        value = pipe;
        type = 'oneOf';
        modifiers = null;
    }

    matchers.push({ type, value, modifiers });
}

function parseModifiers(results, index, match) {
    let modifiers = {};
    index++;

    let param = null;
    let paramValue = null;

    while(true) {
        let {type, value} = results[index] || {};

        if (param !== null && paramValue !== null) {
            modifiers[param] = paramValue;
            param = null;
            paramValue = null;

            if (type !== 'comma') {
                index--;
                break;
            }
        } else if (param === null) {
            param = value;
        } else if (paramValue === null) {
            paramValue = type === "number" ? parseFloat(value) : value;
        } else {
            continue;
        }

        index++;
    }

    match.modifiers = modifiers;
}

function parse(syntax) {
    if (typeof syntax !== "string") {
        return successResult(syntax);
    }

    const result = parser.parseContextSyntax(syntax);
    return result.success ? successResult(convertToGroups(result.results)) : result;
}

module.exports = parse;