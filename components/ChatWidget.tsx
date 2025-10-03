
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatWidgetProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isReplying: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ messages, onSendMessage, isReplying }) => {
  const [input, setInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed right-3 bottom-3 md:right-6 md:bottom-6 w-[calc(100%-1.5rem)] sm:w-80 rounded-2xl overflow-hidden bg-gradient-to-b from-[#041226] to-[#071a2b] shadow-2xl shadow-black/50 z-50">
      <div className="flex items-center gap-2 p-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0b84ff] to-[#05a2ff] flex items-center justify-center text-white font-bold text-lg">
          OK
        </div>
        <div>
          <div className="font-bold">ok shoppy Support</div>
          <div className="text-xs text-[#9aa4b2]">Usually replies in a few minutes</div>
        </div>
        <div className="ml-auto text-xs text-[#9aa4b2]">online</div>
      </div>
      <div ref={chatBodyRef} className="h-64 overflow-y-auto p-3 flex flex-col gap-2.5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[78%] p-2.5 rounded-xl text-sm ${
              msg.kind === 'user'
                ? 'self-end bg-[#0b84ff] text-white'
                : 'self-start bg-[#1f2937] text-[#eaf3ff]'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isReplying && (
             <div className="self-start bg-[#1f2937] text-[#eaf3ff] p-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
            </div>
        )}
      </div>
      <div className="p-2.5 border-t border-white/5 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-full border-0 bg-[#031021] text-[#eaf3ff] placeholder:text-gray-500 focus:ring-2 focus:ring-[#0b84ff] outline-none transition"
        />
        <button onClick={handleSend} className="bg-[#ff7a00] border-0 px-4 py-2.5 rounded-lg text-[#061226] font-semibold hover:opacity-90 transition-opacity">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
