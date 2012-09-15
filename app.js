/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();
var db = mongoose.connect('mongodb://localhost/yws');

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

/*var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Wedding = new Schema({
    uuid	: ObjectID
  , wedid	: Number
  , name	: String
});

var Photo = new Schema({
    uuid	: ObjectId
  , wedid	: Number
  , timestamp	: Date
});

var PhotoModel = mongoose.model('Photo', 
*/
app.get('/', routes.index);
app.post('/api/photo', api.photo);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
