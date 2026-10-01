import type { RoutingTrace } from '../types';

export interface RouteResponse {
  message: string;
  trace: RoutingTrace;
}

export const analyzeRequest = async (
  prompt: string,
  privacyMode: 'Normal' | 'Strict',
  _routingMode: string,
  onProgress?: (stage: string) => void
): Promise<RouteResponse> => {
  if (onProgress) onProgress('Sending request to routing engine...');
  
  try {
    const response = await fetch('http://127.0.0.1:8001/v1/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        strict_privacy: privacyMode === 'Strict',
        budget_limit: 1.0,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      message: data.content,
      trace: data.routing_trace
    };
  } catch (error) {
    console.error("Error during routing:", error);
    return {
      message: "An error occurred while connecting to the routing backend. Please ensure the backend is running on port 8001.",
      trace: {
        model: 'unknown',
        reason: 'Error connecting to backend',
        intent: 'unknown',
        complexity: 'unknown',
        privacy: privacyMode.toLowerCase(),
        budget_limit: 1.0,
        selected_model: 'unknown',
        fallback_used: false,
        execution_status: 'error',
      }
    };
  }
};
