"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import { useRouter } from "@/i18n/navigation";
import "./universe.css";
import "@/components/LetterButton/letter-button.css";




function buildApiUrl(path) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
  }
  return `${API_URL}${path}`;
}

function getUserToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("emotion_user_token") || "";
}

const EMOTION_TO_MONSTER_KEY = {
  happiness: "joy",
  joy: "joy",
  sad: "sad",
  fear: "fear",
  anger: "anger",
  surprise: "surprise",
  disgust: "disgust",
};

function getStarImage(emotion) {
  const map = {
    happiness: "/assets/monsters/monster_joy.webp",
    joy: "/assets/monsters/monster_joy.webp",
    sad: "/assets/monsters/monster_sad.webp",
    fear: "/assets/monsters/monster_fear.webp",
    anger: "/assets/monsters/monster_anger.webp",
    surprise: "/assets/monsters/monster_surprise.webp",
    disgust: "/assets/monsters/monster_disgust.webp",
  };
  return map[emotion] || "/assets/monsters/monster_joy.webp";
}

// Maps an error code returned by the backend to a localized message.
// Falls back to the raw message (or a generic one) for anything unmapped,
// so an unexpected backend error string still shows something readable.
function translateApiError(t, payload, fallbackKey) {
  const code = payload?.code;
  if (code) {
    try {
      return t(`errors.${code}`);
    } catch {
      // fall through to fallback below
    }
  }
  return payload?.message || t(fallbackKey);
}

