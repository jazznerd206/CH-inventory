// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var db  = require('../models');

// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log("user.uuid",user);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        db.User.findOne({username:user.username}).then(function(user) {
	        if (user) {
	            done(null, user);
	        } else {
	           console.log("user.errors", user.errors)
	            done(user.errors, null);
	 
	        }
	 
	    });
    });


    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and account_key, we will override with email
            usernameField: 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            process.nextTick(function() {
            db.User.findOne({
                username: username
            }).then(function(user, err){
                if(err) {
                    console.log("err",err)
                    return done(err);
                }
                if (user) {
                    console.log('signupMessage', 'That email is already taken.');
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    db.User.create({
                        username:req.body.username,
                        password: db.User.generateHash(password)

                        }).then(function(dbUser) {
                            console.log("created result: ", dbUser);
                            return done(null, dbUser);

                        }).catch(function (err) {
                            console.log(err);
                        }); 
                    }
                });   
            });
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // override default 'account-key' with password field
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            console.log("======================")
            console.log("calling user db here", username, password)
            console.log("======================")
            db.User.findOne({
                username: username
            }).then(function(user, err) {
                if (!user){
                    console.log("no user found");
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                if (user && user.password !== password){
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
                return done(null, user);
            });
        }));
    };