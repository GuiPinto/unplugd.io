var http = require('http'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    websocket  = require('ws'),
    routes = require('./routes/routes');

var app = express();

var WebSocketServer = websocket.Server;

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);

var wss = new WebSocketServer({server: server});

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

wss.on('connection', function(ws) {
  var id = setInterval(function() {
    var dataToSend = JSON.stringify(new Date());
    console.log('sending ', dataToSend, 'to', id);
    ws.send(dataToSend, function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
});

console.log("Express server listening on port " + (process.env.PORT || 3000));
