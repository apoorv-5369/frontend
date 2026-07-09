import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Moon, Sun, Sparkles, Leaf, Wind } from 'lucide-react';


interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Lightweight SplitText Animation Component
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  className = '', 
  delay = 100, 
  duration = 600,
  splitType = 'chars' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const splitContent = splitType === 'chars' 
    ? text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * delay}ms`,
            transitionDuration: `${duration}ms`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    : text.split(' ').map((word, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out mr-1 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * delay}ms`,
            transitionDuration: `${duration}ms`
          }}
        >
          {word}
        </span>
      ));

  return (
    <div className={className}>
      {splitContent}
    </div>
  );
};

const MitraChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "नमस्ते! I'm Mitra, your wellness companion 🌸\n\nThis is your safe space - like sitting under a peaceful tree, sharing thoughts with a caring friend. Whatever you're feeling, I'm here to listen without any judgment.\n\nHow are you feeling in this moment? 🌱",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length>1){
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://mitra-backend-97l0.onrender.com/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: inputMessage
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorBody);
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having a moment of connection trouble, but I'm still here with you. Let's try again when you're ready 💙",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gentle floating leaves */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute opacity-20 animate-pulse ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-400'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 4 + 6}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <Leaf className="w-4 h-4" />
        </div>
      ))}
      
      {/* Soft gradient orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-xl opacity-10 animate-pulse ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
              : 'bg-gradient-to-r from-blue-300 to-purple-300'
          }`}
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 8 + 8}s`
          }}
        />
      ))}
    </div>
  );

  const BreathingGuide = () => (
    <div className="fixed bottom-24 right-6 z-20">
      <div className={`w-16 h-16 rounded-full border-2 border-opacity-30 flex items-center justify-center transition-all duration-1000 ${
        isDarkMode 
          ? 'border-emerald-300 bg-emerald-900/20' 
          : 'border-emerald-400 bg-emerald-100/30'
      } backdrop-blur-sm hover:scale-110 cursor-pointer group`}
      style={{
        animation: 'breathe 4s ease-in-out infinite'
      }}>
        <Wind className={`w-6 h-6 ${
          isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
        } group-hover:scale-110 transition-transform`} />
        <div className={`absolute -top-8 right-0 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
          isDarkMode ? 'bg-slate-700 text-gray-200' : 'bg-white text-gray-700'
        } shadow-lg whitespace-nowrap`}>
          Breathe with me
        </div>
      </div>
    </div>
  );

  return (
    <div className={`h-screen flex flex-col transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900' 
        : 'bg-gradient-to-br from-rose-50 via-blue-50 to-emerald-50'
    }`}>
      <FloatingElements />
      <BreathingGuide />
      
      {/* Enhanced Header */}
      <div className={`relative z-10 p-6 backdrop-blur-md flex-shrink-0 ${
        isDarkMode ? 'bg-slate-800/20' : 'bg-white/20'
      } border-b border-white/10 shadow-sm`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              <Heart className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
            </div>
            <div>
              <SplitText
                text="Mitra"
                className={`text-2xl font-light ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}
                delay={150}
                duration={800}
                splitType="chars"
              />
              <SplitText
                text="Your caring companion • Always listening"
                className={`text-sm font-light mt-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                delay={80}
                duration={600}
                splitType="words"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Meditation pulse indicator */}
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
            }`} />
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                isDarkMode 
                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' 
                  : 'bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/30'
              } backdrop-blur-sm`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Messages */}
      <div className="relative z-10 max-w-4xl mx-auto p-6 flex-grow w-full overflow-y-auto scroll-smooth">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} transform transition-all duration-500 ease-out`}
              style={{
                opacity: 0,
                animation: `slideIn 0.6s ease-out ${index * 0.1}s forwards`
              }}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-2xl px-6 py-4 rounded-3xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                  message.isUser
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/25'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/25'
                    : isDarkMode
                      ? 'bg-slate-700/60 text-gray-100 border border-slate-600/30 shadow-slate-700/50'
                      : 'bg-white/60 text-gray-800 border border-white/30 shadow-blue-100/50'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-light">
                  {message.text}
                </p>
                <p className={`text-xs mt-3 flex items-center ${
                  message.isUser 
                    ? 'text-purple-100 justify-end' 
                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="mr-1">•</span>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className={`max-w-xs px-6 py-4 rounded-3xl backdrop-blur-sm ${
                isDarkMode ? 'bg-slate-700/60' : 'bg-white/60'
              } shadow-lg`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                  }`} style={{ animationDelay: '0ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                  }`} style={{ animationDelay: '200ms' }} />
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                  }`} style={{ animationDelay: '400ms' }} />
                </div>
                <p className={`text-xs mt-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Mitra is reflecting...
                </p>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className={`relative z-10 p-6 backdrop-blur-md flex-shrink-0 ${
        isDarkMode ? 'bg-slate-800/20' : 'bg-white/20'
      } border-t border-white/10`}>
        <div className="max-w-4xl mx-auto">
          <div className={`flex items-center space-x-4 p-4 rounded-3xl backdrop-blur-sm transition-all duration-300 shadow-lg ${
            isDarkMode 
              ? 'bg-slate-700/40 border border-slate-600/30' 
              : 'bg-white/40 border border-white/30'
          } focus-within:ring-2 focus-within:ring-purple-500/30 focus-within:shadow-xl hover:shadow-xl`}>
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's in your heart... (Press Enter to send)"
              className={`flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 font-light ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
              disabled={isLoading}
            />
            
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`p-3 rounded-2xl transition-all duration-300 shadow-md ${
                !inputMessage.trim() || isLoading
                  ? isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                  : isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 shadow-purple-500/25' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105 shadow-purple-500/25'
              } hover:shadow-lg`}
            >
              {isLoading ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-4">
            <p className={`text-xs text-center ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              🔒 Your conversations are completely private and anonymous
            </p>
            <span className={`text-xs ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              •
            </span>
            <p className={`text-xs text-center ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              💚 Take your time, I'm here for you
            </p>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(147, 197, 253, 0.3)' : 'rgba(139, 92, 246, 0.3)'};
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(147, 197, 253, 0.5)' : 'rgba(139, 92, 246, 0.5)'};
        }
      `}</style>
    </div>
  );
};

export default MitraChat;