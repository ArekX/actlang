const resolveValue = require('../resolve_value');
const fs = require('fs');

module.exports = {
    context: 'get',
    action: 'file',
    syntax: '@string',
    getHandler: params => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on get:parent ${params.length}, required: 1`);
        }

        if (params.length === 0) {
            return {result: options.result};
        }

        const [fileName] = params;

        if (fileName.type !== "string" && fileName.type !== 'param') {
            throw new Error(`get:parent variable name must be a string. Got: ${fileName.type}`);
        }

        const result = await fileName.value(options);

        return { result: fs.readFileSync(result) };
    }
};