/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var weddingSchema = new Schema({
   'wedding'    : {type: Number},
   'name'	: {type: String},
   'passcode'	: {type: Number}
});

//Define model.
module.exports = mongoose.model('Wedding', weddingSchema);
