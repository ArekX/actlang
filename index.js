// const core = require('./core');



// const parse = require('./parser/parse');
// const res = parse(require('./parser/file_consumer'), `include file "./testera/\${get literal "hopachai"}"`);
// const res2 = parse(require('./parser/context_consumer'), `include file "./testera/\${get literal "hopachai"}"`);



// core.executeFile('source.act');

const parser = require('./parser');
const fs = require('fs');

const {inspect} = require('util');


// '(","@name:"comma",min:0 param|preprocessor)@min:1,max:*'
// '(("and" "wait" "on")@name:"and wait on" number "done")@min:0, max:1'
const text = `(comma@max:1 string|preprocessor)@min:1`;
// const text = fs.readFileSync('test.act').toString();

const ps = require('./p');

let result = parser.parseContextSyntax(text);
// console.log(result);
result = ps(result);

console.log(inspect(result, false, null, true));