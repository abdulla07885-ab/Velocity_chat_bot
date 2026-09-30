import React, { useState } from 'react';
import { Paperclip, ArrowUp, ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const { routingMode, setRoutingMode, models } = useStore();

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-[750px] mx-auto w-full px-4 pb-6">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-neutral-200 focus-within:border-neutral-300 transition-all flex flex-col relative overflow-visible">
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Velocity..."
          disabled={disabled}
          className="w-full bg-transparent text-neutral-800 placeholder-neutral-400 px-4 py-4 max-h-[200px] min-h-[56px] resize-none focus:outline-none text-[15px]"
          rows={1}
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-50 border border-neutral-100 text-[10px] font-medium text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              Smart fallback: 4 clusters ready
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <select
                value={routingMode}
                onChange={(e) => setRoutingMode(e.target.value)}
                className="appearance-none bg-neutral-50 border border-neutral-200 rounded-lg pl-2 pr-6 py-1.5 text-xs font-medium text-neutral-600 focus:outline-none cursor-pointer"
              >
                <option value="AUTO">Route: Auto</option>
                {models.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={handleSend}
              disabled={disabled || !input.trim()}
              className="p-1.5 rounded-lg bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600 disabled:opacity-50 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-neutral-400">Velocity routes prompts dynamically across top LLMs to maximize accuracy while minimizing inference cost.</span>
      </div>
    </div>
  );
};
