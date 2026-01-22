import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { ChatLeadForm } from './ChatLeadForm';

// Typing effect configuration for human-like delays
const TYPING_CONFIG = {
  baseDelay: 12,        // Base ms between characters
  variance: 20,         // Random variance added
  wordPauseChance: 0.08, // 8% chance to pause after a word
  wordPauseDelay: 60,   // Extra ms when pausing after word
  punctuationDelay: 80, // Extra ms after punctuation
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Keywords that indicate buying intent - triggers lead form
const BUYING_INTENT_KEYWORDS = [
  'pricing', 'price', 'cost', 'quote', 'budget',
  'hire', 'need', 'want', 'looking for', 'interested',
  'start', 'begin', 'get started', 'book', 'schedule',
  'how much', 'rates', 'packages', 'deal', 'offer',
  'ready', 'asap', 'urgent', 'deadline', 'project'
];

const detectBuyingIntent = (messages: Message[]): boolean => {
  // Check last 3 user messages for buying intent
  const recentUserMessages = messages
    .filter(m => m.role === 'user')
    .slice(-3)
    .map(m => m.content.toLowerCase());
  
  return recentUserMessages.some(msg =>
    BUYING_INTENT_KEYWORDS.some(keyword => msg.includes(keyword))
  );
};

const SUPABASE_URL = "https://qksdhteorfupfxtmrlxw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrc2RodGVvcmZ1cGZ4dG1ybHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5OTYxNzQsImV4cCI6MjA4NDU3MjE3NH0.rTUhVmqB19vD6JrLkLmfGd9XOezcosrp24Yso53GjvQ";

const STORAGE_KEY = 'sanzox_chat_history';
const LEAD_SUBMITTED_KEY = 'sanzox_lead_submitted';

const getStoredMessages = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse stored messages:', e);
  }
  return [{ role: 'assistant', content: "Hey there! 👋 Welcome to **SANZOX**!\n\nI'm here to help you build something amazing. Whether it's **AI Automation**, **Web Development**, **Video Editing**, **Shopify Solutions**, or **YouTube Automation** — we've got you covered.\n\nWhat would you like to create or automate today?" }];
};

const getLeadSubmitted = (): boolean => {
  try {
    return localStorage.getItem(LEAD_SUBMITTED_KEY) === 'true';
  } catch {
    return false;
  }
};

