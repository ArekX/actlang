const syntax = [
    require('./comment'),
    require('./string'),
    require('./space'),
    require('./eol'),
    require('./linefeed'),
    require('./array'),
    require('./json'),
    require('./preprocessor'),
    require('./param'),
    require('./number'),
    require('./comma'),
    require('./dot'),
    require('./equal'),
    require('./colon'),
].reduce((syntax, group) => syntax.concat(group), []);

module.exports = syntax;