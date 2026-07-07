"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

const CIRCLES = [
  { emoji: "👨‍👩‍👧", title: "My Family",  subtitle: "3 members", desc: "Manage family health & stay connected.", to: "familyList" as const, bg: C.tealLight },
  { emoji: "👨‍⚕️",  title: "Doctors",    subtitle: "2 connected", desc: "Your trusted healthcare professionals.", to: "doctorsNetwork" as const, bg: C.mustardLight },
  { emoji: "👫",   title: "Friends",    subtitle: "0 connected", desc: "Health support from your closest friends.", to: "friendsCircle" as const, bg: C.surfaceAlt },
];

export function CirclesLandingScreen({ navigate }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <div style={{ padding: "4px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ fontSize: TYPE.h2, fontWeight: 800, color: C.navy, letterSpacing: "-0.03em",
              fontFamily: "var(--font-display), Georgia, serif" }}>My Circles</p>
            <p style={{ fontSize: TYPE.small, color: C.muted, marginTop: 4 }}>Bringing your network closer.</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("networkGraph")}
            style={{ background: C.tealLight, border: "none", borderRadius: RADIUS.md, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            <span style={{ fontSize: 14 }}>🕸</span>
            <span style={{ fontSize: TYPE.caption, fontWeight: 600, color: C.teal }}>Network</span>
          </motion.button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 14 }}>
        {CIRCLES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35, ease: "easeOut" }}
          >
            <Card onPress={() => navigate(c.to)} style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
                {c.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy }}>{c.title}</p>
                  <span style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 600 }}>{c.subtitle}</span>
                </div>
                <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.4 }}>{c.desc}</p>
              </div>
              <ChevronRight size={16} color={C.subtle} />
            </Card>
          </motion.div>
        ))}

        {/* Quick invite CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
          style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.navyLight})`, borderRadius: RADIUS.lg, padding: "20px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div>
            <p style={{ fontSize: TYPE.small, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Invite your family</p>
            <p style={{ fontSize: TYPE.caption, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>Share healthcare journey with loved ones.</p>
          </div>
          <motion.button
            onClick={() => navigate("addFamilyMember")}
            whileTap={{ scale: 0.9 }}
            style={{ background: "#fff", border: "none", borderRadius: RADIUS.full, padding: "10px 16px", cursor: "pointer" }}
          >
            <span style={{ fontSize: TYPE.small, fontWeight: 700, color: C.teal }}>Invite</span>
          </motion.button>
        </motion.div>
      </div>

      <BottomNav active="circlesLanding" navigate={navigate} />
    </div>
  );
}
