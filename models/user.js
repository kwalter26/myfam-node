var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username:String,
  firstName:String,
  lastName:String,
  token:String,
  tokenExpire:Date,
  role: String,
  email:String,
  password:String,
  imgUrl:String,
  
});

userSchema.methods.updatePassword = function(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
