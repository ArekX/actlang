const core = require('./core');


// const util = require('util')
// const parse = require('./parser/parse');
// const res = parse(require('./parser/file_consumer'), `include file "./testera/\${get literal "hopachai"}"`);
// const res2 = parse(require('./parser/context_consumer'), `include file "./testera/\${get literal "hopachai"}"`);

// console.log(util.inspect(res2, {showHidden: false, depth: null}))

core.executeFile('c.deploy');