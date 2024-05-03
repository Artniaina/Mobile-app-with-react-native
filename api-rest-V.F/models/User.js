const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
