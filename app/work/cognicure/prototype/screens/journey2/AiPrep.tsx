// app/work/cognicure/prototype/screens/journey2/AiPrep.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

const SUGGESTED_QUESTIONS = [
  "What is the likely cause of my lower abdominal pain?",
  "Should I get any tests done before the consultation?",
  "Is my current medication compatible with new prescriptions?",
  "What lifestyle changes would you recommend?",
];

export function AiPrepScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="AI Consultation Prep" onBack={goBack} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* AI banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.navyLight})`, borderRadius: RADIUS.lg, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}
        >
          <Sparkles size={20} color="#fff" />
          <div>
            <p style={{ fontSize: TYPE.small, fontWeight: 700, color: "#fff", marginBottom: 4 }}>AI Health Summary for Dr. Shetty</p>
            <p style={{ fontSize: TYPE.caption, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
              Based on your health records, here&apos;s what your doctor should know before your consultation.
            </p>
          </div>
        </motion.div>

        {/* Symptoms */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Current Symptoms</p>
          {["Lower abdominal pain — 3 days", "Nausea — occasional", "Reduced appetite"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal, marginTop: 5, flexShrink: 0 }} />
              <p style={{ fontSize: TYPE.small, color: C.textBody }}>{s}</p>
            </div>
          ))}
        </Card>

        {/* Recent consultations */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Recent Consultations</p>
          {[
            { doctor: "Dr. Mahima Gupta", date: "24 Feb 2023", reason: "Muscle pain" },
            { doctor: "Dr. Tanuja Chandra", date: "2 Mar 2023", reason: "Follow-up" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10, borderBottom: i === 0 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>{c.doctor}</p>
                <p style={{ fontSize: TYPE.caption, color: C.muted }}>{c.reason}</p>
              </div>
              <p style={{ fontSize: TYPE.caption, color: C.subtle }}>{c.date}</p>
            </div>
          ))}
        </Card>

        {/* Suggested questions */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Sparkles size={14} color={C.teal} />
            <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>Suggested Questions</p>
          </div>
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 700, flexShrink: 0 }}>Q{i+1}</span>
              <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.4 }}>{q}</p>
            </div>
          ))}
        </Card>

        <Button label="Join Consultation" onPress={() => navigate("waitingRoom")} variant="primary" fullWidth />
      </div>
    </div>
  );
}
