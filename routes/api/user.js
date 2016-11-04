var express = require('express');
var router  = express.Router();
var fs = require('fs');
var User = require('../../models/user');

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './tmp/uploads' });


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

router.post('/',function(req,res){
    
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

router.post('/:key/:value',function(req,res){
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

        if(req.body.firstName) user.firstName = req.body.firstName;
        if(req.body.lastName) user.lastName = req.body.lastName;
        if(req.body.email) user.email = req.body.email;
        if(req.body.primaryPhone) user.primaryPhone = req.body.primaryPhone;
        if(req.body.secondaryPhone) user.secondaryPhone = req.body.secondaryPhone;
        if(req.body.imgUrl) user.imgUrl = req.body.imgUrl;

        if (req.body.password && req.body.confirmPassword && (req.body.password == req.body.confirmPassword))
            user.updatePassword(password);

        user.save(function(err) {
            if (err)
                throw err;

            res.json(user);
        });
    });
});

router.post('/upload/',multipartyMiddleware,function(req,res){

    console.log(req.body, req.files);
    console.log(req.user.id)
    fs.rename(req.files.file.path,'./public/uploads/'  + req.user.id + '/'+ req.files.file.name);

    User.findOne({_id:req.user.id},{
         __v:false,
        password:false,
        token:false,
        tokenExpire:false,
    },function(err,user){
        if(err){
            throw err;
        }
        if(!user){
            res.json({error:'User not found'})
        }
        user.imgUrl = '/uploads/'  + req.user.id + '/'+ req.files.file.name;
        user.save(function(err) {
            if (err)
                throw err;
            res.json(user.imgUrl);
        });
    });   


});


module.exports = router;