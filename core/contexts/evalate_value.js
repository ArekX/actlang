let executeFile = null;
const fs = require('fs');

module.exports = {
    context: 'evaluate',
    action: 'value',
    getHandler: params => async options => {

        if (executeFile === null) {
            executeFile = require('../execute_file');
        }

        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on include:file ${params.length}, required: 1`);
        }

        const [fileName] = params;

        if (fileName.type !== "string") {
            throw new Error(`include:file Filename must be a string. Got: ${fileName.type}`);
        }

        const result = await fileName.value(options);

        if (!fs.existsSync(result)) {
            throw new Error(`File not found at path: ${result}`)
        }

        return {result: executeFile(result, options)};
    }
};