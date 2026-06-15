"use client";

import { useState, useRef, useEffect } from "react";
import { BRAND, PHONE_NUMBER } from "../lib/chatbot-config";

// Get a free access key at https://web3forms.com (60 seconds, no account needed).
// Paste it here so captured leads get emailed to you. Leave as-is to disable capture.
const WEB3FORMS_ACCESS_KEY = "f146e43f-15b3-4fd8-8396-8f8452d78c36";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: BRAND.greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [leadSent, setLeadSent] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, showLeadForm]);

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply || "Sorry, please try again.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection issue — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e) {
    e.preventDefault();
    if (!lead.name || !lead.email) return;

    try {
      if (WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
        const transcript = messages
          .map((m) => `${m.role === "user" ? "Visitor" : "Bot"}: ${m.content}`)
          .join("\n");
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: "New chatbot lead — Ajax AI",
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            message: `Chat transcript:\n\n${transcript}`,
          }),
        });
      }
      setLeadSent(true);
      setShowLeadForm(false);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Thanks ${lead.name}! Kurt will be in touch shortly. You can also call us on ${PHONE_NUMBER}.`,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Couldn't send that — please try again." },
      ]);
    }
  }

  const c = colors;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: BRAND.accent,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChatIcon />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(560px, calc(100vh - 48px))",
            background: c.panel,
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: BRAND.background,
              color: "#fff",
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: BRAND.accent,
                  display: "inline-block",
                }}
              />
              <strong>{BRAND.name} Assistant</strong>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: "auto", padding: 16, background: c.panel }}
          >
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.content} />
            ))}
            {loading && <Bubble role="assistant" text="…" />}

            {showLeadForm && (
              <form
                onSubmit={submitLead}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 12,
                  marginTop: 8,
                  border: `1px solid ${c.border}`,
                }}
              >
                <p style={{ margin: "0 0 8px", fontSize: 13, color: "#333" }}>
                  Leave your details and Kurt will be in touch:
                </p>
                <input
                  required
                  placeholder="Your name"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  style={inputStyle(c)}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  style={inputStyle(c)}
                />
                <input
                  type="tel"
                  placeholder="Your phone (optional)"
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  style={inputStyle(c)}
                />
                <button type="submit" style={primaryBtn}>
                  Send
                </button>
              </form>
            )}
          </div>

          {/* Footer actions */}
          {!showLeadForm && !leadSent && (
            <button
              onClick={() => setShowLeadForm(true)}
              style={{
                background: "transparent",
                border: "none",
                borderTop: `1px solid ${c.border}`,
                color: BRAND.accent,
                padding: "8px",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Talk to a human →
            </button>
          )}

          {/* Input */}
          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              borderTop: `1px solid ${c.border}`,
              background: "#fff",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              style={{
                flex: 1,
                border: "none",
                padding: "12px 14px",
                fontSize: 14,
                outline: "none",
                color: "#1a1a1a",
                background: "#fff",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: BRAND.accent,
                border: "none",
                color: "#fff",
                padding: "0 18px",
                cursor: loading ? "default" : "pointer",
                fontWeight: 600,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const colors = {
  panel: "#0F1629",
  border: "rgba(255,255,255,0.1)",
};

function inputStyle(c) {
  return {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 10px",
    marginBottom: 8,
    borderRadius: 8,
    border: `1px solid ${c.border}`,
    fontSize: 14,
    color: "#1a1a1a",
    background: "#fff",
  };
}

const primaryBtn = {
  width: "100%",
  background: BRAND.accent,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px",
  fontWeight: 600,
  cursor: "pointer",
};

function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          padding: "9px 12px",
          borderRadius: 12,
          fontSize: 14,
          lineHeight: 1.4,
          whiteSpace: "pre-wrap",
          background: isUser ? BRAND.accent : "#fff",
          color: isUser ? "#fff" : "#1a1a1a",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
