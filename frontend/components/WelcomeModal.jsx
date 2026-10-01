"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import "./WelcomeModal.css";

const avatarOptions = [
  "/assets/avatars/avatar1.webp",
  "/assets/avatars/avatar2.webp",
  "/assets/avatars/avatar3.webp",
  "/assets/avatars/avatar4.webp",
  "/assets/avatars/avatar5.webp",
];

export default function WelcomeModal({
  username,
  setUsername,
  selectedAvatar,
  setSelectedAvatar,
  onStart,
}) {
  const t = useTranslations("welcomeModal");

  return (
    <div className="welcomeOverlay">
      <div className="welcomeWrapper">
        <h1 className="welcomeSiteTitle">{t("siteTitle")}</h1>

        <div className="welcomeCard">
          <h2 className="welcomeTitle">{t("title")}</h2>
          <p className="welcomeSubtitle">
            {t("subtitle")}
          </p>

          <div className="welcomeSection">
            <label className="welcomeLabel">{t("chooseAvatar")}</label>
            <div className="avatarGrid">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  className={`avatarButton ${
                    selectedAvatar === avatar ? "active" : ""
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <Image
                    src={avatar}
                    alt="avatar option"
                    className="avatarImage"
                    width={240}
                    height={240}
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="welcomeSection">
            <label className="welcomeLabel">{t("nicknameLabel")}</label>
            <input
              type="text"
              className="welcomeInput"
              placeholder={t("nicknamePlaceholder")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={12}
            />
          </div>

          <div className="welcomeNotice">
            <p>{t("notice1")}</p>
            <p>{t("notice2")}</p>
            <p>{t("notice3")}</p>
          </div>

          <button className="welcomeStartButton" onClick={onStart}>
            {t("startButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
