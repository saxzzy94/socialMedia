const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

//create Schema
const UserSchema = new Schema({
name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
},
password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
},
email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    unique: true
},
date: {
    type: Date,
    default: Date.now
},

});

module.exports = User = mongoose.model('users', UserSchema);





