module.exports = [
    require('./consumers/preprocess'),
    require('./consumers/number'),
    require('./consumers/param'),
    require('./consumers/string'),
    require('./consumers/whitespace'),
    require('./consumers/separator'),
    require('./consumers/equal'),
    require('./consumers/multiline'),
    require('./consumers/singleline_comment'),
];