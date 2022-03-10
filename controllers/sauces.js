const Sauce = require("../models/Sauce")

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch((error) => res.status(400).json({ error }));
  };

exports.modifySauce = (req, res, next) => {

    const sauce = new Sauce({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
      });

    Sauce.updateOne({ _id: req.params.id }, sauce)
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch((error) => res.status(400).json({ error }));
  };

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch((error) => res.status(400).json({ error }));
  };
  
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
  };

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
    };

