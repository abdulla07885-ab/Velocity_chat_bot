import React, { useState } from 'react';
import type { RoutingTrace as TraceType } from '../../types';
import { ChevronDown, ChevronUp, Check, ShieldCheck } from 'lucide-react';
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
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Privacy</span>
                <div className="flex items-center gap-1.5 text-neutral-800">
                  {trace.privacy === 'strict' ? <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> : <Check className="w-3.5 h-3.5 text-green-600" />}
                  <span className={cn(trace.privacy === 'strict' && "text-amber-700 font-medium")}>{trace.privacy}</span>
                </div>
              </div>

              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Budget Limit</span>
                <span className="text-neutral-800">${trace.budget_limit}</span>
              </div>

              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Complexity</span>
                <span className="text-neutral-800">{trace.complexity}</span>
              </div>

              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Intent</span>
                <span className="text-neutral-800">{trace.intent}</span>
              </div>
              
              <div className="col-span-2">
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Routing Reason</span>
                <span className="text-neutral-800">{trace.reason}</span>
              </div>
              
              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Execution Status</span>
                <span className="text-neutral-800">{trace.execution_status}</span>
              </div>
              
              <div>
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Evaluation Score</span>
                <span className="text-neutral-800">{trace.evaluation?.score ?? 'N/A'}</span>
              </div>
            </div>
            
            <div className="p-3 bg-neutral-50 flex flex-col gap-2 text-xs">
                <span className="block text-neutral-400 mb-0.5 uppercase tracking-wider text-[10px] font-semibold">Execution Flow</span>
                {trace.fallback_used ? (
                  <div className="flex flex-col gap-1 font-medium text-neutral-700">
                    <div>{trace.selected_model.toUpperCase()}</div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px]">
                      <span>↓</span> <span>execution unavailable</span>
                    </div>
                    <div>{trace.model.toUpperCase()}</div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px]">
                      <span>↓</span>
                    </div>
                    <div className="text-green-600">Response generated</div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 font-medium text-neutral-700">
                    <div>{trace.selected_model.toUpperCase()}</div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px]">
                      <span>↓</span>
                    </div>
                    <div className="text-green-600">Response generated</div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
