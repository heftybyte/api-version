api methods
====

Wrapper for express routing methods to help with versioning apis


##Usage
```javascript
var apim = require('api-methods');
var app = express();
var api = apim.version(app, '/api', 'v1');
var api2 = apim.version(app, '/api', 'v2');

api.get('/user', function(){

});

api.post('/user', function(){

});

api2.get('/user', function(){

});
```

Since the routes were added using api instead of app, the routes turn out to be

```
/api/v1/user
```

and

```
/api/v2/user
```
