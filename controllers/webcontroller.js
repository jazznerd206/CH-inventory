var express = require("express");

var router = express.Router();

const db = require('../models')


module.exports = function(app) {
    app.get('/reichenbachBar', (function(req, res) {
        db.Color.find({'companyCode': "R"})
            .then((data) => {
                const reichenbachBarhbsObject = {color:data};
                //console.log(reichenbachBarhbsObject)
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
    // route for updating existing R bar record using mongo CRUD ops
    app.post('/addtoRBar/:id', (req, res) => {
        console.log('route clicked');
        const addTo = req.body.weightIn;
        console.log(addTo);
        const id = req.params.id;
        console.log(id);
        db.Color.find({'_id' : id})
            .then(data => {
                console.log('starting weight ' + data);
                const startingWeight = data[0].weightIn
                const returnWeight = parseFloat(startingWeight) + parseFloat(addTo);
                db.Color.updateOne({"_id" : id}, {$set: {"weightIn":returnWeight}})
                    .then(data => console.log(data))
                    .catch(err => console.log('db update error' + err))
                res.render('index');
            }).catch(err => console.log('db find error ' + err))
    })
    // route for updating existing R bar record using mongo CRUD ops
    app.post('/subtractRBar/:id', (req, res) => {
        console.log('route clicked');
        const subtractFrom = req.body.weightOut;
        console.log(subtractFrom);
        const id = req.params.id;
        console.log(id);
        db.Color.find({'_id' : id})
            .then(data => {
                console.log('starting weight ' + data);
                const startingWeight = data[0].weightIn
                const returnWeight = parseFloat(startingWeight) - parseFloat(subtractFrom);
                db.Color.updateOne({"_id" : id}, {$set: {"weightIn":returnWeight}})
                    .then(res => console.log(res))
                    .catch(err => console.log('db update error' + err))
                res.render('index');
            }).catch(err => console.log('db find error ' + err))
    })
}