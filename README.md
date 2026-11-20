🎭 MOOD-DETECTER

AI-Powered Facial Emotion Detection System

<p align="center">
  <b>Detect human emotions using Artificial Intelligence and Deep Learning.</b>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Python-3.x-blue?logo=python" />
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/TensorFlow-Deep%20Learning-orange?logo=tensorflow" />
  <img src="https://img.shields.io/badge/OpenCV-Computer%20Vision-green?logo=opencv" />
  <img src="https://img.shields.io/badge/Status-Development-yellow" />
</p>

⸻

📌 Overview

MOOD-DETECTER is an AI-powered facial emotion recognition application that identifies human emotions from facial expressions using Deep Learning and Computer Vision.

The system uses a pretrained MobileNetV2 architecture with transfer learning and fine-tuning to classify facial expressions into seven different emotion categories.

The application provides an interactive web interface built with React.js, allowing users to upload images or use a camera for emotion detection.

⸻

✨ Features

* 📸 Real-Time Camera Detection – Capture facial expressions using a camera.
* 🖼️ Image Upload – Upload an image for emotion analysis.
* 🧠 Deep Learning Model – Uses MobileNetV2 with transfer learning.
* 😊 Seven Emotion Categories – Recognizes different facial emotions.
* 📊 Prediction Confidence – Displays prediction confidence.
* ⚡ Interactive Dashboard – User-friendly and responsive interface.
* 🔗 Frontend and Backend Integration – Connects React.js with a Python-based backend.

⸻

😊 Emotion Categories

The model recognizes seven facial emotions:

Emotion	Description
😠 Angry	Anger or frustration
🤢 Disgust	Dislike or disgust
😨 Fear	Fear or nervousness
😄 Happy	Happiness or joy
😐 Neutral	No prominent emotional expression
😢 Sad	Sadness or disappointment
😲 Surprise	Surprise or astonishment

⸻

🛠️ Technology Stack

Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

Backend

* Python
* Flask/API integration
* OpenCV
* NumPy

Machine Learning & Deep Learning

* TensorFlow
* Keras
* MobileNetV2
* Transfer Learning
* Fine-Tuning
* Scikit-learn

Tools

* Google Colab
* VS Code
* Git & GitHub
* Postman

⸻

🧠 Model Architecture

The project uses MobileNetV2, a lightweight convolutional neural network architecture pretrained on ImageNet.

Model Development Process

1. Dataset Collection: Collected facial expression images from the KDEF dataset.
2. Data Preprocessing: Organized images into seven emotion categories and resized them to 224 × 224 pixels.
3. Data Splitting: Divided the dataset into training, validation, and testing sets.
4. Transfer Learning: Used pretrained MobileNetV2 to extract facial features.
5. Freezing Layers: Initially froze pretrained layers to preserve learned features.
6. Fine-Tuning: Unfroze selected layers to adapt the model to facial emotion recognition.
7. Classification: Added custom classification layers to predict seven emotion categories.
8. Evaluation: Evaluated model performance using accuracy, precision, recall, F1-score, and a confusion matrix.

Model Performance

Metric	Result
Test Accuracy	75.84%
Number of Emotion Classes	7
Input Image Size	224 × 224
Architecture	MobileNetV2

Accuracy represents the reported evaluation result on the test dataset.

⸻

📂 Dataset

The project uses the KDEF (Karolinska Directed Emotional Faces) facial expression dataset.

Dataset characteristics:

* Seven emotion categories.
* Approximately 2,972 facial images.
* Different facial expressions.
* Images organized into emotion-specific folders.

The dataset is used for training and evaluating the facial emotion recognition model.

⸻

📁 Project Structure

MOOD-DETECTER/
│
├── emotion-backend/
│   ├── app.py
│   └── models/
│       └── app.py
│
├── src/
│   ├── components/
│   │   ├── CameraPanel.jsx
│   │   ├── ResultCard.jsx
│   │   └── UploadPanel.jsx
│   │
│   ├── App.jsx
│   ├── api.js
│   ├── main.jsx
│   └── styles.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md

⸻

⚙️ Installation and Setup

Follow these steps to run the project locally.

1. Clone the Repository

git clone https://github.com/Suryakantapani/MOOD-DETECTER.git

2. Navigate to the Project

cd MOOD-DETECTER

3. Install Frontend Dependencies

npm install

4. Start the Frontend

npm run dev

The frontend will generally run at:

http://localhost:5173

5. Configure the Backend

Open another terminal:

cd emotion-backend

Create a virtual environment:

python3 -m venv venv

Activate it on macOS/Linux:

source venv/bin/activate

Install the backend dependencies:

pip install -r requirements.txt

Start the Python backend using the appropriate entry point configured in app.py.

Note: Ensure that the trained .keras model is available at the model path configured in the backend.

⸻

📸 Screenshots

Add your project screenshots here to demonstrate the user interface and model predictions.

Dashboard

<!-- Add dashboard screenshot here -->

Emotion Detection

<!-- Add emotion detection screenshot here -->

Prediction Results

<!-- Add prediction result screenshot here -->

⸻

🚀 Future Improvements

* Integrate facial and speech emotion recognition.
* Improve model accuracy through advanced architectures.
* Enhance real-time emotion detection performance.
* Add emotion history and analytics.
* Improve performance under different lighting conditions.
* Deploy the application on a cloud platform.

⸻

👨‍💻 Developer

Suryakanta Pani

B.Tech – Computer Science and Engineering
ITER, SOA University, Bhubaneswar

GitHub: @Suryakantapani

⸻

📜 License

This project is developed for educational and research purposes.

⸻

<p align="center">
  ⭐ If you find this project interesting, consider giving it a star!
</p>
<p align="center">
  <b>MOOD-DETECTER | Turning Facial Expressions into Insights</b>
</p>
