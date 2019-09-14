// const core = require('./core');



// const parse = require('./parser/parse');
// const res = parse(require('./parser/file_consumer'), `include file "./testera/\${get literal "hopachai"}"`);
// const res2 = parse(require('./parser/context_consumer'), `include file "./testera/\${get literal "hopachai"}"`);



// core.executeFile('source.act');

const parser = require('./parser');
const fs = require('fs');
const syntax = require('./parser/syntax');

const result = parser.parse(syntax, fs.readFileSync('include.deploy').toString());

const validate = require('./parser/validator');
const getConfig = require('./parser/validator/grammar');
const lexResult = validate(result.results, getConfig());

console.log(result.results);
console.log(lexResult);