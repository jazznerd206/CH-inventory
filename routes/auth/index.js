const express = require('express');
const router = express.Router();
const db = require('../../models')

// register/login routes
router.get('/register', function(req, res) {
    res.render('register');
    });
router.get('/login', function(req, res) {
    res.render('login');
    });
router.get('/auth/logout', function(req, res) {
    req.session.destroy(function(err){
    req.logout();
    res.clearCookie('username');
    res.redirect('/');
    })
});

module.exports = router