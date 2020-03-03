var express = require("express");
var router = express.Router();
const Color = require('../models/Color');
const db = require('../models')
const User = require('../models/User');


module.exports = function(app) {
    app.post('/addtodb',  (req, res) => {
        //console.log('form submitted');
        //console.log(req.body.weight);
        //console.log(req.body.companyCode);
        //console.log(req.body.colorCode);
        if (req.body.function === "new") {
        let newEntry = new Color ({companyCode:req.body.companyCode,colorCode:req.body.colorCode,weight:req.body.weight,type:req.body.type});
        //console.log('router.post' + newEntry);
        Color.create(newEntry)
            .then(data => console.log('new color added: ' + data))
            .catch(err => console.log(err)) 
        } else if (req.body.function === "add") {
            const add = req.body.weight;
            //console.log(add);
            db.Color.find({'companyCode' : req.body.companyCode, 'colorCode': req.body.colorCode, 'type': req.body.type})
                .then(data => {
                    //console.log('starting weight ' + data);
                    const id = data[0]._id;
                    //console.log(id);
                    const startingWeight = parseFloat(data[0].weight);
                    const returnWeight = parseFloat(startingWeight) + parseFloat(add);
                    //console.log(typeof returnWeight);
                    db.Color.updateOne({"_id" : id}, {$set: {"weight":parseFloat(returnWeight)}})
                        .then(data => console.log(data))
                        .catch(err => console.log('db update error ' + err))
                    res.render('index');
                }).catch(err => console.log('db find error ' + err))
        } else if (req.body.function === "remove") {
            const add = req.body.weight;
            //console.log(add);
            db.Color.find({'companyCode' : req.body.companyCode, 'colorCode': req.body.colorCode, 'type': req.body.type})
                .then(data => {
                    //console.log('starting weight ' + data);
                    const id = data[0]._id;
                    //console.log(id);
                    const startingWeight = parseFloat(data[0].weight);
                    const returnWeight = parseFloat(startingWeight) - parseFloat(add);
                    //console.log(typeof returnWeight);
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
        //console.log('delete route')
        //console.log(req.params.id);
        db.Color.find({"_id" : req.params.id}).then(data => {
            const company = data[0].companyCode;
            const type = data[0].type;
            db.Color.deleteOne( { "_id" : req.params.id})
            .then(res.redirect('/' + type + '/' + company))
            .catch(err => console.log('color delete error ' +err))
        })
        .catch(err => console.log('color find error ' + err))
    })
}