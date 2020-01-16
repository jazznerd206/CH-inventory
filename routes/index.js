const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User')

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
    res.render('crud-selector', {username: req.loginUsername, message: req.flash('error')});
  });
  
  router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
      res.redirect('/enter');
    });

// route for log out






router.get('/enter', (_req, res) => {
    res.render('crud-selector')
});
router.get('/update', (_req, res) => {
    res.render('update-selector')
});
router.get('/create-new', (_req, res) => {
    res.render('create-new')
});
router.get('/create-new-reichenbach-bar', (_req, res) => {
    res.render('reichenbach-bar-entry')
});
router.get('/create-new-reichenbach-frit', (_req, res) => {
    res.render('reichenbach-frit-entry')
});
// post new color
router.post("/new-reichenbach-bar", (req, res) => {
    const colorCode = $('#colorCode');
    const weightIn = $('#weightIn')
    console.log('colorCode' +  colorCode,'weightIn' + weightIn)   
    res.render('/reichenbach-frit-entry');
});


module.exports = router;
