/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/api/photo', api.photo);
//app.post('/api/photo', function(req, res) {
//	var serverPath = '/images/' + req.files.photo.name;
//
//	require('fs').rename(
//	  req.files.photo.path,
//	  './public' + serverPath,
//	  function(error) {
//		if(error) {
//		  res.send({
//			error: 'Welp. Something went wrong'
//		  });
//		  return;
//		}
//		res.send({
//		  path: serverPath
//		});
//	}
//	);
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
