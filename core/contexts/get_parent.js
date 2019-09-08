const resolveValue = require('../resolve_value');

module.exports = {
    context: 'get',
    action: 'parent',
    getHandler: params => async options => {
        if (params.length > 1) {
            throw new Error(`Invalid number of parameter on get:parent ${params.length}, required: <= 1`);
        }

        if (params.length === 0) {
            return {result: options.result};
        }

        const [variableName] = params;

        if (variableName.type !== "string" && variableName.type !== 'param') {
            throw new Error(`get:parent variable name must be a string. Got: ${variableName.type}`);
        }

        const result = await variableName.value(options);

        return { result: resolveValue(options.result, result, null) };
    }
};