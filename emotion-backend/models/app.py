import os
import cv2
import numpy as np
import tensorflow as tf

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
EMOTIONS = [
    "angry",
    "disgust",
    "fear",
    "happy",
    "neutral",
    "sad",
    "surprise"
]
MODEL_PATH = os.path.join(
    "models",
    "final_emotion_model_75_84.keras"
)
model = tf.keras.models.load_model(MODEL_PATH)
print("Emotion model loaded successfully!")
face_detector = cv2.CascadeClassifier(
    cv2.data.haarcascades +
    "haarcascade_frontalface_default.xml"
)
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    file = request.files["image"]
    image_bytes = np.frombuffer(
        file.read(),
        np.uint8
    )
    image = cv2.imdecode(
        image_bytes,
        cv2.IMREAD_COLOR
    )
    if image is None:
        return jsonify({"error": "Invalid image"}), 400
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )
    faces = face_detector.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(50, 50)
    )
    if len(faces) == 0:
        return jsonify({"error": "No face detected"}), 400
    x, y, w, h = max(
        faces,
        key=lambda face: face[2] * face[3]
    )
    face = image[y:y+h, x:x+w]
    face = cv2.resize(face, (224, 224))
    face = cv2.cvtColor(
        face,
        cv2.COLOR_BGR2RGB
    )
    face = face.astype("float32") / 255.0
    face = np.expand_dims(face, axis=0)
    predictions = model.predict(
        face,
        verbose=0
    )[0]
    predicted_index = int(np.argmax(predictions))
    emotion = EMOTIONS[predicted_index]
    confidence = float(predictions[predicted_index])
    scores = {
        EMOTIONS[i]: float(predictions[i])
        for i in range(len(EMOTIONS))
    }
    return jsonify({
        "emotion": emotion,
        "confidence": confidence,
        "scores": scores
    })
MODEL_PATH = os.path.join(
    "models",
    "final_emotion_model_75_84.keras"
)
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )