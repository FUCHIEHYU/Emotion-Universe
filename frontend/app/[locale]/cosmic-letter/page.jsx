"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import "./cosmic-letter.css";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

// 強制告訴 Next.js 這個頁面不需要在編譯時預渲染
export const dynamic = 'force-dynamic';

function CosmicLetterContent() {
  const t = useTranslations("cosmicLetter");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [sender, setSender] = useState(`${t("senderPrefix")}${t("defaultSender")}`);

  const router = useRouter();
  const searchParams = useSearchParams();

  const emotion = searchParams.get("emotion") || "happiness";
  const text = searchParams.get("text") || "";
  const name = searchParams.get("name") || t("defaultSender");

  const handleToggleLetter = async () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    setSender(`${t("senderPrefix")}${name}`);

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
        setReply(data.reply || t("fallbackReply"));
        setIsLoading(false);
      }, 900);
    } catch (error) {
      console.error("取得宇宙回信失敗：", error);

      setTimeout(() => {
        setReply(t("errorReply"));
        setSender(`${t("senderPrefix")}${t("defaultSender")}`);
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
            aria-label={isOpen ? t("closeAria") : t("openAria")}
          >
            <Image
              src={
                isOpen
                  ? "/assets/letter/letter_open.webp"
                  : "/assets/letter/letter_close.webp"
              }
              alt={t("letterAlt")}
              className={`letter-main-image ${isLoading ? "is-loading" : ""}`}
              width={1000}
              height={695}
              sizes="420px"
              priority
            />

            {isOpen && (
              <div className="letter-main-text">
                {isLoading ? (
                  <div className="letter-loading-block">
                    <p className="letter-loading-text">
                      {t("loadingText")}
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
            {isOpen ? t("hintOpen") : t("hintClosed")}
          </p>
        </div>

        <button
          className="backToUniverseBtn"
          onClick={() => router.push("/universe")}
        >
          {t("backToUniverse")}
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
