const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
	res.send('index');
});
router.get('/enter', (_req, res) => {
    res.render('crud-selector')
});
router.get('/update', (_req, res) => {
    res.render('update-selector')
});
router.get('/create-new', (_req, res) => {
    res.render('create-new')
});
router.get('/create-new-reichenbach-bar', (_req, res) => {
    res.render('reichenbach-bar-entry')
});
router.get('/create-new-reichenbach-frit', (_req, res) => {
    res.render('reichenbach-frit-entry')
});
// post new color
router.post("/new-reichenbach-bar", (req, res) => {
    const colorCode = $('#colorCode');
    const weightIn = $('#weightIn')
    console.log('colorCode' +  colorCode,'weightIn' + weightIn)   
    res.render('/reichenbach-frit-entry');
});


module.exports = router;
