// app/work/cognicure/prototype/screens/journey4/PrescriptionsList.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

const RX_LIST = [
  { name: "Dr. Nischhal Shetty", spec: "General Physician", reason: "Abdominal pain and discomfort...",              date: "Mon, 6 Mar, 2023",  emoji: "👨‍⚕️" },
  { name: "Dr. Tanuja Chandra",  spec: "General Physician", reason: "Follow-up",                                     date: "Thu, 2 Mar, 2023",  emoji: "👩‍⚕️" },
  { name: "Dr. Mahima Gupta",    spec: "Physiotherapist",   reason: "Muscle pain",                                   date: "Fri, 24 Feb, 2023", emoji: "🧑‍⚕️" },
  { name: "Dr. Nischhal Shetty", spec: "General Physician", reason: "Fever, body pain, difficulty in breathing...",  date: "Thu, 26 Jan, 2023", emoji: "👨‍⚕️" },
  { name: "Dr. Nischhal Shetty", spec: "General Physician", reason: "Having pain in lower back for last ten days...", date: "Mon, 21 Dec, 2022", emoji: "👨‍⚕️" },
];

export function PrescriptionsListScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Prescriptions" onBack={goBack} />
        <div style={{ padding: "0 20px 14px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.bg, borderRadius: RADIUS.full,
            padding: "10px 16px", border: `1px solid ${C.border}`,
          }}>
            <Search size={14} color={C.muted} />
            <span style={{ fontSize: TYPE.small, color: C.subtle }}>Search prescriptions...</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", background: C.surface }}>
        {RX_LIST.map((rx, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
            style={{
              padding: "14px 20px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex", gap: 12,
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: C.tealLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 20,
            }}>
              {rx.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{rx.name}</p>
                <p style={{ fontSize: TYPE.caption, color: C.muted }}>{rx.date}</p>
              </div>
              <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 2 }}>{rx.spec}</p>
              <p style={{ fontSize: TYPE.caption, color: C.textBody }}>{rx.reason}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <div style={{ position: "absolute", bottom: 28, right: 20 }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={MOTION.spring}
          onClick={() => navigate("addComplaint")}
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: C.teal, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: SHADOW.fab,
          }}
        >
          <span style={{ fontSize: 26, color: "#fff", fontWeight: 300 }}>+</span>
        </motion.button>
      </div>
    </div>
  );
}
