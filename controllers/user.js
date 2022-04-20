//general imports
require('dotenv').config();
//bcrypt is used to crypt passwords
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


//signup function export to be used in routes file
exports.signup = (req, res, next) => {
   
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email : req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//login function export to be used in routes file
exports.login = (req, res, next) => {
  
    User.findOne({ email : req.body.email })
        .then((user) => {
            if(!user) {
                return res.status(401).json({message : "Utilisateur non trouvé!"});
            } 
            else {
                bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if(!valid) {
                        return res.status(401).json({message : "Mot de passe incorrect !"});
                    }
                    else {
                    res.status(200).json({
                        userId : user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.SECRET_TOKEN}`,
                            { expiresIn: '24h' }
                            )
                    });
                    }
                })
                .catch(error => res.status(501).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};