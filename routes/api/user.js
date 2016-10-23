var express = require('express');
var router  = express.Router();
var User = require('../../models/user');

router.get('/',function(req,res){
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
        res.json(users);
    })
});

router.get('/:key/:value',function(req,res){
    User.findOne({[req.params.key]:req.params.value},{
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
        res.json(user);
    });
});


module.exports = router;