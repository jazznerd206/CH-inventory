const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const Color = require('../models/Color');

// load index handlebars
router.get('/', function(req, res) {
    res.render('index', {user: req.user});
  });

// route for registering new user 
router.get('/register', function(req, res) {
    res.render('register', {});
});
router.post('/register', function(req, res, next) {
    let newUser = new User ({username:req.body.registerUsername, password:req.body.registerPassword, email:req.body.registerEmail});
    console.log(newUser);
    User.register((newUser), req.body.registerPassword, function(err) {
        if (err) {
        console.log('error while user register!', err);
        return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
    });
});

// route for loggin in user
router.get('/login', function(req, res) {
    res.render('index', {username: req.loginUsername, message: req.flash('error')});
  });
  
  router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
      res.redirect('/');
    });

// route for log out


// route for posting data, using color model, to mongoDB
router.get('/saveNewRBar', (req, res) => {
    console.log('router.get');
    res.render('index', {username: req.loginUsername, message: req.flash('error')});
})
router.post('/saveNewRBar', (req, res, next) => {
    const newRBar = new Color ({colorCode:req.body.colorCode,weightIn:req.body.weightIn});
    console.log(newRBar);
})




// route for grabbing data


module.exports = router;