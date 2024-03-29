var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var passportSocketIo = require("passport.socketio");

var config = require('./config.js');
var mongoose = require('mongoose');
mongoose.connect(config.db.uri,function(err){
  if(err) console.log('Mongoose:   Error occured!',err);
  else console.log('Mongoose:   Connected to ' + config.db.uri);
});
var MongoStore = require('connect-mongo')(session);
var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection,clear_interval:10000 });

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(session({
  secret: 'kalikat',
  store: sessionStore,
  cookie: {maxAge:600000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

io.use(passportSocketIo.authorize({
  // cookieParser: cookieParser,
  secret:       'kalikat',    // make sure it's the same than the one you gave to express
  store:        sessionStore,
  success:      onAuthorizeSuccess,  // *optional* callback on success
  fail:         onAuthorizeFail,
}));

io.sockets.on('connection', function(socket) {
  console.log(socket.request.user);
});







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(lessMiddleware(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req,res,next){
  res.io = io;
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/angular',express.static(path.join(__dirname, 'node_modules/angular')));
app.use('/jquery',express.static(path.join(__dirname, 'node_modules/jquery')));
app.use('/bootstrap',express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/angular-route',express.static(path.join(__dirname, 'node_modules/angular-route')));
app.use('/fonts',express.static(path.join(__dirname,'node_modules/bootstrap/fonts')));
app.use('/ng-file',express.static(path.join(__dirname,'node_modules/ng-file-upload/dist')));

require('./controllers/passport')(passport); // pass passport for configuration

///////////////////////////////////////////////////////////////////
//  Add Routes                                                   //
///////////////////////////////////////////////////////////////////
require('./routes/index')(app,passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');
  accept(); //Let the user through
}

function onAuthorizeFail(data, message, error, accept){
  if(error) accept(new Error(message));
  console.log('failed connection to socket.io:', message);
  accept(null, false);
}


module.exports = {app: app, server: server};
