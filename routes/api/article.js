var express = require('express');
var router  = express.Router();
var Article = require('../../models/article');

router.post('/',function(req,res,next){
  var article = req.body;
  var newArticle = new Article();
  newArticle.title = article.title;
  newArticle.body = article.body;
  newArticle.image = '';
  newArticle.createdBy = req.user._id ;
  newArticle.save(function(err){
    Article.find({})
      .populate('createdBy','username')
      .exec(function(err,articles){
        res.json(articles);
      });
  });
});

router.get('/',function(req,res,next){
  Article.find({})
    .populate('createdBy','username')
    .exec(function(err,articles){
      res.json(articles);
    });
});

router.get('/:id',function(req,res,next){
  Article.findById(req.params.id)
    .populate('createdBy','username')
    .exec(function(err,articles){
      res.json(articles);
    });
});

router.post('/:id',function(req,res,next){
  Article.findById(req.params.id)
    .exec(function(err,article){
      article.title = req.body.title;
      article.body = req.body.body;
      article.save(function(err,article){
        Article.find({})
          .populate('createdBy','username')
          .exec(function(err,articles){
            res.json(articles);
          });
      });
    });
});

function get(articleId,callback){
  if(!articleId){
    Article.find({})
      .populate('createdBy','username')
      .exec(function(err,articles){
        callback(articles);
      });
  }else{
    Article.findById(articleId)
      .populate('createdBy','username')
      .exec(function(err,articles){
        callback(article);
      });
  }
}



module.exports = router;
