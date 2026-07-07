// app/work/cognicure/prototype/screens/journey1/Splash.tsx
"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { C, MOTION } from "../../tokens";
import type { ScreenProps } from "../../types";

export function SplashScreen({ navigate }: ScreenProps) {
  useEffect(() => {
    const t = setTimeout(() => navigate("welcome"), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{
      width: 390, height: 844,
      background: `radial-gradient(ellipse 300px 300px at 80% 10%, ${C.tealGlow} 0%, transparent 70%),
                   radial-gradient(ellipse 280px 280px at 10% 90%, rgba(232,168,56,0.12) 0%, transparent 70%),
                   ${C.bg}`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 20, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      {/* Animated logo mark */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
      >
        {/* CogniCuyr icon — concentric C arcs */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke={C.teal} strokeWidth="4" strokeLinecap="round"
            strokeDasharray="180 60" strokeDashoffset="30" />
          <circle cx="40" cy="40" r="26" stroke={C.teal} strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray="120 50" strokeDashoffset="20" />
          <circle cx="40" cy="40" r="7" fill={C.mustard} />
        </svg>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          style={{ fontSize: 18, fontWeight: 800, color: C.teal, letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          COGNICUYR
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        style={{ textAlign: "center", padding: "0 48px" }}
      >
        <p style={{ fontSize: 28, fontWeight: 300, color: C.navy, letterSpacing: "-0.02em", lineHeight: 1.3,
          fontFamily: "var(--font-display), Georgia, serif" }}>
          Hello!
        </p>
        <p style={{ fontSize: 14, color: C.muted, marginTop: 8, lineHeight: 1.6 }}>
          Welcome to hassle-free healthcare<br />for a better tomorrow.
        </p>
      </motion.div>
    </div>
  );
}
