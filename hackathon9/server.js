const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();

const PORT = 3003;
const path = require('path');
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

app.use('/uploads', express.static('uploads'));



// Point de terminaison pour la réception de fichiers audio
app.post('/record', upload.single('audio'), async (req, res) => {
  // Récupérer les valeurs sélectionnées dans les balises <select>
  const language1 = req.body.language1;
  const language2 = req.body.language2;
  const speaker = req.body.speaker;
  const audioFile = req.file; // Fichier audio

  // Construire l'URL de l'API de transcription
  const transcriptionAPIUrl = 'http://192.168.1.247:5000/transcribe';
  const traductionAPIUrl = 'https://translator-api.glosbe.com/translateByLangWithScore?sourceLang=fon&targetLang=fr';

  try {
      
    console.log('nature du speaker= '+ speaker)

    const audioFilePath = path.resolve(__dirname, audioFile.path); // Convertir le chemin relatif en chemin absolu
    console.log('Chemin absolu du fichier audio: ' + audioFilePath);
    // // Envoyer une requête POST à l'API de transcription avec le lien vers le fichier audio
      const response = await axios.post(transcriptionAPIUrl, {
          audio_link: `${audioFilePath}` // Utilisez le chemin du fichier audio local
      });

      const transcription = response.data.transcription;

      console.log(transcription);

      const response1 = await axios.post(traductionAPIUrl, transcription,{
        headers: {
            'Content-Type': 'text/plain', // Indiquer que les données envoyées sont en JSON
        }
    });

      //console.log(audio_link);

      // Extraire la transcription de la réponse de l'API
      const traduction = response1.data.translation;


      // Répondre au client avec la transcription
      fileFinale = audioFile.path;
      console.log("le chemin du fichier est : " + fileFinale);
      res.json({ audio: audioFile, text: traduction, speaker: speaker });
  } catch (error) {
      console.error('Erreur lors de la transcription audio :', error);
      res.status(500).json({ error: 'Erreur lors de la transcription audio' });
  }
});

ipAdress = "192.168.1.247"

// Démarrer le serveur
app.listen(PORT,  () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
