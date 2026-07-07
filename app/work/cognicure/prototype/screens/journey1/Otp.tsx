// app/work/cognicure/prototype/screens/journey1/Otp.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

// Figma correction: prefill 9,8,7,6
const PREFILL = ["9", "8", "7", "6"];

export function OtpScreen({ navigate, goBack }: ScreenProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [done, setDone] = useState(false);

  // Auto-fill OTP with delay for delight
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < PREFILL.length) {
        setDigits(prev => {
          const next = [...prev];
          next[i] = PREFILL[i];
          return next;
        });
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => navigate("createProfile"), 700);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div style={{
      width: 390, height: 844, background: C.surface,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      <StatusBar />

      {/* Header row */}
      <div style={{ padding: "8px 20px 0", display: "flex", alignItems: "center" }}>
        <button
          onClick={goBack}
          style={{ background: "none", border: "none", color: C.teal, fontSize: 22, cursor: "pointer", padding: 0 }}
        >
          ‹
        </button>
      </div>

      <div style={{ flex: 1, padding: "32px 32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: TYPE.h3, fontWeight: 700, color: C.navy, marginBottom: 10 }}>
            Enter verification code
          </p>
          <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.6, maxWidth: 280 }}>
            We have sent you a 4-digit verification code on the given mobile number.
          </p>
        </div>

        {/* OTP boxes */}
        <div style={{ display: "flex", gap: 12 }}>
          {digits.map((d, i) => (
            <motion.div
              key={i}
              animate={{
                borderColor: d ? C.teal : C.border,
                scale: d && !digits[i + 1] ? [1, 1.08, 1] : 1,
                background: done ? C.tealLight : C.surface,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                width: 64, height: 72,
                border: `2px solid ${d ? C.teal : C.border}`,
                borderRadius: RADIUS.md,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 700, color: C.navy,
                boxShadow: d ? SHADOW.tealGlow : "none",
              }}
            >
              {d}
            </motion.div>
          ))}
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={MOTION.spring}
            style={{ display: "flex", alignItems: "center", gap: 8, color: C.success }}
          >
            <span style={{ fontSize: 20 }}>✓</span>
            <span style={{ fontSize: TYPE.small, fontWeight: 600 }}>Verified!</span>
          </motion.div>
        )}

        {/* Time elapsed / resend */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: TYPE.small, color: C.muted }}>
            Time elapsed:{" "}
            <span
              onClick={() => {}}
              style={{ color: C.teal, fontWeight: 600, cursor: "pointer" }}
            >
              Resend
            </span>
          </p>
        </div>

        {/* Submit button */}
        <motion.button
          onClick={() => navigate("createProfile")}
          whileTap={{ scale: 0.97 }}
          transition={MOTION.spring}
          style={{
            width: "100%", padding: "16px",
            borderRadius: RADIUS.xxl,
            background: C.teal, color: "#fff",
            border: "none", cursor: "pointer",
            fontSize: TYPE.body, fontWeight: 600,
            fontFamily: "inherit",
            boxShadow: "0 4px 14px rgba(61,155,143,0.35)",
          }}
        >
          Submit
        </motion.button>

        {/* iOS keyboard placeholder */}
        <div style={{
          width: "100%", marginTop: "auto",
          background: "#D1D3D8",
          borderRadius: RADIUS.md,
          padding: "12px 0 4px",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {[["1","2","3"], ["4","5","6"], ["7","8","9"], ["","0","⌫"]].map((row, ri) => (
            <div key={ri} style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              {row.map((k, ki) => (
                <div
                  key={ki}
                  style={{
                    width: 96, height: 42, borderRadius: RADIUS.sm,
                    background: k ? "#FFFFFF" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 500, color: "#000",
                    boxShadow: k ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
                  }}
                >
                  {k}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
