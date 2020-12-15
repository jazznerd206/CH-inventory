const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


const User = new Schema({
    username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: false, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
});

User.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

 
module.exports = mongoose.model('User', User);