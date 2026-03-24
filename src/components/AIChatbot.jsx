import { useState, useRef, useEffect } from "react";
import portfolioData from "../data/portfolioData";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Gemini setup ─────────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// ─── Inline styles (no MUI dependency for custom elements) ────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --chat-bg: #0b0d14;
    --surface: rgba(255,255,255,0.04);
    --surface-hover: rgba(255,255,255,0.08);
    --border: rgba(255,255,255,0.08);
    --accent: #6c63ff;
    --accent-2: #ff6b9d;
    --accent-glow: rgba(108,99,255,0.35);
    --text-primary: #f0f0f8;
    --text-muted: rgba(240,240,248,0.45);
    --user-bubble: linear-gradient(135deg, #6c63ff, #a855f7);
    --bot-bubble: rgba(255,255,255,0.06);
    --shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
  }

  .chatbot-root * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── FAB Button ───────────────────────────────────────────────────── */
  .chat-fab {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 68px;
    height: 68px;
    border-radius: 24px;
    background: linear-gradient(135deg, #6c63ff 0%, #a855f7 100%);
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: white;
    box-shadow: 0 8px 32px rgba(108,99,255,0.45), 0 0 0 1px rgba(255,255,255,0.1);
    z-index: 9999;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    animation: fabIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .chat-fab:hover {
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 16px 48px rgba(108,99,255,0.6), 0 0 0 1px rgba(255,255,255,0.15);
  }
  .chat-fab:active { transform: scale(0.96); }
  .chat-fab svg { width: 24px; height: 24px; }
  .chat-fab span { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; opacity: 0.9; }

  .fab-ping {
    position: absolute;
    top: -4px; right: -4px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--accent-2);
    box-shadow: 0 0 0 0 rgba(255,107,157,0.7);
    animation: ping 2s ease-in-out infinite;
  }

  /* ── Chat Window ──────────────────────────────────────────────────── */
  .chat-window {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 400px;
    max-width: calc(100vw - 24px);
    border-radius: 28px;
    background: var(--chat-bg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform-origin: bottom right;
    animation: windowIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  /* ── Header ───────────────────────────────────────────────────────── */
  .chat-header {
    padding: 18px 20px;
    background: linear-gradient(135deg, rgba(108,99,255,0.18) 0%, rgba(168,85,247,0.1) 100%);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    overflow: hidden;
  }
  .chat-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236c63ff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
  .avatar-orb {
    width: 42px; height: 42px;
    border-radius: 16px;
    background: linear-gradient(135deg, #6c63ff, #a855f7);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(108,99,255,0.4);
    position: relative;
  }
  .avatar-orb::after {
    content: '';
    position: absolute;
    bottom: -2px; right: -2px;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #22d3a5;
    border: 2px solid var(--chat-bg);
    animation: statusPulse 2s ease-in-out infinite;
  }
  .header-info { flex: 1; }
  .header-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }
  .header-status {
    font-size: 11px;
    color: #22d3a5;
    font-family: 'Space Mono', monospace;
    letter-spacing: 0.04em;
    margin-top: 1px;
  }
  .header-actions { display: flex; gap: 4px; }
  .icon-btn {
    width: 32px; height: 32px;
    border-radius: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted);
    transition: background 0.2s, color 0.2s;
  }
  .icon-btn:hover { background: var(--surface-hover); color: var(--text-primary); }
  .icon-btn svg { width: 16px; height: 16px; }

  /* ── Messages ─────────────────────────────────────────────────────── */
  .chat-messages {
    height: 340px;
    overflow-y: auto;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scroll-behavior: smooth;
  }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-track { background: transparent; }
  .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

  .empty-state {
    margin: auto;
    text-align: center;
    animation: fadeUp 0.6s ease both;
  }
  .empty-icon {
    width: 56px; height: 56px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(108,99,255,0.2), rgba(168,85,247,0.2));
    border: 1px solid rgba(108,99,255,0.3);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 12px;
    font-size: 26px;
  }
  .empty-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
  .empty-sub { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

  .msg-row {
    display: flex;
    animation: msgIn 0.35s cubic-bezier(0.34,1.4,0.64,1) both;
  }
  .msg-row.user { justify-content: flex-end; }
  .msg-row.bot  { justify-content: flex-start; }

  .bubble {
    max-width: 82%;
    padding: 11px 15px;
    font-size: 13.5px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .bubble.user {
    background: var(--user-bubble);
    color: white;
    border-radius: 18px 18px 4px 18px;
    box-shadow: 0 4px 20px rgba(108,99,255,0.3);
  }
  .bubble.bot {
    background: var(--bot-bubble);
    color: var(--text-primary);
    border: 1px solid var(--border);
    border-radius: 18px 18px 18px 4px;
    backdrop-filter: blur(8px);
  }

  .typing-indicator {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 0;
    animation: fadeUp 0.3s ease both;
  }
  .typing-dots { display: flex; gap: 4px; }
  .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: bounce 1.2s ease-in-out infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }
  .typing-text { font-size: 11px; color: var(--text-muted); font-family: 'Space Mono', monospace; }

  /* ── Suggestions ──────────────────────────────────────────────────── */
  .suggestions-strip {
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    overflow-x: auto;
    border-top: 1px solid var(--border);
    scrollbar-width: none;
  }
  .suggestions-strip::-webkit-scrollbar { display: none; }
  .chip {
    flex-shrink: 0;
    padding: 6px 12px;
    border-radius: 10px;
    font-size: 11.5px;
    font-weight: 500;
    color: var(--text-muted);
    background: var(--surface);
    border: 1px solid var(--border);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .chip:hover:not(:disabled) {
    background: rgba(108,99,255,0.15);
    color: var(--text-primary);
    border-color: rgba(108,99,255,0.4);
    transform: translateY(-1px);
  }
  .chip:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Input ────────────────────────────────────────────────────────── */
  .chat-input-area {
    padding: 14px 16px;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 10px;
    align-items: center;
    background: rgba(255,255,255,0.02);
  }
  .input-wrap {
    flex: 1;
    position: relative;
  }
  .chat-input {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 11px 16px;
    color: var(--text-primary);
    font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: none;
  }
  .chat-input::placeholder { color: var(--text-muted); }
  .chat-input:focus {
    border-color: rgba(108,99,255,0.5);
    box-shadow: 0 0 0 3px rgba(108,99,255,0.12);
  }
  .send-btn {
    width: 42px; height: 42px;
    border-radius: 14px;
    background: linear-gradient(135deg, #6c63ff, #a855f7);
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: white;
    flex-shrink: 0;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 4px 16px rgba(108,99,255,0.35);
  }
  .send-btn:hover:not(:disabled) {
    transform: scale(1.06) translateY(-1px);
    box-shadow: 0 8px 24px rgba(108,99,255,0.5);
  }
  .send-btn:active:not(:disabled) { transform: scale(0.95); }
  .send-btn:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
  .send-btn svg { width: 18px; height: 18px; }

  /* ── Keyframes ────────────────────────────────────────────────────── */
  @keyframes fabIn {
    from { opacity: 0; transform: scale(0.5) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes windowIn {
    from { opacity: 0; transform: scale(0.85) translateY(24px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(10px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
  }
  @keyframes ping {
    0%   { box-shadow: 0 0 0 0 rgba(255,107,157,0.7); }
    70%  { box-shadow: 0 0 0 8px rgba(255,107,157,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,107,157,0); }
  }
  @keyframes statusPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @media (max-width: 480px) {
    .chat-window { bottom: 0; right: 0; width: 100vw; max-width: 100vw; border-radius: 24px 24px 0 0; }
    .chat-fab { bottom: 24px; right: 20px; }
  }
`;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const BotIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);
const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);
const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState(() => {
    try {
      const saved = localStorage.getItem("arpit_chat_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("arpit_chat_history", JSON.stringify(chat));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const suggestions = [
    "🚀 Top skills",
    "💼 Work experience",
    "🛠 Recent projects",
    "⚡ Tech stack",
    "📊 IoT dashboard",
    "🎓 Current studies",
    "📬 Contact info",
  ];

  const sendMessage = async (text = message) => {
    const query =
      typeof text === "string"
        ? text.replace(/^[^\w]+/, "").trim()
        : message.trim();
    if (!query || loading) return;

    setChat((prev) => [...prev, { role: "user", text: query }]);
    setMessage("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are Arpit Panwar's AI portfolio assistant.\n\nPortfolio Data:\n${JSON.stringify(portfolioData)}\n\nInstructions:\n- Answer questions only about Arpit.\n- Be professional, concise, and friendly.\n\nUser Question:\n${query}`;
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      setChat((prev) => [...prev, { role: "bot", text: response }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ AI limit reached. Please try again in a moment.",
        },
      ]);
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const clearChat = () => {
    if (window.confirm("Clear all chat history?")) {
      setChat([]);
      localStorage.removeItem("arpit_chat_history");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-root">
      <style>{styles}</style>

      {/* ── FAB ── */}
      {!open && (
        <button
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label="Open AI Chat"
        >
          <div className="fab-ping" />
          <BotIcon />
          <span>AI Bot</span>
        </button>
      )}

      {/* ── Window ── */}
      {open && (
        <div className="chat-window" role="dialog" aria-label="AI Chatbot">
          {/* Header */}
          <div className="chat-header">
            <div className="avatar-orb">
              <BotIcon />
            </div>
            <div className="header-info">
              <div className="header-name">Arpit's AI Guide</div>
              <div className="header-status">● online · ready</div>
            </div>
            <div className="header-actions">
              <button
                className="icon-btn"
                onClick={clearChat}
                title="Clear history"
                aria-label="Clear history"
              >
                <TrashIcon />
              </button>
              <button
                className="icon-btn"
                onClick={() => setOpen(false)}
                title="Close"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {chat.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🤖</div>
                <div className="empty-title">Hey there! 👋</div>
                <div className="empty-sub">
                  Ask me anything about Arpit's
                  <br />
                  skills, projects, or experience.
                </div>
              </div>
            )}

            {chat.map((c, i) => (
              <div
                key={i}
                className={`msg-row ${c.role}`}
                style={{ animationDelay: `${Math.min(i * 0.03, 0.15)}s` }}
              >
                <div className={`bubble ${c.role}`}>{c.text}</div>
              </div>
            ))}

            {loading && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
                <span className="typing-text">thinking…</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          <div className="suggestions-strip">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="chip"
                onClick={() => sendMessage(s)}
                disabled={loading}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="input-wrap">
              <textarea
                ref={inputRef}
                className="chat-input"
                placeholder="Ask about Arpit…"
                value={message}
                rows={1}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
              />
            </div>
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !message.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
