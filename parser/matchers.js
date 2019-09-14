const matchString = string => (text, index) => text.substring(index, index + string.length) === string ? string : "";
const matchRegex = regex => (text, index) => regex.exec(text[index]) !== null ? text[index] : "";

module.exports = {
    matchString,
    matchRegex
}