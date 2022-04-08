const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

/*
add once created in middleware (change names)

const checkPassword = require('../middleware/check-password');
const checkEmail = require('../middleware/check-email');

*/
router.post('/signup', /*add: checkEmail and checkPassword const here (changed names)*/ userCtrl.singup);
router.post('/login', userCtrl.login);



module.exports = router;