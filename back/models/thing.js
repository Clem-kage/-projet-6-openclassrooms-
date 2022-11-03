// modèle d'une sauce
const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: [15, 'le nombre maximum de caractéres de 15']},
  manufacturer: { type: String, required: true, maxlength: [25, 'le nombre maximum de caractéres de 25'] },
  description: { type: String, required: true, maxlength: [50, 'le nombre maximum de caractéres de 50'] },
  mainPepper: { type: String, required: true , maxlength: [20, 'le nombre maximum de caractéres de 20']},
  imageUrl: { type: String },
  userId: { type: String, required: true },
  usersLiked: {
    type: [String]
  },
  usersDisliked: {
    type: [String]
  },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
});

module.exports = mongoose.model('sauce', thingSchema);