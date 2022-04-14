require('dotenv').config();
const jwt = require('jsonwebtoken');

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