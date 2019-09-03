module.exports = {
    context: 'set',
    action: 'global',
    getHandler: params => async options => {
        if (params.length !== 3) {
            throw new Error(`Invalid number of parameter on set:global ${params.length}, required: 3`);
        }

        const [variableName, equation, valueHandler] = params;

        const equationResult = equation.value(options);

        if (equation.type !== 'equal' && (equation.type === 'param' && equationResult !== 'to')) {
            throw new Error(`set:global equation must be either 'to' or '='.`);
        }

        let [nameResult, valueResult] = await Promise.all([
            variableName.value(options),
            valueHandler.value(options)
        ]);

        options.rootScope.set(nameResult, valueResult);

        return {result: null};
    }
};