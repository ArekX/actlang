const {always} = require('../util');

module.exports = () => ({
    name: 'equal',
    value: always(['space', 'colon', 'eol'])
});