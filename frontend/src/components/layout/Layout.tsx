import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Menu } from 'lucide-react';

export const Layout: React.FC = () => {
  const { sidebarOpen, toggleSidebar, currentChatId, chats, routingMode } = useStore();
  const currentChat = chats.find(c => c.id === currentChatId);

  return (
    <div className="flex h-screen w-full bg-[#FAFAF9] overflow-hidden text-neutral-900 font-sans">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="p-2 bg-white rounded-md text-neutral-500 hover:text-neutral-900 shadow-sm border border-neutral-200">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <Sidebar />
      
      <main className={cn(
        "flex-1 flex flex-col h-full transition-all duration-300 relative bg-[#FFFFFF] m-0 md:m-2 md:ml-0 md:rounded-xl border border-neutral-200 shadow-sm overflow-hidden",
        sidebarOpen ? "md:ml-0" : ""
      )}>
        {/* Top Header */}
        <header className="h-14 border-b border-neutral-200 flex items-center justify-between px-6 bg-white shrink-0">
          <div className="flex-1 truncate font-medium text-sm text-neutral-800">
            {currentChat ? currentChat.title : 'New Conversation'}
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-50 border border-neutral-200">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              Routing: {routingMode === 'AUTO' ? 'Auto' : routingMode}
            </div>
            <button className="hover:text-neutral-900 transition-colors">Export</button>
            <button className="hover:text-neutral-900 transition-colors">Clear chat</button>
            <div className="w-6 h-6 rounded bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold ml-2">
              U
            </div>
          </div>
        </header>

        {/* System Status Bar */}
        <div className="h-8 bg-neutral-50 border-b border-neutral-200 flex items-center px-6 gap-6 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            Fabric Active
          </div>
          <div className="flex gap-1">
            <span className="text-neutral-400">Gateway:</span>
            <span>US-EAST-1</span>
          </div>
          <div className="flex gap-1">
            <span className="text-neutral-400">Threshold:</span>
            <span>0.88 Quality</span>
          </div>
          <div className="ml-auto bg-white px-2 py-0.5 rounded border border-neutral-200">
            99.98% SLA
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
