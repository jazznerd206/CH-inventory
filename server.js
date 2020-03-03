const express = require('express');
var expressSession = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes')

// Require all models
const db = require("./models");

// set port for production and development
const PORT = process.env.PORT || 8080;

// initialize express app
const app = express();

// serve static files (js, css, images)
app.use(express.static('public'));

// set view engine to handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// initialize morgan for development debugging
app.use(logger('dev'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// initialize express sessions
app.use(expressSession({
	secret: 'secretkey1',
	saveUninitialized: true,
	resave:true
}));

// require routes -- SUBJECT TO CODE REVIEW. COULD USE SOME HYGIENE --
require('./controllers/webcontroller')(app);
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