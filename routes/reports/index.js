const express = require('express');
const router = express.Router();
const db = require('../../models')

router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        var user = {
            user: req.session.passport.user,
            isLoggedIn: req.isAuthenticated()
        }
        res.render('reports', user);
    } else {
        res.render('reports');
    }});
router.get('/monthly', (req, res) => {
    const now = Date.now();
    const threeDaysAgo = now - 259200000;
    const oneMonthAgo = now - 2592000000;
    const oneQuarterAgo = now - 7776000000;
    const oneYearAgo = now - 31536000000;
    db.Color.find().lean()
        .then(data => {
            const dataHolder = [];
            data.forEach(color => {
                const entryDate = color.lastUpdate;
                const time = new Date(entryDate);
                if (time > oneMonthAgo) {
                    dataHolder.push(color);
                };
            });
            if (req.user) {
                const object = {
                    user: req.session.passport.user,
                    isLoggedIn: req.isAuthenticated(),
                    reports: data
                };
                res.render('reports', object);
            } else  {
                const object = {
                    user: null,
                    isLoggedIn: req.isAuthenticated(),
                    reports: data
                };
                res.render('reports', object);
            }
        }).catch(err => console.log('find error ' + err));
    });





module.exports = router;