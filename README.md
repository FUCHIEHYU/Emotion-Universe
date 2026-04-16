## 專案介紹
What’s your mood today?

Emotion Universe 是一個結合 社會情緒學習（SEL, Social and Emotional Learning）概念的互動式網站，透過 視覺化設計讓使用者理解自己與他人的情緒。
網站透過情緒小怪獸、匿名分享機制與宇宙式互動場景， 幫助孩子探索內在感受、表達情緒，並在觀看他人故事的過程中， 自然練習理解、同理與共感。
我們希望這不只是一個記錄心情的工具， 而是一個能讓孩子安心感受自己、學習理解他人的數位情緒學習空間。
系統不僅提供情緒記錄功能，也設計了情緒分析與回應機制。當使用者輸入內容後，會透過 rule-based 文字分析判斷情緒與需求，並生成對應的「宇宙回信」，形成 input → analysis → response 的互動流程。

✦核心教育概念
社會情緒學習（SEL, Social Emotional Learning）是一種針對 孩子社交及情緒管理為重點的教育方式，由美國「課業、社交與情緒學習組織」（CASEL）提出。 其核心包含 理解自己與他人情緒、處理壓力、同理與社交能力。

Emotion Universe 希望透過情緒紀錄、匿名分享與情緒宇宙互動， 讓孩子在自然參與的過程中，逐步建立情緒理解與社會互動能力，讓情緒教育不只是被說明，而是能被看見、被感受、被練習。

Keywords:
emotion, UI/UX, interaction, web, education, SEL, empathy, self-awareness, anonymous-sharing

## 技術架構

前端：Next.js、React、CSS
後端：FastAPI
資料庫：MySQL
架構：前後端分離（REST API）


## 系統架構

Frontend (Next.js / React)
        ↓ HTTP Request
Backend (FastAPI)
        ↓
Text Processing Layer (NLP Analysis + Reply Generation)
        ↓
Database (MySQL)

前端負責使用者介面與互動體驗（情緒輸入、宇宙視覺呈現）；
後端提供 API 並負責整體資料流程控制。

當使用者提交情緒內容時，資料會進入後端的處理流程：

文字前處理與關鍵字分析（NLP）
判斷情緒、主題、使用者需求與情緒強度
根據分析結果生成「宇宙回信」
將情緒資料寫入資料庫
此流程使系統不只是資料儲存，而是具備完整的資料處理與回應機制。



# Dataflow
User Input (Emotion + Text)
        ↓
Frontend (Next.js / React)
        ↓ API Request
Backend (FastAPI)
   ├── POST /analyze   → 分析文字內容
   ├── POST /reply     → 生成宇宙回信
   ├── GET /moods      → 取得情緒資料
   ├── POST /moods     → 新增情緒資料
   ├── PUT /moods/{id} → 更新情緒資料
   └── DELETE /moods/{id} → 刪除情緒資料
        ↓
Text Processing Layer
(NLP Analysis + Reply Generation)
        ↓
Database (MySQL)
        ↓
Return Response
        ↓
Frontend Rendering (Universe UI)

# API Endpoints
GET /：確認 API 服務是否正常運作
POST /analyze：分析使用者輸入文字，回傳情緒、主題、需求與強度
POST /reply：根據輸入內容與情緒生成宇宙回信
GET /moods：取得情緒宇宙中的資料列表
POST /moods：新增一筆情緒資料
PUT /moods/{mood_id}：更新指定情緒資料
DELETE /moods/{mood_id}：刪除指定情緒資料

## 核心模組：

情緒分析（analyze_text）
回信生成（generate_reply）
API 流程（FastAPI endpoints）
核心功能
情緒輸入與匿名分享
情緒宇宙視覺化呈現
前後端 API 串接
MySQL 資料儲存
宇宙回信（情緒分析 + 回應生成）
### Database
- MySQL
- Aiven MySQL Cloud Database

### Deployment
- Vercel (Frontend)
- Render (Backend)

## 情緒分析與宇宙回信系統

本專案實作一個基於規則（rule-based）的文字分析系統。

當使用者輸入文字後，系統會透過關鍵字比對與計分邏輯，分析以下資訊：

情緒（開心、難過、焦慮、生氣等）
主題（學校、人際、感情、家庭、工作等）
使用者需求（建議 / 傾聽 / 安慰）
情緒強度（普通 / 高強度）

系統會記錄實際命中的關鍵字，使分析結果具備可解釋性。

在分析完成後，系統會根據結果生成「宇宙回信」，提供：

情緒回應、安慰與支持、基本建議

## 資料保存機制

系統提供情緒資料保存機制，使用者可選擇將情緒星體儲存為「24小時」或「永久保存」，短期資料透過時間機制自動清除，提升系統輕量性與使用者隱私控制。


API 範例
GET /moods
POST /moods
POST /reply
POST /analyze
{
  "emotion": "anxious",
  "text": "今天有點焦慮，但還在努力撐著。"
}
開發重點
建立完整資料流（前端 → 後端 → 分析 → 資料庫）
REST API 設計與串接（FastAPI）
關聯式資料庫設計（MySQL）
將互動設計與系統邏輯整合


## (新增)建立系統韌性與可觀測性

考量免費雲端服務（Render + Aiven）可能出現冷啟動與休眠問題，本專案進行以下優化：

- 建立 `/health`、`/health/db`，用來檢查 API 與資料庫狀態
- 加入 Retry 機制，避免資料庫暫時無法連線時直接失敗
- 使用 Connection Pool 提升連線效率
- 使用 `ping()` 確保連線有效
- 當資料庫尚未就緒時回傳 503，而非 500
- 前端提供 loading / 暖機提示，提升使用者體驗

提升系統在雲端環境下的穩定性與可觀測性








## Demo
- Video Demo：已完成錄製
- Live Demo：https://emotion-universe.vercel.app/
- Frontend：Vercel
- Backend：Render
- Database：Aiven MySQL


## 未來規劃

 ● 建立不當言論過濾機制，提升平台內容安全性
 ● 優化Rule-based 分析邏輯，導入更進階的回應生成方式（如 AI / LLM 模型）
 ● 優化並擴充情緒分類邏輯，提高分析準確度
 ● 探索應用於教育場域的可能性（如情緒教育與 SEL 教學輔助工具）


## 作者

Made by 傅婕伃 | FUCHIEHYU
Email: fchiehyu@gmail.com
