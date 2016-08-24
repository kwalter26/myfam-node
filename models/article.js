var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title:  String,
  body: String,
  image: String,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);
