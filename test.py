from flask import Flask, request, jsonify
from transformers import pipeline
import requests
import os
import librosa
app = Flask(__name__)


pipe = pipeline("automatic-speech-recognition", model="chrisjay/fonxlsr")

@app.route('/transcribe', methods=['POST'])

# def transcribe_audio():
#     if 'audio' not in request.files:
#         return jsonify({'error': 'No audio file provided'}), 400
    
#     audio_file = request.files['audio']

#     # Charger le fichier audio avec librosa pour obtenir un tableau NumPy
#     try:
#         audio_data, _ = librosa.load(audio_file, sr=16000)
#     except Exception as e:
#         return jsonify({'error': 'Failed to load audio file: ' + str(e)}), 400

#     # Effectuer la transcription sur le fichier audio chargé
#     try:
#         transcription = pipe(audio_data)
#         return jsonify({'transcription': transcription['text']}), 200
#     except Exception as e:
#         return jsonify({'error': 'Transcription failed: ' + str(e)}), 500


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

# def transcribe_audio():
#     audio_link = request.json.get('audio_link')
#     if not audio_link:
#         return jsonify({'error': 'No audio link provided'}), 400

#     # Download the audio file from the provided link
#     try:
#         audio_response = requests.get(audio_link)
#         audio_response.raise_for_status()
#         audio_content = audio_response.content
#     except requests.exceptions.RequestException as e:
#         return jsonify({'error': 'Failed to download audio file: ' + str(e)}), 400

#     # Save the audio content to a temporary file
#     temp_audio_path = 'temp_audio.wav'
#     with open(temp_audio_path, 'wb') as f:
#         f.write(audio_content)

#     # Load the audio file with librosa to get a NumPy array
#     try:
#         audio_data, _ = librosa.load(temp_audio_path, sr=16000)
#     except Exception as e:
#         return jsonify({'error': 'Failed to load audio file: ' + str(e)}), 400

#     # Perform transcription on the audio data
#     try:
#         transcription = pipe(audio_data)
#         return jsonify({'transcription': transcription['text']}), 200
#     except Exception as e:
#         return jsonify({'error': 'Transcription failed: ' + str(e)}), 500
#     finally:
#         if os.path.exists(temp_audio_path):
#             os.remove(temp_audio_path)


# def transcribe_audio():
#     audio_link = request.json.get('audio_link')
#     if not audio_link:
#         return jsonify({'error': 'No audio link provided'}), 400

#     # Check if the audio_link is a URL or a local file path
#     if audio_link.startswith('http://') or audio_link.startswith('https://'):
#         # Download the audio file from the provided link
#         try:
#             audio_response = requests.get(audio_link)
#             audio_response.raise_for_status()
#             audio_content = audio_response.content
#         except requests.exceptions.RequestException as e:
#             return jsonify({'error': 'Failed to download audio file: ' + str(e)}), 400

#         # Save the audio content to a temporary file
#         temp_audio_path = 'temp_audio.webm'
#         with open(temp_audio_path, 'wb') as f:
#             f.write(audio_content)
#     else:
#         # Assume it's a local file path
#         if not os.path.exists(audio_link):
#             return jsonify({'error': 'File does not exist: ' + audio_link}), 400
#         temp_audio_path = audio_link

#     # Load the audio file with librosa to get a NumPy array
#     try:
#         audio_data, _ = librosa.load(temp_audio_path, sr=16000)
#     except Exception as e:
#         return jsonify({'error': 'Failed to load audio file: ' + str(e)}), 400

#     # Perform transcription on the audio data
#     try:
#         transcription = pipe(audio_data)
#         return jsonify({'transcription': transcription['text']}), 200
#     except Exception as e:
#         return jsonify({'error': 'Transcription failed: ' + str(e)}), 500
#     finally:
#         if audio_link.startswith('http://') or audio_link.startswith('https://'):
#             if os.path.exists(temp_audio_path):
#                 os.remove(temp_audio_path)

def transcribe_audio():
    audio_link = request.json.get('audio_link')
    if not audio_link:
        return jsonify({'error': 'No audio link provided'}), 400

    # Check if the audio_link is a URL or a local file path
    if audio_link.startswith('http://') or audio_link.startswith('https://'):
        # Handle URL case
        try:
            audio_response = requests.get(audio_link)
            audio_response.raise_for_status()
            temp_audio_path = 'temp_audio.webm'
            with open(temp_audio_path, 'wb') as f:
                f.write(audio_response.content)
        except requests.exceptions.RequestException as e:
            return jsonify({'error': 'Failed to download audio file: ' + str(e)}), 400
    else:
        # Handle local file path case
        if not os.path.exists(audio_link):
            return jsonify({'error': 'File does not exist: ' + audio_link}), 400
        temp_audio_path = audio_link

    # Load the audio file with librosa to get a NumPy array
    try:
        audio_data, _ = librosa.load(temp_audio_path, sr=16000)
    except Exception as e:
        return jsonify({'error': 'Failed to load audio file: ' + str(e)}), 400

    # Perform transcription on the audio data
    try:
        transcription = pipe(audio_data)
        return jsonify({'transcription': transcription['text']}), 200
    except Exception as e:
        return jsonify({'error': 'Transcription failed: ' + str(e)}), 500
    finally:
        if audio_link.startswith('http://') or audio_link.startswith('https://'):
            if os.path.exists(temp_audio_path):
                os.remove(temp_audio_path)



if __name__ == '__main__':
    # app.run(debug=True)
      app.run(debug=True, host='192.168.1.247', port=5000)
