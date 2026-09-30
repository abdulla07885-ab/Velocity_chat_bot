import type { Chat, Model } from '../types';

export const mockModels: Model[] = [
  { id: 'qwen-2.5-3b', name: 'Qwen 2.5 3B', type: 'LOCAL', tier: 'FREE', latency: 420, qualityPrior: 91, provider: 'Ollama', supportedIntents: ['General', 'Math'], privacyEligible: 'Strict' },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', type: 'LOCAL', tier: 'FREE', latency: 890, qualityPrior: 94, provider: 'Ollama', supportedIntents: ['Code', 'Reasoning', 'General'], privacyEligible: 'Strict' },
  { id: 'gemini-1.5-pro', name: 'Gemini', type: 'CLOUD', tier: 'PAID', latency: 1800, qualityPrior: 98, provider: 'API', supportedIntents: ['Complex', 'Creative', 'Vision'], privacyEligible: 'Normal' },
];

export const mockChats: Chat[] = [
  {
    id: '1',
    title: 'Website architecture discussion',
    isPinned: true,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    routingModel: 'Llama 3.1 8B',
    messages: [
      { id: 'm1', role: 'user', content: 'Design a scalable website architecture for an e-commerce platform.', timestamp: new Date() },
      { id: 'm2', role: 'assistant', content: 'Here is a scalable architecture:\\n\\n1. **Frontend**: React/Next.js hosted on Vercel or AWS Amplify.\\n2. **Backend**: Microservices using Python/FastAPI or Go.\\n3. **Database**: PostgreSQL for relational data, Redis for caching, Elasticsearch for product search.\\n4. **Infrastructure**: Kubernetes (EKS/GKE) for orchestration, with Cloudflare for CDN and DDoS protection.', timestamp: new Date(),
        routingTrace: { complexity: 'Complex', intent: 'Code / Reasoning', privacy: 'Normal', model: 'Llama 3.1 8B', cost: 0, latency: 890, quality: 94, fallbacks: 0, securityPassed: true, budgetWithinLimit: true }
      }
    ]
  },
  {
    id: '2',
    title: 'Calculate compound interest',
    isPinned: false,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    routingModel: 'Qwen 2.5 3B',
    messages: [
      { id: 'm3', role: 'user', content: 'What is 17.5% of 2480?', timestamp: new Date() },
      { id: 'm4', role: 'assistant', content: '17.5% of 2480 is **434**.\\n\\nCalculation: `2480 * 0.175 = 434`', timestamp: new Date(),
        routingTrace: { complexity: 'Simple', intent: 'Math', privacy: 'Normal', model: 'Qwen 2.5 3B', cost: 0, latency: 180, quality: 91, fallbacks: 0, securityPassed: true, budgetWithinLimit: true }
      }
    ]
  }
];
