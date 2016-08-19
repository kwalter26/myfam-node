var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  message: String
});

module.exports = mongoose.model('Article', articleSchema);
