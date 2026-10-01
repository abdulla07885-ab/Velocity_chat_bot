import React from 'react';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const History: React.FC = () => {
  const { chats } = useStore();
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-white h-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Request History</h1>
        <p className="text-neutral-500 mb-8 text-sm">Review past requests and their routing traces.</p>

        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Request</th>
                <th className="px-6 py-4 font-medium">Model</th>
                <th className="px-6 py-4 font-medium">Intent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {chats.map(chat => {
                const lastMsg = chat.messages[chat.messages.length - 1];
                const trace = lastMsg?.routingTrace;
                
                return (
                  <tr key={chat.id} onClick={() => navigate(`/c/${chat.id}`)} className="hover:bg-neutral-50/80 cursor-pointer group transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-neutral-900 font-medium truncate max-w-[300px]">{chat.title}</div>
                      <div className="text-xs text-neutral-400 mt-1">{formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded border border-red-100 text-xs font-medium">
                        {chat.routingModel || 'AUTO'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">{trace?.intent || 'General'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
