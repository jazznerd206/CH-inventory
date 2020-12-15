// post to /login route
// import local strategy? from passport
// pass username and password
// ON SUCCESS
// req.login
// set cookie/jwt
// filter views by req.user

// var express = require("express");
// var router = express.Router();
const User = require('../models/User');
var passport = require('passport');


module.exports = function(app) {
    app.post('/api/login', function(req, res, next) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        passport.authenticate('local-login', function(err, user, info) {
          console.log("\n\n\n########userrrr", user)
          if (err) {
            console.log("passport err", err);
            return next(err); // will generate a 500 error
          }
          // Generate a JSON response reflecting authentication status\
          console.log("===============")
          console.log(`req.body ${JSON.stringify(req.body)}`);
          console.log("===============")
    
          if (!user) {
            return res.send({ success : false, message : 'authentication failed'});
          }
          
          // ***********************************************************************
          // "Note that when using a custom callback, it becomes the application's
          // responsibility to establish a session (by calling req.login()) and send
          // a response."
          // Source: http://passportjs.org/docs
          // ***********************************************************************
    
          req.login(user, loginErr => {
            if (loginErr) {
              console.log("loginerr", loginErr)
              return next(loginErr);
            }
            //var userId = user.dataValues.id;
            console.log('redirecting....')
            res.cookie('username', user.username);
            // res.cookie('user_id', user.uuid );
    
            // if (!req.session.userid) {
            //   var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
            //   delete req.session.redirectTo;
            //   // is authenticated ?
            //   res.redirect(redirectTo);
            // } else {
            //     next();
            // }
            // console.log("=====================signup: ",req.headers.referer);
            // return res.json(true);
            return res.redirect("/");
            
          });      
        })(req, res, next);
      });
    
    // app.post('/api/login', (req, res) => {
    //     let body = req.body;
    //     // console.log("+========================================+")
    //     // console.log(req.body)
    //     // console.log("+========================================+")
    //     User.find({username:req.body.username})
    //         .then(user => {
    //             console.log('user from user.findone' + user)
    //             res.redirect('/');
    //         })
    //         .catch(err => console.log('error from user.findone' + err));
    // }),

    // REGISTER USER ROUTE COMPLETE, returns to homepage without logging in
    // username: Andrew
    // password: andrew
    app.post('/api/register', (req, res) => {

        const newUser = {
            username: req.body.registerUsername,
            password: req.body.registerPassword
        }
        console.log(newUser);
        User.create(newUser)
            .then(data => {
                console.log(`new user created ${data}`);
                res.redirect('/');
            })
            .catch(err => console.log(err))
    }),

    // logout of user account
    app.get('/auth/logout', function(req, res) {
      req.session.destroy(function(err){
        req.logout();
        res.clearCookie('username');
        res.redirect('/');
      })
  });
}