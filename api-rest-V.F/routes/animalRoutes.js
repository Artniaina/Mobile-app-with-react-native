const express = require('express');
const router = express.Router();
const animalController = require('../controllers/AnimalController');
const upload = require('../utils/fileUpload');

// Route pour créer un animal
router.post('/animals', upload.single('image'), animalController.createAnimal)
// Route pour récupérer tous les animaux
router.get('/animals', animalController.getAllAnimals);
// Route pour récupérer un animal par son ID
router.get('/animals/:id', animalController.getAnimalById);
// Route pour mettre à jour un animal par son ID
router.put('/animals/:id', upload.single('image'), animalController.updateAnimalById);
// Route pour supprimer un animal par son ID
router.delete('/animals/:id', animalController.deleteAnimalById);
// Route pour obtenir la liste des utilisateurs ayant aimé un animal spécifique
// router.get('/animals/:animalId/liked-users', animalController.getLikedUsers);

module.exports = router;
