"use client";

import "./ProfileForm.css";

const avatarOptions = [
  "/assets/avatars/avatar1.png",
  "/assets/avatars/avatar2.png",
  "/assets/avatars/avatar3.png",
  "/assets/avatars/avatar4.png",
  "/assets/avatars/avatar5.png",
];

export default function ProfileForm({
  username,
  setUsername,
  selectedAvatar,
  setSelectedAvatar,
  onSave,
  saveButtonText = "儲存設定",
}) {
  return (
    <div className="profileFormCard">
      {/* 標題 */}
      <div className="profileFormHeader">
        <h2 className="profileFormTitle">What's your mood today?</h2>
        <h2 className="profileFormTitle">我的星旅人設定</h2>
        <p className="profileFormSubtitle">
          替自己選一個頭貼，取一個名字，用匿名的方式在情緒宇宙中留下心情。
        </p>
      </div>

            {/* ⭐ 預覽（加分重點） */}
      <div className="profilePreview">
        <p className="previewLabel">你的星旅人</p>
        <div className="previewBox">
          <img src={selectedAvatar} className="previewAvatar" />
          <span className="previewName">
            {username || "星旅人"}
          </span>
        </div>
      </div>

      {/* 頭貼選擇 */}
      <div className="profileFormSection">
        <label className="profileFormLabel">選擇你的頭貼</label>
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
              <img
                src={avatar}
                alt="avatar option"
                className="avatarImage"
              />
            </button>
          ))}
        </div>
      </div>


      {/* 名稱輸入 */}
      <div className="profileFormSection">
        <label className="profileFormLabel">你的暱稱</label>
        <input
          type="text"
          className="profileFormInput"
          placeholder="例如：星旅人小橘"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={12}
        />
      </div>

      {/* 說明 */}
      <div className="profileFormNotice">
        <p>Tips: 這裡不會顯示你的真實身分，請安心的寫下你今天的心情與感受。</p>
        <p>其他人只會看到你的頭貼與暱稱。</p>
        <p>你可以隨時回到設定頁修改資料。</p>
      </div>

      {/* 按鈕 */}
      <button className="profileFormSaveButton" onClick={onSave}>
        {saveButtonText}
      </button>
    </div>
  );
}