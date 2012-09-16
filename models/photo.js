/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  ,Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;

var photoSchema = new Schema({
   'wedid'       : {type: String},
   'path'	: {type: String}
});

//Define model.
module.exports = mongoose.model('Photo', photoSchema);
