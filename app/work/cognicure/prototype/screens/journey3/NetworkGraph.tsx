"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

const CENTER = { x: 195, y: 280 };
const NODES = [
  { label: "Suneeta",    emoji: "👵", angle: 270, dist: 120, color: C.tealLight },
  { label: "Preethi",    emoji: "👩", angle: 330, dist: 140, color: C.mustardLight },
  { label: "Dr. Shetty", emoji: "👨‍⚕️", angle: 30,  dist: 130, color: C.tealLight },
  { label: "Dr. Chandra",emoji: "👩‍⚕️", angle: 90,  dist: 120, color: C.tealLight },
  { label: "Dr. Gupta",  emoji: "🧑‍⚕️", angle: 150, dist: 140, color: C.tealLight },
  { label: "Pooja",      emoji: "👩", angle: 210, dist: 130, color: C.mustardLight },
];

function polarToXY(angle: number, dist: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CENTER.x + Math.cos(rad) * dist, y: CENTER.y + Math.sin(rad) * dist };
}

export function NetworkGraphScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="My Network" onBack={goBack} />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="390" height="500" viewBox="0 0 390 500">
          {/* Connecting lines */}
          {NODES.map((n, i) => {
            const pos = polarToXY(n.angle, n.dist);
            return (
              <motion.line
                key={i}
                x1={CENTER.x} y1={CENTER.y} x2={pos.x} y2={pos.y}
                stroke={C.border} strokeWidth="1.5" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              />
            );
          })}

          {/* Outer nodes */}
          {NODES.map((n, i) => {
            const pos = polarToXY(n.angle, n.dist);
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.35, ease: "easeOut" }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              >
                <circle cx={pos.x} cy={pos.y} r="28" fill={n.color} />
                <text x={pos.x} y={pos.y + 2} textAnchor="middle" dominantBaseline="middle" fontSize="20">{n.emoji}</text>
                <text x={pos.x} y={pos.y + 40} textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="Plus Jakarta Sans, sans-serif">{n.label}</text>
              </motion.g>
            );
          })}

          {/* Center node — self */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          >
            <circle cx={CENTER.x} cy={CENTER.y} r="40" fill={C.teal} />
            <text x={CENTER.x} y={CENTER.y + 2} textAnchor="middle" dominantBaseline="middle" fontSize="26">👴</text>
            <text x={CENTER.x} y={CENTER.y + 56} textAnchor="middle" fontSize="11" fill={C.navy} fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">You</text>
          </motion.g>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ padding: "0 24px 40px", display: "flex", justifyContent: "center", gap: 20 }}>
        {[{ color: C.tealLight, label: "Family & Doctors" }, { color: C.mustardLight, label: "Friends" }].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: l.color }} />
            <span style={{ fontSize: TYPE.caption, color: C.muted }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
