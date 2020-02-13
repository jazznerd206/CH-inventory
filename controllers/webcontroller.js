var express = require("express");

var router = express.Router();

const db = require('../models')


module.exports = function(app) {
    app.get('/reichenbachBar', (function(req, res) {
        db.Color.find({'companyCode': "R"})
            .then((data) => {
                const reichenbachBarhbsObject = {color:data};
                console.log(reichenbachBarhbsObject)
                res.render('index', reichenbachBarhbsObject);
            })
    }))
    app.get('/kuglerBar', (function(req, res) {
        db.Color.find({'companyCode': "K"})
            .then((data) => {
                const kuglerBarhbsObject = {color:data};
                console.log(kuglerBarhbsObject)
                res.render('index', kuglerBarhbsObject);
            })
    }))
    app.get('/gafferBar', (function(req, res) {
        db.Color.find({'companyCode': "G"})
            .then((data) => {
                const gafferBarhbsObject = {color:data};
                console.log(gafferBarhbsObject)
                res.render('index', gafferBarhbsObject);
            })
    }))
    app.get('/zimmermanBar', (function(req, res) {
        db.Color.find({'companyCode': "Z"})
            .then((data) => {
                const zimmermanBarhbsObject = {color:data};
                console.log(zimmermanBarhbsObject)
                res.render('index', zimmermanBarhbsObject);
            })
    }))
}