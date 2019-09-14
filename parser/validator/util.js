const always = next => () => ({success: true, next});
const getType = (results, i)  => results[i] ? results[i].type : '';
const isType = (results, i, type)  => typeof type === "string" ? getType(results, i) === type : type.includes(getType(results, i));

const success = (next, nextIndex = null) => ({success: true, next, nextIndex});
const fail = (message, result) => ({success: false, message, at: {line: result.line, char: result.char}});

module.exports = {
    always,
    getType,
    isType,
    success,
    fail
};