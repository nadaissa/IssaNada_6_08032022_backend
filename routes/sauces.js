//general imports, controllers and middlewares
const express = require('express');
const saucesCtrl = require("../controllers/sauces");
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//router creation, router methods for finding, creation and modification of sauces
//CRUD actions, endpoints, middlewares and functions (in controllers file)
const router = express.Router();
router.get('/', auth, saucesCtrl.getAllSauces);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.post('/:id/like', auth, saucesCtrl.likeSauces)

//router export
module.exports = router;