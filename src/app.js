/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , http = require('http');
var exphbs  = require('express3-handlebars');

var SocketsController = require('./controllers').sockets;

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

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
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes(app);

io.on('connection', function(socket){

    SocketsController.initSocket(io, socket);

});


console.log("Express server listening on port 3000");
