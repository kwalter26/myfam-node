var express = require('express');
var router  = express.Router();
var User = require('../../models/user');
var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images/' + req.user.id + '/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

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

        if (req.body.password && req.body.confirmPassword && (req.body.password == req.body.confirmPassword))
            user.updatePassword(password);

        user.save(function(err) {
            if (err)
                throw err;

            res.json(user);
        });
    });
});

router.post('/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});


module.exports = router;