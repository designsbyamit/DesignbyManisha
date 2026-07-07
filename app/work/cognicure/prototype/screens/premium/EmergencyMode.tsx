"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, AlertTriangle } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

export function EmergencyModeScreen({ navigate, goBack }: ScreenProps) {
  const [sosTapped, setSosTapped] = useState(false);

  return (
    <div style={{ width: 390, height: 844, background: sosTapped ? "#2D0A0A" : "#1A0A0A", display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden", transition: "background 0.5s" }}>
      <StatusBar dark={true} />

      {/* Header */}
      <div style={{ padding: "8px 24px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={goBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 22, cursor: "pointer", padding: 0 }}>‹</button>
        <p style={{ fontSize: TYPE.body, fontWeight: 700, color: "#fff" }}>Emergency Mode</p>
      </div>

      {/* SOS Button */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2 + i * 0.1, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              style={{ position: "absolute", width: 100 + i * 40, height: 100 + i * 40, borderRadius: "50%", background: "#E53E3E", opacity: 0.3 }}
            />
          ))}
          <motion.button
            onClick={() => setSosTapped(v => !v)}
            whileTap={{ scale: 0.92 }}
            transition={MOTION.spring}
            style={{ width: 120, height: 120, borderRadius: "50%", background: "#E53E3E", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, boxShadow: "0 0 40px rgba(229,62,62,0.5)", position: "relative", zIndex: 1 }}
          >
            <span style={{ fontSize: 32 }}>🆘</span>
            <span style={{ fontSize: TYPE.small, fontWeight: 800, color: "#fff", letterSpacing: "0.1em" }}>SOS</span>
          </motion.button>
        </div>

        {sosTapped && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ textAlign: "center" }}>
            <p style={{ fontSize: TYPE.body, fontWeight: 700, color: "#ff6b6b" }}>Calling emergency services...</p>
            <p style={{ fontSize: TYPE.small, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Location sharing enabled</p>
          </motion.div>
        )}

        {/* Emergency contacts */}
        <div style={{ display: "flex", gap: 14 }}>
          {[{ name: "Suneeta", emoji: "👵" }, { name: "Preethi", emoji: "👩" }].map(c => (
            <motion.button key={c.name} whileTap={{ scale: 0.9 }} transition={MOTION.spring}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", borderRadius: RADIUS.xl, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{c.emoji}</div>
              <span style={{ fontSize: TYPE.caption, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{c.name}</span>
              <Phone size={16} color="#E53E3E" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Medical ID */}
      <div style={{ margin: "0 20px 40px", background: "rgba(255,255,255,0.06)", borderRadius: RADIUS.lg, padding: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <AlertTriangle size={14} color="#ff6b6b" />
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: "#fff" }}>Medical ID</p>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "Blood Group", value: "O+" },
            { label: "Allergies",   value: "Dust, Pollen" },
            { label: "Conditions",  value: "Asthma, IBS" },
          ].map(r => (
            <div key={r.label}>
              <p style={{ fontSize: TYPE.caption, color: "rgba(255,255,255,0.5)" }}>{r.label}</p>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: "#fff" }}>{r.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
