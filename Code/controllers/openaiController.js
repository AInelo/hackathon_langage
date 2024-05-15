const openai = require('openai');
require('dotenv').config();

openai.api_key = process.env.OPENAI_API_KEY;

const OpenaiGenerateImage = async (req, res) => {

    try {
        const response = await openai.Image.create({
          prompt: "Je suis un artisant graphiste béninois, et j'ai besoin d'inspiration pour mettre en valeur la femme béninoise dans sa valeur culturel intrinsèque. Fourni moi l'image pour m'inspirer",
          n: 1,
          size: "1024x1024"
        });
        
        const imageUrl = response.data[0].url;
        return imageUrl;
      } catch (error) {
        console.error("Erreur lors de la génération de l'image:", error);
        throw error;
      }
}



const OpenaiGenerateAudioFromText = async (req, res) => {
    try {
        const response = await openai.TextToSpeech.create({
          text: "Je suis un artisant graphiste béninois, et j'ai besoin d'inspiration pour mettre en valeur la femme béninoise dans sa valeur culturel intrinsèque.",
          voice: "fr-FR-Wavenet-C",
          speed: 1
        });
    
        const audioUrl = response.data[0].url;
        return audioUrl;
      } catch (error) {
        console.error("Erreur lors de la génération de l'audio:", error);
        throw error;
      }
}




module.exports = {
    OpenaiGenerateImage,
    OpenaiGenerateAudioFromText
};

