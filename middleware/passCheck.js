require('dotenv').config();

const passCheck = require('../models/Password');

module.exports = (req, res, next) =>{
    if (!passCheck.validate(req.body.password)){
       res.status(400).json({ message: "Votre mot de pass n'est pas valide!"});
    } else {
        next();
    };
};
