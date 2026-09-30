import type { RoutingTrace } from '../types';

export interface RouteResponse {
  message: string;
  trace: RoutingTrace;
}

export const analyzeRequest = async (
  prompt: string,
  privacyMode: 'Normal' | 'Strict',
  routingMode: string,
  onProgress?: (stage: string) => void
): Promise<RouteResponse> => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  if (onProgress) onProgress('Security check');
  await delay(400);
  if (onProgress) onProgress('Budget check');
  await delay(300);
  if (onProgress) onProgress('Privacy check');
  await delay(300);
  if (onProgress) onProgress('Complexity analysis');
  await delay(400);
  if (onProgress) onProgress('Intent classification');
  await delay(300);
  if (onProgress) onProgress('Model selection');
  await delay(400);
  if (onProgress) onProgress('Execution');
  await delay(1000);
  if (onProgress) onProgress('Quality evaluation');
  await delay(400);

  const text = prompt.toLowerCase();
  
  let intent = 'General';
  let complexity: 'Simple' | 'Normal' | 'Complex' = 'Normal';
  let selectedModel = routingMode !== 'AUTO' ? routingMode : 'Llama 3.1 8B';
  let privacy = privacyMode;
  let cost = 0;
  let latency = 890;
  let quality = 94;
  let fallbacks = 0;
  
  let responseMessage = 'Here is a response based on your request.';
  let reason = 'A balanced model was chosen based on complexity.';
  
  if (text.includes('simulate model failure')) {
      // fallback demo
      latency = 2000; // timeout initially
      fallbacks = 1;
      selectedModel = 'Llama 3.1 8B';
      responseMessage = 'This is a simulated response after the primary model timed out and the system successfully failed over to Llama 3.1 8B.';
      reason = 'Initial model exceeded timeout. Seamlessly failed over to the next capable model.';
      intent = 'General';
      complexity = 'Complex';
  } else if (text.includes('calculate') || text.includes('percentage') || text.includes('equation') || text.includes('math') || text.includes('formula')) {
      intent = 'Math';
      complexity = 'Simple';
      if (routingMode === 'AUTO') selectedModel = 'Qwen 2.5 3B';
      latency = 180;
      quality = 91;
      reason = 'Simple math request. Using lightweight model for low latency and zero cost while meeting quality threshold.';
      if (text.includes('17.5% of 2480')) {
          responseMessage = '17.5% of 2480 is **434**.\n\nCalculation: `2480 * 0.175 = 434`';
      } else {
          responseMessage = 'Here is the result of your calculation.';
      }
  } else if (text.includes('debug') || text.includes('python') || text.includes('code') || text.includes('programming') || text.includes('bug') || text.includes('race condition')) {
      intent = 'Code / Reasoning';
      complexity = 'Complex';
      if (routingMode === 'AUTO') selectedModel = 'Llama 3.1 8B';
      latency = 890;
      quality = 94;
      reason = 'Complex code-reasoning request. The lightweight model may not satisfy the quality requirement, so the router selected the stronger local model.';
      if (text.includes('race condition')) {
          responseMessage = 'The distributed Python race condition occurs because the Global Interpreter Lock (GIL) does not protect multi-process state. You need to use proper synchronization primitives like distributed locks via Redis or ZooKeeper.';
      } else {
          responseMessage = 'Here is the explanation for the Python code.';
      }
  } else if (text.includes('confidential') || text.includes('private') || text.includes('sensitive') || text.includes('customer data')) {
      privacy = 'Strict';
      intent = 'Document Analysis';
      complexity = 'Complex';
      if (routingMode === 'AUTO') selectedModel = 'Llama 3.1 8B';
      latency = 920;
      quality = 94;
      reason = 'Strict privacy required. Cloud models are explicitly blocked. Selected the highest quality local model available.';
      responseMessage = 'I have analyzed the confidential customer transaction document. No sensitive data was transmitted externally during this process.';
  } else if (text.includes('summarize')) {
      intent = 'Summarization';
      complexity = 'Complex';
      if (routingMode === 'AUTO') {
        if (privacyMode === 'Strict') {
            selectedModel = 'Llama 3.1 8B';
            reason = 'Strict privacy enabled. Cannot route to Gemini. Selected local fallback.';
        } else {
            selectedModel = 'Gemini';
            latency = 1800;
            quality = 98;
            cost = 0.018;
            reason = 'Complex summarization request. Quality requirements exceed local capabilities, routed to high-end cloud model.';
        }
      }
      responseMessage = 'Here is the summary of the document:\n\nIt outlines the main architectural patterns for scaling the infrastructure, prioritizing redundancy and stateless services.';
  }

  const candidates = [
      { name: 'Qwen 2.5 3B', cost: 0, latency: 420, quality: 91 },
      { name: 'Llama 3.1 8B', cost: 0, latency: 890, quality: 94 },
      { name: 'Gemini', cost: 0.018, latency: 1800, quality: 98 }
  ];

  const trace: RoutingTrace = {
      complexity,
      intent,
      privacy,
      model: selectedModel,
      cost,
      latency,
      quality,
      fallbacks,
      securityPassed: true,
      budgetWithinLimit: true,
      reason,
      candidates
  };

  return {
      message: responseMessage,
      trace
  };
};
