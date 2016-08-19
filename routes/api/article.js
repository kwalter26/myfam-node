var express = require('express');
var router  = express.Router();
var Article = require('../../models/article');

router.post('/',function(req,res,next){
  res.io.emit("postArticle", req.body.message);
  res.json({error:false});
});

module.exports = router;
