# Welcomme Dear to our Repo 

1. Firstly clone the project 
```bash
git clone git@github.com:AInelo/hackathon_langage.git
```
or 

```bash
git clone https://github.com/AInelo/hackathon_langage.git
```

2. Enter in ./Code/ repository Run in the project Racine
```bash
npm install
```

3. After run 
```bash
npm start
```

4. We just deploy the Speech voice to Fon texte model of transformers IA and we've runned it on some link and PORT 
Download all dependency "transformer", "flask", "numpy", "PyTorch"

```bash
pip install <Dependency>
``` 

OUR CODE fort API is : 
```bash
from flask import Flask, request, jsonify
from transformers import pipeline
import requests
import os
import librosa
app = Flask(__name__)


pipe = pipeline("automatic-speech-recognition", model="chrisjay/fonxlsr")

@app.route('/transcribe', methods=['POST'])

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

```