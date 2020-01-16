const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


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

// Connect to the Mongo DB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/inventory";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (error) => {
	if (!error) {console.log("Connected!");}
	else (console.log('mongoose error: ' + error));
});

require('./routes/index')(app);


var syncOptions = { force: false };


app.listen(PORT, function() {
	console.log('listening on port ' + PORT);
});