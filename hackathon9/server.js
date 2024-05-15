const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 3000;

// Configuration de Multer pour la gestion des fichiers audio


app.use(express.static('public'));

// Middleware pour gérer les requêtes JSON
app.use(express.json());



// Endpoint pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Express !');
});

// Endpoint pour recevoir des données POST
app.post('/data', (req, res) => {
  console.log('Données reçues :', req.body);
  res.send('Données reçues avec succès !');
});

// Configuration de Multer pour la gestion des fichiers audio
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Répertoire de stockage des fichiers audio
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Utilisation du nom de fichier d'origine
    }
});
const upload = multer({ storage: storage });

// Point de terminaison pour la réception de fichiers audio
app.post('/record', upload.single('audio'), (req, res) => {
  // Récupérer les valeurs sélectionnées dans les balises <select>
  const language1 = req.body.language1;
  const language2 = req.body.language2;
  const speaker = req.body.speaker;
  const audioFile = req.file; // Fichier audio

  // Effectuer différentes actions en fonction des valeurs sélectionnées
  // Par exemple, vous pouvez utiliser les valeurs pour appeler une API de traduction, de reconnaissance vocale, etc.
  console.log('Langue 1:', language1);
  console.log('Langue 2:', language2);
  console.log('Speaker:', speaker);

  // Vous pouvez également utiliser le fichier audio envoyé avec req.file
  console.log('Fichier audio:', req.file);

  // Répondre au client pour indiquer que les données ont été reçues avec succès
  // Réponse au frontend avec les données
  res.json({ audio: audioFile, text: ' Texte de test', speaker: speaker });
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
