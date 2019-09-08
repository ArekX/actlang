const conversions = {
    json: (value) => {
        try {
            return JSON.parse(value);
        } catch {
            return {};
        }
    },
};

function convertValue(value, toType) {
    if (!(toType in conversions)) {
        throw new Error(`Unsupported conversion type: ${toType}`);
    }

    return conversions[toType](value);
}

module.exports = {
    context: 'convert',
    action: 'value',
    getHandler: params => async options => {
        if (params.length !== 3) {
            throw new Error(`Invalid number of parameter on convert:value ${params.length}, required: 3`);
        }

        const [value, as, type] = params;

        const [
            valueResult,
            asResult,
            typeResult
        ] = await Promise.all([
            value.value(options),
            as.value(options),
            type.value(options)
        ]);

        if (asResult !== 'as') {
            throw new Error(`Invalid mapper keyword. Must be 'as', got ${asResult}`);
        }

        return { result: convertValue(valueResult, typeResult) };
    }
};