function StarDetailModal({ mood, onClose, onDelete, onEdit, onReply, t }) {
  if (!mood) return null;

  return (
    <div className="starModalOverlay" onClick={onClose}>
      <div className="starModal" onClick={(e) => e.stopPropagation()}>
        <button className="starModalClose" onClick={onClose}>
          ×
        </button>

        <button
          type="button"
          className="modalLetterNoticeCard"
          onClick={() => onReply(mood)}
        >
          <Image
            src="/assets/letter/letter_close.webp"
            alt={t("starImageAlt")}
            className="modalLetterNoticeImage"
            width={1000}
            height={695}
            sizes="100px"
          />
          <p className="modalLetterNoticeText">{t("modalLetterText")}</p>
        </button>

        <div className="starModalTop">
          <Image
            src={getStarImage(mood.emotion)}
            alt={mood.starName}
            className="starModalImage"
            width={480}
            height={480}
            sizes="92px"
          />

          <div className="starModalInfo">
            <h2 className="starModalName">{mood.starName}</h2>

            <div className="starAuthorRow">
              <Image
                src={mood.avatar}
                alt={mood.authorName}
                className="starAvatar"
                width={240}
                height={240}
                sizes="36px"
              />
              <span className="starAuthorText">{mood.authorName}</span>
            </div>
          </div>
        </div>

        <div className="starModalContent">
          <p>{mood.content}</p>
        </div>

        <div className="starModalTime">
          {mood.createdAt}
          <br />
          <small>
            {mood.keepType === "permanent" ? t("keepPermanent") : t("keep24h")}
          </small>
        </div>



        {mood.isMine && (
          <div className="ownerActionRow">
            <button className="editMoodButton" onClick={() => onEdit(mood)}>
              {t("edit")}
            </button>

            <button
              className="deleteMoodButton"
              onClick={() => onDelete(mood.id)}
            >
              {t("deleteStar")}
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

function generatePositions(count) {
  const positions = [];
  const stars = [];
  const maxAttempts = 500;

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 24 + 82;

    let safe = false;
    let attempts = 0;
    let newStar = null;

    while (!safe && attempts < maxAttempts) {
      newStar = {
        x: Math.random() * 82 + 9,   // 9% ~ 91%
        y: Math.random() * 72 + 12,  // 12% ~ 84%
        size,
      };

      safe = stars.every((star) => {
        const dx = star.x - newStar.x;
        const dy = star.y - newStar.y;

        // 尺寸越大，安全距離越大
        const minDistance = (star.size + newStar.size) * 0.12 + 4;

        return Math.sqrt(dx * dx + dy * dy) > minDistance;
      });

      attempts++;
    }

    if (!safe) {
      newStar = {
        x: Math.random() * 82 + 9,
        y: Math.random() * 72 + 12,
        size,
      };
    }

    stars.push(newStar);
    positions.push(newStar);
  }

  return positions;
}

export default function UniversePage() {
  const t = useTranslations("universe");
  const tMonsters = useTranslations("monsters");
  const router = useRouter();
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [editingMood, setEditingMood] = useState(null);
  const [editText, setEditText] = useState("");
  const [editKeepType, setEditKeepType] = useState("24h");
  const [newMoodId, setNewMoodId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWaking, setIsWaking] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const mapEmotionToMonster = (emotion) => {
    const key = EMOTION_TO_MONSTER_KEY[emotion];
    return key ? tMonsters(`${key}.name`) : t("unknownEmotion");
  };

  useEffect(() => {
  const savedNewMoodId = localStorage.getItem("new_mood_id");
  if (savedNewMoodId) {
    setNewMoodId(Number(savedNewMoodId));
  }
}, []);
useEffect(() => {
  const fetchMoods = async () => {
    setLoading(true);
    setLoadError(false);
    setIsWaking(false);

    // ⏱️ 3秒後顯示暖機提示
    const wakeTimer = setTimeout(() => {
      setIsWaking(true);
    }, 3000);

    try {
      const res = await fetch(buildApiUrl("/moods"));

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const positions = generatePositions(data.length);
      const myToken = getUserToken();

      const formatted = data.map((item, index) => ({
        ...item,
        starName: mapEmotionToMonster(item.emotion),
        authorName: item.author_name,
        createdAt: item.created_at
          ? new Date(item.created_at).toLocaleString()
          : "",
        keepType: item.keep_type,
        isMine: item.user_token === myToken,
        isNew: Number(item.id) === Number(newMoodId),
        x: `${positions[index].x}%`,
        y: `${positions[index].y}%`,
        size: positions[index].size,
        floatDelay: `${Math.random() * 2.2}s`,
        floatDuration: `${6 + Math.random() * 2.8}s`,
      }));

      setMoods(formatted);
    } catch (error) {
      console.error("抓取 moods 失敗：", error);
      setLoadError(true); // ❗新增
    } finally {
      clearTimeout(wakeTimer); // ❗清掉 timer
      setLoading(false);      // ❗結束 loading
    }
  };

  fetchMoods();
}, [newMoodId]);


  const handleDeleteMood = async (moodId) => {
    try {
      const userToken = getUserToken();

      const res = await fetch(
        `${buildApiUrl(`/moods/${moodId}`)}?user_token=${encodeURIComponent(
          userToken
        )}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok || data.code) {
        throw new Error(translateApiError(t, data, "deleteFailedFallback"));
      }

      setMoods((prev) => prev.filter((mood) => mood.id !== moodId));
      setSelectedMood(null);
    } catch (error) {
      console.error("刪除失敗：", error);
      alert(error.message || t("deleteFailedFallback"));
    }
  };



  const handleStartEdit = (mood) => {
    setEditingMood(mood);
    setEditText(mood.content);
    setEditKeepType(mood.keepType);
  };

  const handleUpdateMood = async () => {
    try {
      const userToken = getUserToken();

      const res = await fetch(buildApiUrl(`/moods/${editingMood.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emotion: editingMood.emotion,
          text: editText,
          keep_type: editKeepType,
          user_token: userToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.code) {
        throw new Error(translateApiError(t, data, "updateFailedFallback"));
      }

      setMoods((prev) =>
        prev.map((mood) =>
          mood.id === editingMood.id
            ? {
                ...mood,
                content: editText,
                keepType: editKeepType,
              }
            : mood
        )
      );

      setSelectedMood((prev) =>
        prev
          ? {
              ...prev,
              content: editText,
              keepType: editKeepType,
            }
          : prev
      );

      setEditingMood(null);
    } catch (error) {
      console.error("更新失敗：", error);
      alert(error.message || t("updateFailedFallback"));
    }
  };

const handleGoToLetterPage = (mood) => {
  router.push(
    `/cosmic-letter?emotion=${mood.emotion}&text=${encodeURIComponent(
      mood.content
    )}&name=${encodeURIComponent(mood.starName || t("eyebrow"))}`
  );
};

  return (

    <>


      <Navbar />




      <main className="universePage">
        <div className="universeBackground">
          <div className="starsLayer starsLayer1"></div>
          <div className="starsLayer starsLayer2"></div>
          <div className="starsLayer starsLayer3"></div>

          <div className="nebula nebula1"></div>
          <div className="nebula nebula2"></div>
          <div className="nebula nebula3"></div>

          <div className="cloudMist cloudMist1"></div>
          <div className="cloudMist cloudMist2"></div>
        </div>


        <section className="universeHero">
          <p className="universeEyebrow">{t("eyebrow")}</p>
          <h1 className="universeTitle">
            {t("title")}
          </h1>
          <p className="universeDesc">
            {t("desc")}
          </p>
          <div className="stats-pill">
            <p className="universeStats">
              {t("statsText", { count: moods.length })}
            </p>
          </div>

          <button
            className="letterNoticeCard"
            onClick={() => router.push("/cosmic-letter")}
          >
            <Image
              src="/assets/letter/letter_close.webp"
              alt={t("letterAlt")}
              className="letterNoticeImage"
              width={1000}
              height={695}
              sizes="120px"
            />

            <p className="letterNoticeText">
              {t("letterNoticeText")}
            </p>
          </button>



        </section>


        <section className="universeField">
          {moods.map((mood) => (
            <button
              key={mood.id}
              className={`floatingStar star-${mood.emotion} ${mood.isNew ? "newStar" : ""}`}
              style={{
                left: mood.x,
                top: mood.y,
                width: `${mood.size}px`,
                height: `${mood.size}px`,
                animationDelay: mood.floatDelay,
                animationDuration: mood.floatDuration,
              }}
              onClick={() => setSelectedMood(mood)}
            >
              <Image
                src={getStarImage(mood.emotion)}
                alt={mood.starName}
                className="floatingStarImg"
                fill
                sizes="106px"
              />
            </button>
          ))}
        </section>

        <StarDetailModal
          mood={selectedMood}
          onClose={() => setSelectedMood(null)}
          onDelete={handleDeleteMood}
          onEdit={handleStartEdit}
          onReply={handleGoToLetterPage}
          t={t}
        />

        {editingMood && (
          <div
            className="starModalOverlay"
            onClick={() => setEditingMood(null)}
          >
            <div className="starModal" onClick={(e) => e.stopPropagation()}>
              <button
                className="starModalClose"
                onClick={() => setEditingMood(null)}
              >
                ×
              </button>

              <h2 className="starModalName">{t("editTitle")}</h2>

              <div className="starModalContent">
                <textarea
                  className="editMoodTextarea"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  maxLength={200}
                />
              </div>

              <div className="keepTypeBox">
                <label>
                  <input
                    type="radio"
                    name="editKeepType"
                    value="24h"
                    checked={editKeepType === "24h"}
                    onChange={(e) => setEditKeepType(e.target.value)}
                  />
                  {t("keepQuestionOption24h")}
                </label>

                <label>
                  <input
                    type="radio"
                    name="editKeepType"
                    value="permanent"
                    checked={editKeepType === "permanent"}
                    onChange={(e) => setEditKeepType(e.target.value)}
                  />
                  {t("keepQuestionOptionPermanent")}
                </label>
              </div>

              <button className="editMoodButton" onClick={handleUpdateMood}>
                {t("saveEdit")}
              </button>
            </div>
          </div>







        )}

          {/* 🌀 loading */}
            {loading ? (
              isWaking ? (
                <div className="toastWrapper" key="warming">
                  <div className="warmupBanner">
                    <span className="animatedText">{t("warmingText")}</span>
                    {t("warmingHint")}
                  </div>
                </div>
              ) : (
                <div className="toastWrapper" key="loading">
                  <div className="statusBanner">
                    <span className="animatedText">{t("connectingText")}</span>
                  </div>
                </div>
              )
            ) : loadError ? (
              <div className="toastWrapper" key="error">
                <div className="errorBanner">
                  {t("errorText")}
                </div>
              </div>
            ) : null}


      </main>
    </>

  );

}
