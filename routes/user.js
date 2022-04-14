const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const passCheck = require('../middleware/passCheck');
const emailCheck = require('../middleware/emailCheck');


router.post('/signup', emailCheck, passCheck, userCtrl.signup);
router.post('/login', userCtrl.login);




module.exports = router;