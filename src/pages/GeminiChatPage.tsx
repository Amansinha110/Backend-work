import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CHAT_PERSONAS, 
  ChatPersona, 
  ChatMessage, 
  GeminiModelId, 
  sendGeminiChatMessage, 
  saveChatSessionToFirestore 
} from '../services/gemini';
import { db, auth } from '../services/firebase';
import { 
  Sparkles, Send, Bot, User, RefreshCw, Trash2, 
  Download, Mic, MicOff, ShieldCheck, Zap, Brain, 
  Layers, ArrowRight, CheckCircle2, ChevronDown
} from 'lucide-react';

export const GeminiChatPage: React.FC = () => {
  const { lang, setPage, showToast } = useApp();
  const hi = lang === 'hi';

  const [activePersonaKey, setActivePersonaKey] = useState<string>('architect');
  const [selectedModel, setSelectedModel] = useState<GeminiModelId>('gemini-3.8-flash');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState<string>(() => `session-${Date.now()}`);

  const activePersona = CHAT_PERSONAS[activePersonaKey] || CHAT_PERSONAS.architect;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      role: 'model',
      text: hi
        ? `नमस्ते! मैं **${activePersona.name}** (${activePersona.title}) हूँ। मैं Quantinox एंटरप्राइज़ आर्किटेक्चर, वित्तीय विश्लेषण या Quanta AI ऑटोनॉमस एजेंट्स के संबंध में आपकी सहायता के लिए तैयार हूँ। आप नीचे दिए गए सुझाए गए प्रश्नों में से चुन सकते हैं या अपना प्रश्न टाइप कर सकते हैं।`
        : `Greetings! I am **${activePersona.name}**, ${activePersona.title}. Powered by Google Gemini (${selectedModel}), I provide architectural guidance on sub-second distributed ledgers, multi-currency financial consolidation, and autonomous shopfloor execution. How may I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // When changing persona, inform user in thread
  const handleSelectPersona = (key: string) => {
    setActivePersonaKey(key);
    const newPersona = CHAT_PERSONAS[key];
    setSelectedModel(newPersona.model);

    const switchNote: ChatMessage = {
      id: `switch-${Date.now()}`,
      role: 'system',
      text: hi
        ? `विशेषज्ञ बदला गया: **${newPersona.name}** (${newPersona.title}). मॉडल: \`${newPersona.model}\``
        : `Switched advisor persona to **${newPersona.name}** (${newPersona.title}) using \`${newPersona.model}\`. System instructions re-aligned.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, switchNote]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const replyText = await sendGeminiChatMessage({
        personaId: activePersonaKey,
        modelOverride: selectedModel,
        history: [...messages, userMsg],
        newUserMessage: text
      });

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedHistory = [...messages, userMsg, modelMsg];
      setMessages(updatedHistory);

      // Persist to Firestore
      saveChatSessionToFirestore({
        sessionId,
        personaId: activePersonaKey,
        model: selectedModel,
        messages: updatedHistory
      });

    } catch (err: any) {
      console.error('Error in chat generation:', err);
      showToast(hi ? 'संदेश भेजने में त्रुटि हुई' : 'Failed to generate response', 'error');
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: hi 
          ? `वार्तालाप इतिहास रीसेट कर दिया गया है। मैं **${activePersona.name}** हूँ, पूछिए अपना नया प्रश्न।` 
          : `Conversation thread reset. I am **${activePersona.name}** (${selectedModel}). What shall we examine next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast(hi ? 'चैट इतिहास साफ़ किया गया' : 'Chat session cleared');
  };

  const handleDownloadTranscript = () => {
    const text = messages
      .map(m => `[${m.timestamp}] ${m.role.toUpperCase()}: ${m.text}\n`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quantinox-Gemini-Chat-${sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(hi ? 'ट्रांसक्रिप्ट डाउनलोड हो गया' : 'Chat transcript exported');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Top Banner & Control Strip */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)] py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-[var(--ink)]">
                  {hi ? 'क्वांटिनॉक्स जेमिनी चैट एडवाइज़र' : 'Quantinox Gemini Enterprise Chat'}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-semibold">
                  Multi-Turn
                </span>
              </div>
              <p className="text-xs text-[var(--muted)]">
                Active Persona: <strong className="text-[var(--ink)]">{activePersona.name}</strong> · {activePersona.title}
              </p>
            </div>
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-1.5 bg-[var(--card)] p-1 rounded-[var(--radius-sm)] border border-[var(--line)] shadow-sm">
            <span className="text-[11px] font-semibold text-[var(--muted)] px-2">Model:</span>
            {(['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-4-argon'] as const).map(m => (
              <button
                key={m}
                onClick={() => setSelectedModel(m)}
                className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded transition-all ${
                  selectedModel === m 
                    ? 'bg-[var(--accent)] text-white shadow-sm' 
                    : 'text-[var(--text)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
                }`}
              >
                {m === 'gemini-3.8-flash' ? '3.8 Flash (General)' : m === 'gemini-3.1-flash-lite' ? '3.1 Lite (Fast)' : '4 Argon (Complex)'}
              </button>
            ))}
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTranscript}
              title="Download Transcript"
              className="p-2 rounded-lg border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card)] transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleClearHistory}
              title="Clear Thread"
              className="p-2 rounded-lg border border-[var(--line)] text-[var(--muted)] hover:text-rose-500 hover:bg-[var(--card)] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col md:flex-row p-4 sm:p-6 gap-6">
        {/* Left Sidebar: Advisor Personas & System Role Presets */}
        <aside className="w-full md:w-72 shrink-0 space-y-4">
          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
              {hi ? 'सलाहकार व्यक्तित्व (Roles)' : 'Expert Personas'}
            </div>

            <div className="space-y-2">
              {Object.keys(CHAT_PERSONAS).map(k => {
                const p = CHAT_PERSONAS[k];
                const isSelected = activePersonaKey === k;
                return (
                  <button
                    key={k}
                    onClick={() => handleSelectPersona(k)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isSelected 
                        ? 'bg-[var(--card)] border-[var(--accent)] shadow-sm' 
                        : 'bg-transparent border-transparent hover:bg-[var(--card)]/60 text-[var(--muted)]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[var(--ink)] flex items-center justify-between">
                      <span>{p.name}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>}
                    </div>
                    <div className="text-[11px] text-[var(--muted)] mt-0.5 line-clamp-1">
                      {p.title}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--accent)] mt-1">
                      Default: {p.model}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Instructions Inspector */}
          <div className="p-4 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] text-xs">
            <div className="font-bold text-[var(--ink)] mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {hi ? 'सक्रिय सिस्टम निर्देश' : 'System Instruction'}
            </div>
            <p className="text-[11px] text-[var(--muted)] line-clamp-4 leading-relaxed font-mono">
              {activePersona.systemInstruction}
            </p>
          </div>

          {/* Link to 3D Digital Twin */}
          <div className="p-4 rounded-[var(--radius)] bg-gradient-to-br from-indigo-950 to-blue-900 text-white shadow-md">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">New Feature</div>
            <h4 className="text-sm font-bold mt-1">3D Digital Twin Simulation</h4>
            <p className="text-[11px] text-blue-100 mt-1">
              Explore our procedural Three.js factory with live robot kinematics and AGV tracking.
            </p>
            <button
              onClick={() => setPage('digital-twin')}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors"
            >
              <span>Launch 3D Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Right Main Chat Thread & Input */}
        <main className="flex-1 flex flex-col rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--line)] shadow-sm overflow-hidden h-[70vh] md:h-auto">
          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map(msg => {
              if (msg.role === 'system') {
                return (
                  <div key={msg.id} className="text-center py-2 text-xs font-mono text-[var(--muted)] border-y border-[var(--line)]/60 my-2">
                    {msg.text}
                  </div>
                );
              }

              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser 
                      ? 'bg-[var(--accent)] text-white' 
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[var(--accent)] text-white rounded-tr-none'
                      : 'bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div className={`text-[10px] mt-2 font-mono ${isUser ? 'text-blue-100 text-right' : 'text-[var(--muted)]'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] rounded-tl-none flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Sparkles className="w-4 h-4 text-[var(--accent)] animate-spin" />
                  <span>{activePersona.name} ({selectedModel}) is reasoning...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Pills */}
          <div className="p-3 bg-[var(--surface)] border-t border-[var(--line)] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-semibold text-[var(--muted)] shrink-0">Try asking:</span>
            {activePersona.suggestedPrompts.map((p, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(p)}
                className="px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--line)] hover:border-[var(--accent)] text-[var(--text)] text-[11px] whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[var(--card)] border-t border-[var(--line)]">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={hi ? `${activePersona.name} से प्रश्न पूछें... (Enter दबाएं)` : `Message ${activePersona.name} (${selectedModel})... (Press Enter)`}
                className="flex-1 px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none resize-none transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 rounded-[var(--radius-sm)] bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>{hi ? 'भेजें' : 'Send'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
