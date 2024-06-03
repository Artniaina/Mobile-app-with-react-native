const Animal = require("../models/Animal");

exports.createAnimal = async (req, res) => {
  try {
    const { name, type, color, description } = req.body;
    const image = req.file.path;
    const animal = await Animal.create({
      name,
      type,
      color,
      description,
      image,
    });
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.updateAnimalById = async (req, res) => {
  try {
    const { name, type, color, description, age, genre } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        color,
        description,
        age,
        genre,
        image
      },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(updatedAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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

exports.getLikedUsers = async (req, res) => {
  try {
    const animalId = req.params.animalId;

    const animal = await Animal.findById(animalId).populate(
      "likedBy",
      "name email"
    );

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(animal.likedBy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
