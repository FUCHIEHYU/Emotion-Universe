"use client";

import { useState } from "react";
import "./MoodModal.css";

function getOrCreateUserToken() {
  let token = localStorage.getItem("emotion_user_token");

  if (!token) {
    token = "u_" + Math.random().toString(36).slice(2, 12);
    localStorage.setItem("emotion_user_token", token);
  }

  return token;
}


export default function MoodModal({
  isOpen,
  onClose,
  monster,
  onSuccess,
  onLaunchStart,
}) {
  const [text, setText] = useState("");
  const [keepType, setKeepType] = useState("24h");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


if (!isOpen || !monster) return null;

  const resetForm = () => {
  setText("");
  setKeepType("24h");
  setError("");
  setLoading(false);
};


  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("請先寫下你現在的感受");
      return;
    }

    try {
      setLoading(true);
      setError("");

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${API_URL}/moods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emotion: monster.value || monster.label,
          text: text.trim(),
          keep_type: keepType,
          user_token: getOrCreateUserToken(),
        }),
      });

      if (!res.ok) {
        throw new Error("送出失敗");
      }

      const newMood = await res.json();

      if (newMood.id) {
        localStorage.setItem("new_mood_id", String(newMood.id));
      }

      if (onSuccess) {
        onSuccess(newMood);
      }

      if (onLaunchStart) {
        onLaunchStart();
      }

      handleClose();
    } catch (err) {
      console.error(err);
      setError("送出失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modalOverlay")) {
      handleClose();
    }
  };

return (
  <>
    <div className="modalOverlay" onClick={handleOverlayClick}>
      <div className="moodModal">
        <button
          type="button"
          className="closeButton"
          onClick={handleClose}
          aria-label="關閉"
        >
          ×
        </button>

        <div className="modalContent">
          <div className="monsterPreview">
            <div className="monsterGlow"></div>
            <img
              src={monster.image}
              alt={monster.name}
              className="modalMonsterImg"
            />

            <div className="monsterIdentity">
              <h2 className="monsterName">{monster.name}</h2>
              <p className="monsterSubLabel">{monster.label}</p>
            </div>
          </div>

          <div className="monsterInfo">
            <p className="monsterDescription">{monster.description}</p>

            <div className="monsterSituations">
              <p className="sectionTitle">常見情境：</p>
              <ul>
                {monster.situations?.map((situation, index) => (
                  <li key={index}>{situation}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                className="moodTextarea"
                placeholder="寫下你現在的感受..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={200}
              />

              <div className="textCount">{text.length}/200</div>

            <div className="radio-row">
              <span className="radio-question">
                這顆情緒星要保留多久？
              </span>

              <label className="radio-option">
                <input
                  type="radio"
                  name="keepType"
                  value="24h"
                  checked={keepType === "24h"}
                  onChange={(e) => setKeepType(e.target.value)}
                />
                <span className="custom-radio"></span>
                限時 24 小時
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="keepType"
                  value="permanent"
                  checked={keepType === "permanent"}
                  onChange={(e) => setKeepType(e.target.value)}
                />
                <span className="custom-radio"></span>
                永久保留
              </label>
            </div>

              {error && <p className="errorText">{error}</p>}

              <button type="submit" className="submitButton" disabled={loading}>
                {loading ? "送出中..." : "送出情緒星"}
              </button>
            </form>

            <p className="footerText">
              我們每個送進情緒宇宙的情緒都是匿名的喔✨
              <br />
              也去看看其他人今天送出了什麼情緒星吧 💖
            </p>
          </div>
        </div>
      </div>
    </div>

  </>
);

}
