const express = require('express');

const router = express.Router;

router.get('/', (_req, res) => {
	res.send('index');
});
router.get('/add', (_req, res) => {
    res.render('addto')
});
router.get('/remove', (_req, res) => {
    res.render('removefrom')
});
router.get('/addnew', (_req, res) => {
    res.render('addnew')
});
router.get('/delete', (_req, res) => {
    res.render('delete')
});
router.get('/viewall', (_req, res) => {
    res.render('totals')
});

module.exports = router;