const express = require('express');
const router = express.Router();
const saucesCtrl = require("../controllers/sauces");

//exemple du cours à adapter aux sauces
router.get('/' + '', saucesCtrl.getAllSauces);

router.get('/:id', saucesCtrl.getOneSauce);

router.post('/', saucesCtrl.createSauce);

router.put('/:id', saucesCtrl.modifySauce);

router.delete('/:id', saucesCtrl.deleteSauce);



module.exports = router;