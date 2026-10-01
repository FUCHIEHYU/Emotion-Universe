"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import ProfileForm from "@/components/ProfileForm";

export default function SettingsPage() {
  const t = useTranslations("settingsPage");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("/assets/avatars/avatar1.webp");

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setUsername(parsed.username || "");
      setSelectedAvatar(parsed.avatar || "/assets/avatars/avatar1.webp");
    }
  }, []);

  const handleSave = () => {
    if (!username.trim()) {
      alert(t("nicknameRequired"));
      return;
    }

    const profile = {
      username: username.trim(),
      avatar: selectedAvatar,
      hasOnboarded: true,
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert(t("saved"));
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
          saveButtonText={t("saveButton")}
        />
      </main>
    </div>
  );
}
