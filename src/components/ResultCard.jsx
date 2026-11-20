import React from "react";

const EMOJI = {
  angry: "😠",
  disgust: "🤢",
  fear: "😨",
  happy: "😄",
  neutral: "😐",
  sad: "😢",
  surprise: "😲",
};

export default function ResultCard({ preview, result }) {
  const sorted = Object.entries(result.scores || {}).sort((a, b) => b[1] - a[1]);
  const pct = (v) => `${(v * 100).toFixed(1)}%`;

  return (
    <div className="result">
      <img className="preview" src={preview} alt="Analyzed face" />
      <div className="result-body">
        <div className="top-emotion">
          <span className="emoji" aria-hidden>{EMOJI[result.emotion] || "🙂"}</span>
          <div>
            <h2>{result.emotion}</h2>
            <p className="conf">{pct(result.confidence)} confidence</p>
          </div>
        </div>
        <ul className="bars">
          {sorted.map(([name, value]) => (
            <li key={name} className={name === result.emotion ? "top" : ""}>
              <span className="bar-label">{name}</span>
              <span className="bar-track">
                <span className="bar-fill" style={{ width: pct(value) }} />
              </span>
              <span className="bar-val">{pct(value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
