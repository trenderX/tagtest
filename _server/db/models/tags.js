var db = require('mongoose');
var Schema = db.Schema;

var TagsSchema = new Schema({
  value: { type: String, unique: true },
});

var Tag = db.model('Tag', TagsSchema);

module.exports = Tag;
