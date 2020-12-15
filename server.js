const express = require('express');
var expressSession = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
// const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./routes')

// Require all models
const db = require("./models");

// Passport config
require('./config/passport.js')(passport);

// set port for production and development
const PORT = process.env.PORT || 8080;
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set view engine to handlebars
app.engine('handlebars', exphbs({
	defaultLayout:'main',
	// partialsDir = ("./views/partials/")
}));
app.set('view engine', 'handlebars');

// serve static files (js, css, images)
app.use(express.static('public'));

// initialize morgan for development debugging
app.use(logger('dev'));

// initialize express sessions
app.use(expressSession({
	secret: 'secretkey1',
	saveUninitialized: true,
	resave:true
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

// require routes -- SUBJECT TO CODE REVIEW. COULD USE SOME HYGIENE --
require('./controllers/webcontroller.js')(app, passport);
require('./controllers/auth.controller.js')(app, passport);
app.use(routes);

// Connect to the Mongo DB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/inventory";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  }, (error) => {
	if (!error) {
		console.log("Connected!");
		app.listen(PORT, function() {
			console.log('listening on port ' + PORT + ' db: ' + MONGODB_URI);
		});
	}
	else {
		(console.log('mongoose error: ' + error))
	};
});