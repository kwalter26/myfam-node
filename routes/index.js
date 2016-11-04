module.exports = function(app,passport) {

  app.use('/auth',require('./auth')(passport));
  app.use('/api/user',isLoggedIn,require('./api/user'));

  app.get('/partial/:name',isLoggedIn, function (req, res){
    var name = req.params.name;
    res.render('partials/' + name,{id:req.user.id});
  });

  app.get('/*', isLoggedIn, function(req,res,next){
    res.render('index',{title:'Score-It',user:{email:req.user.email,id:req.user.id,pic:req.user.imgUrl}});
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
  }

};
