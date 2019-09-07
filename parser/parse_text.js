
const parse = require('./parse');
const consumer = require('./text_consumer');

module.exports = text => parse(consumer, text);