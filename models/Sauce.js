const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: {type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true }, //nombre entre 1 et 10
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String<userId>], required: true }, //forme à vérifier
    usersDisliked: { type: [String<userId>], required: true }, //forme à vérifier

});

module.exports = mongoose.model('Sauce', sauceSchema);