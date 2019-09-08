let evaluate = null;

module.exports = {
    context: 'evaluate',
    action: 'value',
    getHandler: params => async options => {

        if (evaluate === null) {
            evaluate = require('../evaluate');
        }

        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on include:file ${params.length}, required: 1`);
        }

        const [text] = params;

        if (text.type !== "string") {
            throw new Error(`include:file text must be a string. Got: ${text.type}`);
        }

        const result = await text.value(options);

        return {result: evaluate(result, options)};
    }
};