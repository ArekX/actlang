module.exports = {
    context: 'get',
    action: 'literal',
    getHandler: (params) => async options => {
        if (params.length !== 1) {
            throw new Error(`Invalid number of parameter on get:literal ${params.length}, required: 1`);
        }

        const [literal] = params;

        if (literal.type !== "string" && literal.type !== 'number') {
            throw new Error(`get:literal's literal must be either a string or a number. Got: ${literal.type}`);
        }

        return { result: await literal.value(options) };
    }
};