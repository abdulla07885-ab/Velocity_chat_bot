from pydantic import BaseModel, Field
from typing import List, Optional

class EvaluationResult(BaseModel):
    passed: bool
    score: float
    reason: str

class RouteRequest(BaseModel):
    messages: List[dict] = Field(..., description="List of message objects with role and content")
    strict_privacy: bool = Field(default=False, description="Whether to enforce local-only models")
    budget_limit: Optional[float] = Field(default=None, description="Maximum budget allowed for this request")

class ModelCandidate(BaseModel):
    name: str
    cost: float
    latency: int
    quality: int

class RoutingDecision(BaseModel):
    model: str
    reason: str
    candidates: List[ModelCandidate]
    intent: str = "general"
    complexity: str = "medium"
    privacy: str = "standard"
    budget_limit: Optional[float] = None
    eligible_models: List[str] = []
    selected_model: str = ""
    fallback_used: bool = False
    evaluation: Optional[EvaluationResult] = None
    execution_status: str = "success"

class RouteResponse(BaseModel):
    content: str
    routing_trace: RoutingDecision
