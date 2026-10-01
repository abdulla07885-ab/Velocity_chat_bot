import requests

url = "http://127.0.0.1:8001/v1/route"

print("--- TEST A (Gemini Trigger) ---")
payload = {
    "messages": [{"role": "user", "content": "Provide a deep analysis of scalable system design and architecture."}],
    "strict_privacy": False,
    "budget_limit": 1.0
}
try:
    r = requests.post(url, json=payload, timeout=20)
    print("Status:", r.status_code)
    print("Response:", r.json())
except Exception as e:
    print("Error:", e)

print("--- TEST B (Llama Trigger) ---")
payload = {
    "messages": [{"role": "user", "content": "Write a Python function to find duplicate values in a list."}],
    "strict_privacy": False
}
try:
    r = requests.post(url, json=payload, timeout=20)
    print("Status:", r.status_code)
    print("Response:", r.json())
except Exception as e:
    print("Error:", e)

print("--- TEST C (Privacy Trigger) ---")
payload = {
    "messages": [{"role": "user", "content": "Provide a deep analysis of scalable system design and architecture."}],
    "strict_privacy": True,
    "budget_limit": 1.0
}
try:
    r = requests.post(url, json=payload, timeout=20)
    print("Status:", r.status_code)
    print("Response:", r.json())
except Exception as e:
    print("Error:", e)
