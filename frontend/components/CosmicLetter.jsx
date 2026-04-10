"use client";

import "./CosmicLetter.css";

export default function CosmicLetter({
  isOpen,
  onClose,
  isLoading = false,
  reply = "宇宙收到你的情緒了，請記得，你的感受值得被溫柔看見。",
  sender = "From：宇宙",
}) {
  if (!isOpen) return null;

  return (
    <div className="cosmic-letter-overlay" onClick={onClose}>
      <div
        className="cosmic-letter-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="cosmic-letter-close"
          onClick={onClose}
          aria-label="關閉宇宙回信"
        >
          ×
        </button>

        <div className="cosmic-letter-header">
          <p className="cosmic-letter-eyebrow">COSMIC LETTER</p>
          <h3 className="cosmic-letter-title">宇宙回信</h3>
          <p className="cosmic-letter-subtitle">
            宇宙收到了你的情緒，並寫了一封信給你
          </p>
        </div>

        <div className={`cosmic-letter-visual ${isLoading ? "is-loading" : ""}`}>
          <img
            src="/assets/letter/letter_open.png"
            alt="宇宙回信"
            className="cosmic-letter-image"
          />

          <div className="cosmic-letter-text">
            <div className="cosmic-letter-paper-content">
              {isLoading ? (
                <div className="cosmic-letter-loading-block">
                  <p className="cosmic-letter-loading-text">
                    宇宙正在整理想對你說的話...
                  </p>
                  <div className="cosmic-letter-loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              ) : (
                <>
                  <p className="cosmic-letter-from">{sender}</p>
                  <p className="cosmic-letter-reply">{reply}</p>
                </>
              )}
            </div>
          </div>

          <div className="cosmic-letter-glow"></div>
        </div>
      </div>
    </div>
  );
}