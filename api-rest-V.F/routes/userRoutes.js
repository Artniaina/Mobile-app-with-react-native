const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const profileUpload = require('../utils/profileUpload');

// Route pour créer un utilisateur
router.post('/users', profileUpload.single('profile_image'), userController.createUser);
// Route pour récupérer tous les  utilisateurs
router.get('/users', userController.getAllUsers);
// Route pour récupérer  un utilisateur par son ID
router.get('/users/:id', userController.getUserById);
// Route pour mettre à jour  un utilisateur
router.put('/users/:id', userController.updateUserById);
// Route pour supprimer  un utilisateur
router.delete('/users/:id', userController.deleteUserById);
// Route pour liker un animal
//router.post('/animals/:animalId/like', authController.protect, userController.likeAnimal);


module.exports = router;
