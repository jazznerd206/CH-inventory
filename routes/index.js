const express = require('express');
const router = express.Router();
const barRoutes = require('./bar');
const fritRoutes = require('./frit');
const metalRoutes = require('./metals')
const reportRoutes = require('./reports');
//const authRoutes = require('./auth');


// route director
router.use("/bar", barRoutes);
router.use("/frit", fritRoutes);
router.use('/metal', metalRoutes);
router.use('/reports', reportRoutes);
//router.use('/auth', authRoutes);

// load index handlebars
router.get('/', function(req, res) {
    res.render('index');
    console.log(req.user)
  });



module.exports = router;