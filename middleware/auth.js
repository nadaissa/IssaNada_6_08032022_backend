//add once dotenv is installed: require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.userId !== userId) {
            throw 'User ID non valable!';
        } else{
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée!' })
    }

};

/* change after installing crypto
module.exports = (req,res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.CRYPTOJS_SECRET_TOKEN}`);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !'
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({ error: error  })
    }
}
*/