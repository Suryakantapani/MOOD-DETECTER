const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const EMOTIONS = [
  "angry",
  "disgust",
  "fear",
  "happy",
  "neutral",
  "sad",
  "surprise",
];
export const isDemoMode = !API_URL;
function demoResult() {
  const raw = EMOTIONS.map(() => Math.random() ** 3);
  const total = raw.reduce((a, b) => a + b, 0);
  const scores = {};
  EMOTIONS.forEach((e, i) => (scores[e] = raw[i] / total));
  const emotion = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
  return { emotion, confidence: scores[emotion], scores };
}
export async function predictEmotion(file) {
  if (isDemoMode) {
    await new Promise((r) => setTimeout(r, 900));
    return demoResult();
  }

  const body = new FormData();
  body.append("image", file, file.name || "capture.jpg");

  const res = await fetch(`${API_URL}/predict`, { method: "POST", body });
  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.json()).error || "";
    } catch {
      /* ignore */
    }
    throw new Error(detail || `Server returned ${res.status}`);
  }
  return res.json();
}
