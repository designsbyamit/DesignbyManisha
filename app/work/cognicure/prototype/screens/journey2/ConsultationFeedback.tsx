// app/work/cognicure/prototype/screens/journey2/ConsultationFeedback.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

export function ConsultationFeedbackScreen({ navigate, goBack }: ScreenProps) {
  const [rating, setRating] = useState(5);

  return (
    <div style={{ width: 390, height: 844, background: C.surface, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <StatusBar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 28 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>👨‍⚕️</div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
            fontFamily: "var(--font-display), Georgia, serif", marginBottom: 8 }}>
            How was your consultation?
          </p>
          <p style={{ fontSize: TYPE.small, color: C.muted }}>With Dr. Nischhal Shetty</p>
        </div>

        {/* Stars */}
        <div style={{ display: "flex", gap: 12 }}>
          {[1,2,3,4,5].map(i => (
            <motion.button
              key={i}
              onClick={() => setRating(i)}
              whileTap={{ scale: 0.85 }}
              transition={MOTION.spring}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <motion.span
                animate={{ color: i <= rating ? C.mustard : C.border, fontSize: i <= rating ? 38 : 32 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ display: "block" }}
              >
                ★
              </motion.span>
            </motion.button>
          ))}
        </div>

        {/* Optional note */}
        <div style={{ width: "100%", background: C.bg, borderRadius: RADIUS.md, padding: "14px 16px", border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: TYPE.small, color: C.subtle }}>Share any additional thoughts... (optional)</p>
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <Button label="Submit Feedback" onPress={() => navigate("dashboard")} variant="primary" fullWidth />
          <button onClick={() => navigate("dashboard")} style={{ background: "none", border: "none", fontSize: TYPE.small, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
