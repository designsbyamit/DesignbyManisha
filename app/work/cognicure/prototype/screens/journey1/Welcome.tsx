// app/work/cognicure/prototype/screens/journey1/Welcome.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, RADIUS, TYPE, MOTION } from "../../tokens";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const SLIDES = [
  {
    icon: "🏥",
    illustration: (
      <div style={{ width: 200, height: 200, borderRadius: "50%", background: C.tealLight,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
        🩺
      </div>
    ),
    title: "Your healthcare companion",
    body: "Manage your complete health profile and get personalised insights for a healthier life.",
  },
  {
    illustration: (
      <div style={{ width: 200, height: 200, borderRadius: "50%", background: C.tealLight,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
        📋
      </div>
    ),
    title: "Add your health profile!",
    body: "Get instant medical advice and healthcare support based on your entire health history.",
  },
  {
    illustration: (
      <div style={{ width: 200, height: 200, borderRadius: "50%", background: C.mustardLight,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
        👨‍⚕️
      </div>
    ),
    title: "Consult a doctor & stay connected!",
    body: "Connect with a doctor of any specialisation and stay connected forever!",
  },
  {
    illustration: (
      <div style={{ width: 200, height: 200, borderRadius: "50%", background: C.tealLight,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
        👨‍👩‍👧
      </div>
    ),
    title: "Bring your family closer",
    body: "Share health records, track family wellness, and stay connected with your loved ones.",
  },
];

export function WelcomeScreen({ navigate }: ScreenProps) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === SLIDES.length - 1;
  const current = SLIDES[slide];

  return (
    <div style={{
      width: 390, height: 844,
      background: `radial-gradient(ellipse 260px 260px at 90% 5%, ${C.tealGlow} 0%, transparent 70%),
                   radial-gradient(ellipse 240px 240px at 5% 95%, rgba(232,168,56,0.1) 0%, transparent 70%),
                   ${C.bg}`,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 48, gap: 6 }}>
        <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke={C.teal} strokeWidth="4" strokeLinecap="round" strokeDasharray="180 60" strokeDashoffset="30" />
          <circle cx="40" cy="40" r="26" stroke={C.teal} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="120 50" strokeDashoffset="20" />
          <circle cx="40" cy="40" r="7" fill={C.mustard} />
        </svg>
        <p style={{ fontSize: 12, fontWeight: 800, color: C.teal, letterSpacing: "0.12em", textTransform: "uppercase" }}>COGNICUYR</p>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 24 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}
          >
            {current.illustration}
            <div style={{ textAlign: "center", maxWidth: 300 }}>
              <p style={{ fontSize: TYPE.h3, fontWeight: 700, color: C.navy, letterSpacing: "-0.02em",
                fontFamily: "var(--font-display), Georgia, serif", lineHeight: 1.3, marginBottom: 10 }}>
                {current.title}
              </p>
              <p style={{ fontSize: TYPE.body, color: C.textBody, lineHeight: 1.6 }}>{current.body}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div style={{ padding: "0 24px 40px" }}>
        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28 }}>
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === slide ? 20 : 6, background: i === slide ? C.teal : C.border }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ height: 6, borderRadius: 3, cursor: "pointer" }}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate("login")}
            style={{ background: "none", border: "none", fontSize: TYPE.body, color: C.muted, cursor: "pointer", fontFamily: "inherit", padding: "8px 0" }}
          >
            Skip
          </button>
          <Button
            label={isLast ? "Get started" : "Next"}
            onPress={() => isLast ? navigate("login") : setSlide(s => s + 1)}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
