/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var photoSchema = new Schema({
   'wedding'    : {type: String},
   'uuid'	: {type: String},
   'timestamp'	: {type: Date}
});

//Define model.
module.exports = mongoose.model('Photo', photoSchema);
