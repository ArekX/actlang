module.exports = {
    context: 'load',
    action: 'context',
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