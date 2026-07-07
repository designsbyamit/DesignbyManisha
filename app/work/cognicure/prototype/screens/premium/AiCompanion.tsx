"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

interface Msg { role: "ai" | "user"; text: string; }

const INITIAL: Msg[] = [
  { role: "ai",   text: "Good morning, Chandrashekhar! 🌞 You have a consultation with Dr. Shetty tomorrow at 10:30 AM. Would you like help preparing?" },
  { role: "user", text: "Yes, please remind me what medicines I'm currently on." },
  { role: "ai",   text: "You are currently on Mebeverine 135mg (3× daily) and Rifaximin 550mg (2× daily) — both prescribed on 6 Mar 2023 for IBS. Your Probiotics (VSL) prescription is ongoing. No contraindications found with your upcoming consultation." },
];

const AI_RESPONSE = "Based on your health history, I'd recommend mentioning your persistent lower-back discomfort to Dr. Shetty — your last complaint was in Dec 2022. Would you like me to add this to your consultation prep notes?";

export function AiCompanionScreen({ navigate, goBack }: ScreenProps) {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setStreaming(true);
    setStreamText("");
    let i = 0;
    const t = setInterval(() => {
      if (i < AI_RESPONSE.length) {
        setStreamText(AI_RESPONSE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(t);
        setStreaming(false);
        setMessages(prev => [...prev, { role: "ai", text: AI_RESPONSE }]);
        setStreamText("");
      }
    }, 20);
  };

  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <div style={{ padding: "4px 24px 12px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={goBack} style={{ background: "none", border: "none", color: C.teal, fontSize: 22, cursor: "pointer", padding: 0 }}>‹</button>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy }}>AI Health Companion</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.success }} />
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>Always available</p>
            </div>
          </div>
          <Sparkles size={18} color={C.teal} />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 10 }}
          >
            {m.role === "ai" && (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.navyLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles size={14} color="#fff" />
              </div>
            )}
            <div style={{
              maxWidth: "75%", padding: "12px 14px", borderRadius: m.role === "user" ? `${RADIUS.lg}px ${RADIUS.lg}px 4px ${RADIUS.lg}px` : `4px ${RADIUS.lg}px ${RADIUS.lg}px ${RADIUS.lg}px`,
              background: m.role === "user" ? C.teal : C.surface,
              boxShadow: SHADOW.card,
            }}>
              <p style={{ fontSize: TYPE.small, color: m.role === "user" ? "#fff" : C.textBody, lineHeight: 1.5 }}>{m.text}</p>
            </div>
          </motion.div>
        ))}

        {streaming && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.navyLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={14} color="#fff" />
            </div>
            <div style={{ maxWidth: "75%", padding: "12px 14px", borderRadius: `4px ${RADIUS.lg}px ${RADIUS.lg}px ${RADIUS.lg}px`, background: C.surface, boxShadow: SHADOW.card }}>
              <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.5 }}>
                {streamText}<span style={{ opacity: 0.5 }}>|</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Quick actions */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
          {["Prepare for consultation", "My medicines today", "Show BP trend"].map(s => (
            <motion.button key={s} whileTap={{ scale: 0.95 }} onClick={() => { setInput(s); }}
              style={{ background: C.tealLight, border: `1px solid ${C.teal}20`, borderRadius: RADIUS.full, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit" }}>
              <span style={{ fontSize: TYPE.caption, fontWeight: 600, color: C.teal }}>{s}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px 32px", background: C.surface, borderTop: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, background: C.bg, borderRadius: RADIUS.full, padding: "10px 16px", border: `1px solid ${C.border}` }}>
          <span style={{ fontSize: TYPE.small, color: input ? C.navy : C.subtle }}>{input || "Ask me anything about your health..."}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Prepare?", "BP trend?", "My meds?"].map(q => (
            <button key={q} onClick={() => setInput(q)} style={{ background: C.tealLight, border: "none", borderRadius: RADIUS.full, padding: "6px 10px", cursor: "pointer", fontFamily: "inherit" }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.teal }}>{q}</span>
            </button>
          ))}
          <motion.button onClick={sendMessage} whileTap={{ scale: 0.9 }} transition={MOTION.spring}
            style={{ width: 40, height: 40, borderRadius: "50%", background: C.teal, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Send size={16} color="#fff" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
