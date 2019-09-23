module.exports = {
    context: 'load',
    action: 'context',
    syntax: {
        type: 'repeat',
        value: [
            {
                type: 'all',
                value: [
                    {type: 'literal', value: [','], min: 0},
                    {type: 'type', value: ['param', 'string', 'preprocess']}
                ]
            }, 
        ],
        min: 1,
        max: null
    },
    getHandler: params => async options => {
        const modules = [];

        for (let {type, value} of params) {
            if (type === 'param' || type === 'string' || type === 'preprocess') {
                modules.push(await value(options));
            } else if (type === 'separator') {
                continue;
            } else {
                throw new Error(`Invalid type pased on load: ${type}, value: ${value}`);
            }
        }

        console.log('Load modules:', modules);
        return { result: null };
    }
};