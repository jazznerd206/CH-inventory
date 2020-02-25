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
router.get('/bar', function(req, res) {
res.render('bar', {user: req.user});
});
router.get('/frit', function(req, res) {
res.render('frit', {user: req.user});
});
router.get('/metals', function(req, res) {
res.render('metals', {user: req.user});
});
router.get('/reports', function(req, res) {
res.render('reports', {user: req.user});
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


// route for posting new reichenbach bar data, using color model, to mongoDB
router.post('/saveNewRBar', (req, res) => {
    console.log('router.get');
    res.render('index', {username: req.loginUsername, message: req.flash('error')});
    let newRBar = new Color ({companyCode:"R",colorCode:req.body.colorCode,weightIn:req.body.weightIn});
    console.log('router.post' + newRBar);
    Color.create(newRBar)
        .then(data => console.log('new color added: ' + data))
        .catch(err => console.log(err))
})

// route for posting new kugler bar data, using color model, to mongoDB
router.post('/saveNewKBar', (req, res) => {
    console.log('router.get');
    res.render('index', {username: req.loginUsername, message: req.flash('error')});
    let newKBar = new Color ({companyCode:"K",colorCode:req.body.colorCode,weightIn:req.body.weightIn});
    console.log('router.post' + newKBar);
    Color.create(newKBar)
        .then(data => console.log('new color added: ' + data))
        .catch(err => console.log(err))
})

// route for posting new gaffer bar data, using color model, to mongoDB
router.post('/saveNewGBar', (req, res) => {
    console.log('router.get');
    res.render('index', {username: req.loginUsername, message: req.flash('error')});
    let newGBar = new Color ({companyCode:"G",colorCode:req.body.colorCode,weightIn:req.body.weightIn});
    console.log('router.post' + newGBar);
    Color.create(newGBar)
        .then(data => console.log('new color added: ' + data))
        .catch(err => console.log(err))
})


// route for posting new zimmerman bar data, using color model, to mongoDB
router.post('/saveNewZBar', (req, res) => {
    console.log('router.get');
    res.render('index', {username: req.loginUsername, message: req.flash('error')});
    let newZBar = new Color ({companyCode:"Z",colorCode:req.body.colorCode,weightIn:req.body.weightIn});
    console.log('router.post' + newZBar);
    Color.create(newZBar)
        .then(data => console.log('new color added: ' + data))
        .catch(err => console.log(err))
})



module.exports = router;