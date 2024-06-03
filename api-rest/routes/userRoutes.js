const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const profileUpload = require("../utils/profileUpload");

router.post(
  "/users",
  profileUpload.single("profile_image"),
  userController.createUser
);

router.get("/users", userController.getAllUsers);

router.get("/users/:id", userController.getUserById);

router.put("/users/:id", userController.updateUserById);

router.delete("/users/:id", userController.deleteUserById);

module.exports = router;
