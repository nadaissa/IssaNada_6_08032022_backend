const Sauce = require("../models/Sauce")
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
     ...sauceObject,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
     //add likes dislikes usersliked usersdisliked here
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Votre sauce est enregistrée !'}))
      .catch((error) => res.status(400).json({ error }));
  };

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { 
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Votre sauce est modifiée !'}))
      .catch((error) => res.status(400).json({ error }));
  };

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Votre sauce est supprimée!'}))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
  };
  
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
    };

//put exports for liking the Sauce here

