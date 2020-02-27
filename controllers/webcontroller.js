var express = require("express");

var router = express.Router();
const Color = require('../models/Color');
const db = require('../models')


module.exports = function(app) {
    app.get('/bar/reichenbach', (function(req, res) {
        db.Color.find({'companyCode': "reichenbach", 'type': 'bar'})
            .then((data) => {
                const reichenbachBarhbsObject = {bar:data};
                //console.log(reichenbachBarhbsObject)
                res.render('bar', reichenbachBarhbsObject);
            })
    }))
    app.get('/bar/kugler', (function(req, res) {
        db.Color.find({'companyCode': "kugler", 'type': 'bar'})
            .then((data) => {
                const kuglerBarhbsObject = {bar:data};
                console.log(kuglerBarhbsObject)
                res.render('bar', kuglerBarhbsObject);
            })
    }))
    app.get('/bar/gaffer', (function(req, res) {
        db.Color.find({'companyCode': "gaffer", 'type': 'bar'})
            .then((data) => {
                const gafferBarhbsObject = {bar:data};
                console.log(gafferBarhbsObject)
                res.render('bar', gafferBarhbsObject);
            })
    }))
    app.get('/bar/zimmerman', (function(req, res) {
        db.Color.find({'companyCode': "zimmerman", 'type': 'bar'})
            .then((data) => {
                const zimmermanBarhbsObject = {bar:data};
                console.log(zimmermanBarhbsObject)
                res.render('bar', zimmermanBarhbsObject);
            })
    }))
    app.get('/frit/reichenbach', (function(req, res) {
        db.Color.find({'companyCode': "reichenbach", 'type': 'frit'})
            .then((data) => {
                const reichenbachBarhbsObject = {frit:data};
                //console.log(reichenbachBarhbsObject)
                res.render('frit', reichenbachBarhbsObject);
            })
    }))
    app.get('/frit/kugler', (function(req, res) {
        db.Color.find({'companyCode': "kugler", 'type': 'frit'})
            .then((data) => {
                const kuglerBarhbsObject = {frit:data};
                console.log(kuglerBarhbsObject)
                res.render('frit', kuglerBarhbsObject);
            })
    }))
    app.get('/frit/gaffer', (function(req, res) {
        db.Color.find({'companyCode': "gaffer", 'type': 'frit'})
            .then((data) => {
                const gafferBarhbsObject = {frit:data};
                console.log(gafferBarhbsObject)
                res.render('frit', gafferBarhbsObject);
            })
    }))
    app.get('/frit/zimmerman', (function(req, res) {
        db.Color.find({'companyCode': "zimmerman", 'type': 'frit'})
            .then((data) => {
                const zimmermanBarhbsObject = {frit:data};
                console.log(zimmermanBarhbsObject)
                res.render('frit', zimmermanBarhbsObject);
            })
    }))
    app.get('/metals/all', (function(req, res) {
        db.Color.find({'type': 'metal'})
            .then((data) => {
                const metalsHbsObject = {metals:data};
                console.log(metalsHbsObject)
                res.render('metals', metalsHbsObject);
            })
    }))
    // route for updating existing R bar record using mongo CRUD ops
    app.post('/bar/:companyCode/:id/add', (req, res) => {
        console.log('route clicked');
        const addTo = req.body.weightIn;
        console.log(addTo);
        const id = req.params.id;
        console.log(id);
        db.Color.find({'_id' : id})
            .then(data => {
                console.log('starting weight ' + data);
                const startingWeight = data[0].weight
                const returnAddress = data[0].type;
                const companyCode = data[0].companyCode;
                const returnWeight = parseFloat(startingWeight) + parseFloat(addTo);
                console.log(typeof returnWeight);
                db.Color.updateOne({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                    .then(data => console.log(data))
                    .catch(err => console.log('db update error' + err))
                res.redirect('/' + returnAddress + '/' + companyCode);
            }).catch(err => console.log('db find error ' + err))
    })
    // route for updating existing R bar record using mongo CRUD ops
    app.post('/bar/:companyCode/:id/subtract', (req, res) => {
        console.log('route clicked');
        const subtractFrom = req.body.weightOut;
        console.log(subtractFrom);
        const id = req.params.id;
        console.log(id);
        db.Color.find({'_id' : id})
            .then(data => {
                console.log('starting weight ' + data);
                const companyCode = data[0].companyCode;
                const returnAddress = data[0].type;
                const startingWeight = parseFloat(data[0].weight);
                const returnWeight = parseFloat(startingWeight) - parseFloat(subtractFrom);
                db.Color.updateOne({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                    .then(res => console.log(res))
                    .catch(err => console.log('db update error' + err))
                res.redirect('/' + returnAddress + '/' + companyCode);
            }).catch(err => console.log('db find error ' + err))
    })
    // route for updating existing R bar record using mongo CRUD ops
    app.post('/frit/:companyCode/:id/add', (req, res) => {
        console.log('route clicked');
        const addTo = req.body.weightIn;
        console.log(addTo);
        const id = req.params.id;
        console.log(id);
        db.Color.find({'_id' : id})
            .then(data => {
                console.log('starting weight ' + data);
                const startingWeight = data[0].weight
                const returnAddress = data[0].type;
                const companyCode = data[0].companyCode;
                const returnWeight = parseFloat(startingWeight) + parseFloat(addTo);
                console.log(typeof returnWeight);
                db.Color.updateOne({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                    .then(data => console.log(data))
                    .catch(err => console.log('db update error' + err))
                res.redirect('/' + returnAddress + '/' + companyCode);
            }).catch(err => console.log('db find error ' + err))
    })
    // route for updating existing R bar record using mongo CRUD ops
    app.post('/frit/:companyCode/:id/subtract', (req, res) => {
        console.log('route clicked');
        const subtractFrom = req.body.weightOut;
        console.log(subtractFrom);
        const id = req.params.id;
        console.log(id);
        db.Color.find({'_id' : id})
            .then(data => {
                console.log('starting weight ' + data);
                const companyCode = data[0].companyCode;
                const returnAddress = data[0].type;
                const startingWeight = parseFloat(data[0].weight);
                const returnWeight = parseFloat(startingWeight) - parseFloat(subtractFrom);
                db.Color.updateOne({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                    .then(res => console.log(res))
                    .catch(err => console.log('db update error' + err))
                res.redirect('/' + returnAddress + '/' + companyCode);
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
                    db.Color.updateOne({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                        .then(data => console.log(data))
                        .catch(err => console.log('db update error ' + err))
                    res.render('index');
                }).catch(err => console.log('db find error ' + err))
        } else if (req.body.function === "remove") {
            const add = req.body.weight;
            console.log(add);
            db.Color.find({'companyCode' : req.body.companyCode, 'colorCode': req.body.colorCode, 'type': req.body.type})
                .then(data => {
                    console.log('starting weight ' + data);
                    const id = data[0]._id;
                    console.log(id);
                    const startingWeight = parseFloat(data[0].weight);
                    const returnWeight = parseFloat(startingWeight) - parseFloat(add);
                    console.log(typeof returnWeight);
                    db.Color.updateOne({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                        .then(data => console.log(data))
                        .catch(err => console.log('db update error ' + err))
                    res.render('index');
                }).catch(err => console.log('db find error ' + err))
        } else {
            alert("please select a function type")
        }
    })
    app.get('/delete/:id', (req, res) => {
        console.log('delete route')
        console.log(req.params.id);
        db.Color.deleteOne( { "_id" : req.params.id})
            .then(res.redirect('/')).catch(err => console.olog(err))
    })
}