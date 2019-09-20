// const core = require('./core');



// const parse = require('./parser/parse');
// const res = parse(require('./parser/file_consumer'), `include file "./testera/\${get literal "hopachai"}"`);
// const res2 = parse(require('./parser/context_consumer'), `include file "./testera/\${get literal "hopachai"}"`);



// core.executeFile('source.act');

const parser = require('./parser');
const fs = require('fs');

const {inspect} = require('util');

// const text = `[1, ## test ##] @{"json": \${get value}, "data": true}`;
const text = fs.readFileSync('test.act').toString();
const result = parser.parse(text);

console.log(inspect(result, false, null, true));