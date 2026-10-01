from .schemas import EvaluationResult

def evaluate_response(response: str) -> EvaluationResult:
    """
    Evaluates the final response quality.
    """
    if not response or not response.strip():
        return EvaluationResult(passed=False, score=0.0, reason="Response is empty")
        
    if response.strip().startswith("Error:"):
        return EvaluationResult(passed=False, score=0.0, reason="Response is an error message")
        
    if len(response) < 10:
        return EvaluationResult(passed=False, score=0.2, reason="Response is too short")
        
    return EvaluationResult(passed=True, score=0.94, reason="Response passed basic checks")
