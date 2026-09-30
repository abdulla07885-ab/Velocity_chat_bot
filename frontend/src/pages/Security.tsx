import React from 'react';
import { Shield, ShieldAlert, AlertCircle } from 'lucide-react';

export const Security: React.FC = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-white h-full">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Security Dashboard</h1>
        <p className="text-neutral-500 mb-8 text-sm">Monitor real-time threat detection and active protections.</p>

        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="divide-y divide-neutral-100">
            {[
              { label: 'Prompt Injection Detection', status: 'Operational' },
              { label: 'PII Detection', status: 'Operational' },
              { label: 'Budget Protection', status: 'Operational' },
              { label: 'Rate Limiting', status: 'Operational' },
              { label: 'Resource Exhaustion Protection', status: 'Operational' },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-neutral-50/50">
                <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Recent Security Events</h3>
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Event Type</th>
                <th className="px-6 py-4 font-medium">Action Taken</th>
                <th className="px-6 py-4 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr className="hover:bg-neutral-50/50">
                <td className="px-6 py-4 text-neutral-500">Just now</td>
                <td className="px-6 py-4 text-neutral-900 font-medium">Prompt Injection Attempt</td>
                <td className="px-6 py-4 text-red-600 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Blocked</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-red-50 text-red-700 rounded border border-red-100 text-xs font-medium">High</span></td>
              </tr>
              <tr className="hover:bg-neutral-50/50">
                <td className="px-6 py-4 text-neutral-500">2 mins ago</td>
                <td className="px-6 py-4 text-neutral-900 font-medium">Strict Privacy Request</td>
                <td className="px-6 py-4 text-green-600 flex items-center gap-2"><Shield className="w-4 h-4" /> Routed Locally</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded border border-neutral-200 text-xs font-medium">Info</span></td>
              </tr>
              <tr className="hover:bg-neutral-50/50">
                <td className="px-6 py-4 text-neutral-500">15 mins ago</td>
                <td className="px-6 py-4 text-neutral-900 font-medium">Oversized Request</td>
                <td className="px-6 py-4 text-amber-600 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Rate Limited</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-50 text-amber-700 rounded border border-amber-100 text-xs font-medium">Medium</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
