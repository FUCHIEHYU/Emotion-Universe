# nlp_service.py

from typing import Dict, List


EMOTION_KEYWORDS = {
    "happiness": [
        "開心", "快樂", "幸福", "開朗", "放鬆", "輕鬆", "愉快", "滿足",
        "期待", "興奮", "喜悅", "開懷", "舒服", "有成就感", "小確幸"
    ],
    "sad": [
        "難過", "傷心", "失落", "低落", "沮喪", "想哭", "哭", "孤單",
        "寂寞", "委屈", "心酸", "失望", "無助", "心累", "難受"
    ],
    "fear": [
        "害怕", "恐懼", "緊張", "不安", "焦慮", "擔心", "壓力",
        "慌", "忐忑", "未知", "怕", "怕做不好", "怕失敗", "壓迫感"
    ],
    "anger": [
        "生氣", "憤怒", "火大", "不爽", "煩", "氣死", "氣炸",
        "不公平", "討厭死了", "被冒犯", "不被尊重", "受不了"
    ],
    "surprise": [
        "驚訝", "震驚", "突然", "沒想到", "意外", "嚇到",
        "傻眼", "不可思議", "出乎意料"
    ],
    "disgust": [
        "厭惡", "噁心", "反感", "排斥", "討厭", "不舒服",
        "想遠離", "好髒", "好噁", "受不了", "嫌惡"
    ],
}


TOPIC_KEYWORDS = {
    "school": [
        "考試", "段考", "報告", "作業", "學校", "上課", "教授", "老師",
        "同學", "成績", "期中", "期末", "補習", "實習", "專題", "簡報"
    ],
    "friendship": [
        "朋友", "同學", "人際", "被排擠", "被忽略", "聊天", "吵架",
        "冷戰", "誤會", "相處"
    ],
    "relationship": [
        "喜歡的人", "曖昧", "分手", "感情", "戀愛", "愛情", "前任",
        "告白", "在一起", "喜歡他", "喜歡她"
    ],
    "family": [
        "家人", "媽媽", "爸爸", "家庭", "哥哥", "姐姐", "弟弟", "妹妹",
        "長輩", "親戚", "家裡"
    ],
    "work": [
        "工作", "打工", "同事", "主管", "上班", "下班", "職場", "面試"
    ],
}


NEED_KEYWORDS = {
    "advice": [
        "怎麼辦", "該怎麼辦", "可以怎麼做", "怎麼做", "怎麼解決",
        "有什麼方法", "我該怎麼做", "要怎麼辦"
    ],
    "listening": [
        "想說", "想抒發", "想講", "只是想講", "只是想說", "想抱怨",
        "想發洩", "想分享", "想說出來"
    ],
    "comfort": [
        "安慰", "陪我", "好累", "撐不住", "想被理解", "需要安慰"
    ],
}


INTENSITY_KEYWORDS = {
    "high": [
        "很", "超", "非常", "真的", "太", "超級", "特別", "極度", "一直",
        "完全", "好想", "快要", "受不了", "崩潰"
    ],
    "normal": []
}


def normalize_text(text: str) -> str:
    """基本清理文字"""
    if not text:
        return ""

    text = text.strip()
    text = text.replace("，", " ")
    text = text.replace("。", " ")
    text = text.replace("！", " ")
    text = text.replace("？", " ")
    text = text.replace(",", " ")
    text = text.replace(".", " ")
    text = text.replace("!", " ")
    text = text.replace("?", " ")
    return text


def find_matched_keywords(text: str, keyword_map: Dict[str, List[str]]) -> Dict[str, List[str]]:
    """找出每個分類實際命中的關鍵字"""
    matched = {}

    for label, keywords in keyword_map.items():
        hits = [kw for kw in keywords if kw in text]
        if hits:
            matched[label] = hits

    return matched


def score_labels(text: str, keyword_map: Dict[str, List[str]]) -> Dict[str, int]:
    """根據關鍵字命中次數計分"""
    scores = {}

    for label, keywords in keyword_map.items():
        score = 0
        for kw in keywords:
            if kw in text:
                score += 1
        scores[label] = score

    return scores


def pick_best_label(scores: Dict[str, int], default_label: str) -> str:
    """選出分數最高的分類；若都沒命中就用預設值"""
    best_label = default_label
    best_score = 0

    for label, score in scores.items():
        if score > best_score:
            best_label = label
            best_score = score

    return best_label


def detect_emotion(text: str) -> str:
    scores = score_labels(text, EMOTION_KEYWORDS)
    return pick_best_label(scores, default_label="sad")


def detect_topic(text: str) -> str:
    scores = score_labels(text, TOPIC_KEYWORDS)
    return pick_best_label(scores, default_label="general")


def detect_need(text: str) -> str:
    scores = score_labels(text, NEED_KEYWORDS)
    return pick_best_label(scores, default_label="comfort")


def detect_intensity(text: str) -> str:
    high_keywords = INTENSITY_KEYWORDS["high"]

    for kw in high_keywords:
        if kw in text:
            return "high"

    # 額外規則：如果出現重複驚嘆或連續情緒詞，也判高強度
    if "！！" in text or "!!" in text or "..." in text or "好想哭" in text or "快崩潰" in text:
        return "high"

    return "normal"


def analyze_text(text: str) -> Dict:
    """
    主分析函式
    回傳：
    {
        "emotion": "sad",
        "topic": "school",
        "need": "advice",
        "intensity": "high",
        "matched_keywords": {...}
    }
    """
    clean_text = normalize_text(text)

    emotion = detect_emotion(clean_text)
    topic = detect_topic(clean_text)
    need = detect_need(clean_text)
    intensity = detect_intensity(clean_text)

    matched_keywords = {
        "emotion": find_matched_keywords(clean_text, EMOTION_KEYWORDS).get(emotion, []),
        "topic": find_matched_keywords(clean_text, TOPIC_KEYWORDS).get(topic, []),
        "need": find_matched_keywords(clean_text, NEED_KEYWORDS).get(need, []),
        "intensity": [kw for kw in INTENSITY_KEYWORDS["high"] if kw in clean_text]
    }

    return {
        "emotion": emotion,
        "topic": topic,
        "need": need,
        "intensity": intensity,
        "matched_keywords": matched_keywords
    }