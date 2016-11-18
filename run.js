module.exports = (function() {
    console.debug = console.log;

    var port = process.env.PORT || 8080;
    var server = require('./server.js');

    server.startServer(port, null, function() {
        console.log('Server listening on port ' + port);
    });


})();