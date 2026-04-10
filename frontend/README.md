# 🌸 What's Your Mood Today?

一個以「情緒探索」為核心的互動式網站，透過可愛的情緒小怪獸與「情緒宇宙」概念，讓使用者可以匿名分享當下的心情，並在觀察他人情緒的過程中建立共感與自我覺察。

---

## ✨ 專案亮點

- 🌌 情緒宇宙視覺化呈現（Floating Emotion Stars）
- 🧠 匿名情緒分享與紀錄
- 💫 自己的情緒星辨識（視覺強化）
- 🎨 客製化 UI（包含 scrollbar、radio button）
- ⚡ 前後端分離架構（Next.js + FastAPI + MySQL）

---

## 🧩 核心功能

### 1. 情緒選擇
使用者可以選擇當下的情緒（快樂、悲傷、憤怒等），並進入對應情緒頁面。

### 2. 情緒紀錄
- 輸入當下的心情
- 選擇保留時間（24 小時 / 永久）
- 匿名送出至情緒宇宙

### 3. 情緒宇宙（Universe）
- 所有情緒會轉化為漂浮在宇宙中的情緒星
- 可點擊查看內容
- 自己的情緒星會有視覺強調

### 4. 匿名機制
- 使用 localStorage token 區分使用者
- 保持匿名但具備個人識別感

---

## 🛠 技術架構

### Frontend
- Next.js
- React
- CSS
- Framer Motion

### Backend
- FastAPI
- MySQL

### 功能設計
- RESTful API
- 環境變數管理
- 前後端分離架構

---

## 📦 專案結構

whats-your-mood-today/
├─ frontend/              # Next.js 前端
│  ├─ app/
│  ├─ components/
│  ├─ public/
│  ├─ .env.local
│  └─ package.json
│
├─ backend/               # FastAPI 後端
│  ├─ main.py
│  ├─ requirements.txt
│  └─ ...
│
└─ README.md


🌸 Emotion Universe — What's Your Mood Today?

一個將「情緒」轉化為宇宙星體的互動式網站 ✨
讓使用者能夠記錄心情、觀察他人情緒，並建立情緒共感與自我覺察。

🔗 Demo（之後可補）
Frontend: （之後放 Vercel）
Backend API: （之後放 Render / Railway）
🧠 專案特色（這段很重要！）
🌌 情緒視覺化（Emotion → 星體）
📝 匿名情緒分享系統
💬 情緒文字回應（規劃中）
🚫 不良內容過濾（規劃中）
⏳ 情緒自動消失機制（規劃中）
🧩 前後端分離架構（Next.js + FastAPI）
🗄️ MySQL 資料庫

👉（這段是面試官會看的）

🏗️ Tech Stack（技術棧）
Frontend
Next.js
React
CSS / Tailwind（或你實際用的）
Backend
FastAPI
Python 3.10+
Database
MySQL
DevOps（加分點🔥）
Docker（預計導入）
📁 專案結構
emotion-universe/
│
├── frontend/         # Next.js
│   ├── app/
│   ├── components/
│   └── styles/
│
├── backend/          # FastAPI
│   ├── main.py
│   └── models/
│
└── README.md
⚙️ 環境需求（⚠️ 換電腦必看）

請先安裝以下工具：

1️⃣ 基本環境
Node.js（建議 v18+）
npm 或 yarn
Python 3.10+
pip
2️⃣ 資料庫
安裝 MySQL
建立資料庫：
CREATE DATABASE emotion_universe;
3️⃣（推薦）API 測試工具
Postman
🚀 安裝與啟動
🔵 1. Clone 專案
git clone https://github.com/你的帳號/emotion-universe.git
cd emotion-universe
🟣 2. Backend（FastAPI）
cd backend

pip install fastapi uvicorn mysql-connector-python

啟動伺服器：

uvicorn main:app --reload

👉 開啟：

http://127.0.0.1:8000
🟡 3. Frontend（Next.js）
cd frontend

npm install
npm run dev

👉 開啟：

http://localhost:3000
🔗 API 路由
Method	Endpoint	說明
GET	/moods	取得所有情緒
POST	/moods	新增情緒

🌱 未來優化
 情緒 AI 分析（NLP）
 情緒回覆生成（AI）
 留言回覆系統
 使用者識別（匿名但可辨識自己）
 敏感詞過濾系統
 Docker 部署