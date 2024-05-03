const bcrypt = require('bcrypt');
const User = require('../models/User');



exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'email existe déjà dans la base de données
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le mot de passe haché
    let user;
    console.log(req.file.path)
    if (req.file) {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        profile_image: req.file.path // Enregistrez le chemin de l'image dans la base de données
      });
    } else {
      user = await User.create({ name, email, password: hashedPassword ,profile_image});
    }
    
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur par son ID
exports.updateUserById = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      password
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur par son ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Action: liker un animal
// exports.likeAnimal = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const animal = await Animal.findById(req.params.animalId);

//     // Vérifiez si l'animal existe
//     if (!animal) {
//       return res.status(404).json({ message: "Animal not found" });
//     }

//     // Vérifiez si l'utilisateur a déjà aimé cet animal
//     if (user.likedAnimals.includes(req.params.animalId)) {
//       // Si oui, supprimez le like
//       user.likedAnimals.pull(req.params.animalId);
//       animal.likedBy.pull(user._id); // Supprimer l'utilisateur de la liste des aimés par l'animal
//       await Promise.all([user.save(), animal.save()]);
//       return res.status(200).json({ message: "Like removed successfully" });
//     } else {
//       // Sinon, ajoutez le like
//       user.likedAnimals.push(req.params.animalId);
//       animal.likedBy.push(user._id); // Ajouter l'utilisateur à la liste des aimés par l'animal
//       await Promise.all([user.save(), animal.save()]);
//       return res.status(200).json({ message: "Animal liked successfully" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