export function ChatWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getStoredMessages);
  const [showQuickReplies, setShowQuickReplies] = useState(() => getStoredMessages().length === 1);

  const quickReplies = [
    { label: '🤖 AI Automation', message: 'Tell me about your AI Automation services' },
    { label: '🌐 Web Dev', message: 'What web development services do you offer?' },
    { label: '🎬 Video Editing', message: 'Tell me about your video editing services' },
    { label: '🛍 Shopify', message: 'What Shopify solutions do you provide?' },
    { label: '📈 YouTube', message: 'Tell me about YouTube Automation services' },
    { label: '💰 Pricing', message: 'What are your pricing packages?' },
  ];
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(getLeadSubmitted);
  const [streamedContent, setStreamedContent] = useState('');
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTypingEffect, setIsTypingEffect] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingIndexRef = useRef(0);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Human-like typing effect
  const getTypingDelay = useCallback((char: string): number => {
    let delay = TYPING_CONFIG.baseDelay + Math.random() * TYPING_CONFIG.variance;
    
    if (['.', '!', '?', ',', ';', ':'].includes(char)) {
      delay += TYPING_CONFIG.punctuationDelay;
    }
    if (char === ' ' && Math.random() < TYPING_CONFIG.wordPauseChance) {
      delay += TYPING_CONFIG.wordPauseDelay;
    }
    if (char === '\n') {
      delay += TYPING_CONFIG.wordPauseDelay * 1.5;
    }
    
    return delay;
  }, []);

  // Process typing effect
  useEffect(() => {
    if (!isTypingEffect || typingIndexRef.current >= streamedContent.length) {
      if (typingIndexRef.current >= streamedContent.length && streamedContent.length > 0 && !isLoading) {
        // Typing complete, update final message
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => 
              i === prev.length - 1 ? { ...m, content: streamedContent } : m
            );
          }
          return prev;
        });
        setIsTypingEffect(false);
      }
      return;
    }

    const currentChar = streamedContent[typingIndexRef.current];
    const delay = getTypingDelay(currentChar);

    typingTimerRef.current = setTimeout(() => {
      typingIndexRef.current += 1;
      const newDisplayed = streamedContent.slice(0, typingIndexRef.current);
      setDisplayedContent(newDisplayed);
      
      // Update the message with typing progress
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > 1) {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: newDisplayed } : m
          );
        }
        return [...prev, { role: 'assistant', content: newDisplayed }];
      });
    }, delay);

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [streamedContent, displayedContent, isTypingEffect, isLoading, getTypingDelay]);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages:', e);
    }
  }, [messages]);

  // Persist lead submitted state
  useEffect(() => {
    try {
      localStorage.setItem(LEAD_SUBMITTED_KEY, String(leadSubmitted));
    } catch (e) {
      console.error('Failed to save lead state:', e);
    }
  }, [leadSubmitted]);

  // Check for buying intent after messages change
  useEffect(() => {
    if (!leadSubmitted && messages.length > 2 && detectBuyingIntent(messages)) {
      const timer = setTimeout(() => setShowLeadForm(true), 500);
      return () => clearTimeout(timer);
    }
  }, [messages, leadSubmitted]);

  const handleLeadSubmitSuccess = () => {
    setLeadSubmitted(true);
    setShowLeadForm(false);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "Awesome! 🎉 I've got your details. Our team will reach out within 24 hours to discuss your project.\n\nIn the meantime, feel free to ask me anything else about our services!"
    }]);
  };

  const clearChatHistory = () => {
    const initialMessage: Message = { role: 'assistant', content: "Hey there! 👋 Welcome to **SANZOX**!\n\nI'm here to help you build something amazing. Whether it's **AI Automation**, **Web Development**, **Video Editing**, **Shopify Solutions**, or **YouTube Automation** — we've got you covered.\n\nWhat would you like to create or automate today?" };
    setMessages([initialMessage]);
    setShowQuickReplies(true);
    setShowLeadForm(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleGetQuote = () => {
    setIsOpen(false);
    navigate('/contact');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const streamChat = async (userMessages: Message[]) => {
    // Reset typing effect state
    typingIndexRef.current = 0;
    setStreamedContent('');
    setDisplayedContent('');
    setIsTypingEffect(true);

    const resp = await fetch(`${SUPABASE_URL}/functions/v1/ai-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        throw new Error(errorData.error || "Rate limit exceeded. Please wait a moment.");
      }
      if (resp.status === 402) {
        throw new Error(errorData.error || "Service temporarily unavailable.");
      }
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            // Feed content to typing effect instead of directly updating
            setStreamedContent(assistantContent);
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setShowQuickReplies(false);

    try {
      await streamChat(newMessages.filter(m => m.role === 'user' || m.content !== "Hi! 👋 I'm your AI assistant. How can I help you today?"));
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get response');
      setIsTypingEffect(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us via WhatsApp." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (message: string) => {
    setInput(message);
    setTimeout(() => {
      const userMessage: Message = { role: 'user', content: message };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');
      setIsLoading(true);
      setShowQuickReplies(false);
      streamChat(newMessages.filter(m => m.role === 'user' || m.content !== "Hi! 👋 I'm your AI assistant. How can I help you today?"))
        .catch((error) => {
          console.error('Chat error:', error);
          toast.error(error instanceof Error ? error.message : 'Failed to get response');
          setIsTypingEffect(false);
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us via WhatsApp." 
          }]);
        })
        .finally(() => setIsLoading(false));
    }, 0);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Pulsing glow effect */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </>
        )}
        
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[9998] w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Support</h3>
                    <p className="text-xs text-muted-foreground">Powered by Google Gemini</p>
                  </div>
                </div>
                {messages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChatHistory}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-muted text-foreground rounded-bl-md'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_strong]:text-foreground [&_em]:text-foreground/90">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 justify-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full bg-primary/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Quick Reply Buttons */}
                {showQuickReplies && messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 mt-2"
                  >
                    {quickReplies.map((reply, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleQuickReply(reply.message)}
                        className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
                      >
                        {reply.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Lead Capture Form - appears on buying intent */}
                {showLeadForm && !leadSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3"
                  >
                    <ChatLeadForm onSubmitSuccess={handleLeadSubmitSuccess} />
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Get Free Quote Button */}
            <div className="px-4 py-2 border-t border-border/50">
              <Button
                onClick={handleGetQuote}
                variant="outline"
                className="w-full gap-2 rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-primary"
              >
                <FileText className="w-4 h-4" />
                Get Free Quote
              </Button>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full bg-muted border-0"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="rounded-full w-10 h-10"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
