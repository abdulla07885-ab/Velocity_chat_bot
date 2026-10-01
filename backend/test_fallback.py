import os
os.environ["RENDER"] = "1"
os.environ["GEMINI_API_KEY"] = "fake_key_to_simulate_fail"

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_route(prompt, strict_privacy=False, budget=1.0):
    payload = {
        "messages": [{"role": "user", "content": prompt}],
        "strict_privacy": strict_privacy,
        "budget_limit": budget
    }
    
    response = client.post("/v1/route", json=payload)
    return response.json()

def print_result(name, prompt, **kwargs):
    print(f"Test {name}")
    res = test_route(prompt, **kwargs)
    trace = res.get("routing_trace", {})
    eval_res = trace.get("evaluation", {})
    print("Content:", res.get("content"))
    print("Selected Model:", trace.get("selected_model"))
    print("Reason:", trace.get("reason"))
    print("Execution Status:", trace.get("execution_status"))
    print("Fallback Used:", trace.get("fallback_used"))
    print("Eval Score:", eval_res.get("score") if eval_res else None)
    print("---")

if __name__ == "__main__":
    print_result("A: Math", "What is 25 * 19?")
    print_result("B: Code", "Write a Java sorting algorithm.")
    print_result("C: Complex", "Explain a microservices architecture.")
    print_result("D: General Factual", "Explain what an API is in simple terms.")
    print_result("E: Strict Privacy", "I have a complex reasoning task with strict privacy.", strict_privacy=True)
