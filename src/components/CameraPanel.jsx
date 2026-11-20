import React, { useEffect, useRef, useState } from "react";
export default function CameraPanel({ onCapture, disabled }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);
  const [facing, setFacing] = useState("user");
  const [error, setError] = useState("");

  function stop() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setActive(false);
  }
  async function start(mode = facing) {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera is not supported in this browser (it also needs HTTPS or localhost).");
      return;
    }try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      setActive(true);
      // attach after render
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      });
    } catch (e) {
      const msg =
        e.name === "NotAllowedError"
          ? "Camera permission was denied. Allow it in your browser settings and try again."
          : e.name === "NotFoundError"
          ? "No camera was found on this device."
          : `Could not start the camera: ${e.message}`;
      setError(msg);
      setActive(false);
    }
  }

  async function flip() {
    const next = facing === "user" ? "environment" : "user";
    setFacing(next);
    await start(next);
  }

  function snap() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (facing === "user") {
      // un-mirror so the saved photo matches reality
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" });
        onCapture(file);
        stop();
      },
      "image/jpeg",
      0.92
    );
  }

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  if (!active) {
    return (
      <div className="camera-idle">
        <button className="btn secondary" onClick={() => start()} disabled={disabled}>
          📷 Use camera
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="camera-live">
      <video
        ref={videoRef}
        playsInline
        muted
        className={facing === "user" ? "mirror" : ""}
      />
      <div className="camera-actions">
        <button className="btn" onClick={snap}>Capture photo</button>
        <button className="btn ghost" onClick={flip}>Flip camera</button>
        <button className="btn ghost" onClick={stop}>Cancel</button>
      </div>
    </div>
  );
}
