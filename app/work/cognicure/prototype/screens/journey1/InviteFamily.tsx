// app/work/cognicure/prototype/screens/journey1/InviteFamily.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const CIRCLES = [
  { emoji: "👨‍👩‍👧", title: "My Family",  desc: "Add family members to avail the benefits of a complete healthcare service.", bg: C.tealLight },
  { emoji: "👨‍⚕️",  title: "Doctors",    desc: "Add the nearest healthcare professional to connect and always stay in touch.", bg: C.mustardLight },
  { emoji: "👫",   title: "Friends",    desc: "Add your buddies who support you in difficult times and counsel you with the most valuable advice.", bg: C.surfaceAlt },
];

export function InviteFamilyScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <StatusBar />
      <div style={{ padding: "8px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={goBack} style={{ background: "none", border: "none", color: C.teal, fontSize: 22, cursor: "pointer", lineHeight: 1 }}>‹</button>
        <div />
      </div>

      <div style={{ padding: "16px 24px 0" }}>
        <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
          fontFamily: "var(--font-display), Georgia, serif" }}>My Circles</p>
        <p style={{ fontSize: TYPE.body, color: C.textBody, marginTop: 8, lineHeight: 1.5 }}>Bringing your network closer — family, friends and your doctors.</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {CIRCLES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35, ease: "easeOut" }}
            style={{ background: C.surface, borderRadius: RADIUS.xl, padding: 20, boxShadow: SHADOW.card, display: "flex", gap: 16, alignItems: "flex-start" }}
          >
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
              {c.emoji}
            </div>
            <div>
              <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{c.title}</p>
              <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: "0 24px 36px", display: "flex", flexDirection: "column", gap: 12 }}>
        <Button label="Let's complete circles" onPress={() => navigate("addFamilyMember")} variant="primary" fullWidth />
        <button
          onClick={() => navigate("dashboard")}
          style={{ background: "none", border: "none", fontSize: TYPE.small, color: C.muted, cursor: "pointer", fontFamily: "inherit", textAlign: "center", padding: "6px 0" }}
        >
          I&apos;ll do this later
        </button>
      </div>
    </div>
  );
}
