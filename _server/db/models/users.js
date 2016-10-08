var db = require('mongoose');
var Schema = db.Schema;

var UsersSchema = new Schema({
  
  email: { type: String, required: true, unique: true},
  password: String,
  created_on: { type: Date, default: Date.now },  
  first: { type: String, default:''},
  last: { type:String, default:'' },

});

var User = db.model('User', UsersSchema);

module.exports = User;
