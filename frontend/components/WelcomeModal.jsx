import "./WelcomeModal.css";

const avatarOptions = [
  "/assets/avatars/avatar1.png",
  "/assets/avatars/avatar2.png",
  "/assets/avatars/avatar3.png",
  "/assets/avatars/avatar4.png",
  "/assets/avatars/avatar5.png",
];

export default function WelcomeModal({
  username,
  setUsername,
  selectedAvatar,
  setSelectedAvatar,
  onStart,
}) {
  return (
    <div className="welcomeOverlay">
      <div className="welcomeWrapper">
        <h1 className="welcomeSiteTitle">What&apos;s Your Mood Today?</h1>

        <div className="welcomeCard">
          <h2 className="welcomeTitle">歡迎登入情緒宇宙</h2>
          <p className="welcomeSubtitle">
            選一個頭貼、取一個名字，開始你的匿名情緒旅程。
          </p>

          <div className="welcomeSection">
            <label className="welcomeLabel">選擇你的頭貼</label>
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
                  <img src={avatar} alt="avatar option" className="avatarImage" />
                </button>
              ))}
            </div>
          </div>

          <div className="welcomeSection">
            <label className="welcomeLabel">你的暱稱</label>
            <input
              type="text"
              className="welcomeInput"
              placeholder="例如：星旅人小橘"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={12}
            />
          </div>

          <div className="welcomeNotice">
            <p>這裡不會顯示你的真實身分。</p>
            <p>其他人只會看到你的頭貼與暱稱。</p>
            <p>每一則心情都會成為宇宙中的一顆小星球。</p>
          </div>

          <button className="welcomeStartButton" onClick={onStart}>
            開始我的情緒旅程
          </button>
        </div>
      </div>
    </div>
  );
}