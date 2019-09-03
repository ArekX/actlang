
const parse = require('./parse');
const consumer = require('./context_consumer');

module.exports = contextLine => parse(consumer, contextLine);
