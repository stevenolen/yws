/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  , ObjectId = Schema.ObjectId;


//Schema Definitions
var Wedding = new Schema({
    uuid        : ObjectID
  , wedid       : { type: Number, index: true }
  , name        : String
});

var Photo = new Schema({
    uuid        : ObjectId
  , wedid       : Number
  , timestamp   : Date
});

//Define model.
mongoose.model('Wedding', Wedding);
mongoose.model('Photo', Photo);
