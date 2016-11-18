module.exports.startServer = function(PORT, PATH, CALLBACK) {
    var ENV = process.env.NODE_ENV || 'prod'; // Assume production env. for safety

    var config = require('./server/config.js')[ENV];

    var inject = require('./server/microdi/inject');

    var express = require('express'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        path = require('path'),
        fs = require('fs'),
        app = express(),
        server = app.listen(PORT, CALLBACK),
        cookieParser = require('cookie-parser')(config.sessionSecret),
        io = require('socket.io')(server);

    console.debug("Socket io loaded");

    var numClients=0;

    io.on('connection', function(socket){
        console.debug("New user #" + (numClients++) + "  has joined");
        socket.emit('announcements', {message : "A new user has joined"});

        io.emit('stats', { numClients: numClients});

        socket.on('event', function(data) {
            console.log('A client sent us this dumb message:', data.message);
        });

        socket.on('disconnect', ()=>{
            numClients--;
            io.emit('stats', { numClients: numClients});

            console.log("Connected clients: "  +numClients);
        })

    });
    /*******************************************************************************************************************
     * MONGOOSE CONFIG *
     *******************/

/*
     var connect = function() {
        var db = config.db;
        var conn = 'mongodb://' + db.username + ':' + db.password + '@' + db.host;
        (ENV === 'dev') ? mongoose.connect(db.host, db.name) : mongoose.connect(conn);
    };
    connect();

    mongoose.connection.on('error', function (err) {
        console.log(err);
    });

    if(ENV === 'prod') {
        mongoose.connection.on('disconnected', function () {
            connect();
        });
    }
*/


/*
    var models = __dirname + '/app/models';
    fs.readdirSync(models).forEach(function (model) {
        if (model.indexOf('.js') > -1) {
            require(models + '/' + model);
        }
    });
*/

    /*******************************************************************************************************************
     * EXPRESS CONFIG *
     ******************/

    var sessionOpts = {
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true
//        store: sessionStore
    };

    // Define where our static files will be fetched from:
    app.use(express.static(path.join(__dirname, 'public')));

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

    require('./server/routes/api')(
        inject({app})
    );

    app.get('/*', function (req, res) {
        // Render index and pass route handling to Angular
        res.render('index');
    });

    app.all('/*', function(req, res) {
        // Client is lost... render error page!
        res.render('error');
    });
};