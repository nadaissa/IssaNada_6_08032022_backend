//general imports
require('dotenv').config();
//the token verificator
const jwt = require('jsonwebtoken');

//authorization protection routes based on the identification of the secret token
//and on the coparaison of the token of users to prevent modification of a sauce
//by other users than the sauce owner and creator
module.exports = (req,res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
        if (req.body.userId && req.body.userId !== req.token.userId) {
            throw 'User ID non valable !'
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({ error: error | 'Requête non authentifiée!' })
    }
};