const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorazation.split('')[1];
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