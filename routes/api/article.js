var express = require('express');
var router  = express.Router();
var Article = require('../../models/article');

router.post('/',function(req,res,next){

  var article = req.body;

  save(article,req.user._id,function(err){
    if(!err){
      res.json({
        success:true,
        articles:get()
      });
    }
  });



});

router.get('/',function(req,res,next){

});

function get(articleId){
  if(!articleId){
    Article.find({})
      .populate('createdBy','username')
      .exec(function(err,articles){
        return articles;
      });
  }
}

function save(article,userId,callback){
  var newArticle = new Article();
  newArticle.title = article.title;
  newArticle.body = article.body;
  newArticle.image = '';
  newArticle.createdBy = userId ;
  newArticle.save(function(err){
    callback(err,newArticle);
  });
}



module.exports = router;
