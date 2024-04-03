const mongoose = require('mongoose'); 
const passportLocalMongoose = require('passport-local-mongoose');

// Passport-Local Mongoose will add a username, 
// hash and salt field to store the username, the hashed password and the salt value.

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', User);