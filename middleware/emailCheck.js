//general imports
require('dotenv').config();
//using npm email-validator to prevent usage of unvalid address
const emailCheck = require('email-validator');

//email validation function
module.exports = (req, res, next) =>{
    if(!emailCheck.validate(req.body.email)) {
        res.status(400).json({ message: "Votre addresse mail n'est pas valide"});
    } else{
        next();
    };

};