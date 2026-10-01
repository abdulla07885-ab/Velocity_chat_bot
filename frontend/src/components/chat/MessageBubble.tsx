import React from 'react';
import type { Message } from '../../types';
import { RoutingTrace } from './RoutingTrace';
import { Copy, RotateCcw, ThumbsUp, ThumbsDown, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';

export const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn("w-full py-6", isUser ? "bg-transparent" : "bg-neutral-50/50 border-y border-neutral-100")}>
      <div className="max-w-3xl mx-auto px-4 flex gap-6">
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-7 h-7 rounded bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">
              U
            </div>
          ) : (
            <div className="w-7 h-7 rounded bg-red-700 flex items-center justify-center text-white font-bold text-sm tracking-tighter">
              V
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-4 overflow-hidden">
          {!isUser && message.routingTrace && message.routingTrace.reason && (
            <div className="mb-6 space-y-4">
              <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Routing Decision</span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-red-700">
                    <Cpu className="w-3.5 h-3.5" />
                    {message.routingTrace.model}
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="text-sm text-neutral-700">
                    <span className="font-semibold text-neutral-900 block mb-1">Reason:</span>
                    {message.routingTrace.reason}
                  </div>
                  
                  {message.routingTrace.candidates && (
                    <div>
                      <span className="font-semibold text-neutral-900 text-sm block mb-2">Candidates Analyzed:</span>
                      <div className="grid gap-2">
                        {message.routingTrace.candidates.map(c => (
                          <div key={c.name} className={cn(
                            "flex items-center justify-between p-2 rounded-lg text-xs border",
                            c.name === message.routingTrace?.model 
                              ? "bg-red-50 border-red-200 text-red-900" 
                              : "bg-neutral-50 border-neutral-200 text-neutral-600"
                          )}>
                            <span className="font-medium">{c.name}</span>
                            <div className="flex items-center gap-4 text-[11px]">
                              <span>${c.cost.toFixed(3)}</span>
                              <span>{c.latency}ms</span>
                              <span className={c.quality >= 90 ? "text-green-600 font-medium" : ""}>{c.quality}% Quality</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="text-neutral-800 text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
          
          {!isUser && message.routingTrace && (
            <RoutingTrace trace={message.routingTrace} />
          )}

          {!isUser && (
            <div className="flex items-center gap-2 mt-4">
              <button className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"><Copy className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"><RotateCcw className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"><ThumbsUp className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
