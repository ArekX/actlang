module.exports = {
    context: 'get',
    action: 'global',
    getHandler: params => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on get:global ${params.length}, required: 1`);
        }

        const [variableName] = params;

        if (variableName.type !== "string" && variableName.type !== 'param') {
            throw new Error(`get:global variable name must be a string. Got: ${variableName.type}`);
        }

        const result = await variableName.value(options);

        if (options.scope.has(result)) {
            return { result: options.scope.get(result) };
        }

        throw new Error(`Undefined variable: ${result}`);
    }
};