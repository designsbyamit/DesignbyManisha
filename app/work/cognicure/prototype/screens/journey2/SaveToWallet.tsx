// app/work/cognicure/prototype/screens/journey2/SaveToWallet.tsx
"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

export function SaveToWalletScreen({ navigate }: ScreenProps) {
  useEffect(() => {
    const t = setTimeout(() => navigate("consultationFeedback"), 1800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{ width: 390, height: 844, background: C.surface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", gap: 28 }}>
      <StatusBar />

      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={MOTION.spring}
        style={{ width: 96, height: 96, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...MOTION.spring, delay: 0.2 }}
          style={{ fontSize: 40 }}
        >
          ✓
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
        style={{ textAlign: "center", padding: "0 40px" }}
      >
        <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
          fontFamily: "var(--font-display), Georgia, serif", marginBottom: 10 }}>
          Saved to Health Wallet
        </p>
        <p style={{ fontSize: TYPE.body, color: C.textBody, lineHeight: 1.6 }}>
          Your prescription has been automatically categorised and added to your health timeline.
        </p>
      </motion.div>

      {/* Category chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
        style={{ display: "flex", gap: 10 }}
      >
        {[
          { label: "💊 Prescriptions", bg: C.tealLight, color: C.teal },
          { label: "📋 Consultations", bg: C.mustardLight, color: C.mustard },
        ].map(chip => (
          <div key={chip.label} style={{ background: chip.bg, borderRadius: RADIUS.full, padding: "8px 16px" }}>
            <span style={{ fontSize: TYPE.small, fontWeight: 600, color: chip.color }}>{chip.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
