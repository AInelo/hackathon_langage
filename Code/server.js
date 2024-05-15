const express = require('express');
const app = express();
const session = require('express-session');
const os = require('os');
const path = require('path');
const memberRoutes = require('./routes/memberRoutes');
const userRoutes = require('./routes/userRoutes');
const bcrypt = require('bcrypt');

const connectDB = require('./db/connectDB');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(
  session({
    secret: 'lionel',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120 * 1000, // 30 secondes en millisecondes
    },
  })
);

// Middleware de vérification d'authentification
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    // Si authentifié, autorisez la requête à continuer
    next();
  } else {
    // Si non authentifié, redirigez vers la page auth.html
    res.redirect('/auth.html');
  }
};

// Route protégée
app.get('/updatemember.html', requireAuth, (req, res) => {
  // La route sera uniquement accessible par les utilisateurs authentifiés
  res.sendFile(path.join(__dirname, 'public', 'updatemember.html'));
});

// Middleware pour analyser les données JSON et urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir des fichiers statiques depuis le dossier public
app.use(express.static('./public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/users', userRoutes);
app.use('/api/v1/member', memberRoutes);

// Middleware pour gérer les erreurs 404
app.use(notFound);

// Middleware pour gérer les erreurs
app.use(errorHandlerMiddleware);

// Obtenez l'adresse IP de la première interface réseau non interne
const networkInterfaces = os.networkInterfaces();
const ipAddress = Object.values(networkInterfaces)
  .flat()
  .filter((iface) => iface.family === 'IPv4' && !iface.internal)[0].address;

// Définir le port
const port =  5003;

// Démarrer le serveur
const start = async () => {
  try {
    // Connexion à la base de données
    await connectDB(process.env.MONGO_URI);

    // Lancer le serveur
    app.listen(port, ipAddress, () =>
    console.log(`Server is listening on http://${ipAddress}:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

// Appeler la fonction pour démarrer le serveur
start();
