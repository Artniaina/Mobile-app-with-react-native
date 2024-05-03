const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./config/db'); 
const animalRoutes = require('./routes/animalRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.json());
app.use(cors());

// Utilisation des routes
app.use('/', animalRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);

// Vérification de la connexion à la base de données
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbConnection.once('open', () => {
  console.log('Connection ok XD');
});

module.exports = app;
