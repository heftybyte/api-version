var methods = require('methods');
var cache = {};

function API(app, prefix) {
    this.app = app;
    this.prefix = prefix;
}

methods.forEach(function(method){
    API.prototype[method] = function(_route) {
        var args = Array.prototype.slice.call(arguments);
        args[0] = this.prefix + _route;
        return this.app[method].apply(this.app, args);
    };
});

module.exports = function expose(app, base, version) {
    var versionKey = base + (version ? '/' + version : '');
    cache[app] = cache[app] || {};
    cache[app][versionKey] = cache[app][versionKey] || new API(app, versionKey);
    return cache[app][versionKey];
};