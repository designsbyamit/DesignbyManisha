// app/work/cognicure/prototype/screens/journey4/AiSummary.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

const AI_TEXT =
  "Based on your 18 months of health data, you have maintained generally stable health with a few recurring patterns. Your asthma flares are correlated with seasonal changes (Oct–Nov). Your blood pressure readings trend slightly high — consider reducing sodium intake. Your energy activity has improved 12% since December. Regular follow-ups with Dr. Shetty are recommended every 6 weeks.";

export function AiSummaryScreen({ goBack }: ScreenProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < AI_TEXT.length) {
        setDisplayed(AI_TEXT.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="AI Health Summary" onBack={goBack} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Typewriter narrative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            background: `linear-gradient(135deg, ${C.teal}, ${C.navyLight})`,
            borderRadius: RADIUS.lg, padding: "20px 20px",
            display: "flex", gap: 14,
          }}
        >
          <Sparkles size={20} color="#fff" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontSize: TYPE.small, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
              Health Narrative
            </p>
            <p style={{ fontSize: TYPE.small, color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
              {displayed}
              {!done && <span style={{ opacity: 1 }}>|</span>}
            </p>
          </div>
        </motion.div>

        {/* Risk indicators — appear after typewriter completes */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Risk Indicators</p>
              {[
                { label: "Blood Pressure",  level: "Moderate", color: C.mustard },
                { label: "BMI",             level: "Elevated",  color: C.mustard },
                { label: "Asthma Control",  level: "Good",      color: C.success },
                { label: "Energy Activity", level: "Good",      color: C.success },
              ].map(r => (
                <div key={r.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${C.border}`,
                }}>
                  <p style={{ fontSize: TYPE.small, color: C.textBody }}>{r.label}</p>
                  <div style={{ background: r.color + "22", borderRadius: RADIUS.full, padding: "3px 10px" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: r.color }}>{r.level}</span>
                  </div>
                </div>
              ))}
            </Card>
          </motion.div>
        )}

        {/* Recommendations */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <Card>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Recommendations</p>
              {[
                "Follow up with Dr. Shetty in 6 weeks",
                "Reduce sodium intake",
                "Add 15 min walk daily",
                "Monitor BP twice a week",
              ].map((rec, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: C.tealLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 10, color: C.teal }}>✓</span>
                  </div>
                  <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.4 }}>{rec}</p>
                </div>
              ))}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
