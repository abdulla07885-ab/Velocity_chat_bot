from fastapi import FastAPI
from .schemas import RouteRequest, RouteResponse
from .config import settings
from .guardrails import check_guardrails
from .analyzer import analyze_prompt
from .router import determine_route
from .executor import execute_model
from .evaluator import evaluate_response

from fastapi.middleware.cors import CORSMiddleware

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
            decision.evaluation = eval_result
            decision.fallback_used = fallback_used
            decision.execution_status = "failed"
            return RouteResponse(
                content="Error: No executable fallback is currently available.",
                routing_trace=decision
            )

    decision.fallback_used = fallback_used
    decision.execution_status = "failed"
    return RouteResponse(
        content="Error: No executable fallback is currently available.",
        routing_trace=decision
    )
