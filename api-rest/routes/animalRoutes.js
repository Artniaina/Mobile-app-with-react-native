const express = require("express");
const router = express.Router();
const animalController = require("../controllers/AnimalController");
const upload = require("../utils/fileUpload");

router.post("/animals", upload.single("image"), animalController.createAnimal);

router.get("/animals", animalController.getAllAnimals);

router.get("/animals/:id", animalController.getAnimalById);

router.put(
  "/animals/:id",
  upload.single("image"),
  animalController.updateAnimalById
);

router.delete("/animals/:id", animalController.deleteAnimalById);

module.exports = router;
