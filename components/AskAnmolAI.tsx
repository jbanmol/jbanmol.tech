import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateChatResponseStream } from '../services/geminiService';
import type { Message } from '../types';
import { Bot, User, Send, Cpu, Search, BrainCircuit, ThumbsUp, ThumbsDown, Trash2, Link, Sparkles } from 'lucide-react';

const SectionTitle: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => (
    <h2 id={id} className="font-display text-4xl md:text-5xl font-bold text-center text-[var(--text)] mb-4 tracking-tight">{children}</h2>
);

const FeedbackModal: React.FC<{ rating: 'up' | 'down'; onSend: (text: string) => void; onCancel: () => void; }> = ({ rating, onSend, onCancel }) => {
    const [feedbackText, setFeedbackText] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onCancel();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        textareaRef.current?.focus();
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onCancel]);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
        if (e.key === 'Escape') onCancel();
    };

    const handleSubmit = () => {
        onSend(feedbackText);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div ref={modalRef} className="bg-[var(--surface)] rounded-lg shadow-xl z-10 p-6 w-full max-w-md m-4" style={{ border: '1px solid var(--border)' }}>
                <h4 className="font-semibold text-lg text-[var(--text)]">Provide Feedback</h4>
                <p className="text-sm text-[var(--muted)] mt-1">You rated this response {rating === 'up' ? '👍' : '👎'}. Any additional notes?</p>
                <textarea
                    ref={textareaRef}
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Optional: Tell us what was helpful or what could be improved..."
                    className="w-full mt-4 p-2 rounded-md border text-sm bg-[var(--bg)] text-[var(--text)] focus:ring-2 focus:ring-[var(--accent-primary)]"
                    rows={4}
                    style={{ borderColor: 'var(--border)' }}
                />
                <div className="mt-4 flex justify-end gap-3">
                    <button className="px-4 py-2 rounded-md text-sm font-medium text-[var(--muted)] hover:bg-[var(--surface)] transition-colors" onClick={onCancel}>Cancel</button>
                    <button className="px-4 py-2 rounded-md text-sm font-bold bg-[var(--accent-primary)] text-[var(--text-on-accent)] hover:opacity-90 transition-opacity" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    );
};

const examplePrompts = [
  "What was Anmol's biggest achievement at Tummo Labs?",
  "Explain his approach to human-centered AI.",
  "What are his strongest technical skills?",
];

const INITIAL_AI_MESSAGE: Message = { 
    sender: 'ai', 
    text: "Hello! I'm Anmol's AI assistant. I'm trained on his professional background and approach to work. Feel free to ask me anything about his experience, skills, or projects." 
};

