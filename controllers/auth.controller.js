// post to /login route
// import local strategy? from passport
// pass username and password
// ON SUCCESS
// req.login
// set cookie/jwt
// filter views by req.user

const User = require('../models/User');
var passport = require('passport');


module.exports = function(app) {

  // REGISTER
  app.post('/register', (req, res) => {
    const newUser = {
        username: req.body.registerUsername,
        password: req.body.registerPassword
    }
    // ==========================================
    // could implement some kind of password
    // storage encryption here
    // ==========================================
    User.create(newUser)
        .then(data => {
            // is this an "unhandled promise return"?
            console.log(data)
            res.redirect('/login');
        })
        .catch(err => console.log(err))
  }),

  // LOGIN
  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        console.log("passport err ", err);
        return next(err);
      }
      // console.log("===============")
      // console.log(`req.body ${JSON.stringify(req.body)}`);
      // console.log("===============")

      if (!user) {
        return res.send({ success : false, message : 'authentication failed'});
      }

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("login err ", loginErr)
          return next(loginErr);
        }
        console.log('redirecting....')
        res.cookie('username', user.username);
        return res.redirect("/");
      });      
    })(req, res, next);
  });

  // // LOGOUT
  // app.get('/auth/logout', function(req, res) {
  //   req.session.destroy(function(err){
  //     req.logout();
  //     res.clearCookie('username');
  //     res.redirect('/');
  //   })
  // });
}