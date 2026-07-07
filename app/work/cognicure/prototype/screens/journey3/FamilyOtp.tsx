"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

const PREFILL = ["4", "8", "2", "1"];

export function FamilyOtpScreen({ navigate, goBack }: ScreenProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < PREFILL.length) {
        setDigits(prev => { const next = [...prev]; next[i] = PREFILL[i]; return next; });
        i++;
      } else {
        clearInterval(interval);
        setSuccess(true);
        setTimeout(() => navigate("inviteAccepted"), 600);
      }
    }, 320);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div style={{ width: 390, height: 844, background: C.surface, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <StatusBar />
      <Header title="Add Family Member" onBack={goBack} rightLabel="Cancel" onRight={goBack} />
      <div style={{ flex: 1, padding: "48px 32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        <p style={{ fontSize: TYPE.body, color: C.textBody, textAlign: "center", lineHeight: 1.6, maxWidth: 280 }}>
          We have sent your family member a 4-digit verification code on the given mobile number.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          {digits.map((d, i) => (
            <motion.div
              key={i}
              animate={{ borderColor: d ? C.teal : C.border, background: success ? C.tealLight : C.surface }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ width: 64, height: 72, border: `2px solid ${d ? C.teal : C.border}`, borderRadius: RADIUS.md, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: C.navy }}
            >
              {d}
            </motion.div>
          ))}
        </div>
        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={MOTION.spring} style={{ color: C.success, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span style={{ fontSize: TYPE.small, fontWeight: 600 }}>Code verified!</span>
          </motion.div>
        )}
        <button onClick={() => navigate("inviteAccepted")} style={{ background: "none", border: "none", color: C.teal, fontWeight: 600, fontSize: TYPE.body, cursor: "pointer", fontFamily: "inherit" }}>
          Validate Later
        </button>
      </div>
    </div>
  );
}