const AskAnmolAI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(() => {
        try {
            const storedMessages = localStorage.getItem('chatMessages');
            const parsedMessages = storedMessages ? JSON.parse(storedMessages) : null;
            return Array.isArray(parsedMessages) && parsedMessages.length > 0 ? parsedMessages : [INITIAL_AI_MESSAGE];
        } catch (error) {
            console.error("Failed to parse chat messages from localStorage", error);
            return [INITIAL_AI_MESSAGE];
        }
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeepThought, setIsDeepThought] = useState(() => {
        const storedValue = localStorage.getItem('isDeepThought');
        return storedValue ? JSON.parse(storedValue) : false;
    });
    const [feedback, setFeedback] = useState<{ messageIndex: number; rating: 'up' | 'down' } | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isFirstVisitForTooltip, setIsFirstVisitForTooltip] = useState(false);
    
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined' && !localStorage.getItem('deepThoughtTooltipDismissed')) {
            setIsFirstVisitForTooltip(true);
        }
    }, []);

    useEffect(() => { localStorage.setItem('chatMessages', JSON.stringify(messages)); }, [messages]);
    useEffect(() => { localStorage.setItem('isDeepThought', JSON.stringify(isDeepThought)); }, [isDeepThought]);
    useEffect(() => { chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, isLoading]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [input]);
    
    const dismissTooltipPermanently = () => {
        localStorage.setItem('deepThoughtTooltipDismissed', 'true');
        setIsFirstVisitForTooltip(false);
        setShowTooltip(false);
    };

    const handleToggleDeepThought = () => {
        setIsDeepThought(prev => !prev);
        if (isFirstVisitForTooltip) {
            dismissTooltipPermanently();
        }
    };

    const handleSend = async (prompt?: string) => {
        const currentInput = prompt || input;
        if (!currentInput.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: currentInput.trim() };
        const aiMessagePlaceholder: Message = { sender: 'ai', text: '' };
        setMessages(prev => [...prev, userMessage, aiMessagePlaceholder]);
        if (!prompt) setInput('');
        setIsLoading(true);

        try {
            const stream = generateChatResponseStream(currentInput.trim(), isDeepThought);
            for await (const chunk of stream) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (chunk.text) {
                        lastMessage.text += chunk.text;
                    }
                    if (chunk.sources) {
                        lastMessage.sources = chunk.sources;
                    }
                    return newMessages;
                });
            }
        } catch (error) {
            const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having a bit of trouble connecting. Please try again later." };
            setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };
    
    const handleClearChat = () => {
        setMessages([INITIAL_AI_MESSAGE]);
    };
    
    const handleSendFeedback = (feedbackText: string) => {
        console.log('Feedback received:', { ...feedback, feedbackText });
        setFeedback(null);
    };

    return (
        <section aria-labelledby="contact-title">
            <SectionTitle id="contact-title">Ask My Assistant</SectionTitle>
            <p className="text-center text-lg text-[var(--muted)] mb-8 max-w-4xl mx-auto">
                Chat with my digital persona, an AI assistant trained on my background to answer your questions.
            </p>

            <div 
                className="w-full max-w-4xl mx-auto h-[85vh] max-h-[600px] md:h-[70vh] md:max-h-[700px] bg-glass backdrop-blur-sm rounded-lg border flex flex-col shadow-2xl"
                style={{ borderColor: 'var(--border)', boxShadow: '0 0 40px var(--shadow-color)' }}
            >
                {/* Chat Header */}
                <div className="flex justify-between items-center p-4 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-3">
                        <Bot size={20} className="text-[var(--accent-primary)]" />
                        <h3 className="font-semibold text-md text-[var(--text)]">Anmol's Assistant</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div 
                            className="relative flex items-center gap-2"
                            onMouseEnter={() => isFirstVisitForTooltip && setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <label htmlFor="deep-thought" className="flex items-center gap-2 text-sm text-[var(--muted)] cursor-pointer">
                                <BrainCircuit size={16} />
                                <span className="hidden sm:inline">Deep Thought</span>
                            </label>
                            {showTooltip && isFirstVisitForTooltip && (
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-[var(--surface)] text-xs text-[var(--text)] p-2 rounded-md shadow-lg border border-[var(--border)] fade-in">
                                    For complex, creative, or technical questions.
                                </div>
                            )}
                        </div>
                        <input 
                            id="deep-thought" type="checkbox" className="toggle-switch"
                            checked={isDeepThought} onChange={handleToggleDeepThought}
                            aria-label="Toggle deep thought mode"
                        />
                         <button
                            onClick={handleClearChat}
                            disabled={messages.length <= 1}
                            className="p-2 rounded-full text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Clear chat"
                            title="Clear chat"
                         >
                            <Trash2 size={16} />
                         </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div ref={chatContainerRef} className="flex-grow p-4 md:p-6 overflow-y-auto scrollbar-thin" aria-live="polite">
                    <div className="flex flex-col gap-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                                        <Bot size={18} className="text-[var(--accent-primary)]" />
                                    </div>
                                )}
                                <div className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] rounded-br-none' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-bl-none'}`}>
                                    <div className="prose prose-sm max-w-none prose-p:text-[var(--text)] prose-li:text-[var(--text)] prose-strong:text-[var(--text)] prose-headings:text-[var(--text)]">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-4 border-t border-[var(--border)] pt-3">
                                            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                                                <Search size={14} /> Sources
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {msg.sources.map((source, i) => (
                                                    <a href={source.uri} key={i} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-md hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors">
                                                        <Link size={12} />
                                                        <span className="truncate max-w-xs">{source.title}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {msg.sender === 'ai' && !isLoading && index === messages.length -1 && index > 0 && (
                                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[var(--border)]">
                                            <button onClick={() => setFeedback({ messageIndex: index, rating: 'up' })} className="p-1 rounded-md text-[var(--muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface)]"><ThumbsUp size={14} /></button>
                                            <button onClick={() => setFeedback({ messageIndex: index, rating: 'down' })} className="p-1 rounded-md text-[var(--muted)] hover:text-red-500 hover:bg-[var(--surface)]"><ThumbsDown size={14} /></button>
                                        </div>
                                    )}
                                </div>
                                {msg.sender === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
                                        <User size={18} className="text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                                    <Bot size={18} className="text-[var(--accent-primary)]" />
                                </div>
                                <div className="max-w-[85%] sm:max-w-[75%] p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] rounded-bl-none">
                                    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                                        <Cpu size={16} className="animate-pulse" />
                                        <span>Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {messages.length === 1 && (
                            <div className="text-center pt-4 border-t border-[var(--border)]">
                                <h4 className="text-sm font-semibold text-[var(--muted)] mb-3 flex items-center justify-center gap-2">
                                    <Sparkles size={16} className="text-[var(--accent-tertiary)]" />
                                    Not sure where to start?
                                </h4>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                                    {examplePrompts.map(prompt => (
                                        <button key={prompt} onClick={() => handleSend(prompt)} className="w-full sm:w-auto text-xs text-[var(--muted)] bg-[var(--surface)] border border-[var(--border)] px-3 py-2 rounded-full hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors">
                                            "{prompt}"
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
                    <div className="relative">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Feel free to ask anything..."
                            className="w-full p-3 pr-12 rounded-lg border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--muted)] resize-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all duration-200 scrollbar-thin"
                            style={{ borderColor: 'var(--border)' }}
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--accent-primary)] text-[var(--text-on-accent)] flex items-center justify-center transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Send message"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
            {feedback && <FeedbackModal {...feedback} onSend={handleSendFeedback} onCancel={() => setFeedback(null)} />}
        </section>
    );
};

export default AskAnmolAI;
