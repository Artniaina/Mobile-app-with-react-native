
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour l'authentification par email
router.post('/login', authController.login);

module.exports = router;
