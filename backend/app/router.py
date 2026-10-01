# router module
from .schemas import RoutingDecision, ModelCandidate

def determine_route(analysis_results, request) -> RoutingDecision:
    """
    Determines the best model based on analysis results and constraints.
    """
    import re
    text = " ".join([m.get("content", "") for m in request.messages]).lower()
    
    coding_keywords = ["python", "javascript", "react", "code", "coding", "debug", "api", "function", "algorithm", "java"]
    simple_keywords = ["simple calculation", "simple task"]
    complex_keywords = ["complex reasoning", "architecture", "system design", "deep analysis", "explain"]
    
    is_math = bool(re.search(r"what is \d+\s*(?:\*|multiplied by|\+|plus|-|minus|/|divided by)\s*\d+", text))
    
    candidates = [
        ModelCandidate(name="qwen2.5:3b", cost=0.0, latency=400, quality=75),
        ModelCandidate(name="llama3.1:8b", cost=0.0, latency=800, quality=90),
        ModelCandidate(name="gemini", cost=0.005, latency=600, quality=98)
    ]
    
    gemini_cost = 0.005
    selected_model = "llama3.1:8b"
    reason = "Default fallback"
    
    is_coding = any(k in text for k in coding_keywords)
    is_simple = any(k in text for k in simple_keywords) or is_math
    is_complex = any(k in text for k in complex_keywords)
    
    if is_simple:
        selected_model = "qwen2.5:3b"
        reason = "Simple task -> qwen2.5:3b"
    elif is_coding:
        selected_model = "llama3.1:8b"
        reason = "Coding prompt -> llama3.1:8b"
    elif is_complex:
        if not request.strict_privacy and (request.budget_limit is None or request.budget_limit >= gemini_cost):
            selected_model = "gemini"
            reason = "Complex -> gemini"
        else:
            selected_model = "llama3.1:8b"
            reason = "Complex but privacy/budget restricted -> llama3.1:8b"

    if request.strict_privacy and selected_model == "gemini":
        selected_model = "llama3.1:8b"
        reason = "Privacy restricted -> llama3.1:8b"
        
    print(f"ROUTER: selected={selected_model}")
        
    intent = analysis_results.get("intent", "general") if isinstance(analysis_results, dict) else "general"
    complexity = analysis_results.get("complexity", "medium") if isinstance(analysis_results, dict) else "medium"
    
    return RoutingDecision(
        model=selected_model,
        reason=reason,
        candidates=candidates,
        intent=intent,
        complexity=complexity,
        privacy="strict" if request.strict_privacy else "standard",
        budget_limit=request.budget_limit,
        eligible_models=[c.name for c in candidates if not request.strict_privacy or c.name != "gemini"],
        selected_model=selected_model
    )
