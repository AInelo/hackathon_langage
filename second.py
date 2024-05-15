from flask import Flask, request, jsonify
import requests
from transformers import pipeline

app = Flask(__name__)

pipe = pipeline("automatic-speech-recognition", model="chrisjay/fonxlsr")

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    audio_link = request.json.get('audio_link')  # Assuming JSON data with 'audio_link' key
    if not audio_link:
        return jsonify({'error': 'No audio link provided'}), 400

    # Download the audio file from the provided link
    try:
        audio_response = requests.get(audio_link)
        audio_response.raise_for_status()  # Raise exception for any HTTP errors
        audio_content = audio_response.content
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to download audio file: ' + str(e)}), 400

    # Perform transcription on the downloaded audio file
    try:
        transcription = pipe(audio_content)
        return jsonify({'transcription': transcription['text']}), 200
    except Exception as e:
        return jsonify({'error': 'Transcription failed: ' + str(e)}), 500



# def transcribe_audio():
#     if 'audio' not in request.files:
#         return jsonify({'error': 'No audio file provided'}), 400
    
#     audio_file = request.files['audio']

#     transcription = pipe(audio_file)

#     return jsonify({'transcription': transcription['text']}), 200

# def transcribe_audio():
#     audio_link = request.json.get('audio_link')  # Assuming JSON data with 'audio_link' key
#     if not audio_link:
#         return jsonify({'error': 'No audio link provided'}), 400

#     # Download the audio file from the provided link
#     try:
#         audio_response = requests.get(audio_link)
#         audio_response.raise_for_status()  # Raise exception for any HTTP errors
#         audio_content = audio_response.content
#     except requests.exceptions.RequestException as e:
#         return jsonify({'error': 'Failed to download audio file: ' + str(e)}), 400

#     # Perform transcription on the downloaded audio file
#     try:
#         transcription = pipe(audio_content)
#         return jsonify({'transcription': transcription['text']}), 200
#     except Exception as e:
#         return jsonify({'error': 'Transcription failed: ' + str(e)}), 500

