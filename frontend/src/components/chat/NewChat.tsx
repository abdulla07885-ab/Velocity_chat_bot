import React from 'react';
import { FileText, Code2, Database, Terminal } from 'lucide-react';

interface NewChatProps {
  onSelectPrompt: (text: string) => void;
}

export const NewChat: React.FC<NewChatProps> = ({ onSelectPrompt }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="text-4xl font-bold text-red-700 mb-4 tracking-tighter">V<span className="text-neutral-300">·</span></div>
      <h2 className="text-2xl font-medium text-neutral-900 mb-2">How can I help you?</h2>
      <p className="text-sm text-neutral-500 mb-12 text-center max-w-md">
        Your request will be automatically routed to the most suitable model based on quality, cost and latency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
        <button
          onClick={() => onSelectPrompt("Calculate 17.5% of 2480")}
          className="flex flex-col gap-2 p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-800">
            <Terminal className="w-4 h-4 text-neutral-400" />
            Calculate 17.5% of 2480
          </div>
          <p className="text-xs text-neutral-500">Demo Scenario 1: Math (Simple)</p>
        </button>

        <button
          onClick={() => onSelectPrompt("Debug this complex Python concurrency issue")}
          className="flex flex-col gap-2 p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-800">
            <Code2 className="w-4 h-4 text-neutral-400" />
            Debug this complex Python concurrency issue
          </div>
          <p className="text-xs text-neutral-500">Demo Scenario 2: Code (Complex)</p>
        </button>

        <button
          onClick={() => onSelectPrompt("Analyze this confidential customer transaction document")}
          className="flex flex-col gap-2 p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-800">
            <Database className="w-4 h-4 text-neutral-400" />
            Analyze confidential customer document
          </div>
          <p className="text-xs text-neutral-500">Demo Scenario 3: Strict Privacy</p>
        </button>

        <button
          onClick={() => onSelectPrompt("Simulate model failure")}
          className="flex flex-col gap-2 p-5 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-800">
            <FileText className="w-4 h-4 text-neutral-400" />
            Simulate model failure
          </div>
          <p className="text-xs text-neutral-500">Demo Scenario 4: Fallback Routing</p>
        </button>
      </div>
    </div>
  );
};
