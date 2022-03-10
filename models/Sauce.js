const mongoose = require("mongoose");

const = sauceSchema = mongoose.Schema({
    //tous ces champs sont à faire selon les infos données par piiquante (ici exp cours)
    title: { type: String, required, true},
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },

});

module.exports = mongoose.model('Sauce', sauceSchema);