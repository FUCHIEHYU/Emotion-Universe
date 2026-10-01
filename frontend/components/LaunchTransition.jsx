"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import "./LaunchTransition.css";

export default function LaunchTransition({ isVisible }) {
  const t = useTranslations("launchTransition");

  if (!isVisible) return null;

  return (
    <div className="launchOverlay">
      <div className="launchStars"></div>
      <div className="launchGlow"></div>

      <div className="shipWrap">
        <Image
          src="/assets/transition/flame.webp"
          alt={t("flameAlt")}
          className="shipFlame"
          width={700}
          height={486}
          sizes="320px"
          priority
        />
        <Image
          src="/assets/transition/ship3.webp"
          alt={t("shipAlt")}
          className="shipBody"
          width={700}
          height={486}
          sizes="320px"
          priority
        />
      </div>

      <p className="launchText">{t("text")}</p>
    </div>
  );
}
