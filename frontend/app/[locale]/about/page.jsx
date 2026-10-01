"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import "./about.css";

const FEATURE_IMAGES = [
  "/assets/about/about-feature-1.webp",
  "/assets/about/about-feature-2.webp",
  "/assets/about/about-feature-3.webp",
  "/assets/about/about-feature-4.webp",
];

export default function AboutPage() {
  const t = useTranslations("about");

  const featureItems = [1, 2, 3, 4].map((n, index) => ({
    title: t(`feature${n}Title`),
    text: t(`feature${n}Text`),
    image: FEATURE_IMAGES[index],
    sel: t(`feature${n}Sel`),
  }));

  const techItems = [
    {
      icon: "⚛️",
      title: t("tech1Title"),
      text: (
        <>
          • {t("tech1Line1")}<br />
          • {t("tech1Line2")}<br />
          • <strong>{t("tech1Line3")}</strong>
        </>
      ),
    },
    {
      icon: "⚡",
      title: t("tech2Title"),
      text: (
        <>
          • {t("tech2Line1")}<br />
          • {t("tech2Line2")}<br />
          • <strong>{t("tech2Line3")}</strong>
        </>
      ),
    },
    {
      icon: "🗄️",
      title: t("tech3Title"),
      text: (
        <>
          • {t("tech3Line1")}<br />
          • {t("tech3Line2")}<br />
          • <strong>{t("tech3Line3")}</strong>
        </>
      ),
    },
    {
      icon: "🤖",
      title: t("tech4Title"),
      text: (
        <>
          • <strong>{t("tech4Line1Strong")}</strong>{t("tech4Line1Rest")}<br />
          • {t("tech4Line2")}<br />
          • <strong>{t("tech4Line3")}</strong>
        </>
      ),
    },
    {
      icon: "🎨",
      title: t("tech5Title"),
      text: (
        <>
          • {t("tech5Line1")}<br />
          • {t("tech5Line2")}<br />
          • <strong>{t("tech5Line3")}</strong>
        </>
      ),
    },
    {
      icon: "🌐",
      title: t("tech6Title"),
      text: (
        <>
          •<strong>{t("tech6Line1Strong")}</strong>{t("tech6Line1Rest")}<br />
          •<strong>{t("tech6Line2Strong")}</strong>{t("tech6Line2Rest")}<br />
          •{t("tech6Line3")}
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />

      <main className="about-wrapper">

        {/* 🌌 背景層 */}
        <div className="about-bg">
          <div className="hero-glow hero-glow1"></div>
          <div className="hero-glow hero-glow2"></div>
          <div className="hero-glow hero-glow3"></div>
        </div>

        {/* 🌟 內容層 */}


        <section className="about-section">
          <div className="about-hero-card">

            <div className="hero-content">
              <h1>{t("heroTitle")}</h1>
              <p className="about-subtitle">
                  {t("heroSubtitle")}
              </p>
            </div>
          </div>

          <div className="about-block about-card">
             <h2 className="section-title">
              <span className="star-icon">✦</span>
              {t("introTitle")}
            </h2>



            <p className="about-lead">
              {t("introLead1")}
              <strong> {t("introLeadStrong")}</strong>
              {t("introLead2")}<strong>{t("introLeadStrong2")}</strong>{t("introLead3")}
            </p>

            <p>
              {t("introBody1")}
            </p>

            <p className="about-highlight">
              {t("introHighlightPre")}<strong>{t("introHighlightStrong")}</strong>{t("introHighlightPost")}
            </p>
          </div>

          <div className="about-block about-card">
            <h2 className="section-title">
              <span className="star-icon">✦</span>
              {t("conceptTitle")}
            </h2>


            <p>
              {t("conceptBody1Pre")}<strong>{t("conceptBody1Strong")}</strong>
              {t("conceptBody1Mid")}<strong>{t("conceptBody1Strong2")}</strong>{t("conceptBody1Post")}
            </p>
            <p>
              {t("conceptBody2Pre")}
              <strong>{t("conceptBody2Strong")}</strong>{t("conceptBody2Post")}
            </p>
          </div>

      <div className="about-block about-card">
        <h2 className="section-title">
          <span className="star-icon">✦</span>
          {t("featuresTitle")}
        </h2>

        <div className="feature-intro">
          {t("featuresIntro")}
        </div>

        <p className="feature-note">
          {t("featuresNote")}
        </p>

        <div className="feature-grid">
          {featureItems.map((item, index) => (
            <div key={index} className="feature-item">
              <div className="feature-circle">
                <Image src={item.image} alt={item.title} fill sizes="150px" />
              </div>

              <div className="feature-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="feature-sel-tag">{item.sel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

          <div className="about-block about-card">
            <h2 className="section-title">
              <span className="star-icon">✦</span>
              {t("techTitle")}
            </h2>
            <div className="tech-grid">
              {techItems.map((item, index) => (
                <div key={index} className="tech-card">
                  <h3>{item.icon} | {item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-block about-card">
            <h2 className="section-title">
              <span className="star-icon">✦</span>
              {t("impactTitle")}
            </h2>
            <p>
              {t("impactBody1")}
            </p>
            <p>
              {t("impactBody2")}
            </p>
          </div>

          <div className="about-block about-card">
            <h2 className="section-title">
              <span className="star-icon">✦</span>
              {t("contactTitle")}
            </h2>
            <p>{t("contactBody")}</p>
            <p>{t("contactEmail")}</p>
          </div>

          <div className="about-footer">
            {t("footer")}
          </div>
        </section>
      </main>
    </>
  );
}
