module.exports = (function() {
    const inject = require('./server/microdi/inject');

    var port = process.env.PORT || 8080;
    var env = process.env.NODE_ENV || 'development';

    console.log("env", env);
    if(env==='development'){
        global.console.debug = global.console.log;
    }

    var server = require('./server/server.js')(inject({
        port,
        env
    }));

    server.startServer(function() {
        console.log('Server listening on port ' + port);
    });

})();