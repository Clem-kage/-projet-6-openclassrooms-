// fichier de fonction d'utilisation des sauces

const fs = require('fs');
const sauce = require('../models/thing');
const express = require('express');


const Thing = require('../models/thing');


exports.enregistrer = (req, res, next) => {
  const thingObject = JSON.parse(req.body.sauce)
    delete thingObject._id;
    const Sauce = new Thing({
    // requetes de formulaire  
      ...thingObject,
    // image 
      imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`,
    //  données neutres
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    Sauce.save()
    // sauvegarde dansla base de donnée
      .then(() => res.status(201), console.log(Sauce))
      .catch(error => res.status(400).json({ error }));
  }

exports.AfficherUnobj =  (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  }
  
  exports.ModifierObj =  (req, res, next) => {

    const sauceObject = req.file ?
    // si la requete contient une image
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    } : 
    // sinon
    { ...req.body } ;

  sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then((sauce) => res.status(200).send({ sauce }))
    .catch(error => res.status(400).json({ error }));
};

  exports.suppObjet = (req, res, next) => {
    sauce.findOne({_id: req.params.id})
    .then(thing =>{
     const filename = thing.imageUrl.split('/image/')[1]
    //  Suppresssion de l'image dans le dossier back
     fs.unlink(`./back/image/${filename}`, ()=>{
       sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
     });
    })
    .catch(error => res.status(500).json({ error }));
  };


  exports.afficherBaseDd = (req, res, next) => {
    sauce.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  }

  exports.likes = (req, res, next) => {
    // Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
    // Like présent dans le body
    let like = req.body.like
    // On prend le userID
    let userId = req.body.userId
    // On prend l'id de la sauce
    let sauceId = req.params.id
  
    if (like === 1) { // Si il s'agit d'un like
      sauce.updateOne({
          _id: sauceId
        }, {
          // On push l'utilisateur et on incrémente le compteur de 1
          $push: {
            usersLiked: userId
          },
          $inc: {
            likes: +1
          }, // On incrémente de 1
        })
        .then(() => res.status(200).json({
          message: 'j\'aime ajouté !'
        }))
        .catch((error) => res.status(400).json({
          error
        }))
    }
    if (like === -1) {
      sauce.updateOne( // S'il s'agit d'un dislike
          {
            _id: sauceId
          }, {
            $push: {
              usersDisliked: userId
            },
            $inc: {
              dislikes: +1
            }, // On incrémente de 1
          }
        )
        .then(() => {
          res.status(200).json({
            message: 'Dislike ajouté !'
          })
        })
        .catch((error) => res.status(400).json({
          error
        }))
    }
    if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
      sauce.findOne({
          _id: sauceId
        })
        .then((Sauce) => {
          if (Sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
            sauce.updateOne({
                _id: sauceId
              }, {
                $pull: {
                  usersLiked: userId
                },
                $inc: {
                  likes: -1
                }, // On incrémente de -1
              })
              .then(() => res.status(200).json({
                message: 'Like retiré !'
              }))
              .catch((error) => res.status(400).json({
                error
              }))
          }
          if (Sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
            sauce.updateOne({
                _id: sauceId
              }, {
                $pull: {
                  usersDisliked: userId
                },
                $inc: {
                  dislikes: -1
                }, // On incrémente de -1
              })
              .then(() => res.status(200).json({
                message: 'Dislike retiré !'
              }))
              .catch((error) => res.status(400).json({
                error
              }))
          }
        })
        .catch((error) => res.status(404).json({
          error
        }))
    }
  }