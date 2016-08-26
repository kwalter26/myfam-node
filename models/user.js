var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username:String,
  firstName:String,
  lastName:String,
  token:String,
  tokenExpire:Date,
  local:{
    email:String,
    password:String
  }
});

userSchema.pre('save',function(next){
  var user = this;
  var SALT_FACTOR = 8;

  if(!user.isModified('password')) return next();
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
