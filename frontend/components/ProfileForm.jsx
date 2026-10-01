"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import "./ProfileForm.css";

const avatarOptions = [
  "/assets/avatars/avatar1.webp",
  "/assets/avatars/avatar2.webp",
  "/assets/avatars/avatar3.webp",
  "/assets/avatars/avatar4.webp",
  "/assets/avatars/avatar5.webp",
];

export default function ProfileForm({
  username,
  setUsername,
  selectedAvatar,
  setSelectedAvatar,
  onSave,
  saveButtonText,
}) {
  const t = useTranslations("profileForm");

  return (
    <div className="profileFormCard">
      {/* 標題 */}
      <div className="profileFormHeader">
        <h2 className="profileFormTitle">{t("brandTitle")}</h2>
        <h2 className="profileFormTitle">{t("title")}</h2>
        <p className="profileFormSubtitle">
          {t("subtitle")}
        </p>
      </div>

            {/* ⭐ 預覽（加分重點） */}
      <div className="profilePreview">
        <p className="previewLabel">{t("previewLabel")}</p>
        <div className="previewBox">
          <Image
            src={selectedAvatar}
            alt={username || t("previewDefaultName")}
            className="previewAvatar"
            width={240}
            height={240}
            sizes="48px"
          />
          <span className="previewName">
            {username || t("previewDefaultName")}
          </span>
        </div>
      </div>

      {/* 頭貼選擇 */}
      <div className="profileFormSection">
        <label className="profileFormLabel">{t("chooseAvatar")}</label>
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
                sizes="60px"
              />
            </button>
          ))}
        </div>
      </div>


      {/* 名稱輸入 */}
      <div className="profileFormSection">
        <label className="profileFormLabel">{t("nicknameLabel")}</label>
        <input
          type="text"
          className="profileFormInput"
          placeholder={t("nicknamePlaceholder")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={12}
        />
      </div>

      {/* 說明 */}
      <div className="profileFormNotice">
        <p>{t("notice1")}</p>
        <p>{t("notice2")}</p>
        <p>{t("notice3")}</p>
      </div>

      {/* 按鈕 */}
      <button className="profileFormSaveButton" onClick={onSave}>
        {saveButtonText || t("defaultSaveButton")}
      </button>
    </div>
  );
}
