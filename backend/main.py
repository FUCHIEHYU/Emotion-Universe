from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "ADT112141141",
    "database": "emotion_universe"
}

class MoodCreate(BaseModel):
    emotion: str
    text: str
    keep_type: str
    user_token: str

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

@app.get("/")
def root():
    return {"message": "Emotion Universe API is running"}

@app.get("/moods")
def get_moods():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT * FROM moods
        WHERE keep_type = 'permanent'
           OR (keep_type = '24h' AND created_at >= NOW() - INTERVAL 1 DAY)
        ORDER BY created_at DESC
    """)
    results = cursor.fetchall()

    cursor.close()
    db.close()

    return results

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
        mood.emotion,
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

    return {"message": "success", "id": inserted_id}

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
        mood.emotion,
        mood.text,
        mood.keep_type,
        mood_id
    )

    cursor.execute(sql, values)
    db.commit()

    cursor.close()
    db.close()

    return {"message": "更新成功", "id": mood_id}