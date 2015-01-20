var http = require('http'),
    mongoose = require('mongoose'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    path = require('path'),
    routes = require('./routes/routes'),
    mainController = require('./controllers').main;

var app = express();

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);

var io = require('socket.io')(server);

// MongoDB Connection
var mongoURI =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/unplugd';
mongoose.connect(mongoURI, function (err, res) {
    if (err) {
        console.log ('MongoDB error connecting to: ' + mongoURI + '. ', err);
    } else {
        console.log ('MongoDB succeeded connecting to: ' + mongoURI + '. ');
    }
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express["static"](path.join(__dirname, '../static')));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

routes(app, io);

io.on('connection', function(socket){
    mainController.initSocket(io, socket);
});

console.log("Express server listening on port " + (process.env.PORT || 3000));

