//general imports
const mongoose = require('mongoose');
//unique validator plugin is used to prevent users with the same email address
const uniqueValidator = require('mongoose-unique-validator');

//user model creation using mongoose schema class
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

//user model export
module.exports = mongoose.model('User', userSchema);