module.exports = {
    context: 'get',
    action: 'local',
    getHandler: params => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on get:local ${params.length}, required: 1`);
        }

        const [variableName] = params;

        if (variableName.type !== "string" && variableName.type !== 'param') {
            throw new Error(`get:local variable name must be a string. Got: ${variableName.type}`);
        }

        const result = await variableName.value(options);

        if (options.scope.has(result)) {
            return { result: options.scope.get(result) };
        }

        throw new Error(`Undefined variable: ${result}`);
    }
};