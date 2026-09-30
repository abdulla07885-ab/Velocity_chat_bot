import React, { useState } from 'react';
import type { RoutingTrace as TraceType } from '../../types';
import { ChevronDown, ChevronUp, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export const RoutingTrace: React.FC<{ trace: TraceType }> = ({ trace }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-4 text-sm max-w-[500px]">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        View routing trace {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {expanded && (
        <div className="mt-3 bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden animate-in slide-in-from-top-1 duration-200">
          <div className="divide-y divide-neutral-100">
            {/* Steps */}
            <div className="p-3 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Security</span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  {trace.securityPassed ? <Check className="w-3.5 h-3.5 text-green-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
                  <span>{trace.securityPassed ? 'Passed' : 'Failed'}</span>
                </div>
              </div>
              
              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Budget</span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  {trace.budgetWithinLimit ? <Check className="w-3.5 h-3.5 text-green-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-600" />}
                  <span>{trace.budgetWithinLimit ? 'Within limit' : 'Exceeded'}</span>
                </div>
              </div>

              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Privacy</span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  {trace.privacy === 'Strict' ? <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> : <Check className="w-3.5 h-3.5 text-green-600" />}
                  <span className={cn(trace.privacy === 'Strict' && "text-amber-700 font-medium")}>{trace.privacy}</span>
                </div>
              </div>

              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Complexity</span>
                <span className="text-neutral-800">{trace.complexity}</span>
              </div>

              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Intent</span>
                <span className="text-neutral-800">{trace.intent}</span>
              </div>

              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Model</span>
                <span className="text-red-700 font-medium">{trace.model}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-3 bg-neutral-50 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-500">Latency: </span>
                <span className="text-neutral-900 font-medium">{trace.latency}ms</span>
              </div>
              <div>
                <span className="text-neutral-500">Cost: </span>
                <span className="text-neutral-900 font-medium">${trace.cost.toFixed(4)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-neutral-500">Quality: </span>
                <span className="text-green-600 font-medium">{trace.quality}% PASS</span>
              </div>
            </div>
          </div>
          
          {trace.fallbacks > 0 && (
            <div className="bg-red-50 border-t border-red-100 p-3 text-xs">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <div>
                  <span className="font-medium text-red-800 block">Fallback Triggered ({trace.fallbacks})</span>
                  <span className="text-red-600/80">Primary model exceeded the configured latency threshold.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
