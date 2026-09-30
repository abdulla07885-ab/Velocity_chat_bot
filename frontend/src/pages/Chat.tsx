import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { NewChat } from '../components/chat/NewChat';
import { analyzeRequest } from '../services/demoRouter';
import { Loader2 } from 'lucide-react';

export const Chat: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chats, addChat, addMessage, currentChatId, setCurrentChat, routingMode, privacyMode } = useStore();
  const [isTyping, setIsTyping] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(c => c.id === currentChatId);

  useEffect(() => {
    if (id && id !== currentChatId) {
      setCurrentChat(id);
    } else if (!id && currentChatId) {
      navigate(`/c/${currentChatId}`, { replace: true });
    }
  }, [id, currentChatId, setCurrentChat, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages, isTyping]);

  const handleSend = async (text: string) => {
    let targetChatId = currentChatId;

    if (!targetChatId) {
      targetChatId = Math.random().toString(36).substring(7);
      addChat({
        id: targetChatId,
        title: text.slice(0, 30) + '...',
        updatedAt: new Date(),
        isPinned: false,
        messages: []
      });
      navigate(`/c/${targetChatId}`);
    }

    addMessage(targetChatId, {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: text,
      timestamp: new Date()
    });

    setIsTyping(true);
    setLoadingStage('Initializing routing fabric...');

    try {
      const response = await analyzeRequest(
        text, 
        privacyMode, 
        routingMode, 
        (stage) => setLoadingStage(stage)
      );

      addMessage(targetChatId, {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        routingTrace: response.trace
      });
    } catch (e) {
      console.error("Routing error:", e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-white">
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-32">
        {!currentChat ? (
          <NewChat onSelectPrompt={handleSend} />
        ) : (
          <div className="flex flex-col pb-4">
            {currentChat.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && (
              <div className="w-full py-6 bg-neutral-50/50 border-y border-neutral-100">
                <div className="max-w-3xl mx-auto px-4 flex gap-6">
                  <div className="flex-shrink-0 mt-1 w-7 h-7 rounded bg-red-700 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-xs text-neutral-500 font-medium animate-pulse flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
                      {loadingStage}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};
