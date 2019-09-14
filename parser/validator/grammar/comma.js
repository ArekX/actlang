const {always} = require('../util');

module.exports = () => ({
    name: 'comma',
    value: always(['space', 'param'])
});