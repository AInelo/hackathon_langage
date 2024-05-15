const express = require('express');
const app = express();
const session = require('express-session');
const os = require('os');
const path = require('path');
const memberRoutes = require('./routes/memberRoutes');
const userRoutes = require('./routes/userRoutes');
const discussRoutes = require('./routes/discussRoutes')
const openaiRoutes = require('./routes/openaiRoutes')
const bcrypt = require('bcrypt');
const multer = require('multer');
const axios = require('axios');
require('dotenv').config();
const openai = require('openai');

openai.api_key = process.env.OPENAI_API_KEY;


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
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
  const transcriptionAPIUrl = process.env.TRANSFORMER_URL_API_SPEECHTOTEXT;
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

// app.post('/image', upload.single('audio'), async (req, res) => {
//   // Récupérer les valeurs sélectionnées dans les balises <select>
//   const transcriptionAPIUrl = process.env.TRANSFORMER_URL_API_SPEECHTOTEXT;
//   const audioFile = req.file; // Fichier audio

//   // Construire l'URL de l'API de transcription
  
//   try {
      
    

//     const audioFilePath = path.resolve(__dirname, audioFile.path); // Convertir le chemin relatif en chemin absolu
//     console.log('Chemin absolu du fichier audio: ' + audioFilePath);
//     // // Envoyer une requête POST à l'API de transcription avec le lien vers le fichier audio
//       const response = await axios.post(transcriptionAPIUrl, {
//           audio_link: `${audioFilePath}` // Utilisez le chemin du fichier audio local
//       });

//       const transcription0 = response.data.transcription;

//       console.log(transcription0);

    //   const response1 = await axios.post(traductionAPIUrl, transcription,{
    //     headers: {
    //         'Content-Type': 'text/plain', // Indiquer que les données envoyées sont en JSON
    //     }
    // });

    

// Données à envoyer dans la requête POST
// const postData = {
//   prompt: transcription0,
//   n: 1,
//   size: "1024x1024"
// };

// // Configurer les options de la requête POST
// const config = {
//   headers: {
//     'Content-Type': 'application/json', // Indiquer que les données envoyées sont en JSON
//     'Authorization': openai.api_key // Ajouter votre clé API dans les en-têtes
//   }
// };
// const imageUrl ='';
// // Envoyer la requête POST à l'API DALL-E avec Axios
// axios.post('https://api.openai.com/v1/engines/davinci/dalle/generate', postData, config)
//   .then(response => {
//     // Récupérer l'URL de l'image générée à partir de la réponse
//     imageUrl = response.data['outputs'][0]['image'];
//     console.log('URL de l\'image générée:', imageUrl);
//   })
//   .catch(error => {
//     console.error('Erreur lors de la requête POST:', error);
//   });


      //console.log(audio_link);

      // Extraire la transcription de la réponse de l'API
      // const traduction = response1.data.translation;


      // Répondre au client avec la transcription
//       imageUrl = audioFile.path;
//       console.log("le chemin du fichier est : " + fileFinale);
//       res.json({ url : imageUrl });
//   } catch (error) {
//       console.error('Erreur lors de la transcription audio :', error);
//       res.status(500).json({ error: 'Erreur lors de la transcription audio' });
//   }
// });


// Routes
app.use('/users', userRoutes);
app.use('/api/v1/member', memberRoutes);
app.use('/api/v1/discuss', discussRoutes);
app.use('/api/v1/openai', openaiRoutes);
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
    app.listen(port, () =>
    console.log(`Server is listening on http://${ipAddress}:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

// Appeler la fonction pour démarrer le serveur
start();
