const {always} = require('../util');

module.exports = () => ({
    name: 'dot',
    value: always(['param'])
});