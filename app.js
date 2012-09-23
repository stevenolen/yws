/**
 * Module dependencies.
 */

var express = require('express')
//  , ejs = require('ejs')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

// connect to mongo when we initialize.
mongoose.connect('mongodb://localhost/yws');

// app configure stuff.
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);
  app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

io.set('log level', 2);

//uncaughtException handler
process.on('uncaughtException', function (err) {
	console.log('Caught Exception: ' + err);
});


//API handlers and router and shiz
var api = require('./controllers/api.js');
app.get('/', routes.index); //should probably go away.
app.post('/photo', api.photopost); //post API call (upload new photo)
app.get('/photo/:wedding', api.photoget); //get API call (grab photos) UNIMPLEMENTED
app.post('/wedding', api.weddingpost);
app.get('/display', routes.display);


//Set up IMAP connection
var email = require('./controllers/email.js');
	email.check();


//Emits new photo to all connected sockets
exports.socketsend = function (newphoto){
	io.sockets.json.send(newphoto);
};

