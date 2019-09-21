module.exports = {
    curry: f => function c(...a) { return a.length < f.length ? c.bind(f, ...a) : f(...a); }
};