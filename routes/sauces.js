const express = require('express');
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//exemple du cours à adapter aux sauces
router.get('/', auth, saucesCtrl.getAllSauces);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);



module.exports = router;