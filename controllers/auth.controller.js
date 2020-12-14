// post to /login route
// import local strategy? from passport
// pass username and password
// ON SUCCESS
// req.login
// set cookie/jwt
// filter views by req.user

var express = require("express");
var router = express.Router();
const User = require('../models/User');


module.exports = function(app) {
    app.post('/api/login', (req, res) => {
        let body = req.body;
        // console.log("+========================================+")
        // console.log(req.body)
        // console.log("+========================================+")
        User.find({username:req.body.username})
            .then(user => {
                console.log('user from user.findone' + user)
                res.render('index', user)
            })
            .catch(err => console.log('error from user.findone' + err));
    }),

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
                res.render('index');
            })
            .catch(err => console.log(err))
    })
}