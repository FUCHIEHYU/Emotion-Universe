"use client";

import { useState } from "react";


const monsters = [
  {
    id: 1,
    value: "happiness",
    name: "晴晴獸",
    label: "快樂 happiness",
    image: "/assets/monsters/monster_joy.png",
    description: "當你感到輕鬆、開心，一切都剛剛好的時候，晴晴獸會出現。",
    situations: [
      "和朋友聊天很開心",
      "完成一件讓自己滿意的事情",
      "享受生活中的小確幸",
    ],
  },
  {
    id: 2,
    value: "sad",
    name: "雨雨獸",
    label: "悲傷 Sadness",
    image: "/assets/monsters/monster_sad.png",
    description: "當你感到低落、失落，或有點難過時，雨雨獸會陪在你身邊。",
    situations: [
      "事情沒有如預期發展",
      "感到孤單或被忽略",
      "回想起難過的事情",
    ],
  },
  {
    id: 3,
    value: "fear",
    name: "霧霧獸",
    label: "恐懼 Fear",
    image: "/assets/monsters/monster_fear.png",
    description: "當你感到不安、緊張，對未知感到害怕時，霧霧獸會出現。",
    situations: [
      "面對未知的挑戰",
      "擔心未來的不確定",
      "需要做重要決定時",
    ],
  },
  {
    id: 4,
    value: "anger",
    name: "火火獸",
    label: "憤怒 Anger",
    image: "/assets/monsters/monster_anger.png",
    description: "當你感到不公平、被冒犯或壓力爆發時，火火獸會出現。",
    situations: [
      "被誤解或不被理解",
      "事情不如預期",
      "壓力累積太久",
    ],
  },
  {
    id: 5,
    value: "surprise",
    name: "亮亮獸",
    label: "驚訝 Surprise",
    image: "/assets/monsters/monster_surprise.png",
    description: "當事情突然發生或出乎意料時，亮亮獸會閃閃出現。",
    situations: [
      "收到意想不到的消息",
      "被朋友驚喜到",
      "發現新事物",
    ],
  },
  {
    id: 6,
    value: "disgust",
    name: "淨淨獸",
    label: "厭惡 Disgust",
    image: "/assets/monsters/monster_disgust.png",
    description: "當你感到排斥、不舒服或想遠離某些事物時，淨淨獸會出現。",
    situations: [
      "遇到不喜歡的人事物",
      "感到不舒服的環境",
      "內心產生排斥感",
    ],
  },
];

export default function MonsterGrid({ onSelectMonster }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (monster) => {
    setSelected(monster.id);
    onSelectMonster(monster);
  };

  return (
    <section className="monster-grid-section">
      <div className="monster-grid">
        {monsters.map((monster) => (
          <button
            key={monster.id}
            className={`monster-card ${selected === monster.id ? "active" : ""}`}
            onClick={() => handleSelect(monster)}
          >
            <img
              src={monster.image}
              alt={monster.name}
              className="monster-img"
            />

            <div className="monster-text">
              <h3 className="monster-title">{monster.name}</h3>
              <p className="monster-subtitle">{monster.label}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}