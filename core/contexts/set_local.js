module.exports = {
    context: 'set',
    action: 'local',
    getHandler: params => async options => {
        if (params.length !== 3) {
            throw new Error(`Invalid number of parameter on set:local ${params.length}, required: 3`);
        }

        const [variableName, equation, valueHandler] = params;

        const equationResult = equation.value(options);

        if (equation.type !== 'equal' && (equation.type === 'param' && equationResult !== 'to')) {
            throw new Error(`set:local equation must be either 'to' or '='.`);
        }

        let [nameResult, valueResult] = await Promise.all([
            variableName.value(options),
            valueHandler.value(options)
        ]);

        options.scope.setSelf(nameResult, valueResult);

        return { result: null };
    }
};