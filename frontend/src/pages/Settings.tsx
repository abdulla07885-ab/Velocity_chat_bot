import React from 'react';
import { useStore } from '../store/useStore';

export const Settings: React.FC = () => {
  const { routingMode, privacyMode, setRoutingMode, setPrivacyMode, models } = useStore();

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-white h-full">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Settings</h1>
        <p className="text-neutral-500 mb-8 text-sm">Configure Velocity routing preferences and limits.</p>

        <div className="space-y-8">
          {/* Routing Preferences */}
          <section className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Routing Optimization Weights</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">Quality</span>
                  <span className="text-neutral-900 font-medium">60%</span>
                </div>
                <input type="range" min="0" max="100" value="60" readOnly className="w-full accent-red-600" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">Cost</span>
                  <span className="text-neutral-900 font-medium">25%</span>
                </div>
                <input type="range" min="0" max="100" value="25" readOnly className="w-full accent-neutral-400" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">Latency</span>
                  <span className="text-neutral-900 font-medium">15%</span>
                </div>
                <input type="range" min="0" max="100" value="15" readOnly className="w-full accent-neutral-300" />
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Controls</h2>
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Privacy Mode</label>
                <select 
                  value={privacyMode}
                  onChange={(e) => setPrivacyMode(e.target.value as any)}
                  className="w-full md:w-64 bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm focus:outline-none focus:border-red-500 shadow-sm"
                >
                  <option value="Normal">Normal (Cloud & Local)</option>
                  <option value="Strict">Strict (Local Only)</option>
                </select>
                <p className="text-xs text-neutral-500 mt-2">Strict mode prevents data from leaving your local infrastructure.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Manual Model Override</label>
                <select 
                  value={routingMode}
                  onChange={(e) => setRoutingMode(e.target.value)}
                  className="w-full md:w-64 bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 text-sm focus:outline-none focus:border-red-500 shadow-sm"
                >
                  <option value="AUTO">AUTO ROUTE (Recommended)</option>
                  {models.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
                <p className="text-xs text-neutral-500 mt-2">Override automatic routing for all new requests.</p>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
