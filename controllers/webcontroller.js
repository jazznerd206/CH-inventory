const express = require('express');

const router = express.Router;

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

module.exports = router;