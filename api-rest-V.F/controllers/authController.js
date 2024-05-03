const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Contrôleur d'authentification pour l'utilisateur
exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    console.log("Name received:", name);

    // Recherchez l'utilisateur dans la base de données par nom
    const user = await User.findOne({ name });

    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};
