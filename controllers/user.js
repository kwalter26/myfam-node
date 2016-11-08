var User = require('../models/user');
var cloud = require('./cloud')


module.exports = {
    newUser: function(username,password,role,callback){
        var newUser = new User();
        newUser.username = username;
        newUser.role = role;
        if(password) newUser.updatePassword(password);
        newUser.save(function(err) {
            if (err)
                throw err;
            cloud.newCloud(newUser.id);
            callback(newUser);
        });
    },
    getUsers: function(callback){
        User.find({},{
            __v:false,
            password:false,
            token:false,
            tokenExpire:false,
        },function(err,users){
            if(err){
                throw err;
            }
            if(!users){

            }
            callback(err,users)
        })
    },
    getUser: function(key,value,callback){
        User.findOne({[key]:[value]},{
            __v:false,
            password:false,
            token:false,
            tokenExpire:false,
        },function(err,user){
            if(err){
                throw err;
            }
            if(!user){

            }
            callback(err,user)
        })
    }
}