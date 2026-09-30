import React from 'react';


export const Analytics: React.FC = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-white h-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Routing Analytics</h1>
        <p className="text-neutral-500 mb-8 text-sm">ILLUSTRATIVE BENCHMARK: Performance metrics across all routed requests.</p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <h3 className="text-neutral-400 text-[10px] font-semibold mb-1 tracking-wider uppercase">Requests Routed</h3>
            <p className="text-2xl font-bold text-neutral-900">12,842</p>
          </div>
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <h3 className="text-neutral-400 text-[10px] font-semibold mb-1 tracking-wider uppercase">Average Cost</h3>
            <p className="text-2xl font-bold text-green-600">$0.0099</p>
          </div>
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <h3 className="text-neutral-400 text-[10px] font-semibold mb-1 tracking-wider uppercase">Average Latency</h3>
            <p className="text-2xl font-bold text-neutral-900">1.42s</p>
          </div>
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <h3 className="text-neutral-400 text-[10px] font-semibold mb-1 tracking-wider uppercase">Quality</h3>
            <p className="text-2xl font-bold text-blue-600">94.8%</p>
          </div>
          <div className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
            <h3 className="text-neutral-400 text-[10px] font-semibold mb-1 tracking-wider uppercase">Fallback Rate</h3>
            <p className="text-2xl font-bold text-red-600">3.7%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-neutral-900 font-semibold mb-6">Model Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Qwen 3B</span>
                  <span className="text-neutral-900 font-medium">62%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Llama 8B</span>
                  <span className="text-neutral-900 font-medium">28%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-neutral-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Gemini</span>
                  <span className="text-neutral-900 font-medium">10%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2">
                  <div className="bg-neutral-300 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-neutral-900 font-semibold mb-6">Cost Comparison (Est. Monthly)</h3>
            <div className="flex items-end justify-around h-40 pt-4 border-b border-neutral-100 pb-2">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-neutral-100 border border-neutral-200 rounded-t-md h-32 flex items-center justify-center">
                  <span className="text-xs font-bold text-neutral-500">~$4,200</span>
                </div>
                <span className="text-xs text-neutral-500 font-medium text-center">Always Premium<br/>(Gemini/GPT-4)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-green-50 border border-green-200 rounded-t-md h-8 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-700">~$450</span>
                </div>
                <span className="text-xs text-green-600 font-medium text-center">Velocity Router<br/>(Auto)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
