"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./room.css";

const emotionData = [
  {
    key: "joy",
    starName: "晴晴星",
    name: "開心",
    image: "/assets/monsters/monster_joy.png",
    description: "當事情順利、被理解或感受到陪伴時，常常會出現開心的情緒。",
    situations: ["和朋友聊天", "完成目標", "被稱讚"],
    coping: ["記住這份快樂", "分享好心情", "允許自己享受當下"],
  },
  {
    key: "sad",
    starName: "雨雨星",
    name: "難過",
    image: "/assets/monsters/monster_sad.png",
    description: "當失落、被忽略或受傷時，可能會感到難過。",
    situations: ["被誤會", "關係改變", "事情不如預期"],
    coping: ["允許自己難過", "找人傾訴", "寫下感受"],
  },
  {
    key: "anger",
    starName: "火火星",
    name: "生氣",
    image: "/assets/monsters/monster_anger.png",
    description: "當界線被侵犯或感到不公平時，容易出現生氣。",
    situations: ["被冒犯", "被忽略", "不公平對待"],
    coping: ["深呼吸", "暫時離開情境", "表達感受"],
  },
  {
    key: "fear",
    starName: "霧霧星",
    name: "害怕",
    image: "/assets/monsters/monster_fear.png",
    description: "面對未知或壓力時，會產生害怕的情緒。",
    situations: ["考試", "未知環境", "壓力情境"],
    coping: ["拆解問題", "尋求支持", "慢慢來"],
  },
  {
    key: "surprise",
    starName: "亮亮星",
    name: "驚訝",
    image: "/assets/monsters/monster_surprise.png",
    description: "當事情出乎意料時，會感到驚訝。",
    situations: ["突發事件", "意外消息", "突然改變"],
    coping: ["先停一下", "理解狀況", "再做反應"],
  },
  {
    key: "disgust",
    starName: "淨淨星",
    name: "厭惡",
    image: "/assets/monsters/monster_disgust.png",
    description: "當遇到讓人不舒服或反感的事物時，會感到厭惡。",
    situations: ["不喜歡的氣味", "不舒服畫面", "排斥的行為"],
    coping: ["離開不舒服來源", "保護自己界線"],
  },
];

const emotionKeywordMap = {
  joy: {
    label: "開心",
    keywords: [
      "開心", "快樂", "高興", "幸福", "愉快", "雀躍", "興奮", "滿足", "欣慰", "期待"
    ],
  },
  sad: {
    label: "難過",
    keywords: [
      "難過", "傷心", "悲傷", "低落", "失落", "想哭", "空虛", "無力", "委屈", "孤單", "寂寞", "失望", "心酸", "沮喪"
    ],
  },
  anger: {
    label: "生氣",
    keywords: [
      "生氣", "憤怒", "火大", "不爽", "煩", "煩躁", "惱火", "暴躁", "氣憤", "不耐煩"
    ],
  },
  fear: {
    label: "害怕",
    keywords: [
      "害怕", "怕", "恐懼", "緊張", "焦慮", "不安", "擔心", "驚慌", "壓力大", "忐忑"
    ],
  },
  surprise: {
    label: "驚訝",
    keywords: [
      "驚訝", "意外", "突然", "震驚", "嚇到", "錯愕", "傻眼"
    ],
  },
  disgust: {
    label: "厭惡",
    keywords: [
      "厭惡", "噁心", "反感", "討厭", "排斥", "嫌惡", "不舒服", "受不了", "厭煩"
    ],
  },
};

const upcomingEmotions = [
  "期待星",
  "羞羞星",
  "孤孤星",
  "焦焦星",
  "委屈星",
  "羨羨星",
];

export default function RoomPage() {
  const [search, setSearch] = useState("");

  // ⭐ 就放在這裡（取代舊的）
  const filtered = emotionData.filter((emotion) => {
    if (!search.trim()) return true;

    const mappingEntry = emotionKeywordMap[emotion.key];
    if (!mappingEntry) return false;

    return mappingEntry.keywords.some((keyword) =>
      includesKeyword(search, keyword)
    );
  });

  return (
    <>
      <Navbar />

      <main className="roomPage">
        <h1 className="roomTitle">情緒小百科</h1>

        <p className="roomIntro">
          本頁依據 Ekman 提出的六大基本情緒分類，
          包含開心、難過、生氣、害怕、驚訝與厭惡。
        </p>


        <p className="roomSubtitle">
          情緒沒有好壞，有時候我們也會同時擁有不只一種感受。
        </p>




<div className="emotionGrid">
  {filtered.map((emotion, index) => (
  <div key={emotion.key} className="card">
    <div className="cardInner">
      {/* 正面 */}
      <div className="cardFront cardFace">
        <div className="cardFrontTop">
          <span className="cardIcon">★</span>
          <p className="cardStarTitle">{emotion.starName}</p>
          <span className="cardNumber">#{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="cardImageBox">
          <img
            src={emotion.image}
            alt={emotion.starName}
            className="emotionImg"
          />
        </div>

        <p className="cardShortDesc">{emotion.description}</p>

        <div className="cardFrontBottom">
          <h3 className="emotionName">{emotion.name}</h3>
          <p className="emotionKey">{emotion.key}</p>
        </div>
      </div>

      {/* 背面 */}
      <div className="cardBack cardFace">
        <div className="backTitleRow">
          <span>★</span>
          <p>可能情境</p>
          <span>★</span>
        </div>

        <div className="backInfoBox">
          <ul className="backList">
            {emotion.situations.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="backTitleRow pink">
          <span>♥</span>
          <p>可以試試</p>
          <span>♥</span>
        </div>

        <div className="backInfoBox">
          <ul className="backList">
            {emotion.coping.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <img
          src={emotion.image}
          alt={emotion.starName}
          className="backCornerImg"
        />
      </div>
    </div>
  </div>
))}

  {upcomingEmotions.map((name, i) => (
    <div key={i} className="lockedCard">
      <div className="lockedInner">
        <h3 className="lockedName">{name}</h3>
        <p className="lockedTag">new emotion star</p>
        <p className="lockedDesc">尚未解鎖，請期待窩...</p>
      </div>
    </div>
  ))}
</div>

<p className="roomEnding">
  情緒有很多很多種，還有更多新的情緒星正在宇宙裡慢慢誕生中，請期待 ✦
</p>
      </main>
    </>
  );
}