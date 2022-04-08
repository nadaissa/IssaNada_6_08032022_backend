const Sauce = require("../models/Sauce")
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
     ...sauceObject,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
     //add likes dislikes usersliked usersdisliked here
     /*likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],*/
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
/*exports.likeSauce = (req, res, next) => {
    if (req.body.like === 1) {  
        Sauces.updateOne( {_id:req.params.id}, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })
            .then(() => res.status(200).json({ message: 'Vous aimez cette sauce !'}))
            .catch(error => res.status(400).json({ error }));
    } else if (req.body.like === -1) {  
        Sauces.updateOne( {_id:req.params.id}, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })
            .then(() => res.status(200).json({ message: "Vous n'aimez pas cette sauce!"}))
            .catch(error => res.status(400).json({ error }));
    } else {  
        Sauces.findOne({ _id: req.params.id })
            .then(sauce => {
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauces.updateOne( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                .then(() => res.status(200).json({ message: 'Like supprimé !'}))
                .catch(error => res.status(400).json({ error }))
            } else if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauces.updateOne( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))
                .catch(error => res.status(400).json({ error }))
            }
            })
            .catch(error => res.status(400).json({ error }));
    }
}; */
