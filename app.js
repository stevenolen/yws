/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

// connect to mongo when we initialize.
mongoose.connect('mongodb://localhost/yws');

// app configure stuff.
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir: __dirname + '/public/photos', keepExtensions: true}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//API handlers and router and shiz
var api = require('./controllers/api.js');
app.get('/', routes.index); //should probably go away.
app.post('/photo', api.photopost); //post API call (upload new photo)
app.get('/photo/:wedding', api.photoget); //get API call (grab photos) UNIMPLEMENTED
app.post('/wedding', api.weddingpost);
app.get('/montage', routes.montage);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
