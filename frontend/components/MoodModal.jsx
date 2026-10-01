"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("moodModal");
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
      setError(t("errorEmpty"));
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
        throw new Error(t("errorSubmitFailed"));
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
      setError(t("errorSubmitFailed"));
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
          aria-label={t("closeAria")}
        >
          ×
        </button>

        <div className="modalContent">
          <div className="monsterPreview">
            <div className="monsterGlow"></div>
            <Image
              src={monster.image}
              alt={monster.name}
              className="modalMonsterImg"
              width={480}
              height={480}
              sizes="150px"
            />

            <div className="monsterIdentity">
              <h2 className="monsterName">{monster.name}</h2>
              <p className="monsterSubLabel">{monster.label}</p>
            </div>
          </div>

          <div className="monsterInfo">
            <p className="monsterDescription">{monster.description}</p>

            <div className="monsterSituations">
              <p className="sectionTitle">{t("commonSituations")}</p>
              <ul>
                {monster.situations?.map((situation, index) => (
                  <li key={index}>{situation}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                className="moodTextarea"
                placeholder={t("placeholder")}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={200}
              />

              <div className="textCount">{text.length}/200</div>

            <div className="radio-row">
              <span className="radio-question">
                {t("keepQuestion")}
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
                {t("keep24h")}
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
                {t("keepPermanent")}
              </label>
            </div>

              {error && <p className="errorText">{error}</p>}

              <button type="submit" className="submitButton" disabled={loading}>
                {loading ? t("submitting") : t("submit")}
              </button>

              {loading && (
                <p className="submitHint">
                  {t("submitHint")}
                </p>
              )}
            </form>

            <p className="footerText">
              {t("footerLine1")}
              <br />
              {t("footerLine2")}
            </p>
          </div>
        </div>
      </div>
    </div>

  </>
);

}
