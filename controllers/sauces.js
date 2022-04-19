require('dotenv').config();
const Sauce = require("../models/Sauce")
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
     ...sauceObject,
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Votre sauce est enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
    };

exports.modifySauce = (req, res, next) => {
   Sauce.findOne({ _id: req.params.id })
   .then(sauce =>{
    const sauceObject = req.file ?
    { 
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    if(sauceObject.userId === sauce.userId) {
      Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Votre sauce est modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    } else {
      res.status(401).json({ error: "Vous ne pouvez pas modifier cette sauce"})
    }
   }) 
    .catch(error => res.status(500).json({ error }));  
  };

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId === req.token.userId) {
        
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Votre sauce est supprimée!'}))
            .catch((error) => res.status(400).json({ error }));
          });
      } else {
        res.status(401).json({ error: "Vous ne pouvez pas supprimer cette sauce"})
      }
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

exports.likeSauces = (req, res, next) => {
      const like = req.body.like;
      const userId = req.body.userId;
  
      // find the Sauce with id
      Sauce.findOne({ _id: req.params.id })
          .then(sauce => {
              //verify if user has already liked (by refering to the ID in the usersLiked array)
              let userLike = sauce.usersLiked.find(id => id === userId);
              //verify if user has already disliked (also by userId reference)
              let userDislike = sauce.usersDisliked.find(id => id === userId);
  
              switch (like) {
                  // first case: like = 1, user like
                  case 1 :
                      // if the user didn't chose like yet we add one like with the correspondant userId 
                      if (!userLike) {
                          sauce.likes += 1;
                          sauce.usersLiked.push(userId);
                      } else {
                          // if the user did already like we send an error
                          throw new Error('Vous avez le droit à un seul like :)');
                      } 
                       // if the user did already a dislike we send an error message
                      if (userDislike) {
                          throw new Error('Vous devez annuler votre dislike!');
                      }
                  break;
  
                  // second case: like = 0, user cancel like
                  case 0 :
                       // if the user did already like we delete one like and the userId from array 
                      
                      if (userLike) {
                          sauce.likes -= 1;
                          sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
                          //filter is here to keep the other users likes
                      }
                      // if the user did already a dislike we delete the dislike and the userId from array
                      else {
                        
                          if (userDislike) {
                          sauce.dislikes -= 1;
                          sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
                          //filter is here to keep the other users dislikes
                          }   
                      }
                  break;
  
                  // third case: like = -1, user dislike
                  case -1 :
                      // if the user didn't chose dislike yet we add one dislike with the correspondant userId                       
                      if (!userDislike) {
                          sauce.dislikes += 1;
                          sauce.usersDisliked.push(userId);
                      } else {
                          // if the user already disliked we send an error message
                          throw new Error('Vous avez le droit à un seul dislike :)');
                      } 
                      // if the user already liked we send an error message
                      if (userLike) {
                          throw new Error('Vous devez annuler votre like!');
                      }
              }
              // save the sauce with likes modifications
              sauce.save()
                  .then(() => res.status(201).json({ message: 'votre avis est enregistré !' }))
                  .catch(error => res.status(400).json({ error }));
  
              })
          .catch(error => res.status(500).json({ error : error.message }));
  };