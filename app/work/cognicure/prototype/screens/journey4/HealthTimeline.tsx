// app/work/cognicure/prototype/screens/journey4/HealthTimeline.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

const EVENTS = [
  { date: "6 Mar 2023",  type: "Consultation", label: "Dr. Shetty — IBS diagnosed",             emoji: "🩺", color: C.tealLight },
  { date: "2 Mar 2023",  type: "Prescription", label: "Mebeverine 135mg prescribed",             emoji: "💊", color: C.mustardLight },
  { date: "24 Feb 2023", type: "Consultation", label: "Dr. Gupta — Physiotherapy",               emoji: "🧘", color: C.tealLight },
  { date: "13 Mar 2021", type: "Vitals",       label: "Heart rate avg 58 bpm — weekly",           emoji: "❤️", color: "#FFE8F0" },
  { date: "10 Oct 2021", type: "Condition",    label: "Bronchial Asthma onset recorded",          emoji: "🫁", color: C.bg },
  { date: "Jul 2019",    type: "Injury",       label: "Fractured left ankle — recovered Nov 19",  emoji: "🦴", color: C.bg },
];

export function HealthTimelineScreen({ goBack }: ScreenProps) {
  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Health Timeline" onBack={goBack} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px", position: "relative" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: 42, top: 0, bottom: 0,
          width: 2, background: C.border,
        }} />

        {EVENTS.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
            style={{ display: "flex", gap: 16, marginBottom: 16 }}
          >
            {/* Timeline dot */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 44 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: e.color,
                border: `3px solid ${C.surface}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0, zIndex: 1,
              }}>
                {e.emoji}
              </div>
            </div>

            {/* Event card */}
            <div style={{
              flex: 1, background: C.surface,
              borderRadius: RADIUS.lg, padding: "12px 14px",
              boxShadow: SHADOW.card,
            }}>
              {/* Fixed: display: "flex" (both double quotes) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{
                  background: C.tealLight, borderRadius: RADIUS.full,
                  padding: "2px 8px",
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: C.teal }}>
                    {e.type.toUpperCase()}
                  </span>
                </div>
                <p style={{ fontSize: TYPE.caption, color: C.subtle }}>{e.date}</p>
              </div>
              <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.4 }}>{e.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
