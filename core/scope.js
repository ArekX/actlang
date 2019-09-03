class Scope {
    constructor(parent = null) {
        this.data = {};
        this.parent = parent;
    }

    get(name) {
        if (name in this.data) {
            return this.data[name];
        }

        if (this.parent) {
            return this.parent.get(name);
        }

        return resolveValue(this, name, null);
    }

    set(name, value) {
        if (this.parent) {
            let parentChecker = this.parent;

            while(parentChecker !== null && !parentChecker.hasSelf(name)) {
                parentChecker = parentChecker.parent;
            }

            if (parentChecker !== null) {
                parentChecker.set(name, value);
                return;
            }
        }

        this.data[name] = value;
    }

    setSelf(name, value) {
        this.data[name] = value;
    }

    getSelf(name) {
        if (name in this.data) {
            return this.data[name];
        }

        return resolveValue(this, name, null);
    }

    has(name) {
        if (this.hasSelf(name)) {
            return true;
        }

        if (this.parent && this.parent.has(name)) {
            return true;
        }

        return false;
    }

    hasSelf(name) {
        if (name in this.data) {
            return true;
        }

        let [first] = name.split('.');

        return first in this.data;
    }

    createChild() {
        return new Scope(this);
    }
}

function resolveValue(object, propName, defaultValue) {
    if (propName in object) {
        return object[propName];
    }

    let walker = object;

    varparts = propName.split('.');

    for(let i = 0; i < varparts.length - 1; i++) {
        if (!(varparts[i] in walker)) {
            return defaultValue;
        }

        walker = walker[varparts[i]];
    }

    let lastName = varparts[varparts.length - 1];

    if (typeof walker !== object || !(lastName in walker)) {
        return defaultValue;
    }

    return walker[lastName];
}

module.exports = () => new Scope();