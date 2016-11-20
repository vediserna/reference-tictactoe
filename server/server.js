function serverModule(injected) {

    var ENV = injected('env');
    var PORT = injected('port');

    const inject = require('./microdi/inject');
    const config = require('./config.js')[ENV];

    return {
        startServer: function(CALLBACK){

            var express = require('express'),
                session = require('express-session'),
                bodyParser = require('body-parser'),
                path = require('path'),
                fs = require('fs'),
                app = express(),
                server = app.listen(PORT, CALLBACK),
                cookieParser = require('cookie-parser')(config.sessionSecret),
                io = require('socket.io')(server);

            require('./client-tracker/client-tracker-api')(inject({io}));

            var sessionOpts = {
                secret: config.sessionSecret,
                resave: true,
                saveUninitialized: true
            };

            // Define where our static files will be fetched from:
            app.use(express.static(path.join(__dirname,'..', 'static')));

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(cookieParser);
            app.use(session(sessionOpts));

            // Tell Express where our server views (Jade files) are kept.
            // Then we can do render('NAME_OF_VIEW') inside an Express route request. e.g. render('index')
            app.set('views', path.join(__dirname, 'server/views'));
            app.set('view engine', 'jade');

            /*******************************************************************************************************************
             * ROUTE CONFIG *
             ****************/

            require('./http-routes/api')(
                inject({app})
            );

            app.get('/*', function (req, res) {
                // Render index and pass route handling to Angular
                res.sendFile(path.join(__dirname,'static','index.html'));
            });
        }
    }
};

module.exports=serverModule;