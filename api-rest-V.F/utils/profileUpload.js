const multer = require('multer');
const path = require('path');

// Configuration pour l'upload d'image de profil
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/profile_image'); // Répertoire de stockage des images de profil
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + extension);
  }
});

// Fonction de filtrage pour vérifier le type de fichier
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées!'), false);
  }
};

// Middleware de téléchargement pour les images de profil
const profileUpload = multer({ storage: profileStorage, fileFilter: fileFilter });

module.exports = profileUpload;
