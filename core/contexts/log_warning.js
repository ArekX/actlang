module.exports = {
    context: 'log',
    action: 'warning',
    getHandler: params => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on log:warning ${params.length}, required: 1`);
        }

        const [variableName] = params;

        if (variableName.type !== "string") {
            throw new Error(`log:warning message must be a string. Got: ${variableName.type}`);
        }

        const result = await variableName.value(options);
        process.stdout.write(" ".repeat(options.fullLevel) + "\x1b[33m" + result + "\x1b[0m\n");

        return {result: null};
    }
};