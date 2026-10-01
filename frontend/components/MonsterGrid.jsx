"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const MONSTER_KEYS = ["joy", "sad", "fear", "anger", "surprise", "disgust"];

const MONSTER_IMAGES = {
  joy: "/assets/monsters/monster_joy.webp",
  sad: "/assets/monsters/monster_sad.webp",
  fear: "/assets/monsters/monster_fear.webp",
  anger: "/assets/monsters/monster_anger.webp",
  surprise: "/assets/monsters/monster_surprise.webp",
  disgust: "/assets/monsters/monster_disgust.webp",
};

const MONSTER_VALUES = {
  joy: "happiness",
  sad: "sad",
  fear: "fear",
  anger: "anger",
  surprise: "surprise",
  disgust: "disgust",
};

export default function MonsterGrid({ onSelectMonster }) {
  const [selected, setSelected] = useState(null);
  const t = useTranslations("monsters");

  const monsters = MONSTER_KEYS.map((key) => ({
    id: key,
    value: MONSTER_VALUES[key],
    name: t(`${key}.name`),
    label: t(`${key}.label`),
    image: MONSTER_IMAGES[key],
    description: t(`${key}.description`),
    situations: t.raw(`${key}.situations`),
  }));

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
            <Image
              src={monster.image}
              alt={monster.name}
              className="monster-img"
              width={480}
              height={480}
              sizes="110px"
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
