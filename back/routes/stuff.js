const express = require('express');

// appel de la fonction router
const route = express.Router()

// // appel du modèle sauce
// const Thing = require('../models/thing');

// appel du controlleur avec les fonction requises
const controller = require('../controller/stuff')

// appel au middleware qui gère les autorisation de like et de creation ou modification de sauces
const auth = require('../middlewares/auth')

// appel a multer pour le management des images
const multer = require('../middlewares/multerConfig');


route.post('/', auth, multer, controller.enregistrer);

//afficher las donnés indiv
route.get('/:id', auth, controller.AfficherUnobj);

//modifier un objet
route.put('/:id', auth, multer, controller.ModifierObj);

//supprimer un objet
route.delete('/:id', auth, controller.suppObjet);

//afficher les éléments enr dans labase de donnée
route.get('/', auth,  controller.afficherBaseDd);

//liker ou disliker des sauces
route.post('/:id/like', auth, controller.likes);

  module.exports = route;