function serverModule(injected) {

    var ENV = injected('env');
    var PORT = injected('port');

    const config = require('./config.js')[ENV];

    const Express = require('express');
    const Session = require('express-session');
    const BodyParser = require('body-parser');
    const Path = require('path');
    const SocketIo = require('socket.io');
    const Postgres = require('./db/postgres');

    const ChatAppContext = require('./socket-app/chat-app-context');

    return {
        startServer: function(CALLBACK){

            console.log("Starting server");

            const CookieParser = require('cookie-parser');
            var app = Express();

            var sessionOpts = {
                secret: config.sessionSecret,
                resave: true,
                saveUninitialized: true
            };

            var dbPool = Postgres(inject({})).pool;

            // Define where our static files will be fetched from:
            app.use(Express.static(Path.join(__dirname, '..', 'static')));

            app.use(BodyParser.json());
            app.use(BodyParser.urlencoded({ extended: true }));

            var cookieParser = CookieParser(config.sessionSecret);
            app.use(cookieParser);

            app.use(Session(sessionOpts));

            require('./http-routes/api')(
                inject({app})
            );

            app.get('/*', function (req, res) {
                // Render index.html in all cases and pass route handling to react
                res.sendFile(Path.join(__dirname,'static','index.html'));
            });

            var server = app.listen(PORT, CALLBACK);
            var io = SocketIo(server);

          //  SocketSessionManager(inject({io}));
            console.debug("Setting up chat app context");
            ChatAppContext(inject({io}));
            console.debug("Done setting up context");

        }
    }
};

module.exports=serverModule;