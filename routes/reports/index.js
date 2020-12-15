const express = require('express');
const router = express.Router();
const db = require('../../models')

router.get('/', function(req, res) {
    res.render('reports');
    });
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
                //console.log('all results ' + entryDate);
                const time = new Date(entryDate);
                //console.log('time ' + time.getTime());
                if (time > oneMonthAgo) {
                    dataHolder.push(color);
                }
        })
        //console.log(dataHolder);
        const reportsHbsObject = {reports:dataHolder}
        res.render('reports', reportsHbsObject);
    })
        .catch(err => console.log('find error ' + err))
})





module.exports = router;