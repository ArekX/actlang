const evaluate = require('./evaluate');
const fs = require('fs');

module.exports = async (fileName, prevOptions = null) => await evaluate(
    fs.readFileSync(fileName).toString(), 
    prevOptions
);