var express = require("express");

var router = express.Router();
const Color = require('../models/Color');
const db = require('../models')


module.exports = function(app) {
    app.get('/reichenbachBar', (function(req, res) {
        db.Color.find({'companyCode': "reichenbach", 'type': 'bar'})
            .then((data) => {
                const reichenbachBarhbsObject = {bar:data};
                //console.log(reichenbachBarhbsObject)
                res.render('index', reichenbachBarhbsObject);
            })
    }))
    app.get('/kuglerBar', (function(req, res) {
        db.Color.find({'companyCode': "kugler", 'type': 'bar'})
            .then((data) => {
                const kuglerBarhbsObject = {bar:data};
                console.log(kuglerBarhbsObject)
                res.render('index', kuglerBarhbsObject);
            })
    }))
    app.get('/gafferBar', (function(req, res) {
        db.Color.find({'companyCode': "gaffer", 'type': 'bar'})
            .then((data) => {
                const gafferBarhbsObject = {bar:data};
                console.log(gafferBarhbsObject)
                res.render('index', gafferBarhbsObject);
            })
    }))
    app.get('/zimmermanBar', (function(req, res) {
        db.Color.find({'companyCode': "zimmerman", 'type': 'bar'})
            .then((data) => {
                const zimmermanBarhbsObject = {bar:data};
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
    app.post('/addtodb',  (req, res) => {
        console.log('form submitted');
        console.log(req.body.weight);
        console.log(req.body.companyCode);
        console.log(req.body.colorCode);
        if (req.body.function === "new") {
        let newEntry = new Color ({companyCode:req.body.companyCode,colorCode:req.body.colorCode,weight:req.body.weight,type:req.body.type});
        console.log('router.post' + newEntry);
        Color.create(newEntry)
            .then(data => console.log('new color added: ' + data))
            .catch(err => console.log(err)) 
        } else if (req.body.function === "add") {
            const add = req.body.weight;
            console.log(add);
            db.Color.find({'companyCode' : req.body.companyCode, 'colorCode': req.body.colorCode, 'type': req.body.type})
                .then(data => {
                    console.log('starting weight ' + data);
                    const id = data[0]._id;
                    console.log(id);
                    const startingWeight = parseFloat(data[0].weight);
                    const returnWeight = parseFloat(startingWeight) + parseFloat(add);
                    console.log(typeof returnWeight);
                    db.Color.update({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                        .then(data => console.log(data))
                        .catch(err => console.log('db update error ' + err))
                    res.render('index');
                }).catch(err => console.log('db find error ' + err))
        }
    })
}