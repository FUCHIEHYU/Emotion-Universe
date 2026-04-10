"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileForm from "../../components/ProfileForm";

export default function SettingsPage() {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("/assets/avatars/avatar1.PNG");

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setUsername(parsed.username || "");
      setSelectedAvatar(parsed.avatar || "/assets/avatars/avatar1.PNG");
    }
  }, []);

  const handleSave = () => {
    if (!username.trim()) {
      alert("請先輸入你的暱稱");
      return;
    }

    const profile = {
      username: username.trim(),
      avatar: selectedAvatar,
      hasOnboarded: true,
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("設定已儲存！");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 24px 60px",
        }}
      >
        <ProfileForm
          username={username}
          setUsername={setUsername}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          onSave={handleSave}
          saveButtonText="儲存我的設定"
        />
      </main>
    </div>
  );
}