"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  angle: (i / 16) * 360,
  color: [C.teal, C.mustard, C.tealLight, "#fff", C.navyLight][i % 5],
  size: 6 + (i % 3) * 4,
}));

export function InviteAcceptedScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.surface, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <StatusBar />
      <Header title="Add Family Member" onBack={goBack} rightLabel="Cancel" onRight={goBack} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 28, position: "relative" }}>
        {/* Particle burst */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {PARTICLES.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * 140;
            const ty = Math.sin(rad) * 140;
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x: tx, y: ty, opacity: 0, scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: i * 0.03 }}
                style={{ position: "absolute", width: p.size, height: p.size, borderRadius: RADIUS.xs, background: p.color }}
              />
            );
          })}
        </div>

        {/* User card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={MOTION.spring}
          style={{ background: C.bg, borderRadius: RADIUS.xl, padding: "20px 24px", width: "100%", display: "flex", gap: 14, alignItems: "center", boxShadow: SHADOW.card }}
        >
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👩</div>
          <div>
            <p style={{ fontSize: TYPE.body, fontWeight: 700, color: C.navy }}>Preethi Nair</p>
            <p style={{ fontSize: TYPE.small, color: C.muted }}>32 years · Entrepreneur</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontSize: TYPE.h3, fontWeight: 800, color: C.navy, letterSpacing: "-0.02em",
            fontFamily: "var(--font-display), Georgia, serif", marginBottom: 8 }}>
            Congratulations!
          </p>
          <p style={{ fontSize: TYPE.body, color: C.textBody, lineHeight: 1.6 }}>
            Preethi has accepted your invite, select relationship to continue —
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <Button label="Continue" onPress={() => navigate("assignRelationship")} variant="primary" fullWidth />
        </motion.div>
      </div>
    </div>
  );
}
