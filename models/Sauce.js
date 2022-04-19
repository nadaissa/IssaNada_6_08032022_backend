const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true }, //nombre entre 1 et 10
    likes: { type: Number, default: 0, required: false },
    dislikes: { type: Number, default: 0,  required: false },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },

});

module.exports = mongoose.model('Sauce', sauceSchema);