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

module.exports = router