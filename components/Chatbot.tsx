
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLocation } from 'react-router-dom';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Welcome to Visionary AR. I'm your Purchase Guidance Assistant. How can I help you find the perfect piece today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: userMsg,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const isProductPage = location.pathname.startsWith('/product/');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the "Chatbot Assistant" for VISIONARY AR. Your responsibilities follow 3 phases:
          1. BEFORE AR (Purchase Guidance): Ask about budget, dimensions, and style. Recommend products from the Visionary collection. Sugguest launching the AR experience.
          2. DURING AR (Contextual Assistance): If the user is on a product page, explain AR benefits (scale accuracy, real-life appearance). Suggest actions like changing colors or checking fit.
          3. AFTER AR (Decision Support): Summarize benefits, suggest similar items, assist with adding to cart, and guide through checkout/delivery.
          
          Tone: Professional, Innovative, High-tech, helpful.
          Store Details: Free shipping > 10,000 DA, 3-5 days delivery in Algeria, 14-day returns.
          Location Context: ${location.pathname} (User is currently here).`
        }
      });

      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: response.text || "I'm having trouble connecting to the Visionary system. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorResponse: ChatMessage = {
        id: Date.now() + 1,
        text: "My technical services are currently updating. Please reach out to support@arretail.com for immediate help.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 p-5 bg-indigo-600 text-white rounded-full shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:scale-110 transition-transform z-40 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)] bg-white rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.15)] flex flex-col z-50 overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-20 duration-500">
          {/* Header */}
          <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest">Visionary Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Conversational Support</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className={`text-[10px] block mt-2 font-bold uppercase tracking-widest opacity-60 ${msg.sender === 'user' ? 'text-white' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-[1.5rem] rounded-tl-none px-6 py-4 border border-gray-100">
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="w-full pl-6 pr-14 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/30"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">Powered by Visionary AR Intelligent Engine</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
