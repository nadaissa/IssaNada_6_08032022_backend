const express = require('express');
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, saucesCtrl.getAllSauces);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

//add router.post('/:id/like', auth, saucesController.likeSauce)


module.exports = router;