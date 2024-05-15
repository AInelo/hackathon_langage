from flask import Flask, request, jsonify
from transformers import pipeline
import requests
import os
import librosa
app = Flask(__name__)


pipe = pipeline("automatic-speech-recognition", model="chrisjay/fonxlsr")

@app.route('/transcribe', methods=['POST'])

def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']

    # Charger le fichier audio avec librosa pour obtenir un tableau NumPy
    try:
        audio_data, _ = librosa.load(audio_file, sr=16000)
    except Exception as e:
        return jsonify({'error': 'Failed to load audio file: ' + str(e)}), 400

    # Effectuer la transcription sur le fichier audio chargé
    try:
        transcription = pipe(audio_data)
        return jsonify({'transcription': transcription['text']}), 200
    except Exception as e:
        return jsonify({'error': 'Transcription failed: ' + str(e)}), 500


if __name__ == '__main__':
    # app.run(debug=True)
      app.run(debug=True, host='192.168.1.247', port=5000)
