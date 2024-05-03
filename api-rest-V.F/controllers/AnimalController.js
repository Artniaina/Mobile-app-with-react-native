const Animal = require('../models/Animal');

 // Création  animaux
exports.createAnimal = async (req, res) => {
  try {
    const { name, type, color, description } = req.body;
    const image = req.file.path;
    const animal = await Animal.create({ name, type, color,description, image });
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 // Récupérer la liste des animaux 
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 // Récupérer un animal par son id
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Mise à jour information sur un animal
exports.updateAnimalById = async (req, res) => {
  try {
    const { name, type, color ,description,age, genre,} = req.body;
    let imageUrl;

    // Vérifie si un fichier a été téléchargé dans la requête
    if (req.file) {
      imageUrl = req.file.path; 
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, {
      name,
      type,
      color,
      description,
      age, 
      genre,
      imageUrl 
    }, { new: true });

    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Supprimer un animal
exports.deleteAnimalById = async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Afficher  la liste des utilisateurs qui ont aimé l' animal
exports.getLikedUsers = async (req, res) => {
  try {
    const animalId = req.params.animalId;

   
    const animal = await Animal.findById(animalId).populate('likedBy', 'name email');

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(animal.likedBy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


