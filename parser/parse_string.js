
const parse = require('./parse');
const consumer = require('./string_consumer');

module.exports = contextLine => parse(consumer, contextLine);
