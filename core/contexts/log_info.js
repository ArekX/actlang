module.exports = {
    context: 'log',
    action: 'info',
    getHandler: params => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on log:info ${params.length}, required: 1`);
        }

        const [variableName] = params;

        if (variableName.type !== "string") {
            throw new Error(`log:info message must be a string. Got: ${variableName.type}`);
        }

        const result = await variableName.value(options);
        process.stdout.write(" ".repeat(options.fullLevel) + result + "\n");

        return {result: null};
    }
};