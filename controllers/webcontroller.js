var express = require("express");

var router = express.Router();

const db = require('../models')


module.exports = function(app) {
    app.get('/reichenbachBar', (function(req, res) {
        db.Color.find({})
            .then((data) => {
                const hbsObject = {color:data};
                console.log(hbsObject)
                res.render('index', hbsObject);
            })
    }))
}