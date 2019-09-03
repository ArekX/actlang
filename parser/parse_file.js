
const parse = require('./parse');
const fs = require('fs');
const consumer = require('./file_consumer');

module.exports = fileName => parse(consumer, fs.readFileSync(fileName).toString());