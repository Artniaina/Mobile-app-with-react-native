const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  preference: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_image: {
    type: String,
    required: false 
  },
  /** likedAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }] */ // Liste des identifiants des animaux aimés par l'utilisateur
});

const User = mongoose.model('User', userSchema);

module.exports = User;
