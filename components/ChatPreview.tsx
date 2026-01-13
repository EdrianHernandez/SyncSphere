import React, { useState } from 'react';
import { Message, User } from '../types';
import { MessageSquare, ChevronUp, ChevronDown, Send, Paperclip } from 'lucide-react';

interface ChatPreviewProps {
  messages: Message[];
  users: User[];
  currentUser: User;
}

export const ChatPreview: React.FC<ChatPreviewProps> = ({ messages, users, currentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');

  const getUser = (id: string) => users.find(u => u.id === id);

  return (
    <div 
      className={`chat-preview-container fixed bottom-0 right-4 sm:right-8 w-80 sm:w-96 bg-white shadow-xl rounded-t-xl border border-slate-200 z-30 transition-all duration-300 ease-in-out flex flex-col ${
        isExpanded ? 'h-[500px]' : 'h-14'
      }`}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-slate-100 cursor-pointer bg-white rounded-t-xl hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <MessageSquare size={16} className="text-indigo-600" />
          </div>
          <span className="font-semibold text-slate-800 text-sm">Team Chat</span>
          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {/* Messages Body */}
      {isExpanded && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => {
              const sender = getUser(msg.userId);
              const isMe = msg.userId === currentUser.id;
              
              return (
                <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {!isMe && (
                    <img 
                      src={sender?.avatar} 
                      alt={sender?.name} 
                      className="w-8 h-8 rounded-full self-end"
                    />
                  )}
                  <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end flex flex-col' : ''}`}>
                    {!isMe && (
                      <span className="text-[10px] text-slate-500 ml-1">{sender?.name} • {msg.timestamp}</span>
                    )}
                    <div 
                      className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        isMe 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Paperclip size={18} />
              </button>
              <button 
                className={`transition-colors ${inputText ? 'text-indigo-600' : 'text-slate-300'}`}
                disabled={!inputText}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
