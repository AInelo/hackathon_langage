from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Create a speech recognition pipeline using a pre-trained model
pipe = pipeline("automatic-speech-recognition", model="chrisjay/fonxlsr")

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    # Vérifie si le fichier audio est présent dans la demande
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']

    # Effectue la transcription audio en utilisant le modèle
    transcription = pipe(audio_file)

    return jsonify({'transcription': transcription['text']}), 200

if __name__ == '__main__':
    app.run(debug=True)
