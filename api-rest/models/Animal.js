const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  image: {
    type: String,
    required: false 
  },
 /* likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] */// Liste des utilisateurs ayant aimé cet animal
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
