const express = require('express');
const router = express.Router();
const barRoutes = require('./bar');
const fritRoutes = require('./frit');
const metalRoutes = require('./metals')
const reportRoutes = require('./reports');
const authRoutes = require('./auth');


// route director
router.use("/bar", barRoutes);
router.use("/frit", fritRoutes);
router.use('/metal', metalRoutes);
router.use('/reports', reportRoutes);
router.use('/auth', authRoutes);

// load index handlebars
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      var user = {
        user: req.session.passport.user,
        isLoggedIn: req.isAuthenticated()
      }
      console.log(`user from router.get ${JSON.stringify(user)}`)
      res.render('index', user);
    } else {
      console.log('no user router.get')
      res.render('index');
    }
    
  });
router.get('/auth/logout', function(req, res) {
    req.session.destroy(function(err){
    req.logout();
    res.clearCookie('username');
    res.redirect('/');
    })
});


module.exports = router;