const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      firstname,
      tel,
      adresse,
      preference,
      birthdate,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    console.log(req.file.path);
    if (req.file) {
      user = await User.create({
        name,
        firstname,
        tel,
        adresse,
        preference,
        birthdate,
        email,
        password: hashedPassword,
        profile_image: req.file.path,
      });
    } else {
      user = await User.create({
        name,
        firstname,
        tel,
        adresse,
        preference,
        birthdate,
        email,
        password: hashedPassword,
        profile_image,
      });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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


exports.updateUserById = async (req, res) => {
  try {
    const {
      name,
      firstname,
      tel,
      adresse,
      preference,
      birthdate,
      email,
      password,
      profile_image
    } = req.body;


    let updatedUser;
    if (req.file) {
      const imageURL = req.file.path; 
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          firstname,
          tel,
          adresse,
          preference,
          birthdate,
          email,
          password,
          profile_image: imageURL 
        },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          firstname,
          tel,
          adresse,
          preference,
          birthdate,
          email,
          password
        },
        { new: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
