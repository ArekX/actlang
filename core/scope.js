const resolveValue = require('./resolve_value');

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

module.exports = () => new Scope();