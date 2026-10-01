from fastapi import FastAPI
from .schemas import RouteRequest, RouteResponse
from .config import settings
from .guardrails import check_guardrails
from .analyzer import analyze_prompt
from .router import determine_route
from .executor import execute_model
from .evaluator import evaluate_response

from fastapi.middleware.cors import CORSMiddleware

def generate_deterministic_fallback(text: str) -> str:
    text = text.lower()
    
    if "java" in text and "sort" in text:
        return (
            "[Deterministic Fallback]\n\n"
            "Here is a simple Java bubble sort implementation:\n\n"
            "```java\n"
            "public class BubbleSort {\n"
            "    public static void bubbleSort(int[] arr) {\n"
            "        int n = arr.length;\n"
            "        for (int i = 0; i < n; i++) {\n"
            "            for (int j = 1; j < (n - i); j++) {\n"
            "                if (arr[j - 1] > arr[j]) {\n"
            "                    int temp = arr[j - 1];\n"
            "                    arr[j - 1] = arr[j];\n"
            "                    arr[j] = temp;\n"
            "                }\n"
            "            }\n"
            "        }\n"
            "    }\n"
            "}\n"
            "```\n"
        )
    elif "python" in text and "sort" in text:
        return (
            "[Deterministic Fallback]\n\n"
            "Here is a simple Python bubble sort implementation:\n\n"
            "```python\n"
            "def bubble_sort(arr):\n"
            "    n = len(arr)\n"
            "    for i in range(n):\n"
            "        for j in range(0, n-i-1):\n"
            "            if arr[j] > arr[j+1]:\n"
            "                arr[j], arr[j+1] = arr[j+1], arr[j]\n"
            "    return arr\n\n"
            "Example:\n"
            "arr = [64, 34, 25, 12, 22, 11, 90]\n"
            "print(bubble_sort(arr))\n"
            "```\n"
        )
    elif "architecture" in text or "microservice" in text or "system" in text:
        return (
            "[Deterministic Fallback]\n\n"
            "A comprehensive enterprise LLM routing architecture includes:\n"
            "- API Gateway\n"
            "- Prompt Security\n"
            "- Complexity Analyzer\n"
            "- Policy/Budget Engine\n"
            "- Model Router\n"
            "- LLM Execution\n"
            "- Evaluator\n"
            "- Fallback\n"
            "- Observability/Audit\n"
        )
    elif "api" in text and "explain" in text:
        return (
            "[Deterministic Fallback]\n\n"
            "An API (Application Programming Interface) is like a menu in a restaurant. "
            "It provides a list of operations that developers can use, along with a description "
            "of what they do. The developer sends a request (order) to the system, and the system "
            "returns the response (food), without the developer needing to know exactly how the "
            "system generated the response behind the scenes."
        )
    elif "code" in text or "coding" in text or "function" in text or "algorithm" in text:
        return (
            "[Deterministic Fallback]\n\n"
            "This is a deterministic emergency fallback. AI models are currently unavailable.\n\n"
            "Here is a generic 'Hello World' example to demonstrate execution flow:\n\n"
            "```python\n"
            "def hello_world():\n"
            "    print('Hello, World! AI routing was successful, but providers timed out.')\n"
            "```\n"
        )
    
    return (
        "[Deterministic Fallback]\n\n"
        "AI providers are currently unavailable due to latency or quota exhaustion. "
        "Your request was received and routed correctly, but we must return this deterministic fallback."
    )

app = FastAPI(title=settings.app_name)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://velocity-chat-bot-delta.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "service": "velocity",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "velocity"
    }

@app.post("/v1/route", response_model=RouteResponse)
def route_request(request: RouteRequest):
    # 1. Guardrails
    check_guardrails(request)
    
    # 2. Analyze
    analysis = analyze_prompt(request.messages)
    
    # 3. Route
    decision = determine_route(analysis, request)
    
    # 4. Execute and Evaluate (Fallback loop)
    max_retries = len(decision.eligible_models)
    attempted_models = set()
    current_model = decision.selected_model
    fallback_used = False
    
    for attempt in range(max_retries):
        attempted_models.add(current_model)
        decision.model = current_model
        
        response_content = execute_model(decision, request.messages)
        eval_result = evaluate_response(response_content)
        
        if eval_result.passed:
            decision.evaluation = eval_result
            decision.fallback_used = fallback_used
            decision.execution_status = "success"
            decision.selected_model = current_model
            print(f"EVALUATOR: score={eval_result.score}")
            return RouteResponse(content=response_content, routing_trace=decision)
            
        fallback_used = True
        
        next_model = None
        for eligible in decision.eligible_models:
            if eligible not in attempted_models:
                next_model = eligible
                break
                
        if next_model:
            current_model = next_model
        else:
            eval_result.score = 0.1
            eval_result.passed = False
            decision.evaluation = eval_result
            decision.fallback_used = fallback_used
            decision.execution_status = "fallback"
            decision.selected_model = "graceful-fallback"
            print("FALLBACK: using=graceful-fallback")
            
            fallback_text = " ".join([m.get("content", "") for m in request.messages]).lower()
            
            return RouteResponse(
                content=generate_deterministic_fallback(fallback_text),
                routing_trace=decision
            )

    eval_result.score = 0.1
    eval_result.passed = False
    decision.evaluation = eval_result
    decision.fallback_used = fallback_used
    decision.execution_status = "fallback"
    decision.selected_model = "graceful-fallback"
    print("FALLBACK: using=graceful-fallback")
    
    fallback_text = " ".join([m.get("content", "") for m in request.messages]).lower()
    
    return RouteResponse(
        content=generate_deterministic_fallback(fallback_text),
        routing_trace=decision
    )
