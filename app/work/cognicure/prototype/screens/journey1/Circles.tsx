// app/work/cognicure/prototype/screens/journey1/Circles.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const CARDS = [
  { emoji: "👤", title: "Basic Info", desc: "A very basic info about you helps doctors know about you and your health.", bg: C.surface, accent: C.teal },
  { emoji: "🔗", title: "Circles",    desc: "Family, Friend and three key circles of your healthcare network.", bg: C.mustardLight, accent: C.mustard },
];

export function CirclesIntroScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <StatusBar />

      {/* Greeting */}
      <div style={{ padding: "16px 24px 0" }}>
        <p style={{ fontSize: TYPE.small, color: C.teal, fontWeight: 600, marginBottom: 4 }}>Good Morning</p>
        <p style={{ fontSize: 36, fontWeight: 800, color: C.navy, letterSpacing: "-0.04em",
          fontFamily: "var(--font-display), Georgia, serif" }}>Chandrasekar!</p>
        <p style={{ fontSize: TYPE.body, color: C.textBody, marginTop: 8, lineHeight: 1.5 }}>Help your doctor know the most essential bit about you —</p>
      </div>

      {/* Cards horizontal scroll */}
      <div style={{ flex: 1, padding: "24px 0", display: "flex", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 16, paddingLeft: 24, overflowX: "auto", width: "100%" }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4, ease: "easeOut" }}
              style={{
                width: 200, flexShrink: 0,
                background: card.bg,
                borderRadius: RADIUS.xl,
                padding: 20,
                boxShadow: SHADOW.card,
                display: "flex", flexDirection: "column", gap: 12,
              }}
            >
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: card.accent + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                {card.emoji}
              </div>
              <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy }}>{card.title}</p>
              <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.5 }}>{card.desc}</p>
            </motion.div>
          ))}
          <div style={{ width: 8, flexShrink: 0 }} />
        </div>
      </div>

      {/* CTAs */}
      <div style={{ padding: "0 24px 36px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Button label="Go to My Circles" onPress={() => navigate("inviteFamily")} variant="primary" fullWidth />
        <button
          onClick={() => navigate("dashboard")}
          style={{ background: "none", border: "none", fontSize: TYPE.body, color: C.muted, cursor: "pointer", fontFamily: "inherit", padding: "8px 0" }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
