const {always} = require('../util');

module.exports = () => ({
    name: 'array',
    value: always(['space', 'colon', 'eol'])
});