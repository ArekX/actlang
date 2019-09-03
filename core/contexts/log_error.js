module.exports = {
    context: 'log',
    action: 'error',
    getHandler: params => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on log:error ${params.length}, required: 1`);
        }

        const [variableName] = params;

        if (variableName.type !== "string") {
            throw new Error(`log:error message must be a string. Got: ${variableName.type}`);
        }

        const result = await variableName.value(options);
        process.stdout.write(" ".repeat(options.fullLevel) + "\x1b[31m" + result + "\x1b[0m\n");

        return {result: null};
    }
};