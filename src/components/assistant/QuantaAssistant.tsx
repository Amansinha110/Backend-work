import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage, Language } from '../../types';
import { searchKnowledge, extractBestSnippet, detectIntent, loadKnowledge } from '../../data/knowledgeBase';
import { StorageService } from '../../services/storage';

export const QuantaAssistant: React.FC = () => {
  const { lang, assistantOpen, setAssistantOpen, assistantPrompt, setPage, showToast } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const history = StorageService.getChatHistory();
    return history.length ? history : [];
  });
  const [inputVal, setInputVal] = useState('');
  const [isWide, setIsWide] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load knowledge base on mount
  useEffect(() => {
    loadKnowledge();
  }, []);

  // When opened, if empty, send initial greeting
  useEffect(() => {
    if (assistantOpen && messages.length === 0) {
      const greeting: ChatMessage = {
        id: 'greet-1',
        role: 'assistant',
        text:
          lang === 'hi'
            ? 'नमस्ते! मैं **Quanta AI** हूँ, Quantinox का इंटेलिजेंट असिस्टेंट। हमारे ERP, कीमतों, उद्योगों या AI के बारे में पूछें, या मुझसे डेमो बुक कराएँ।'
            : "Hi! I'm **Quanta AI**, Quantinox's intelligent assistant. Ask me about our Cloud ERP, pricing, modules, industry solutions, or let me book a demo for you.",
        lang,
        greet: true,
        createdAt: new Date().toISOString(),
      };
      setMessages([greeting]);
    }
  }, [assistantOpen, lang, messages.length]);

  // When opened with prompt, send it automatically
  useEffect(() => {
    if (assistantOpen && assistantPrompt) {
      handleSend(assistantPrompt);
    }
  }, [assistantOpen, assistantPrompt]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
    StorageService.saveChatHistory(messages);
  }, [messages, isThinking]);

  // Handle Speech Recognition setup
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(transcript);
        handleSend(transcript);
        setIsListening(false);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, [lang]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      showToast('Speech recognition is not supported in this browser.', 'info');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const clean = text.replace(/[*_#`[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : inputVal).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now().toString(36),
      role: 'user',
      text: query,
      lang,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);

    setTimeout(() => {
      respondToQuery(query);
      setIsThinking(false);
    }, 450);
  };

  const respondToQuery = (query: string) => {
    const intent = detectIntent(query);
    const results = searchKnowledge(query, lang, undefined, 4);

    let answerText = '';
    let card: ChatMessage['card'] = undefined;
    let actions: ChatMessage['actions'] = [];
    const sources: ChatMessage['sources'] = [];

    const hi = lang === 'hi';

    if (intent === 'greet') {
      answerText = hi
        ? 'नमस्ते! आज मैं आपकी कैसे मदद करूँ? आप ERP पैकेज, मॉड्यूल, रोलआउट टाइमलाइन या प्राइसिंग के बारे में पूछ सकते हैं।'
        : 'Hello! How can I help you today? You can ask about our ERP modules, pricing, implementation timeline, or industry solutions.';
      actions = [
        { label: hi ? 'डेमो बुक करें' : 'Book a demo', card: 'demo' },
        { label: hi ? 'कीमतें देखें' : 'See pricing', url: '/pricing' },
        { label: hi ? 'प्रोडक्ट टूर' : 'Product tour', card: 'tour' },
      ];
    } else if (intent === 'pricing') {
      answerText = hi
        ? 'Quantinox की कीमत **प्रति यूज़र, प्रति महीना** है, और आप केवल उन्हीं मॉड्यूल का भुगतान करते हैं जिन्हें आप इस्तेमाल करते हैं।\n- **Finance Essentials**: ऑर्डर से कैश और खरीद से भुगतान वाला कोर फ़ाइनेंस\n- **Business Suite**: फ़ाइनेंस के साथ सप्लाई चेन, मैन्युफ़ैक्चरिंग और सर्विसेज़\n- **Enterprise Private**: कस्टम कीमत वाला डेडिकेटेड क्लाउड'
        : 'Quantinox is priced **per user, per month**, and you only pay for the modules you use.\n- **Finance Essentials**: Core finance with order-to-cash and procure-to-pay\n- **Business Suite**: Finance plus supply chain, manufacturing and services on one platform\n- **Enterprise Private**: A dedicated sovereign cloud with tailored configuration';
      actions = [
        { label: hi ? 'कीमतों की तुलना' : 'Compare packages', url: '/pricing' },
        { label: hi ? 'कोटेशन के लिए डेमो' : 'Get custom quote', card: 'demo' },
      ];
    } else if (intent === 'demo') {
      answerText = hi
        ? 'ज़रूर! मैं आपके लिए एक लाइव डेमो निर्धारित कर सकता हूँ। कृपया नीचे अपनी जानकारी दें, हमारे विशेषज्ञ 1 कार्यदिवस में आपसे संपर्क करेंगे।'
        : "I'd be glad to arrange a live tailored demo. Enter your details below and a product specialist will follow up within one business day.";
      card = 'demo';
    } else if (intent === 'callback') {
      answerText = hi
        ? 'ज़रूर, हम आपको कॉल कर सकते हैं। अपना नंबर और उपयुक्त समय चुनें:'
        : 'Sure, our sales engineering team can call you back. Choose your preferred time:';
      card = 'callback';
    } else if (intent === 'finder') {
      answerText = hi
        ? 'आइए आपका शुरुआती पैकेज खोजें। चुनें कि आप Quantinox पर कौन-से कार्यक्षेत्र चलाना चाहते हैं:'
        : "Let's find your starting suite. Tick the operational areas you need to run:";
      card = 'finder';
    } else if (intent === 'calc') {
      answerText = hi
        ? 'यहाँ एक त्वरित बचत अनुमान है। अपने मासिक इनवॉइस और लागत के हिसाब से आँकड़े देखें:'
        : "Here is an estimated business ROI. Adjust the values to calculate your team's savings:";
      card = 'calc';
    } else if (intent === 'tour') {
      answerText = hi
        ? 'प्रोडक्ट टूर लगभग दो मिनट में छह असली व्यावसायिक स्क्रीन दिखाता है:'
        : 'The interactive product tour walks through six real operational screens in two minutes.';
      card = 'tour';
    } else if (intent === 'trial') {
      answerText = hi
        ? 'आप सैंपल डेटा के साथ अपना मुफ़्त ट्रायल सिस्टम माँग सकते हैं। हमारी टीम इसे तैयार करके लॉगिन ईमेल करेगी।'
        : 'You can request a free trial environment with preloaded industry sample data.';
      card = 'trial';
    } else if (intent === 'human') {
      answerText = hi
        ? 'ज़रूर। हमारी टीम से संपर्क का तरीका चुनें:'
        : 'Of course. Choose how you would like to connect with our team:';
      card = 'human';
    } else if (results.length > 0) {
      // Build response from top knowledge chunk
      const top = results[0];
      const snippet = extractBestSnippet(top.chunk.x, query, 260);
      answerText = hi
        ? `हमारी वेबसाइट के अनुसार:\n\n${snippet}\n\nविस्तृत जानकारी के लिए संबंधित पेज देखें।`
        : `Here's what our documentation says:\n\n${snippet}\n\nExplore the full module details below.`;

      for (const r of results.slice(0, 3)) {
        sources.push({ t: r.chunk.t, u: r.chunk.u });
      }

      actions = [
        { label: hi ? 'लाइव डेमो में देखें' : 'See it in a demo', card: 'demo' },
        { label: hi ? 'सेल्स से बात करें' : 'Talk to team', card: 'human' },
      ];
    } else {
      answerText = hi
        ? 'मुझे इसका साफ़ जवाब नॉलेज बेस में नहीं मिला। क्या आप सीधे हमारी टीम से पूछना चाहेंगे या लाइव डेमो देखना चाहेंगे?'
        : "I couldn't find a direct match in our documentation. Would you like to consult our team or book a live demo?";
      actions = [
        { label: hi ? 'डेमो बुक करें' : 'Book a demo', card: 'demo' },
        { label: hi ? 'कॉल बैक माँगें' : 'Request call back', card: 'callback' },
        { label: hi ? 'व्हाट्सएप पर चैट' : 'Chat on WhatsApp', card: 'human' },
      ];
    }

    const aiMsg: ChatMessage = {
      id: 'ai-' + Date.now().toString(36),
      role: 'assistant',
      text: answerText,
      lang,
      card,
      actions,
      sources: sources.length ? sources : undefined,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleFeedback = (messageId: string, rating: 'good' | 'bad') => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          StorageService.recordAiFeedback(messageId, 'User feedback', m.text, rating);
          return { ...m, fb: rating };
        }
        return m;
      })
    );
    showToast(lang === 'hi' ? 'सुझाव के लिए धन्यवाद!' : 'Thanks for your feedback!', 'success');
  };

  const handleDownloadTranscript = () => {
    const lines = messages.map((m) => `[${m.role.toUpperCase()} - ${m.createdAt}]:\n${m.text}\n`);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quanta-ai-transcript-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Transcript downloaded', 'success');
  };

  const clearChat = () => {
    setMessages([]);
    StorageService.saveChatHistory([]);
  };

  if (!assistantOpen) return null;

  return (
    <div className={`qx-ai ${isWide ? 'is-wide' : ''}`}>
      <div className="qx-ai-backdrop" onClick={() => setAssistantOpen(false)}></div>
      <section className="qx-ai-panel" role="dialog" aria-modal="false" aria-labelledby="qx-ai-title">
        <header className="qx-ai-head">
          <span className="qx-ai-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
              <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
            </svg>
          </span>
          <div className="qx-ai-title">
            <strong id="qx-ai-title">Quanta AI</strong>
            <span className="qx-ai-mode">{lang === 'hi' ? 'साइट गाइड' : 'Site Guide'}</span>
          </div>

          <button className="qx-ai-icon" type="button" onClick={clearChat} title="New chat" aria-label="New chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>

          <button className="qx-ai-icon qx-ai-hide-sm" type="button" onClick={() => setIsWide(!isWide)} title={isWide ? 'Collapse' : 'Expand'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isWide ? <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" /> : <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />}
            </svg>
          </button>

          <div className="qx-ai-menu-wrap" style={{ position: 'relative' }}>
            <button className="qx-ai-icon" type="button" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            {menuOpen && (
              <div className="qx-ai-menu" style={{ position: 'absolute', right: 0, top: '100%', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '10px', padding: '6px', boxShadow: 'var(--shadow)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadTranscript();
                    setMenuOpen(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: '13px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  {lang === 'hi' ? 'बातचीत डाउनलोड करें' : 'Download conversation'}
                </button>
              </div>
            )}
          </div>

          <button className="qx-ai-icon" type="button" onClick={() => setAssistantOpen(false)} title="Close" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Message Log */}
        <div className="qx-ai-log" ref={logRef}>
          {messages.map((m) => (
            <div key={m.id} className={`qx-ai-msg is-${m.role}`}>
              {m.role === 'user' ? (
                <div className="qx-ai-bubble">{m.text}</div>
              ) : (
                <>
                  <span className="qx-ai-mini">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                    </svg>
                  </span>
                  <div className="qx-ai-body">
                    <div className="qx-ai-bubble" style={{ whiteSpace: 'pre-line' }}>
                      {m.text}
                    </div>

                    {/* Sources */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="qx-ai-sources" style={{ marginTop: '8px', fontSize: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                        <span style={{ color: 'var(--muted)', fontWeight: 600 }}>{lang === 'hi' ? 'स्रोत:' : 'Sources:'}</span>
                        {m.sources.map((s, idx) => (
                          <span key={idx} style={{ background: 'var(--chip-bg)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent)' }}>
                            {s.t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {m.actions && m.actions.length > 0 && (
                      <div className="qx-ai-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                        {m.actions.map((act, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="qx-ai-action"
                            onClick={() => {
                              if (act.card) {
                                respondToQuery(act.card);
                              } else if (act.url) {
                                setAssistantOpen(false);
                                setPage(act.url.replace(/^\//, '') as any);
                              }
                            }}
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Embedded interactive cards */}
                    {m.card === 'demo' && <AssistantDemoCard onBooked={() => showToast('Demo booked! Check your email.', 'success')} />}
                    {m.card === 'callback' && <AssistantCallbackCard onDone={() => showToast('Call back requested!', 'success')} />}
                    {m.card === 'calc' && <AssistantMiniCalc />}
                    {m.card === 'finder' && <AssistantMiniFinder />}
                    {m.card === 'tour' && (
                      <div style={{ marginTop: '12px', padding: '16px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--line)' }}>
                        <h4 style={{ margin: '0 0 8px', fontSize: '15px' }}>{lang === 'hi' ? 'इंटरैक्टिव प्रोडक्ट टूर' : 'Interactive Product Tour'}</h4>
                        <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--muted)' }}>
                          {lang === 'hi' ? 'फ़ाइनेंस, इन्वेंटरी और AI क्लोज़ की 6 स्क्रीन देखें।' : 'Explore 6 real production screens including Quanta AI close cockpit.'}
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setAssistantOpen(false);
                            setPage('tour');
                          }}
                        >
                          {lang === 'hi' ? 'टूर खोलें' : 'Launch Tour'}
                        </button>
                      </div>
                    )}
                    {m.card === 'human' && (
                      <div style={{ marginTop: '12px', padding: '14px', background: 'var(--surface)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <a
                          href="https://wa.me/919876543210?text=Hello%20Quantinox%2C%20I%20have%20an%20ERP%20inquiry"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                          style={{ display: 'inline-flex', gap: '8px', textDecoration: 'none' }}
                        >
                          💬 {lang === 'hi' ? 'WhatsApp पर चैट करें' : 'Chat on WhatsApp'}
                        </a>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => {
                            setAssistantOpen(false);
                            setPage('contact');
                          }}
                        >
                          ✉️ {lang === 'hi' ? 'संपर्क पेज खोलें' : 'Open Contact Page'}
                        </button>
                      </div>
                    )}

                    {/* Feedback tools */}
                    {!m.greet && (
                      <div className="qx-ai-tools" style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(m.text);
                            showToast('Copied to clipboard', 'info');
                          }}
                          title="Copy"
                          style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '2px' }}
                        >
                          📋
                        </button>
                        <button
                          type="button"
                          onClick={() => speakText(m.text)}
                          title="Read aloud"
                          style={{ background: 'none', border: 'none', color: isSpeaking ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer', padding: '2px' }}
                        >
                          🔊
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(m.id, 'good')}
                          style={{ background: 'none', border: 'none', color: m.fb === 'good' ? '#1F7A5C' : 'var(--muted)', cursor: 'pointer', padding: '2px' }}
                          title="Helpful"
                        >
                          👍
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(m.id, 'bad')}
                          style={{ background: 'none', border: 'none', color: m.fb === 'bad' ? '#B42318' : 'var(--muted)', cursor: 'pointer', padding: '2px' }}
                          title="Not helpful"
                        >
                          👎
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="qx-ai-msg is-assistant">
              <span className="qx-ai-mini">⚡</span>
              <div className="qx-ai-body">
                <div className="qx-ai-bubble" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <span className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                  <span className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                  <span className="dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="qx-ai-chips">
          {[
            lang === 'hi' ? 'कीमतें कैसे तय होती हैं?' : 'How does pricing work?',
            lang === 'hi' ? 'मुझे कौन-से मॉड्यूल चाहिए?' : 'Which modules do I need?',
            lang === 'hi' ? 'लाइव डेमो बुक करें' : 'Book a live demo',
            lang === 'hi' ? 'प्रोडक्ट टूर दिखाएँ' : 'Show product tour',
            lang === 'hi' ? 'सप्लाई चेन रिस्क' : 'Supplier risk',
          ].map((chip, idx) => (
            <button key={idx} type="button" className="qx-ai-chip" onClick={() => handleSend(chip)}>
              {chip}
            </button>
          ))}
        </div>

        {/* Compose Form */}
        <form
          className="qx-ai-compose"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <textarea
            rows={1}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={lang === 'hi' ? 'Quantinox के बारे में कुछ भी पूछें…' : 'Ask anything about Quantinox…'}
          />
          <button
            type="button"
            className="qx-ai-mic"
            onClick={toggleMic}
            style={{ color: isListening ? '#B42318' : 'inherit' }}
            title="Voice input"
          >
            🎤
          </button>
          <button type="submit" className="qx-ai-send" title="Send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4z" />
            </svg>
          </button>
        </form>

        <p className="qx-ai-note">
          {lang === 'hi'
            ? 'जवाब वेबसाइट के पेजों और डेटाबेस से आते हैं। कृपया संवेदनशील निजी डेटा साझा न करें।'
            : 'Answers are grounded in Quantinox documentation and best practices. Please do not share confidential credentials.'}
        </p>
      </section>
    </div>
  );
};

// Subcomponent: Assistant Mini Demo Form
const AssistantDemoCard: React.FC<{ onBooked: () => void }> = ({ onBooked }) => {
  const { lang } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    StorageService.addLead({
      lead_type: 'assistant_demo',
      name,
      email,
      company,
      lang,
    });
    setSubmitted(true);
    onBooked();
  };

  if (submitted) {
    return (
      <div style={{ padding: '12px', background: 'var(--okt)', color: 'var(--ok)', borderRadius: '10px', fontSize: '13px' }}>
        ✓ {lang === 'hi' ? 'डेमो अनुरोध प्राप्त हुआ! हम 1 कार्यदिवस में संपर्क करेंगे।' : 'Demo booked! Our team will email you within one business day.'}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px', padding: '14px', background: 'var(--surface)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
      <input
        type="text"
        placeholder={lang === 'hi' ? 'पूरा नाम' : 'Full Name'}
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--card)' }}
      />
      <input
        type="email"
        placeholder={lang === 'hi' ? 'कार्य ईमेल' : 'Work Email'}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--card)' }}
      />
      <input
        type="text"
        placeholder={lang === 'hi' ? 'कंपनी का नाम' : 'Company Name'}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--card)' }}
      />
      <button type="submit" className="btn btn-primary" style={{ minHeight: '36px', fontSize: '13px' }}>
        {lang === 'hi' ? 'डेमो बुक करें' : 'Book Demo'}
      </button>
    </form>
  );
};

// Subcomponent: Assistant Callback Card
const AssistantCallbackCard: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const { lang } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('Morning (9–12)');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    StorageService.addLead({
      lead_type: 'callback',
      name: name || 'Callback Request',
      email: `${phone}@callback.quantinox.internal`,
      phone,
      preferred_time: time,
      lang,
    });
    setDone(true);
    onDone();
  };

  if (done) {
    return (
      <div style={{ padding: '12px', background: 'var(--okt)', color: 'var(--ok)', borderRadius: '10px', fontSize: '13px' }}>
        ✓ {lang === 'hi' ? 'हम आपके चुने समय पर कॉल करेंगे।' : 'Call scheduled! We will call you at your preferred time.'}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px', padding: '14px', background: 'var(--surface)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
      <input
        type="text"
        placeholder={lang === 'hi' ? 'आपका नाम' : 'Your Name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--card)' }}
      />
      <input
        type="tel"
        placeholder={lang === 'hi' ? 'फ़ोन नंबर' : 'Phone Number'}
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--card)' }}
      />
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--card)' }}
      >
        <option value="Morning (9–12)">Morning (9:00 AM – 12:00 PM)</option>
        <option value="Afternoon (12–4)">Afternoon (12:00 PM – 4:00 PM)</option>
        <option value="Evening (4–7)">Evening (4:00 PM – 7:00 PM)</option>
      </select>
      <button type="submit" className="btn btn-primary" style={{ minHeight: '36px', fontSize: '13px' }}>
        {lang === 'hi' ? 'मुझे कॉल करें' : 'Call Me Back'}
      </button>
    </form>
  );
};

// Subcomponent: Assistant Mini ROI Calculator
const AssistantMiniCalc: React.FC = () => {
  const [invoices, setInvoices] = useState(800);
  const [minutes, setMinutes] = useState(12);
  const [cost, setCost] = useState(40000);

  const hoursSaved = Math.round(((invoices * minutes) / 60) * 0.35);
  const annualSavings = Math.round(hoursSaved * (cost / 160) * 12);

  return (
    <div style={{ marginTop: '10px', padding: '14px', background: 'var(--surface)', borderRadius: '12px', fontSize: '13px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
        <label>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Monthly Invoices</span>
          <input
            type="number"
            value={invoices}
            onChange={(e) => setInvoices(Math.max(1, Number(e.target.value)))}
            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--line)' }}
          />
        </label>
        <label>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Minutes / Invoice</span>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(1, Number(e.target.value)))}
            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--line)' }}
          />
        </label>
      </div>
      <div style={{ padding: '10px', background: 'var(--card)', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ok)' }}>₹{annualSavings.toLocaleString('en-IN')} / year</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>≈ {hoursSaved} hours saved annually on invoice matching</div>
      </div>
    </div>
  );
};

// Subcomponent: Assistant Mini Suite Finder
const AssistantMiniFinder: React.FC = () => {
  const { lang, setPage, setAssistantOpen } = useApp();
  const [selected, setSelected] = useState<string[]>(['finance', 'manufacturing']);

  const toggle = (mod: string) => {
    setSelected((prev) => (prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]));
  };

  const isSuite = selected.some((m) => ['manufacturing', 'supply-chain', 'services'].includes(m));
  const planName = isSuite ? 'Business Suite' : 'Finance Essentials';

  return (
    <div style={{ marginTop: '10px', padding: '14px', background: 'var(--surface)', borderRadius: '12px', fontSize: '13px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
        {[
          ['finance', 'Finance'],
          ['supply-chain', 'Supply Chain'],
          ['manufacturing', 'Manufacturing'],
          ['procurement', 'Procurement'],
          ['sales', 'Sales'],
          ['services', 'Services'],
          ['assets', 'Assets'],
          ['hr', 'HR'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => toggle(id)}
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              border: '1px solid',
              borderColor: selected.includes(id) ? 'var(--accent)' : 'var(--line)',
              background: selected.includes(id) ? 'var(--accent)' : 'var(--card)',
              color: selected.includes(id) ? '#fff' : 'var(--ink)',
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ padding: '10px', background: 'var(--card)', borderRadius: '8px', marginBottom: '10px' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--muted)' }}>Recommended Plan</span>
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)' }}>{planName}</div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        style={{ minHeight: '34px', fontSize: '12px', width: '100%' }}
        onClick={() => {
          setAssistantOpen(false);
          setPage('demo', { modules: selected.join(',') });
        }}
      >
        {lang === 'hi' ? 'इस पैकेज का डेमो बुक करें' : 'Book demo for this plan'}
      </button>
    </div>
  );
};
