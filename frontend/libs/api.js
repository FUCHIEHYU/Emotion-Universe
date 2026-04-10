const API_URL = "http://127.0.0.1:8000";

export async function getMoods() {
  const res = await fetch(`${API_URL}/moods`);
  return res.json();
}

export async function createMood(data) {
  const res = await fetch(`${API_URL}/moods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}