module.exports = (object, propName, defaultValue) => {
    if (propName in object) {
        return object[propName];
    }

    let walker = object;

    let varparts = propName.split('.');

    for(let i = 0; i < varparts.length - 1; i++) {
        if (typeof walker !== "object" || !(varparts[i] in walker)) {
            return defaultValue;
        }

        walker = walker[varparts[i]];
    }

    let lastName = varparts[varparts.length - 1];

    if (typeof walker !== "object" || !(lastName in walker)) {
        return defaultValue;
    }

    return walker[lastName];
};