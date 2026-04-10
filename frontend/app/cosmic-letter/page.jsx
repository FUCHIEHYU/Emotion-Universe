"use client";

import { Suspense, useState } from "react";
import Navbar from "../../components/Navbar";
import "./cosmic-letter.css";
import { useRouter, useSearchParams } from "next/navigation";

function CosmicLetterContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [sender, setSender] = useState("From：宇宙");

  const router = useRouter();
  const searchParams = useSearchParams();

  const emotion = searchParams.get("emotion") || "happiness";
  const text = searchParams.get("text") || "";
  const name = searchParams.get("name") || "宇宙";

  const handleToggleLetter = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    setSender(`From：${name}`);

    if (reply) return;

    try {
      setIsLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emotion,
          text,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setTimeout(() => {
        setReply(data.reply || "宇宙今天有點安靜，但它有收到你的心情。");
        setIsLoading(false);
      }, 900);
    } catch (error) {
      console.error("取得宇宙回信失敗：", error);

      setTimeout(() => {
        setReply("宇宙暫時沒有收到訊號，請稍後再試一次。");
        setSender("From：宇宙");
        setIsLoading(false);
      }, 900);
    }
  };

  return (
    <>
      <Navbar />

      <main className="letter-page">
        <div className="letter-page-inner">
          <button
            type="button"
            className={`letter-main-button ${isOpen ? "is-open" : ""}`}
            onClick={handleToggleLetter}
            aria-label={isOpen ? "收起宇宙回信" : "打開宇宙回信"}
          >
            <img
              src={
                isOpen
                  ? "/assets/letter/letter_open.png"
                  : "/assets/letter/letter_close.png"
              }
              alt="宇宙回信"
              className={`letter-main-image ${isLoading ? "is-loading" : ""}`}
            />

            {isOpen && (
              <div className="letter-main-text">
                {isLoading ? (
                  <div className="letter-loading-block">
                    <p className="letter-loading-text">
                      宇宙正在整理想對你說的話...
                    </p>
                    <div className="letter-loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="letter-main-from">{sender}</p>
                    <p className="letter-main-reply">{reply}</p>
                  </>
                )}
              </div>
            )}
          </button>

          <p className="letter-page-hint">
            {isOpen ? "點一下可收起這封信" : "請點擊打開 💌"}
          </p>
        </div>

        <button
          className="backToUniverseBtn"
          onClick={() => router.push("/universe")}
        >
          ← 返回情緒宇宙
        </button>
      </main>
    </>
  );
}

export default function CosmicLetterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CosmicLetterContent />
    </Suspense>
  );
}