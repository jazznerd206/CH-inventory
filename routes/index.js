const express = require('express');
const router = express.Router();
const barRoutes = require('./bar');
const fritRoutes = require('./frit');
const metalRoutes = require('./metals')
const reportRoutes = require('./reports');
<<<<<<< HEAD
const authRoutes = require('./auth');
=======
//const authRoutes = require('./auth');
>>>>>>> 56ce7df3f9b7eea4dc3d5bbb3f55b191a1891cef


// route director
router.use("/bar", barRoutes);
router.use("/frit", fritRoutes);
router.use('/metal', metalRoutes);
router.use('/reports', reportRoutes);
<<<<<<< HEAD
router.use('/auth', authRoutes);
=======
//router.use('/auth', authRoutes);
>>>>>>> 56ce7df3f9b7eea4dc3d5bbb3f55b191a1891cef

// load index handlebars
router.get('/', function(req, res) {
    res.render('index');
    console.log(req.user)
  });



module.exports = router;