"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import { useRouter } from "@/i18n/navigation";
import MonsterGrid from "@/components/MonsterGrid";
import MoodModal from "@/components/MoodModal";
import LaunchTransition from "@/components/LaunchTransition";
import WelcomeModal from "@/components/WelcomeModal";

export default function HomePage() {
  const t = useTranslations("home");
  const [showWelcome, setShowWelcome] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("/assets/avatars/avatar1.webp");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [showLaunch, setShowLaunch] = useState(false);



  const router = useRouter();

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");

    if (!savedProfile) {
      setShowWelcome(true);
    } else {
      const parsed = JSON.parse(savedProfile);
      setUsername(parsed.username || "");
      setSelectedAvatar(parsed.avatar || "/assets/avatars/avatar1.webp");
    }
  }, []);

  const handleStart = () => {
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
    setShowWelcome(false);
  };

  const handleLaunchStart = () => {
    setShowLaunch(true);

    setTimeout(() => {
      setShowLaunch(false);
      router.push("/universe");
    }, 3800);
  };

  const handleMoodSuccess = (newMood) => {
    console.log("新增成功:", newMood);
  };

  return (
    <>
      {showWelcome && (
        <WelcomeModal
          username={username}
          setUsername={setUsername}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          onStart={handleStart}
        />
      )}

      <div className="background">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      <div className="min-h-screen">
        <Navbar />

        <main className="homeMain">
          <section className="homeHero">
            <p className="homeEyebrow">{t("eyebrow")}</p>

            <h1 className="homeTitle">{t("heading")}</h1>

            <p className="homeSubtitle">{t("subheading")}</p>
          </section>

          <MonsterGrid
            onSelectMonster={(monster) => {
              setSelectedMonster(monster);
              setIsModalOpen(true);
            }}
          />

          <MoodModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            monster={selectedMonster}
            onSuccess={handleMoodSuccess}
            onLaunchStart={handleLaunchStart}
          />
        </main>
      </div>

      <LaunchTransition isVisible={showLaunch} />
    </>
  );
}
