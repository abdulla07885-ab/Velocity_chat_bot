import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Plus, Settings, Sun, Pin, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { chats, currentChatId, setCurrentChat, sidebarOpen, togglePin } = useStore();
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const pinnedChats = filteredChats.filter(c => c.isPinned);
  const recentChats = filteredChats.filter(c => !c.isPinned);

  const handleNewChat = () => {
    setCurrentChat(null);
    navigate('/');
  };

  const handleSelectChat = (id: string) => {
    setCurrentChat(id);
    navigate(`/c/${id}`);
  };

  const handleTogglePin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    togglePin(id);
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="w-[230px] flex-shrink-0 h-full bg-[#F5F5F4] flex flex-col z-40 transition-all absolute md:relative text-neutral-700">
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2 cursor-pointer mb-6" onClick={() => navigate('/')}>
          <div className="text-xl font-bold text-red-700 tracking-tighter">V<span className="text-neutral-800">elocity</span></div>
        </div>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-between px-3 py-2 bg-white border border-neutral-200 rounded-md text-sm font-medium hover:border-neutral-300 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-neutral-500" />
            <span className="text-neutral-800">New chat</span>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono bg-neutral-50 px-1.5 py-0.5 rounded border border-neutral-100">⌘K</span>
        </button>
        
        {/* Search Field */}
        <div className="mt-4 relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-neutral-700 focus:outline-none focus:border-red-500 shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4 py-2 custom-scrollbar">
        {pinnedChats.length > 0 && (
          <div>
            <h3 className="text-[10px] font-semibold text-neutral-400 mb-2 tracking-wider uppercase">Pinned</h3>
            <div className="space-y-0.5">
              {pinnedChats.map(chat => (
                <div
                  key={chat.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                >
                  <button
                    onClick={() => handleSelectChat(chat.id)}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded-md text-[13px] transition-colors truncate",
                      currentChatId === chat.id ? "bg-neutral-200/50 text-neutral-900 font-medium" : "text-neutral-600 hover:bg-neutral-200/30"
                    )}
                  >
                    {chat.title}
                  </button>
                  {hoveredChat === chat.id && (
                    <button onClick={(e) => handleTogglePin(e, chat.id)} className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 bg-[#F5F5F4] rounded">
                      <Pin className="w-3.5 h-3.5 fill-current" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {recentChats.length > 0 && (
          <div>
            <h3 className="text-[10px] font-semibold text-neutral-400 mb-2 tracking-wider uppercase">Today</h3>
            <div className="space-y-0.5">
              {recentChats.map(chat => (
                <div
                  key={chat.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => setHoveredChat(null)}
                >
                  <button
                    onClick={() => handleSelectChat(chat.id)}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded-md text-[13px] transition-colors truncate",
                      currentChatId === chat.id ? "bg-neutral-200/50 text-neutral-900 font-medium" : "text-neutral-600 hover:bg-neutral-200/30"
                    )}
                  >
                    {chat.title}
                  </button>
                  {hoveredChat === chat.id && (
                    <button onClick={(e) => handleTogglePin(e, chat.id)} className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 bg-[#F5F5F4] rounded">
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links for other pages */}
        <div className="pt-4 border-t border-neutral-200">
           <h3 className="text-[10px] font-semibold text-neutral-400 mb-2 tracking-wider uppercase">Fabric</h3>
           <button onClick={() => navigate('/playground')} className="w-full text-left px-2 py-1.5 rounded-md text-[13px] text-neutral-600 hover:bg-neutral-200/30 transition-colors">Routing Playground</button>
           <button onClick={() => navigate('/history')} className="w-full text-left px-2 py-1.5 rounded-md text-[13px] text-neutral-600 hover:bg-neutral-200/30 transition-colors">History</button>
           <button onClick={() => navigate('/analytics')} className="w-full text-left px-2 py-1.5 rounded-md text-[13px] text-neutral-600 hover:bg-neutral-200/30 transition-colors">Analytics</button>
           <button onClick={() => navigate('/models')} className="w-full text-left px-2 py-1.5 rounded-md text-[13px] text-neutral-600 hover:bg-neutral-200/30 transition-colors">Models</button>
           <button onClick={() => navigate('/security')} className="w-full text-left px-2 py-1.5 rounded-md text-[13px] text-neutral-600 hover:bg-neutral-200/30 transition-colors">Security</button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="p-3 flex items-center justify-between border-t border-neutral-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-600">
            AD
          </div>
          <span className="text-xs font-medium text-neutral-700">Alex Dev</span>
        </div>
        <div className="flex gap-1 text-neutral-400">
          <button onClick={() => navigate('/settings')} className="p-1 hover:text-neutral-700 rounded hover:bg-neutral-200/50">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1 hover:text-neutral-700 rounded hover:bg-neutral-200/50">
            <Sun className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
