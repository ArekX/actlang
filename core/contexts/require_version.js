const resolveValue = require('../resolve_value');

module.exports = {
    context: 'require',
    action: 'version',
    getHandler: params => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on require:version ${params.length}, required: 1`);
        }

        const [variableName] = params;

        if (variableName.type !== "string" && variableName.type !== "number" && variableName.type !== 'param') {
            throw new Error(`require:version variable name must be a string, number or param. Got: ${variableName.type}`);
        }

        let result = parseInt(await variableName.value(options), 10);

        if (options.version !== result) {
            throw new Error(`This file requires version ${result} but version of the parser is ${options.version}`);
        }

        return { result };
    }
};