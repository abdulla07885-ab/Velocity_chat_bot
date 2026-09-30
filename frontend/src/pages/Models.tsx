import React from 'react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export const Models: React.FC = () => {
  const { models } = useStore();

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-white h-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Model Registry</h1>
        <p className="text-neutral-500 mb-8 text-sm">Manage available models and their routing capabilities.</p>

        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Model</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Cost</th>
                <th className="px-6 py-4 font-medium">Latency</th>
                <th className="px-6 py-4 font-medium">Quality Prior</th>
                <th className="px-6 py-4 font-medium">Privacy</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {models.map((model) => (
                <tr key={model.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-neutral-900">{model.name}</div>
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">{model.provider}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs font-medium border border-neutral-200">
                      {model.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {model.tier === 'PAID' ? 'Paid' : '$0'}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    ~{model.latency}ms
                  </td>
                  <td className="px-6 py-4 text-green-600 font-medium">
                    {model.qualityPrior}%
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("font-medium", model.privacyEligible === 'Strict' ? 'text-amber-600' : 'text-neutral-500')}>
                      {model.privacyEligible}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                       Available
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
