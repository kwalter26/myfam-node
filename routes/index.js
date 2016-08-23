module.exports = function(app,passport) {



  var auth = require('./auth.js')(passport);
  var article = require('./api/article');
  // var contact = require('./api/contact');
  // var data = require('./api/data');

  app.use('/auth',auth);
  app.use('/api/article',article);
  // app.use('/api/contact',contact);
  // app.use('/api/data',data);

  app.get('/partial/:name', function (req, res){
    var name = req.params.name;
    res.render('partials/' + name);
  });


  app.get('/*', isLoggedIn, function(req,res,next){
    res.render('index',{title:'Score-It',user:{email:req.user.local.email}});
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
