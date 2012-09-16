var mongoose = require('mongoose');
  var db = mongoose.connect('mongodb://localhost/test');
  var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
  UserSchema = new Schema({
  'title': { type: String, index: true },
  });
  var User = mongoose.model('user', UserSchema);
  var user = new User();
  user.title = "TEST TITLE";
  user.save();
