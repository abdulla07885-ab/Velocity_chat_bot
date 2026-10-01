export type Role = 'user' | 'assistant' | 'system';

export interface RoutingTrace {
  model: string;
  reason: string;
  intent: string;
  complexity: string;
  privacy: string;
  budget_limit: number;
  selected_model: string;
  fallback_used: boolean;
  execution_status: string;
  evaluation?: {
    passed: boolean;
    score: number;
    reason: string;
  };
  candidates?: { name: string; cost: number; latency: number; quality: number }[];
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  routingTrace?: RoutingTrace;
}

export interface Chat {
  id: string;
  title: string;
  updatedAt: Date;
  messages: Message[];
  isPinned: boolean;
  routingModel?: string;
}

export interface Model {
  id: string;
  name: string;
  type: 'LOCAL' | 'CLOUD';
  tier: 'FREE' | 'PAID';
  latency: number; // ms
  qualityPrior: number; // percentage
  provider: string;
  supportedIntents: string[];
  privacyEligible: 'Normal' | 'Strict';
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  trend?: string;
}
