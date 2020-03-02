const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));


// Connect to the Mongo DB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/inventory";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  }, (error) => {
	if (!error) {console.log("Connected!");}
	else (console.log('mongoose error: ' + error));
});

require('./controllers/webcontroller')(app);
app.use('/', require('./routes/index'));

var syncOptions = { force: false };

app.listen(PORT, function() {
	console.log('listening on port ' + PORT + ' db: ' + MONGODB_URI);
});