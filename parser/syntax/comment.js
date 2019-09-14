const {matchString} = require('../matchers');

module.exports = [
    {
        type: 'comment',
        begin: matchString('##'),
        end: matchString('##')
    },
    {
        type: 'comment',
        begin: matchString('#'),
        end: matchString('\n'),
        allowEof: true
    }
];