import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe, Info } from 'lucide-react';
import { generateLegalResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Welcome to Seekers Legal Assistant. I have access to your internal document database (RAG). How can I assist you today? (Internal Team Use Only)',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate RAG Context - in a real app, this would be retrieved from a vector DB
    const context = "Simulated Retrieval Augmented Generation context based on Omani Labor Law 2023 and recent uploaded contracts.";

    const responseText = await generateLegalResponse(input, language, context);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex justify-between items-center">
        <div>
           <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-800">Legal Knowledge Assistant</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              Internal Team Use Only
            </span>
           </div>
           <p className="text-xs text-gray-500 mt-1">Powered by Seekers RAG Engine • Documents Updated 2h ago</p>
        </div>
        
        <button 
          onClick={() => setLanguage(prev => prev === 'en' ? 'ar' : 'en')}
          className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <Globe size={16} />
          <span>{language === 'en' ? 'English' : 'العربية'}</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600 ml-3' : 'bg-slate-700 mr-3'}`}>
                {msg.role === 'user' ? <User className="text-white" size={20} /> : <Bot className="text-white" size={20} />}
              </div>
              
              <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
              }`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
                <div className={`text-[10px] mt-2 opacity-70 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-200 ml-12">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'ar' ? 'اطرح سؤالاً يتعلق بمستنداتك...' : 'Ask a question about your documents...'}
            className="flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300 px-4 py-3 bg-gray-50"
            disabled={isLoading}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center">
              <Info size={10} className="mr-1" />
              AI responses require manual verification. Do not rely solely on automated advice.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;