const {always} = require('../util');

module.exports = () => ({
    name: 'number',
    value: always(['space', 'colon', 'eol'])
});