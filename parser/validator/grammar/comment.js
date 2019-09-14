const {always} = require('../util');

module.exports = () => ({
    name: 'comment',
    value: always(['space', 'colon', 'eol'])
});