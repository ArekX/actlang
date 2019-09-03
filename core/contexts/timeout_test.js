module.exports = {
    context: 'timeout',
    action: 'test',
    getHandler: params => async options => {
        const values = await Promise.all(params.map(p => p.value(options)));
        console.log('Start ->', values, new Date());
        return await new Promise(r => {
            setTimeout(async () => {
                console.log('Finished test action ->', values, new Date());
                r({result: null});
            }, 2000);
        });
    }
};