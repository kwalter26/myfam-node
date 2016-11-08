module.exports = function(passport) {

    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');
    var async = require('async');
    var nodemailer = require('nodemailer');
    var crypto = require('crypto');

    router.get('/login', function(req, res, next) {
        var m = req.flash('error')[0]
        res.render('login', {
            title: 'Login',
            message: m
        });
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/auth/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    router.get('/register', function(req, res, next) {
        var m = req.flash('error')[0]
        res.render('register', {
            title: 'Register',
            message: m
        });
    });

    router.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/auth/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    router.get('/forgot', function(req, res, next) {
        res.render('forgot', {
            title: 'Forgot Password'
        });
    });

    router.post('/forgot', function(req, res, next) {
        if (!req.body.email) {
            req.flash('error', 'No email given.');
            return res.redirect('/auth/forgot');
        }
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({
                        'email': req.body.email
                    })
                    .exec(function(err, user) {
                        if (!user) {
                            req.flash('error', 'No account with that email address exists.');
                            return res.redirect('/auth/forgot');
                        }
                        user.token = token;
                        user.tokenExpire = Date.now() + 60000; // 20 seconds
                        user.save(function(err) {
                            done(err, token, user);
                        });
                    });
            },
            function(token, user, done) {
                var goEmail = 'walter.kl26@gmail.com';
                var goPass = 'gjbgqalwkymovnsd';
                
                var smtpTransport = nodemailer.createTransport('smtps://' +goEmail + ':' + goPass + '@smtp.gmail.com');
                console.log(user);
                var mailOptions = {
                    to: user.email,
                    from: 'passwordreset@scoreit.com',
                    subject: 'ScoreIt Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/auth/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    if (err) console.log(err);
                    req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    //done(err, 'done');
                });
            },
            function(err) {
                if (err) return next(err);
                res.redirect('/auth/forgot');
            }
        ]);
        res.redirect('/auth/forgot');

    });

    router.get('/reset/:token', function(req, res) {
        User.findOne({
            token: req.params.token,
            tokenExpire: {
                $gt: Date.now()
            }
        }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/auth/forgot');
            }
            res.render('reset', {
                email: user.email,
                token: user.token,
                title: 'Reset Password'
            });
        });
    });

    router.post('/reset/:token', function(req,res){
        User.findOne({
            token: req.params.token,
            tokenExpire: {
                $gt: Date.now()
            }
        }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/auth/forgot');
            }
            user.updatePassword(req.body.password);
            user.save(function(err) {
                if (err)
                    throw err;
                res.redirect('/auth/login');
            });
        });
    });

    router.get('/logout', function(req, res, next) {
        req.session.destroy();
        res.redirect('/auth/login');
    });

    return router;
};
