"use client";

import Navbar from "../../components/Navbar";
import "./about.css";

const selItems = [
  {
    title: "自我覺察",
    text: "透過情緒選擇與書寫，辨識自己當下的感受與狀態。",
  },
  {
    title: "自我管理",
    text: "藉由記錄情緒與整理想法，學習安放情緒與面對壓力。",
  },
  {
    title: "社會覺察",
    text: "在情緒宇宙中閱讀他人的心情故事，理解不同處境與感受。",
  },
  {
    title: "人際關係技巧",
    text: "從觀察與共感中培養尊重、傾聽與溫柔回應的能力。",
  },
  {
    title: "負責任的決定",
    text: "練習以更健康、更合適的方式表達情緒與面對互動情境。",
  },
];

<div className="tech-card"></div>
const featureItems = [
  {
    title: "情緒選擇與分類",
    text: "匿名情緒紀錄與分享，可選限時或永久停留公開宇宙。",
    image: "/assets/about/about-feature-1.png",
    sel: "SEL｜自我覺察",
  },
  {
    title: "情緒小百科",
    text: "以卡牌呈現，透過視覺化理解不同情緒。",
    image: "/assets/about/about-feature-2.png",
    sel: "SEL｜自我覺察・社會覺察",
  },
  {
    title: "情緒宇宙",
    text: "互動瀏覽他人情緒。系統提供情緒資料保存機制，使用者可選擇將情緒星體儲存為「24小時」或「永久保存」。",
    image: "/assets/about/about-feature-3.png",
    sel: "SEL｜社會覺察",
  },
  {
    title: "宇宙回信",
    text: "透過NLP分析情緒日記，再使用AI 回應情緒與感受。",
    image: "/assets/about/about-feature-4.png",
    sel: "SEL｜自我管理",
  },
];

const techItems = [
  {
    icon: "⚛️",
    title: "Next.js + React",
    text: (
      <>
        • 使用 App Router 建立頁面架構<br />
        • 以 React hooks 管理互動狀態（如 useState / useEffect）<br />
        • <strong>負責前端畫面與後端 API 串接</strong>
      </>
    ),
  },
  {
    icon: "⚡",
    title: "FastAPI",
    text: (
      <>
        • 建立 /moods、/reply 等 API 端點<br />
        • 處理情緒資料與回覆邏輯<br />
        • <strong>作為前端與資料庫之間的服務層</strong>
      </>
    ),
  },
  {
    icon: "🗄️",
    title: "MySQL",
    text: (
      <>
        • 設計情緒資料的基本表結構<br />
        • 撰寫查詢與篩選條件<br />
        • <strong>依需求設定資料保存與顯示規則</strong>
      </>
    ),
  },
  {
    icon: "🤖",
    title: "NLP 情緒分析",
    text: (
      <>
        • <strong>rule-based-NLP 情緒分析 </strong>進行情緒分析<br />
        • 判斷情緒、情境、需求與強度等欄位<br />
        • <strong>不依賴外部付費 API</strong>
      </>
    ),
  },
  {
    icon: "🎨",
    title: "自製素材 + 視覺設計",
    text: (
      <>
        • 角色、星體等視覺素材自行設計<br />
        • 製作 CSS 動畫效果（如漂浮、信封互動）<br />
        • <strong>整合視覺設計與前端實作</strong>
      </>
    ),
  },
  {
    icon: "🌐",
    title: "雲端部署",
    text: (
      <>
        •<strong>Vercel</strong> 部署前端<br />
        •<strong>Render</strong> 部署 FastAPI 與 MySQL<br />
        •前端改為連接雲端 API 與雲端資料服務
      </>
    ),
  },
];


export default function AboutPage() {
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
              <h1>關於 Emotion Universe</h1>
              <p className="about-subtitle">
                  透過互動與視覺化，結合SEL幫助理解情緒與表達感受的互動式網站
              </p>
            </div>
          </div>

          <div className="about-block about-card">
             <h2 className="section-title">
              <span className="star-icon">✦</span>
              網頁介紹
            </h2>



            <p className="about-lead">
              Emotion Universe 是一個結合
              <strong> 社會情緒學習（SEL, Social and Emotional Learning）</strong>
              概念的互動式網站，透過<strong>視覺化設計讓使用者理解自己與他人的情緒</strong>。
            </p>

            <p>
              網站透過情緒小怪獸、匿名分享機制與宇宙式互動場景，
              幫助孩子探索內在感受、表達情緒，並在觀看他人故事的過程中，
              自然練習理解、同理與共感。
            </p>

            <p className="about-highlight">
              我們希望這不只是一個記錄心情的工具，
              而是一個能<strong>讓孩子安心感受自己、學習理解他人的數位情緒學習空間</strong>。
            </p>
          </div>

          <div className="about-block about-card">
            <h2 className="section-title">
              <span className="star-icon">✦</span>
              核心教育概念
            </h2>


            <p>
              社會情緒學習（SEL, Social Emotional Learning）SEL是一種針對<strong>孩子社交及情緒管理</strong>為重點的教育方式。
              由美國「課業、社交與情緒學習組織」（CASEL）提出的概念，是情緒教育的一種，
              包含<strong>理解自己和他人的情緒、處理壓力、同理與社交能力</strong>。
            </p>
            <p>
              Emotion Universe 希望透過情緒紀錄、匿名分享與情緒宇宙互動，
              讓孩子在自然參與的過程中，逐步建立情緒理解與社會互動能力，
              <strong>讓情緒教育不只是被說明，而是能被看見、被感受、被練習</strong>。
            </p>
          </div>

      <div className="about-block about-card">
        <h2 className="section-title">
          <span className="star-icon">✦</span>
          核心功能
        </h2>

        <div className="feature-intro">
          以下功能設計皆結合 SEL 社會情緒學習概念，讓孩子在互動中自然練習情緒理解與表達。
        </div>

        <div className="feature-grid">
          {featureItems.map((item, index) => (
            <div key={index} className="feature-item">
              <div className="feature-circle">
                <img src={item.image} alt={item.title} />
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
              技術架構
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
              我們希望帶來的影響
            </h2>
            <p>
              在 Emotion Universe 中，每一份情緒都像宇宙中的一顆星體，
              都值得被看見、被理解。
            </p>
            <p>
              我們希望孩子在這個空間裡，不只學會說出「我現在怎麼了」，
              也能慢慢理解「原來別人也有不同的感受」，
              進而培養更深的自我理解、同理心與情緒表達能力。
            </p>
          </div>

          <div className="about-block about-card">
            <h2 className="section-title">
              <span className="star-icon">✦</span>
              聯絡我們
            </h2>
            <p>我們很關心使用者的體驗，如有遇到任何問題歡迎聯絡我們。</p>
            <p>Email：fchiehyu@gmail.com</p>
          </div>

          <div className="about-footer">
            © 2026 Emotion Universe. | FUCHIEHYU 專為情緒星探索者設計 💖
          </div>
        </section>
      </main>
    </>
  );
}
