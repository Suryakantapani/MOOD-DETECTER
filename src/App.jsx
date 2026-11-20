import React, { useEffect, useState } from "react";
import UploadPanel from "./components/UploadPanel.jsx";
import CameraPanel from "./components/CameraPanel.jsx";
import ResultCard from "./components/ResultCard.jsx";
import { predictEmotion, isDemoMode } from "./api.js";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  async function analyze(f) {
    setFile(f);
    setResult(null);
    setError("");
    setLoading(true);
    try {
      setResult(await predictEmotion(f));
    } catch (e) {
      setError(e.message || "Something went wrong while analyzing the photo.");
    } finally {
      setLoading(false);
    }
  }
  function reset() {
    setFile(null);
    setResult(null);
    setError("");
  }
  return (
    <div className="app">
      <header>
        <h1>Emotion Detector</h1>
        <p>Upload or capture a face photo and see which emotion it shows.</p>
        {isDemoMode && (
          <p className="demo-note">Demo mode: results are random until VITE_API_URL is set.</p>
        )}
      </header>
      <main>
        {!file && (
          <section className="input-section">
            <UploadPanel onImage={analyze} disabled={loading} />
            <div className="or">or</div>
            <CameraPanel onCapture={analyze} disabled={loading} />
          </section>
        )}

        {file && loading && (
          <section className="status">
            <img className="preview small" src={preview} alt="Selected" />
            <div className="spinner" aria-label="Analyzing" />
            <p>Analyzing facial features…</p>
          </section>
        )}

        {file && error && (
          <section className="status">
            <img className="preview small" src={preview} alt="Selected" />
            <p className="error">{error}</p>
            <div className="row">
              <button className="btn" onClick={() => analyze(file)}>Try again</button>
              <button className="btn ghost" onClick={reset}>Choose another</button>
            </div>
          </section>
        )}

        {file && result && !loading && (
          <section>
            <ResultCard preview={preview} result={result} />
            <div className="row center">
              <button className="btn" onClick={reset}>Analyze another photo</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
