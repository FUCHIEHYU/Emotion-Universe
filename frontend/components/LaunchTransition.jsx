"use client";

import "./LaunchTransition.css";

export default function LaunchTransition({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="launchOverlay">
      <div className="launchStars"></div>
      <div className="launchGlow"></div>

      <div className="shipWrap">
        <img
          src="/assets/transition/flame.PNG"
          alt="尾焰"
          className="shipFlame"
        />
        <img
          src="/assets/transition/ship3.PNG"
          alt="情緒星船"
          className="shipBody"
        />
      </div>

      <p className="launchText">情緒星正在飛向宇宙...</p>
    </div>
  );
}