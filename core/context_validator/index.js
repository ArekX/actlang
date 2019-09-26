const parse = require('./parse');
const {success, fail} = require('../../helpers');

function validateParams(params, syntax) {
    let groups = typeof syntax === "string" ? parse(syntax) : {success: true, results: syntax};

    if (!groups.success) {
        return groups;
    }

    return groups;
    console.log('groups', groups);    

    // TODO: Perform validation.

    return success();
};

module.exports = validateParams;