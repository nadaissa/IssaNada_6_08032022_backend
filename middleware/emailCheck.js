require('dotenv').config();
const emailCheck = require('email-validator');

module.exports = (req, res, next) =>{
    if(!emailCheck.validate(req.body.email)) {
        res.status(400).json({ message: "Votre addresse mail n'est pas valide"});
    } else{
        next();
    };

};