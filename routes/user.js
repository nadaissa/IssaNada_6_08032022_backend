//general imports, controllers and middlewares
const express = require('express');
const userCtrl = require('../controllers/user');
const passCheck = require('../middleware/passCheck');
const emailCheck = require('../middleware/emailCheck');

//router creation, router methods for signing and loging
const router = express.Router();
router.post('/signup', emailCheck, passCheck, userCtrl.signup);
router.post('/login', userCtrl.login);



//router export
module.exports = router;