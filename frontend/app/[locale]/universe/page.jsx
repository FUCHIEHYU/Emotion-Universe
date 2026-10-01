"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import "./universe.css";
import "../../components/LetterButton/letter-button.css";




function buildApiUrl(path) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001";
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL 尚未設定");
  }
  return `${API_URL}${path}`;
}

function getUserToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("emotion_user_token") || "";
}

function mapEmotionToMonster(emotion) {
  const map = {
    happiness: "晴晴獸",
    joy: "晴晴獸",
    sad: "雨雨獸",
    fear: "霧霧獸",
    anger: "火火獸",
    surprise: "亮亮獸",
    disgust: "淨淨獸",
  };
  return map[emotion] || "未知情緒";
}

function getStarImage(emotion) {
  const map = {
    happiness: "/assets/monsters/monster_joy.png",
    joy: "/assets/monsters/monster_joy.png",
    sad: "/assets/monsters/monster_sad.png",
    fear: "/assets/monsters/monster_fear.png",
    anger: "/assets/monsters/monster_anger.png",
    surprise: "/assets/monsters/monster_surprise.png",
    disgust: "/assets/monsters/monster_disgust.png",
  };
  return map[emotion] || "/assets/monsters/monster_joy.png";
}

function StarDetailModal({ mood, onClose, onDelete, onEdit, onReply }) {
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
          <img
            src="/assets/letter/letter_close.png"
            alt="宇宙回信"
            className="modalLetterNoticeImage"
          />
          <p className="modalLetterNoticeText">宇宙回信 💌</p>
        </button>

        <div className="starModalTop">
          <img
            src={getStarImage(mood.emotion)}
            alt={mood.starName}
            className="starModalImage"
          />

          <div className="starModalInfo">
            <h2 className="starModalName">{mood.starName}</h2>

            <div className="starAuthorRow">
              <img
                src={mood.avatar}
                alt={mood.authorName}
                className="starAvatar"
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
            {mood.keepType === "permanent" ? "永久保留" : "24 小時限時"}
          </small>
        </div>



        {mood.isMine && (
          <div className="ownerActionRow">
            <button className="editMoodButton" onClick={() => onEdit(mood)}>
              編輯
            </button>

            <button
              className="deleteMoodButton"
              onClick={() => onDelete(mood.id)}
            >
              刪除這顆情緒星
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

      if (!res.ok) {
        throw new Error(data.message || "刪除失敗");
      }

      setMoods((prev) => prev.filter((mood) => mood.id !== moodId));
      setSelectedMood(null);
    } catch (error) {
      console.error("刪除失敗：", error);
      alert(error.message || "刪除失敗");
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

      if (!res.ok) {
        throw new Error(data.message || "更新失敗");
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
      alert(error.message || "更新失敗");
    }
  };

const handleGoToLetterPage = (mood) => {
  router.push(
    `/cosmic-letter?emotion=${mood.emotion}&text=${encodeURIComponent(
      mood.content
    )}&name=${encodeURIComponent(mood.starName || "宇宙")}`
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
          <p className="universeEyebrow">EMOTION UNIVERSE</p>
          <h1 className="universeTitle">
            漂浮在宇宙裡的，是大家今天的情緒星
          </h1>
          <p className="universeDesc">
            點開其中一顆，看看它來自哪位匿名旅人，以及那一刻留下的心情。
          </p>
          <div className="stats-pill">
            <p className="universeStats">
              目前有 <span>{moods.length}</span> 顆星星在宇宙閃耀著 ✨
            </p>
          </div>

          <button
            className="letterNoticeCard"
            onClick={() => router.push("/cosmic-letter")}
          >
            <img
              src="/assets/letter/letter_close.png"
              alt="宇宙回信提示"
              className="letterNoticeImage"
            />

            <p className="letterNoticeText">
              點擊情緒星你收到宇宙回信囉! 💌
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
              <img
                src={getStarImage(mood.emotion)}
                alt={mood.starName}
                className="floatingStarImg"
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

              <h2 className="starModalName">編輯你的情緒星</h2>

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
                  限時 24 小時
                </label>

                <label>
                  <input
                    type="radio"
                    name="editKeepType"
                    value="permanent"
                    checked={editKeepType === "permanent"}
                    onChange={(e) => setEditKeepType(e.target.value)}
                  />
                  永久保留
                </label>
              </div>

              <button className="editMoodButton" onClick={handleUpdateMood}>
                儲存修改
              </button>
            </div>
          </div>






          
        )}

          {/* 🌀 loading */}
            {loading ? (
              isWaking ? (
                <div className="toastWrapper" key="warming">
                  <div className="warmupBanner">
                    <span className="animatedText">宇宙中心正在暖機中 🚀</span>
                    由於使用雲端免費服務，首次啟動約需 15–30 秒，感謝您的耐心等待！
                  </div>
                </div>
              ) : (
                <div className="toastWrapper" key="loading">
                  <div className="statusBanner">
                    <span className="animatedText">🌠 正在連接情緒宇宙中...</span>
                  </div>
                </div>
              )
            ) : loadError ? (
              <div className="toastWrapper" key="error">
                <div className="errorBanner">
                  目前宇宙連線較慢，可能正在喚醒伺服器或資料庫，請稍後重新整理。
                </div>
              </div>
            ) : null}


      </main>
    </>
    
  );
  
}
