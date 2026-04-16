from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import random

from nlp_service import analyze_text
from reply_service import generate_reply

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from mysql.connector import pooling
import time

from dotenv import load_dotenv
load_dotenv()

import os


DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
}


# =========================
# Pydantic Models
# =========================
class AnalyzeRequest(BaseModel):
    text: str


class MoodCreate(BaseModel):
    emotion: str
    text: str
    keep_type: str
    user_token: str


class ReplyRequest(BaseModel):
    emotion: str
    text: str


# =========================
# DB Connection
# =========================
db_pool = pooling.MySQLConnectionPool(
    pool_name="emotion_pool",
    pool_size=5,
    **DB_CONFIG
)

def get_db_connection():
    return db_pool.get_connection()


def get_db_connection_with_retry(retries=3, delay=3):
    last_error = None

    for _ in range(retries):
        try:
            conn = db_pool.get_connection()
            conn.ping(reconnect=True, attempts=1, delay=0)
            return conn
        except Exception as e:
            last_error = e
            time.sleep(delay)

    raise last_error



@app.get("/health")
def health():
    return {"status": "ok", "service": "api"}


@app.get("/health/db")
def health_db():
    try:
        conn = get_db_connection_with_retry()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()

        cursor.close()
        conn.close()

        return {"status": "ok", "service": "database"}

    except Exception as e:
        return {
            "status": "error",
            "service": "database",
            "detail": str(e)
        }


# =========================
# Root
# =========================
@app.get("/")
def root():
    return {"message": "Emotion Universe API is running"}


# =========================
# Debug NLP Analyze
# =========================
@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    slots = analyze_text(request.text)

    # 這裡只是 debug 用，所以 emotion 先用 NLP 分析結果
    reply = generate_reply(slots, request.text)

    return {
        "text": request.text,
        "emotion": slots.get("emotion"),
        "topic": slots.get("topic"),
        "need": slots.get("need"),
        "intensity": slots.get("intensity"),
        "matched_keywords": slots.get("matched_keywords"),
        "reply": reply
    }


# =========================
# Generate Universe Reply
# =========================
@app.post("/reply")
def create_reply(request: ReplyRequest):
    slots = analyze_text(request.text)

    # 使用者前端選的 emotion 為主
    slots["emotion"] = request.emotion

    reply = generate_reply(slots, request.text)

    return {
        "text": request.text,
        "emotion": request.emotion,
        "topic": slots.get("topic"),
        "need": slots.get("need"),
        "intensity": slots.get("intensity"),
        "matched_keywords": slots.get("matched_keywords"),
        "reply": reply
    }


# =========================
# Get Moods
# =========================
from fastapi import HTTPException

@app.get("/moods")
def get_moods():
    try:
        db = get_db_connection_with_retry()
        cursor = db.cursor(dictionary=True)

        cursor.execute("""
            SELECT *
            FROM moods
            WHERE keep_type = 'permanent'
               OR (keep_type = '24h' AND created_at >= NOW() - INTERVAL 1 DAY)
            ORDER BY created_at DESC
        """)

        results = cursor.fetchall()

        cursor.close()
        db.close()

        return results

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"database_waking_up: {str(e)}"
        )


# =========================
# Create Mood
# =========================
@app.post("/moods")
def create_mood(mood: MoodCreate):
    db = get_db_connection()
    cursor = db.cursor()

    avatars = [
        "/assets/avatars/avatar1.png",
        "/assets/avatars/avatar2.png",
        "/assets/avatars/avatar3.png",
        "/assets/avatars/avatar4.png",
        "/assets/avatars/avatar5.png",
    ]

    sql = """
    INSERT INTO moods (emotion, content, author_name, avatar, keep_type, user_token)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    values = (
        mood.emotion,              # 使用者前端自己選的情緒
        mood.text,
        "星旅人",
        random.choice(avatars),
        mood.keep_type,
        mood.user_token
    )

    cursor.execute(sql, values)
    db.commit()

    inserted_id = cursor.lastrowid

    cursor.close()
    db.close()

    return {
        "message": "success",
        "id": inserted_id,
        "emotion": mood.emotion,
        "text": mood.text
    }


# =========================
# Delete Mood
# =========================
@app.delete("/moods/{mood_id}")
def delete_mood(mood_id: int, user_token: str):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM moods WHERE id = %s", (mood_id,))
    mood = cursor.fetchone()

    if not mood:
        cursor.close()
        db.close()
        return {"message": "找不到這顆情緒星"}

    if mood["user_token"] != user_token:
        cursor.close()
        db.close()
        return {"message": "你不能刪除別人的情緒星"}

    cursor.close()

    cursor = db.cursor()
    cursor.execute("DELETE FROM moods WHERE id = %s", (mood_id,))
    db.commit()

    cursor.close()
    db.close()

    return {"message": "刪除成功", "id": mood_id}


# =========================
# Update Mood
# =========================
@app.put("/moods/{mood_id}")
def update_mood(mood_id: int, mood: MoodCreate):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM moods WHERE id = %s", (mood_id,))
    existing_mood = cursor.fetchone()

    if not existing_mood:
        cursor.close()
        db.close()
        return {"message": "找不到這顆情緒星"}

    if existing_mood["user_token"] != mood.user_token:
        cursor.close()
        db.close()
        return {"message": "你不能編輯別人的情緒星"}

    cursor.close()
    cursor = db.cursor()

    sql = """
    UPDATE moods
    SET emotion = %s,
        content = %s,
        keep_type = %s
    WHERE id = %s
    """

    values = (
        mood.emotion,   # 仍然使用使用者重新選的情緒
        mood.text,
        mood.keep_type,
        mood_id
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return {
        "message": "更新成功",
        "id": mood_id,
        "emotion": mood.emotion,
        "text": mood.text
    }