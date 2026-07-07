"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

const MEMBERS = [
  { name: "Chandrasekhar Nair", role: "Self",   age: 63, job: "Retired Govt. Employee", emoji: "👴" },
  { name: "Suneeta Nair",       role: "Spouse", age: 60, job: "Homemaker",              emoji: "👵" },
];

export function FamilyListScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <div style={{ padding: "4px 24px 16px" }}>
          <button onClick={goBack} style={{ background: "none", border: "none", color: C.teal, fontSize: 22, cursor: "pointer", padding: 0, marginBottom: 8, display: "block" }}>‹</button>
          <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
            fontFamily: "var(--font-display), Georgia, serif" }}>My Family</p>
          <p style={{ fontSize: TYPE.small, color: C.muted, marginTop: 4 }}>Pull everyone closer. After all we're family :)</p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 12 }}>
        {MEMBERS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35, ease: "easeOut" }}
            style={{ background: C.bg, borderRadius: RADIUS.lg, padding: 16, display: "flex", alignItems: "center", gap: 14, border: `1px solid ${C.border}` }}
          >
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
              {m.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{m.name}</p>
              <p style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 600, marginBottom: 2 }}>{m.role}</p>
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>{m.age} years · {m.job}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ position: "absolute", bottom: 32, right: 24 }}>
        <motion.button
          onClick={() => navigate("addFamilyMember")}
          whileTap={{ scale: 0.9 }}
          transition={MOTION.spring}
          style={{ width: 56, height: 56, borderRadius: "50%", background: C.teal, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SHADOW.fab }}
        >
          <span style={{ fontSize: 28, color: "#fff", fontWeight: 300, lineHeight: 1 }}>+</span>
        </motion.button>
      </div>
    </div>
  );
}
