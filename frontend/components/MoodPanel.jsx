"use client";

import { useState } from "react";

export default function MoodPanel({ monster }) {
  const [text, setText] = useState("");

  if (!monster) return null;

  return (
    <div className="mood-panel">
      <div className="mood-card">
        
        {/* 左邊怪獸 */}
        <div className="mood-left">
          <img src={monster.image} className="mood-img" />
        </div>

        {/* 右邊內容 */}
        <div className="mood-right">
          <p className="mood-label">SELECTED EMOTION</p>

          <h2>{monster.name}</h2>

          <p className="mood-description">
            {monster.description}
          </p>

          <textarea
            placeholder="今天發生了什麼事？"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button className="submit-btn">
            送出情緒
          </button>
        </div>
      </div>
    </div>
  );
}