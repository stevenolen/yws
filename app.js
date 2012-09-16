/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var db = mongoose.connect('mongodb://localhost/yws');

//Schema Definitions
var Wedding = new Schema({
    uuid        : ObjectId
  , wedid       : { type: Number, index: true }
  , name        : String
});

var Photo = new Schema({
    uuid        : ObjectId
  , wedid       : Number
  , path	: String
  , timestamp   : Date
});

//Define model.
var WeddingModel = db.model('Wedding', Wedding);
var PhotoModel = db.model('Photo', Photo);


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

app.get('/', routes.index);
app.post('/api/photo', api.photo);
app.post('/api/wedding', function(req, res){
        var wedding = new WeddingModel();
        wedding.wedid = 0001;
        wedding.name = 'Nolen/Marchant';
        wedding.save(function(err) {
          console.log('error check');
          if(err) { throw err; }
          console.log('saved');
          db.disconnect();
}
);
});
app.get('/api/wedding', function(req, res){
	WeddingModel.find().all(function(wedding) {
	res.end(JSONstringify(wedding));
	});

});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
