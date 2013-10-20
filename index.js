var methods = require('methods');
var cache = [];

function API(app, base, version) {
    this.app = app;
    this.prefix = base + (version ? '/' + version : '');
}

methods.forEach(function(method){
    API.prototype[method] = function(_route) {
        var args = Array.prototype.slice.call(arguments);
        args[0] = this.prefix + _route;
        return this.app[method].apply(this.app, args);
    };
});

function get(argsObject) {
    var cached = cache.filter(function(args){
        return args.a === argsObject.a && args.b === argsObject.b && args.v === argsObject.v;
    })[0];
    return cached ? cached.api : false;
}

function store(argsObject) {
    cache.push(argsObject);
}

function version(app, base, version) {
    var args = {a:app, b:base, v:version};
    var api = get(args);

    if (!api) {
      api = new API(app, base, version);
      args.api = api;
      store(args);
    }

    return api;
}

exports.version = version;