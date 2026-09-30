import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat, Model } from '../types';
import { mockChats, mockModels } from '../data/mockData';

interface AppState {
  chats: Chat[];
  currentChatId: string | null;
  pinnedChats: Chat[];
  models: Model[];
  routingMode: 'AUTO' | string;
  privacyMode: 'Normal' | 'Strict';
  sidebarOpen: boolean;
  addChat: (chat: Chat) => void;
  setCurrentChat: (id: string | null) => void;
  addMessage: (chatId: string, message: any) => void;
  togglePin: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  setRoutingMode: (mode: string) => void;
  setPrivacyMode: (mode: 'Normal' | 'Strict') => void;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      chats: mockChats,
      currentChatId: null,
      pinnedChats: [],
      models: mockModels,
      routingMode: 'AUTO',
      privacyMode: 'Normal',
      sidebarOpen: true,
      
      addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
      setCurrentChat: (id) => set({ currentChatId: id }),
      addMessage: (chatId, message) => set((state) => ({
        chats: state.chats.map(c => 
          c.id === chatId ? { ...c, messages: [...c.messages, message], updatedAt: new Date() } : c
        )
      })),
      togglePin: (chatId) => set((state) => ({
        chats: state.chats.map(c => c.id === chatId ? { ...c, isPinned: !c.isPinned } : c)
      })),
      deleteChat: (chatId) => set((state) => ({
        chats: state.chats.filter(c => c.id !== chatId),
        currentChatId: state.currentChatId === chatId ? null : state.currentChatId
      })),
      setRoutingMode: (mode) => set({ routingMode: mode }),
      setPrivacyMode: (mode) => set({ privacyMode: mode }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'velocity-storage',
      partialize: (state) => ({ 
        chats: state.chats, 
        routingMode: state.routingMode,
        privacyMode: state.privacyMode
      }),
    }
  )
);
