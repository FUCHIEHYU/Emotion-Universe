"use client";

import "./Navbar.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleSwitchLocale = () => {
    const nextLocale = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <Image
          src="/assets/logo.webp"
          alt="logo"
          className="logoImg"
          width={160}
          height={160}
          sizes="40px"
          priority
        />
        <span>{t("logoText")}</span>
      </div>

      <div className="navbarRight">
        <div className="navbarLinks">
          <Link href="/" className="navLink">{t("home")}</Link>
          <Link href="/universe" className="navLink">{t("universe")}</Link>
          <Link href="/room" className="navLink">{t("room")}</Link>
          <Link href="/about" className="navLink">{t("about")}</Link>
        </div>

        <button
          type="button"
          className="navLink localeSwitchButton"
          onClick={handleSwitchLocale}
        >
          {t("localeSwitch")}
        </button>

        {user && (
          <Link href="/settings" className="navUser">
            <Image
              src={user.avatar}
              alt={user.username}
              className="navAvatar"
              width={240}
              height={240}
              sizes="28px"
            />
            <span className="navUsername">{user.username}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
