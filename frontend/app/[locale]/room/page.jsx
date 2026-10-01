"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import "./room.css";

const EMOTION_KEYS = ["joy", "sad", "anger", "fear", "surprise", "disgust"];

const EMOTION_IMAGES = {
  joy: "/assets/monsters/monster_joy.webp",
  sad: "/assets/monsters/monster_sad.webp",
  anger: "/assets/monsters/monster_anger.webp",
  fear: "/assets/monsters/monster_fear.webp",
  surprise: "/assets/monsters/monster_surprise.webp",
  disgust: "/assets/monsters/monster_disgust.webp",
};

// Keyword matching stays Chinese-only for now — the rule-based NLP core
// (backend/nlp_service.py) hasn't been ported to English yet.
const emotionKeywordMap = {
  joy: {
    keywords: [
      "開心", "快樂", "高興", "幸福", "愉快", "雀躍", "興奮", "滿足", "欣慰", "期待"
    ],
  },
  sad: {
    keywords: [
      "難過", "傷心", "悲傷", "低落", "失落", "想哭", "空虛", "無力", "委屈", "孤單", "寂寞", "失望", "心酸", "沮喪"
    ],
  },
  anger: {
    keywords: [
      "生氣", "憤怒", "火大", "不爽", "煩", "煩躁", "惱火", "暴躁", "氣憤", "不耐煩"
    ],
  },
  fear: {
    keywords: [
      "害怕", "怕", "恐懼", "緊張", "焦慮", "不安", "擔心", "驚慌", "壓力大", "忐忑"
    ],
  },
  surprise: {
    keywords: [
      "驚訝", "意外", "突然", "震驚", "嚇到", "錯愕", "傻眼"
    ],
  },
  disgust: {
    keywords: [
      "厭惡", "噁心", "反感", "討厭", "排斥", "嫌惡", "不舒服", "受不了", "厭煩"
    ],
  },
};

function includesKeyword(search, keyword) {
  return search.includes(keyword) || keyword.includes(search);
}

export default function RoomPage() {
  const t = useTranslations("room");
  const [search, setSearch] = useState("");

  const emotionData = EMOTION_KEYS.map((key) => ({
    key,
    starName: t(`emotions.${key}.starName`),
    name: t(`emotions.${key}.name`),
    image: EMOTION_IMAGES[key],
    description: t(`emotions.${key}.description`),
    situations: t.raw(`emotions.${key}.situations`),
    coping: t.raw(`emotions.${key}.coping`),
  }));

  const upcomingEmotions = t.raw("upcoming");

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
        <h1 className="roomTitle">{t("title")}</h1>

        <p className="roomIntro">
          {t("intro")}
        </p>


        <p className="roomSubtitle">
          {t("subtitle")}
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
          <Image
            src={emotion.image}
            alt={emotion.starName}
            className="emotionImg"
            width={480}
            height={480}
            sizes="95px"
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
          <p>{t("possibleSituations")}</p>
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
          <p>{t("tryThis")}</p>
          <span>♥</span>
        </div>

        <div className="backInfoBox">
          <ul className="backList">
            {emotion.coping.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <Image
          src={emotion.image}
          alt={emotion.starName}
          className="backCornerImg"
          width={480}
          height={480}
          sizes="48px"
        />
      </div>
    </div>
  </div>
))}

  {upcomingEmotions.map((name, i) => (
    <div key={i} className="lockedCard">
      <div className="lockedInner">
        <h3 className="lockedName">{name}</h3>
        <p className="lockedTag">{t("lockedTag")}</p>
        <p className="lockedDesc">{t("lockedDesc")}</p>
      </div>
    </div>
  ))}
</div>

<p className="roomEnding">
  {t("ending")}
</p>
      </main>
    </>
  );
}
