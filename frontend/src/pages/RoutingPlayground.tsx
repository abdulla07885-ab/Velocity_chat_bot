import React, { useState } from 'react';
import { Loader2, Zap, ShieldCheck, Cpu } from 'lucide-react';
import { RoutingTrace } from '../components/chat/RoutingTrace';

export const RoutingPlayground: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    'Analyzing Request',
    'Security Check',
    'Budget Check',
    'Privacy Validation',
    'Complexity Analysis',
    'Intent Classification',
    'Model Selection',
    'Generating Response',
    'Quality Evaluation'
  ];

  const handleRun = () => {
    if (!prompt) return;
    setIsRunning(true);
    setStep(0);

    const interval = setInterval(() => {
      setStep(s => {
        if (s >= steps.length) {
          clearInterval(interval);
          setIsRunning(false);
          return s;
        }
        return s + 1;
      });
    }, 600);
  };

  const isComplete = step >= steps.length;

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar bg-white h-full">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Routing Playground</h1>
        <p className="text-neutral-500 mb-8 text-sm">Interactive hackathon demo. Watch the routing fabric evaluate and execute a prompt.</p>

        <div className="bg-white border border-neutral-200 rounded-xl p-6 mb-8 shadow-sm">
          <label className="block text-sm font-medium text-neutral-700 mb-2">Test Prompt</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. Debug this complex distributed Python race condition"
              className="flex-1 bg-white border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-red-500 shadow-sm transition-colors"
              disabled={isRunning}
            />
            <button 
              onClick={handleRun}
              disabled={isRunning || !prompt}
              className="bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              {isRunning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isRunning ? 'Routing...' : 'Execute'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={() => setPrompt("Calculate 17.5% of 2480")} className="text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-md border border-neutral-200 transition-colors">Math (Simple)</button>
            <button onClick={() => setPrompt("Debug this complex distributed Python race condition")} className="text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-md border border-neutral-200 transition-colors">Code (Complex)</button>
            <button onClick={() => setPrompt("Analyze this confidential customer transaction document")} className="text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-md border border-neutral-200 transition-colors flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-amber-600" /> Strict Privacy</button>
            <button onClick={() => setPrompt("Simulate model failure")} className="text-xs bg-neutral-50 hover:bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-md border border-neutral-200 transition-colors">Trigger Fallback</button>
          </div>
        </div>

        {(isRunning || isComplete) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-4">Pipeline Execution</h3>
              <div className="space-y-3">
                {steps.map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 text-sm ${i < step ? 'text-green-600' : i === step && isRunning ? 'text-red-600 font-medium' : 'text-neutral-400'}`}>
                    {i < step ? (
                      <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center border border-green-200">✓</div>
                    ) : i === step && isRunning ? (
                      <Loader2 className="w-5 h-5 animate-spin text-red-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-neutral-200 flex items-center justify-center bg-neutral-50" />
                    )}
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {isComplete && (
                <>
                  <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm animate-in slide-in-from-right-4">
                    <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Final Decision</h3>
                    <div className="flex items-center gap-3 mb-4 text-neutral-900">
                      <Cpu className="w-6 h-6 text-red-700" />
                      <span className="text-xl font-semibold">Llama 3.1 8B</span>
                      <span className="px-2 py-0.5 rounded border border-neutral-200 text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600">LOCAL</span>
                    </div>
                    <RoutingTrace trace={{
                      complexity: 'Complex',
                      intent: 'Code / Reasoning',
                      privacy: 'Normal',
                      model: 'Llama 3.1 8B',
                      cost: 0,
                      latency: 890,
                      quality: 94,
                      fallbacks: 0,
                      securityPassed: true,
                      budgetWithinLimit: true
                    }} />
                  </div>
                  
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 shadow-sm animate-in slide-in-from-bottom-4">
                     <h3 className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Response</h3>
                     <p className="text-sm text-neutral-700">The distributed Python race condition occurs because the Global Interpreter Lock (GIL) does not protect multi-process state...</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
