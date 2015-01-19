var http = require('http'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    websocket  = require('ws'),
    path = require('path'),
    routes = require('./routes/routes'),
    socketsController = require('./controllers').sockets;

var app = express();

var WebSocketServer = websocket.Server;

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);

var io = require('socket.io')(server);

//var wss = new WebSocketServer({server: server});

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
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

routes(app);

io.on('connection', function(socket){
    console.log("CONNECT!!");
});

console.log("Express server listening on port " + (process.env.PORT || 3000));
